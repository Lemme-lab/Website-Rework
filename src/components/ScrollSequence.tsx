import React from "react";

/* ── scroll-scrubbed frame sequence ───────────────────────────────
 * A canvas that draws one frame of an image sequence, chosen by a
 * progress value the parent feeds in. The parent owns the scroll
 * maths so all three reels share a single listener; this component
 * owns loading and painting.
 *
 * Three decisions worth keeping:
 *
 * 1. Progress arrives through an imperative handle, not a prop. A
 *    scrubbed sequence updates every frame of a scroll, and pushing
 *    that through React state would re-render the section sixty
 *    times a second for a value only the canvas cares about.
 * 2. Frames load in order, a few at a time, and only once the reel is
 *    near the viewport. Until the exact frame is decoded the canvas
 *    shows the nearest earlier one that is, so scrubbing degrades to
 *    a coarser sequence instead of flickering or blanking.
 * 3. If the first frame 404s the component drops the canvas and keeps
 *    the still. There is no readout to explain that any more, so a
 *    missing sequence simply reads as a static render.
 * ─────────────────────────────────────────────────────────────── */

export type ScrollSequenceHandle = {
  /** Draw the frame at `progress` (0 = first frame, 1 = last). */
  setProgress: (progress: number) => void;
};

export type ScrollSequenceProps = {
  /** Number of frames in the sequence. 0 keeps the still. */
  frameCount: number;
  /** Builds a frame URL. `index` is 1-based, matching render output. */
  frameSrc: (index: number) => string;
  /** Stand-in render, shown only while the sequence does not exist yet.
   *  Once `frameCount` > 0 the still is frame 1 itself, so the handover
   *  from render to animation is the same picture and cannot mismatch. */
  poster?: string;
  /** Frame aspect ratio (w / h). Reserves the plate before load. */
  aspect?: number;
  /** Subject of the reel, used for the accessible label. */
  label: string;
  /** How many frames to fetch at once. @default 6 */
  concurrency?: number;
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

const ScrollSequence = React.forwardRef<
  ScrollSequenceHandle,
  ScrollSequenceProps
>(function ScrollSequence(
  { frameCount, frameSrc, poster, aspect = 16 / 10, label, concurrency = 6 },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const coreRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const framesRef = React.useRef<(HTMLImageElement | null)[]>([]);
  const readyRef = React.useRef<boolean[]>([]);
  const drawnRef = React.useRef(-1);
  const progressRef = React.useRef(0);

  const [missing, setMissing] = React.useState(frameCount <= 0);
  const [live, setLive] = React.useState(false);

  // Frame 1 is the still, so swapping one for the other is the same
  // picture — no cross-fade needed, and none wanted: mid-fade both
  // would be semi-transparent and the subject would ghost.
  const still = frameCount > 0 ? frameSrc(1) : poster;

  const paint = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || frameCount <= 0) return;

    const target = Math.round(progressRef.current * (frameCount - 1));

    let pick = -1;
    for (let i = target; i >= 0; i--) {
      if (readyRef.current[i]) { pick = i; break; }
    }
    if (pick < 0) {
      for (let i = target + 1; i < frameCount; i++) {
        if (readyRef.current[i]) { pick = i; break; }
      }
    }
    if (pick < 0 || pick === drawnRef.current) return;

    const img = framesRef.current[pick];
    if (!img) return;

    // Centre-crop the source to `aspect`, the same rule `object-fit:
    // cover` applies to the still underneath — so the two agree frame for
    // frame. This is what lets a reel be framed tighter than it was
    // rendered: the arm sits in the middle of a 16:9 plate with roughly a
    // third of the width blank on either side, and asking for a 4:3 plate
    // throws that margin away instead of paying layout for it. Nothing is
    // upscaled, so the crop costs no sharpness.
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;

    let sw = natW;
    let sh = natH;

    if (natW / natH > aspect) {
      sw = Math.round(natH * aspect);
    } else if (natW / natH < aspect) {
      sh = Math.round(natW / aspect);
    }

    const sx = Math.round((natW - sw) / 2);
    const sy = Math.round((natH - sh) / 2);

    // Draw at the plate's own display resolution rather than the frame's
    // natural size. The still underneath is downscaled by the browser's
    // image path; a canvas left at 1280px wide gets downscaled by the
    // compositor instead, and the two disagree along high-contrast edges
    // — which is exactly the seam the handover is supposed to not have.
    // Layout size, not getBoundingClientRect: the plate is mid-dolly and
    // its visual size changes every frame.
    const core = coreRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = core
      ? Math.min(sw, Math.round(core.offsetWidth * dpr))
      : sw;
    const h = Math.max(1, Math.round((w / sw) * sh));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    drawnRef.current = pick;
    if (!live) setLive(true);
  }, [frameCount, live, aspect]);

  React.useImperativeHandle(
    ref,
    () => ({
      setProgress: (progress: number) => {
        progressRef.current = clamp01(progress);
        paint();
      },
    }),
    [paint],
  );

  React.useEffect(() => {
    if (frameCount <= 0) return;
    const root = rootRef.current;
    if (!root) return;

    framesRef.current = new Array(frameCount).fill(null);
    readyRef.current = new Array(frameCount).fill(false);
    drawnRef.current = -1;

    let cancelled = false;
    let started = false;

    const loadFrom = (start: number) => {
      if (cancelled || start >= frameCount) return;
      const end = Math.min(start + concurrency, frameCount);
      let settled = 0;

      for (let i = start; i < end; i++) {
        const index = i;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return;
          framesRef.current[index] = img;
          readyRef.current[index] = true;
          paint();
          if (++settled === end - start) loadFrom(end);
        };
        img.onerror = () => {
          if (cancelled) return;
          if (index === 0) { setMissing(true); cancelled = true; return; }
          if (++settled === end - start) loadFrom(end);
        };
        img.src = frameSrc(index + 1);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        observer.disconnect();
        loadFrom(0);
      },
      { rootMargin: "150% 0px" },
    );
    observer.observe(root);

    return () => { cancelled = true; observer.disconnect(); };
  }, [frameCount, frameSrc, concurrency, paint]);

  React.useEffect(() => {
    const core = coreRef.current;
    if (!core || frameCount <= 0) return;
    const ro = new ResizeObserver(() => {
      drawnRef.current = -1;   // force a repaint at the new backing size
      paint();
    });
    ro.observe(core);
    return () => ro.disconnect();
  }, [paint, frameCount]);

  return (
    // Height cap, expressed through width so the aspect stays exact: at
    // peak zoom a square sequence is far taller than a 16:9 one, and the
    // pinned stage would clip it.
    <div
      className="plate"
      ref={rootRef}
      style={{ maxWidth: `calc(92svh * ${aspect})` }}
    >

      <div className="plate__core" ref={coreRef} style={{ aspectRatio: `${aspect}` }}>
        {still && (
          <img
            className="plate__still"
            src={still}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
            // Hidden the instant the canvas has frame 1. With an opaque
            // sequence the canvas covered this; a transparent one does
            // not, and the still would show through as a second, frozen
            // copy of the subject.
            data-hidden={live ? "true" : "false"}
          />
        )}

        {!missing && (
          <canvas
            className="plate__canvas"
            // The still sits underneath at full strength for the whole
            // life of the reel. The canvas simply covers it once frame 1
            // has decoded, so there is never a gap to see through.
            data-live={live ? "true" : "false"}
            ref={canvasRef}
            role="img"
            aria-label={`${label}, scroll-driven sequence`}
          />
        )}
      </div>
    </div>
  );
});

export default ScrollSequence;
