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
  /** Extra centre crop. 1 = no extra zoom, 1.08 = 8% tighter. */
  zoom?: number;
  /** Subject of the reel, used for the accessible label. */
  label: string;
  /** How many frames to fetch at once. @default 6 */
  concurrency?: number;
  /**
   * Removes only the white pixels connected to the outside edge of the
   * cropped frame. This is for renders that contain an opaque white sheet
   * around the subject: the subject stays intact, but the stage behind it
   * can actually show through.
   */
  knockoutEdgeWhite?: boolean;
  /** White threshold used by `knockoutEdgeWhite`. @default 242 */
  edgeWhiteThreshold?: number;
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

const ScrollSequence = React.forwardRef<
  ScrollSequenceHandle,
  ScrollSequenceProps
>(function ScrollSequence(
  {
    frameCount,
    frameSrc,
    poster,
    aspect = 16 / 10,
    zoom = 1,
    label,
    concurrency = 6,
    knockoutEdgeWhite = false,
    edgeWhiteThreshold = 242,
  },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const coreRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const framesRef = React.useRef<(HTMLImageElement | null)[]>([]);
  const processedFramesRef = React.useRef<(HTMLCanvasElement | null)[]>([]);
  const readyRef = React.useRef<boolean[]>([]);
  const drawnRef = React.useRef(-1);
  const progressRef = React.useRef(0);

  const [missing, setMissing] = React.useState(frameCount <= 0);
  const [live, setLive] = React.useState(false);

  const removeConnectedEdgeWhite = React.useCallback((
    img: HTMLImageElement,
    frameIndex: number,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
  ) => {
    if (!knockoutEdgeWhite) return img;

    const cached = processedFramesRef.current[frameIndex];
    if (cached && cached.width === sw && cached.height === sh) return cached;

    const offscreen = document.createElement("canvas");
    offscreen.width = sw;
    offscreen.height = sh;

    const offscreenContext = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offscreenContext) return img;

    offscreenContext.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    const imageData = offscreenContext.getImageData(0, 0, sw, sh);
    const { data } = imageData;
    const total = sw * sh;
    const seen = new Uint8Array(total);
    const queue = new Int32Array(total);
    let head = 0;
    let tail = 0;

    const isEdgeWhite = (pixel: number) => {
      const offset = pixel * 4;
      return (
        data[offset + 3] > 0 &&
        data[offset] >= edgeWhiteThreshold &&
        data[offset + 1] >= edgeWhiteThreshold &&
        data[offset + 2] >= edgeWhiteThreshold
      );
    };

    const enqueue = (pixel: number) => {
      if (seen[pixel] || !isEdgeWhite(pixel)) return;
      seen[pixel] = 1;
      queue[tail++] = pixel;
    };

    for (let x = 0; x < sw; x++) {
      enqueue(x);
      enqueue((sh - 1) * sw + x);
    }

    for (let y = 1; y < sh - 1; y++) {
      enqueue(y * sw);
      enqueue(y * sw + sw - 1);
    }

    while (head < tail) {
      const pixel = queue[head++];
      const offset = pixel * 4;
      data[offset + 3] = 0;

      const x = pixel % sw;
      if (x > 0) enqueue(pixel - 1);
      if (x < sw - 1) enqueue(pixel + 1);
      if (pixel >= sw) enqueue(pixel - sw);
      if (pixel < total - sw) enqueue(pixel + sw);
    }

    offscreenContext.putImageData(imageData, 0, 0);
    processedFramesRef.current[frameIndex] = offscreen;
    return offscreen;
  }, [knockoutEdgeWhite, edgeWhiteThreshold]);

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
    if (pick < 0) return;

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

    // Optional extra crop for sequences that were rendered with too much
    // dead space around the subject. Keeping this in the draw math means the
    // still and every animation frame use exactly the same framing.
    const safeZoom = Math.max(1, zoom);
    sw = Math.max(1, Math.round(sw / safeZoom));
    sh = Math.max(1, Math.round(sh / safeZoom));

    const sx = Math.round((natW - sw) / 2);
    const sy = Math.round((natH - sh) / 2);

    // Render the canvas at the size it actually occupies on screen.
    // The Airframe reel is enlarged by transforms on both the featured tile
    // and its media wrapper. offsetWidth only reports the pre-transform layout
    // size, which leaves the canvas too small and makes the browser upscale a
    // low-resolution bitmap. getBoundingClientRect() includes those transforms,
    // so the backing store now stays sharp at the final visual size.
    const core = coreRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const visualRect = core?.getBoundingClientRect();
    const visualWidth = visualRect?.width || core?.offsetWidth || sw;
    const displayW = Math.round(visualWidth * dpr);
    const w = Math.max(1, Math.min(displayW, 4096));
    const h = Math.max(1, Math.round((w / sw) * sh));

    const backingSizeChanged = canvas.width !== w || canvas.height !== h;
    if (backingSizeChanged) {
      canvas.width = w;
      canvas.height = h;
    }

    // Repaint when the CSS transform changes the visual size even if the
    // sequence is still on the same frame. Without this, frame 1 can remain
    // stuck at the tiny grid-tile resolution throughout the zoom-in.
    if (pick === drawnRef.current && !backingSizeChanged) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, w, h);

    const source = removeConnectedEdgeWhite(img, pick, sx, sy, sw, sh);
    if (source instanceof HTMLCanvasElement) {
      ctx.drawImage(source, 0, 0, sw, sh, 0, 0, w, h);
    } else {
      ctx.drawImage(source, sx, sy, sw, sh, 0, 0, w, h);
    }

    drawnRef.current = pick;
    if (!live) setLive(true);
  }, [frameCount, live, aspect, zoom, removeConnectedEdgeWhite]);

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
    processedFramesRef.current = new Array(frameCount).fill(null);
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

      <div
        className="plate__core"
        ref={coreRef}
        style={{
          position: "relative",
          aspectRatio: `${aspect}`,
          overflow: "hidden",
        }}
      >
        {still && (
          <img
            className="plate__still"
            src={still}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: live ? 0 : 1,
              visibility: live ? "hidden" : "visible",
              transition: "none",
              pointerEvents: "none",
              transform: `scale(${Math.max(1, zoom)})`,
              transformOrigin: "50% 50%",
              mixBlendMode: knockoutEdgeWhite ? "multiply" : undefined,
            }}
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
            // Once frame 1 has decoded, the still is fully removed rather than
            // left underneath. This matters for transparent frame sequences:
            // otherwise frame 1 remains visible as a frozen ghost in the background.
            data-live={live ? "true" : "false"}
            ref={canvasRef}
            role="img"
            aria-label={`${label}, scroll-driven sequence`}
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              width: "100%",
              height: "100%",
              opacity: live ? 1 : 0,
              transition: "none",
            }}
          />
        )}
      </div>
    </div>
  );
});

export default ScrollSequence;