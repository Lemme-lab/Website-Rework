import React from "react";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * Three things shape it, and each one fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it, all the way
 *    out. Spacing a straight z-range evenly instead makes the near
 *    cards tear apart from each other as the projection blows up.
 * 2. The rails open hard in the first stretch and then hold
 *    (`fan` > 1). That opening cancels the — still slow — growth back
 *    there, so the ribbon leaves the centre as a flat band, bends
 *    once, and only then runs out on the diagonal.
 * 3. Neither end of the loop is ever on screen. A card dies with its
 *    inner edge past 50cqw, and it is born *across* the axis
 *    (`railBirth` is negative), so the throat stays plugged.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the whole corridor keeps its proportions at any size.
 *
 * Ported to this codebase's stack: the original shipped as a shadcn
 * component with Tailwind classes and a `cn` helper. This project uses
 * MUI/emotion, so the utility classes became inline styles. The
 * geometry and keyframe maths are untouched.
 * ─────────────────────────────────────────────────────────────── */

export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 30 */
  perspective?: number;
  /** Card width in world units. @default 18 */
  cardWidth?: number;
  /** Card height in world units. @default 25 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.4 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 46 */
  exitHeight?: number;
  /** Lateral offset at birth. Negative starts the card across the axis. @default -11 */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 44 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.3 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant size
    // ratio and the ribbon stays solid at both ends.
    const scale =
      (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  /** Only used if you drop the decorative treatment; the corridor is aria-hidden. */
  alt?: string;
};

type StreamCardProps = {
  images: StreamImage[];
  initialImageIndex: number;
  imageStep: number;
  className: string;
  animationName: string;
  animationDelay: number;
  speed: number;
  axis: number;
  path: Required<CorridorPath>;
};

function StreamCard({
  images,
  initialImageIndex,
  imageStep,
  className,
  animationName,
  animationDelay,
  speed,
  axis,
  path,
}: StreamCardProps) {
  const imageCount = Math.max(images.length, 1);
  const [imageIndex, setImageIndex] = React.useState(initialImageIndex);

  React.useEffect(() => {
    setImageIndex(initialImageIndex % imageCount);
  }, [initialImageIndex, imageCount]);

  const img = images[imageIndex % imageCount];

  return (
    <div
      className={className}
      onAnimationIteration={() => {
        // The card is outside the frame when an iteration completes, so the
        // next image can be swapped in without a visible jump.
        setImageIndex((current) => (current + imageStep) % imageCount);
      }}
      style={{
        position: "absolute",
        overflow: "hidden",
        left: "50%",
        top: `${axis}%`,
        width: `${path.cardWidth}cqw`,
        height: `${path.cardHeight}cqw`,
        marginLeft: `${-path.cardWidth / 2}cqw`,
        marginTop: `${-path.cardHeight / 2}cqw`,
        borderRadius: `${path.cardRadius}cqw`,
        animation: `${animationName} ${speed}s linear infinite`,
        animationDelay: `${animationDelay}s`,
        backfaceVisibility: "hidden",
        background: "#090c0f",
      }}
    >
      {img ? (
        <img
          src={img.src}
          alt={img.alt ?? ""}
          loading="lazy"
          decoding="async"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
          draggable={false}
        />
      ) : null}
    </div>
  );
}

export type ImageStreamHeroProps = {
  /** Images distributed across both rails. */
  images: StreamImage[];
  /** Cards on each rail at once. @default 9 */
  cards?: number;
  /** Seconds for one card to travel the whole corridor. @default 18 */
  speed?: number;
  /** Vertical placement of the corridor's axis, as a percentage of height. @default 55 */
  axis?: number;
  /** Override any part of the corridor geometry. Merged over the defaults. */
  path?: CorridorPath;
  /** Content rendered above the corridor. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  style,
  className,
}: ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      // Pausing rather than disabling keeps the corridor whole: every card is
      // already dropped mid-flight by its negative delay, so it freezes as a
      // finished still instead of collapsing onto the axis.
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p]
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        containerType: "inline-size",
        ...style,
      }}
    >
      <style>{css}</style>
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {[right, left].map((name, railIndex) =>
            Array.from({ length: cards }, (_, i) => (
              <StreamCard
                key={`${name}-${i}`}
                images={images}
                initialImageIndex={railIndex * cards + i}
                imageStep={cards * 2}
                className={card}
                animationName={name}
                // Negative delay drops each card mid-flight, so the
                // corridor is already full on the first frame.
                animationDelay={-(i * speed) / cards}
                speed={speed}
                axis={axis}
                path={p}
              />
            ))
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default ImageStreamHero;
