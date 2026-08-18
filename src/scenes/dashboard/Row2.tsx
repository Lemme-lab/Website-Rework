import React, { useEffect, useRef } from "react";
import { Box, Link, Typography } from "@mui/material";

type Project = {
  name: string;
  category: string;
  subtheme: string;
  href: string;
  image: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageClassName?: string;
  featured?: boolean;
  driftX: number;
  driftY: number;
};

const frameSrc = (index: number) =>
  `/Images/reels/airframe/airframe_${String(index).padStart(4, "0")}.webp`;

/* Frame 1 doubles as the still: it is the grid tile, and it is what the
 * zoom hands over to. Same file both times, so the handover is invisible. */
const AIRFRAME_FIRST_FRAME = frameSrc(1);

const CATEGORIES = [
  { index: "01", name: "Electronics", detail: "Power · Signal · PCB" },
  { index: "02", name: "Product Systems", detail: "Robotics · Wearables · Test" },
  { index: "03", name: "Software + Compute", detail: "RTL · Edge AI · APIs · Tooling" },
];

const PROJECTS: Project[] = [
  {
    name: "ESC",
    category: "Electronics",
    subtheme: "Power electronics",
    href: "https://github.com/Lemme-lab",
    image: "/Images/slider/esc-render.webp",
    imagePosition: "50% 47%",
    driftX: -1,
    driftY: -1,
  },
  {
    name: "Project Wuldor",
    category: "Product systems",
    subtheme: "Robotics + motion",
    href: "https://github.com/Lemme-lab/Project-Wuldor",
    image: "/Images/slider/wuldor-full-arm.webp",
    driftX: 0,
    driftY: -1,
  },
  {
    name: "Verilog CPU",
    category: "Software + compute",
    subtheme: "RTL · FPGA · RISC",
    href: "https://github.com/Lemme-lab/Verilog-Simple-CPU",
    image: "/Images/chip.webp",
    imageFit: "contain",
    imageClassName: "project-tile__media--symbol",
    driftX: 1,
    driftY: -1,
  },
  {
    name: "Audio Amp",
    category: "Electronics",
    subtheme: "Analog + DSP",
    href: "https://github.com/Lemme-lab",
    image: "/Images/slider/audio-amplifier.webp",
    imagePosition: "52% 50%",
    driftX: -1,
    driftY: 0,
  },
  {
    name: "Airframe",
    category: "Product systems",
    subtheme: "Wearable computing",
    href: "https://github.com/Lemme-lab/Project-Airframe",

    /*
     * The grid tile IS frame 1 of the sequence, not a separate hero shot.
     * The handoff at the end of the zoom is then the same picture handing
     * over to itself, so there is no swap to see — and no colourway jump
     * between a white-and-steel press render and the black watch the
     * sequence actually animates.
     */
    image: AIRFRAME_FIRST_FRAME,

    imageFit: "contain",
    featured: true,
    driftX: 0,
    driftY: 0,
  },
  {
    name: "Face Transfer",
    category: "Software + compute",
    subtheme: "Computer vision · inference",
    href: "https://github.com/Lemme-lab/Face-Swap-AI",
    image: "/Images/tensorflow.webp",
    imageFit: "contain",
    imageClassName: "project-tile__media--symbol",
    driftX: 1,
    driftY: 0,
  },
  {
    name: "Dev Modules",
    category: "Electronics",
    subtheme: "PCB tooling",
    href: "https://github.com/Lemme-lab",
    image: "/Images/Dev-Modules.webp",
    driftX: -1,
    driftY: 1,
  },
  {
    name: "Cyclo Test Bench",
    category: "Product systems",
    subtheme: "Mechatronics + test",
    href: "https://github.com/Lemme-lab/Cyclo-Test-Bench-Diploma-Thesis",
    image: "/Images/slider/cyclo-test-bench.webp",
    driftX: 0,
    driftY: 1,
  },
  {
    name: "MLDP",
    category: "Software + compute",
    subtheme: "Edge ML · deployment",
    href: "https://github.com/Lemme-lab",
    image: "/Images/network.webp",
    imageFit: "contain",
    imageClassName: "project-tile__media--symbol",
    driftX: 1,
    driftY: 1,
  },
];

const AIRFRAME = {
  discipline: "Hardware + product",
  name: "Airframe",
  kicker: "Smartwatch",
  body:
    "Concept through to working hardware, with the enclosure, electronics, firmware and companion software developed as one connected system. The sequence moves from the finished wearable into the engineering underneath it.",
  spec: [
    ["Enclosure", "Industrial design"],
    ["Board", "PCB + power"],
    ["Device", "Firmware"],
    ["Phone", "Companion app"],
  ] as [string, string][],
};


/* Frames are `/Images/reels/airframe/airframe_0001…0288.webp`, converted
 * from the 800×800 renders. All 288 frames are scrubbed across an extended
 * runway. The focused Airframe stage now fades to white; the featured image
 * keeps a soft mask during the handoff so the frame boundary blends
 * into a fully white Airframe section rather than ending as a hard rectangle.
 *
 * The old handoff went hero → transparent cutout → sequence, across three
 * different pictures of the watch — and two of them the wrong colourway.
 * The grid tile is now frame 1 itself, so there is only ever one image and
 * the handover cannot mismatch. */
const AIRFRAME_FRAME_COUNT = 288;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const smooth = (value: number, start: number, end: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const Row2 = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const airframeImageRef = useRef<HTMLImageElement | null>(null);

  /*
   * Sequence state is refs only. Nothing causes a React render while scrolling.
   */
  const currentFrameRef = useRef(-1);
  const requestedFrameRef = useRef(-1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const surroundingTiles = Array.from(
      track.querySelectorAll<HTMLElement>("[data-project-tile='surrounding']"),
    );

    let raf = 0;

    /*
     * Warm the sequence into the HTTP cache before it is needed.
     *
     * Frames are fetched on demand below, which is fine on a second pass
     * but means the first scrub races the network frame by frame. Over 288
     * frames that reads as the animation sticking. So once the track is
     * within a viewport of the screen, pull the frames in order, a few at
     * a time — by the time the zoom has finished the opening of the
     * sequence is already local. `showFrame` still guards on decode, so
     * this only ever changes how quickly it has something to show.
     */
    let cancelled = false;
    let warming = false;

    const warmFrom = (start: number) => {
      if (cancelled || start > AIRFRAME_FRAME_COUNT) return;

      const end = Math.min(start + 6, AIRFRAME_FRAME_COUNT + 1);
      let settled = 0;

      const step = () => {
        if (++settled === end - start) warmFrom(end);
      };

      for (let i = start; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.onload = step;
        img.onerror = step;
        img.src = frameSrc(i);
      }
    };

    const warmObserver = new IntersectionObserver(
      (entries) => {
        if (warming || !entries.some((e) => e.isIntersecting)) return;
        warming = true;
        warmObserver.disconnect();
        warmFrom(1);
      },
      { rootMargin: "100% 0px" },
    );

    warmObserver.observe(track);

    const showFrame = (frameIndex: number) => {
      const image = airframeImageRef.current;
      if (!image) return;

      /*
       * Frame -1  = original grid hero.
       * Frame 1..N = the rendered sequence.
       */
      if (frameIndex < 1) {
        requestedFrameRef.current = -1;
        currentFrameRef.current = -1;

        if (!image.src.endsWith(AIRFRAME_FIRST_FRAME)) {
          image.src = AIRFRAME_FIRST_FRAME;
        }

        return;
      }

      if (
        frameIndex === currentFrameRef.current ||
        frameIndex === requestedFrameRef.current
      ) {
        return;
      }

      const src = frameSrc(frameIndex);

      requestedFrameRef.current = frameIndex;

      /*
       * Critical:
       * never point the visible <img> at a URL until it has loaded.
       * Missing future renders therefore leave the last good frame visible.
       */
      const preload = new Image();
      preload.decoding = "async";

      preload.onload = () => {
        if (requestedFrameRef.current !== frameIndex) return;

        image.src = src;
        currentFrameRef.current = frameIndex;
        requestedFrameRef.current = -1;
      };

      preload.onerror = () => {
        if (requestedFrameRef.current === frameIndex) {
          requestedFrameRef.current = -1;
        }
      };

      preload.src = src;
    };

    const draw = () => {
      raf = 0;

      if (reducedMotion.matches) {
        track.style.setProperty("--center-scale", "1");
        track.style.setProperty("--surround-opacity", "1");
        track.style.setProperty("--center-copy-opacity", "1");

        track.style.setProperty("--airframe-bg-opacity", "0");
        track.style.setProperty("--airframe-white-opacity", "0");
        track.style.setProperty("--airframe-mask-size", "300%");
        track.style.setProperty("--airframe-mask-solid", "100%");
        track.style.setProperty("--airframe-copy-opacity", "0");
        track.style.setProperty("--airframe-copy-y", "36px");
        track.style.setProperty("--airframe-feature-veil-opacity", "1");
        track.style.setProperty("--airframe-mask-hold", "100%");
        track.style.setProperty("--airframe-mask-end", "100%");
        track.style.setProperty("--airframe-art-x", "0%");

        showFrame(-1);

        surroundingTiles.forEach((tile) => {
          tile.style.setProperty(
            "--tile-transform",
            "translate3d(0, 0, 0)",
          );
        });

        return;
      }

      const viewportHeight = window.innerHeight;
      const rect = track.getBoundingClientRect();
      const scrollDistance = Math.max(
        track.offsetHeight - viewportHeight,
        1,
      );

      const p = clamp(-rect.top / scrollDistance);

      /*
       * GRID TIMING.
       *
       * Finish the grid-to-Airframe zoom earlier so the 288-frame watch
       * sequence gets most of the tall runway. This makes each frame occupy
       * more physical scroll distance and gives the scrub a much smoother,
       * slower feel instead of compressing all 288 frames into the back half.
       */
      const zoomProgress = clamp((p - 0.06) / 0.28);
      const zoom =
        zoomProgress *
        zoomProgress *
        (3 - 2 * zoomProgress);

      track.style.setProperty(
        "--center-scale",
        (1 + zoom * 2.045).toFixed(4),
      );

      track.style.setProperty(
        "--surround-opacity",
        (1 - zoom * 0.965).toFixed(4),
      );

      track.style.setProperty(
        "--center-copy-opacity",
        Math.max(0, 1 - zoom * 2.35).toFixed(4),
      );

      const driftUnitX =
        window.innerWidth * 0.045 * zoom;

      const driftUnitY =
        viewportHeight * 0.045 * zoom;

      surroundingTiles.forEach((tile) => {
        const x =
          Number(tile.dataset.driftX ?? 0) *
          driftUnitX;

        const y =
          Number(tile.dataset.driftY ?? 0) *
          driftUnitY;

        tile.style.setProperty(
          "--tile-transform",
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`,
        );
      });

      /*
       * Do NOT touch the Airframe source during the grid/zoom.
       *
       * The original hero stays visible until the zoom has essentially
       * reached its final camera position.
       */
      if (p < 0.36) {
        showFrame(-1);
      } else {
        /*
         * Use almost two thirds of the much taller track for the sequence.
         * AIRFRAME_FRAME_COUNT is 288, so the full render set is addressed
         * from frame 1 through frame 288 with substantially more scroll room.
         */
        const sequenceProgress = clamp((p - 0.36) / 0.62);

        const sequenceFrame =
          1 +
          Math.round(
            sequenceProgress *
              (AIRFRAME_FRAME_COUNT - 1),
          );

        showFrame(sequenceFrame);
      }

      /*
       * Website-only background comes in at the same time as frame 0.
       *
       * This layer is NOT applied to .project-grid and does not change
       * the grid's layout/positioning.
       */
      /* Bring a full white stage in just before the frame sequence begins,
       * so transparent frames read against white everywhere, not just behind the copy. */
      const bg = smooth(p, 0.30, 0.36);
      const white = 0;

      track.style.setProperty(
        "--airframe-bg-opacity",
        bg.toFixed(4),
      );

      /* Inert at 300%/100%, feathered at 64%/28% — see the mask on the
       * featured tile's image. */
      track.style.setProperty(
        "--airframe-mask-size",
        `${(300 - bg * 236).toFixed(1)}%`,
      );

      track.style.setProperty(
        "--airframe-mask-solid",
        `${(100 - bg * 72).toFixed(1)}%`,
      );

      track.style.setProperty(
        "--airframe-white-opacity",
        white.toFixed(4),
      );

      /* The grid tile has its own dark veil for legibility. Once Airframe
       * becomes the focused reel that veil must disappear, otherwise it
       * tints the entire enlarged frame grey. */
      track.style.setProperty(
        "--airframe-feature-veil-opacity",
        (1 - bg).toFixed(4),
      );

      /*
       * Only once the animation is underway:
       * move the visual left and reveal the matching project copy on the right.
       * Finish the reveal quickly so the text is never left half-transparent.
       */
      const copy = smooth(p, 0.43, 0.50);

      track.style.setProperty(
        "--airframe-copy-opacity",
        copy.toFixed(4),
      );

      track.style.setProperty(
        "--airframe-copy-y",
        `${((1 - copy) * 28).toFixed(2)}px`,
      );

      /* Fade the right side of the opaque frame away before it reaches the
       * copy. At rest both stops are 100%, so the 3x3 tile is unchanged. */
      track.style.setProperty(
        "--airframe-mask-hold",
        `${(100 - copy * 48).toFixed(1)}%`,
      );
      track.style.setProperty(
        "--airframe-mask-end",
        `${(100 - copy * 30).toFixed(1)}%`,
      );

      track.style.setProperty(
        "--airframe-art-x",
        `${(-20 * copy).toFixed(2)}%`,
      );
    };

    const schedule = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    schedule();

    window.addEventListener("scroll", schedule, {
      passive: true,
    });

    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }

      cancelled = true;
      warmObserver.disconnect();

      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <Box
      component="section"
      id="e"
      className="project-field"
      aria-labelledby="work-heading"
    >
      <Box className="project-field__intro">
        <Box className="project-field__intro-copy">
          <Box
            component="span"
            className="project-field__eyebrow"
          >
            Selected work{" "}
            <span aria-hidden="true">/</span>{" "}
            09 projects
          </Box>

          <Typography
            component="h2"
            id="work-heading"
            className="project-field__heading"
          >
            Built across
            <br />
            the stack.
          </Typography>

          <Typography
            component="p"
            className="project-field__lede"
          >
            Nine projects across three connected
            disciplines—from power electronics and
            physical systems to silicon and software.
          </Typography>
        </Box>

        <Box
          component="ol"
          className="project-field__categories"
          aria-label="Project categories"
        >
          {CATEGORIES.map((category) => (
            <Box
              component="li"
              key={category.index}
              className="project-category"
            >
              <Box
                component="span"
                className="project-category__index"
              >
                {category.index}
              </Box>

              <Box>
                <Box
                  component="span"
                  className="project-category__name"
                >
                  {category.name}
                </Box>

                <Box
                  component="span"
                  className="project-category__detail"
                >
                  {category.detail}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          className="project-field__scroll-note"
          aria-hidden="true"
        >
          <Box component="span">
            Scroll to focus Airframe
          </Box>

          <Box
            component="span"
            className="project-field__scroll-line"
          />
        </Box>
      </Box>

      {/*
       * DO NOT add sx position/layout overrides to these three elements.
       *
       * These are deliberately identical to your ORIGINAL Row2 because
       * your existing CSS owns the pinned 3x3 project layout.
       */}
      <Box
        ref={trackRef}
        className="project-scroll-track"
        sx={{
          /* A taller runway gives all 288 watch frames enough scroll distance
           * to read as a detailed sequence rather than a fast frame dump. */
          minHeight: {
            xs: "680vh",
            md: "820vh",
          },
        }}
      >
        <Box className="project-stage">

          {/*
           * Background is an ordinary absolute sibling.
           * No z-index/position overrides are applied to project-grid itself.
           *
           * It is inserted BEFORE the grid, so the original grid paints over it.
           */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity:
                "var(--airframe-bg-opacity, 0)",
              /* The focused watch section now fades onto a clean white
               * stage. The image mask below softly feathers the rendered
               * frame edges into this background. */
              background: "#fff",
              willChange: "opacity",
            }}
          />

          {/*
           * THIS PROJECT-GRID MARKUP IS THE ORIGINAL MARKUP.
           * No sx. No position override. No z-index override.
           */}
          <Box
            component="ol"
            className="project-grid"
            aria-label="Selected projects"
          >
            {PROJECTS.map((project, index) => {
              const indexLabel = String(
                index + 1,
              ).padStart(2, "0");

              return (
                <Box
                  component="li"
                  key={project.name}
                  className="project-grid__item"
                >
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-tile${
                      project.featured
                        ? " project-tile--featured"
                        : ""
                    }`}
                    data-project-tile={
                      project.featured
                        ? "featured"
                        : "surrounding"
                    }
                    data-drift-x={project.driftX}
                    data-drift-y={project.driftY}
                    aria-label={`Open ${project.name} project`}
                    sx={
                      project.featured
                        ? {
                            background: "#fff",
                          }
                        : undefined
                    }
                  >
                    <Box
                      component="img"
                      ref={
                        project.featured
                          ? airframeImageRef
                          : undefined
                      }
                      className={`project-tile__media ${
                        project.imageClassName ?? ""
                      }`}
                      src={project.image}
                      alt=""
                      loading={
                        project.featured
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                      draggable={false}
                      sx={{
                        objectFit:
                          project.imageFit ??
                          "cover",

                        objectPosition:
                          project.imagePosition ??
                          "50% 50%",

                        /*
                         * This is the ONLY extra transform.
                         * It doesn't affect the grid geometry.
                         */
                        ...(project.featured
                          ? {
                              transform:
                                "translate3d(var(--airframe-art-x, 0%), 0, 0)",
                              willChange:
                                "transform",

                              /*
                               * Feather the frame into the white watch stage.
                               *
                               * The sequence opens on a lit environment —
                               * rock and smoke on a grey falloff — and only
                               * later drops to pure black. Unmasked, those
                               * opening frames meet the black stage as a
                               * hard square edge against the section.
                               *
                               * The two custom properties are driven from
                               * the same value as the stage transition, and at rest
                               * (300% / 100%) the gradient is opaque past
                               * every corner — so this is inert while the
                               * tile is still part of the 3x3 grid and only
                               * bites as the white Airframe stage takes over.
                               */
                              maskImage:
                                "linear-gradient(90deg, #000 0%, #000 var(--airframe-mask-hold, 100%), transparent var(--airframe-mask-end, 100%), transparent 100%)",
                              WebkitMaskImage:
                                "linear-gradient(90deg, #000 0%, #000 var(--airframe-mask-hold, 100%), transparent var(--airframe-mask-end, 100%), transparent 100%)",
                            }
                          : undefined),
                      }}
                    />

                    <Box
                      className="project-tile__veil"
                      aria-hidden="true"
                      sx={
                        project.featured
                          ? {
                              opacity:
                                "var(--airframe-feature-veil-opacity, 1)",
                              willChange: "opacity",
                            }
                          : undefined
                      }
                    />

                    <Box className="project-tile__topline">
                      <Box
                        component="span"
                        className="project-tile__index"
                      >
                        {indexLabel}
                      </Box>

                      <Box
                        component="span"
                        className="project-tile__category"
                      >
                        {project.category}
                      </Box>

                      <Box
                        component="span"
                        className="project-tile__arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </Box>
                    </Box>

                    <Box className="project-tile__copy">
                      <Typography
                        component="h3"
                        className="project-tile__name"
                      >
                        {project.name}
                      </Typography>

                      <Box
                        component="span"
                        className="project-tile__subtheme"
                      >
                        {project.subtheme}
                      </Box>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>

          {/*
           * Side copy.
           *
           * This does not participate in the grid layout.
           * It is invisible until the watch animation is underway.
           */}
          <Box
            aria-label="Airframe project details"
            sx={{
              position: "absolute",
              zIndex: 20,
              top: "50%",
              right: {
                xs: "1rem",
                sm: "2rem",
                md: "clamp(3rem, 6vw, 7rem)",
              },
              width: {
                xs: "calc(100% - 2rem)",
                sm: "min(42vw, 470px)",
                md: "min(34vw, 500px)",
              },

              opacity:
                "var(--airframe-copy-opacity, 0)",

              transform:
                "translate3d(0, calc(-50% + var(--airframe-copy-y, 36px)), 0)",

              pointerEvents: "none",
              /* Dark copy on the white Airframe stage. */
              color: "#17181B",
              willChange:
                "opacity, transform",

              "& .airframe-side__discipline": {
                display: "block",
                mb: ".75rem",
                color: "#4e5660",
                fontFamily:
                  '"IBM Plex Mono", monospace',
                fontSize: ".72rem",
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              },

              "& .airframe-side__name": {
                m: 0,
                color: "#17181B",
                fontSize:
                  "clamp(3rem, 5.2vw, 5.6rem)",
                fontWeight: 650,
                lineHeight: .94,
                letterSpacing: "-.055em",
              },

              "& .airframe-side__kicker": {
                display: "block",
                mt: ".95rem",
                color: "#1f2328",
                fontSize:
                  "clamp(1rem, 1.35vw, 1.2rem)",
                fontWeight: 650,
                lineHeight: 1.35,
              },

              "& .airframe-side__body": {
                mt: "1.25rem",
                mb: "1.5rem",
                maxWidth: "44ch",
                color: "#3f454d",
                fontSize:
                  "clamp(.9rem, 1.05vw, 1rem)",
                lineHeight: 1.65,
              },

              "& .airframe-side__spec": {
                m: 0,
                pt: "1rem",
                display: "grid",
                gridTemplateColumns:
                  "auto 1fr",
                columnGap: "1.4rem",
                rowGap: ".58rem",
                borderTop:
                  "1px solid rgba(23,24,27,.16)",
                fontSize: ".78rem",
                lineHeight: 1.45,

                "& dt": {
                  m: 0,
                  color: "#59616b",
                  fontFamily:
                    '"IBM Plex Mono", monospace',
                },

                "& dd": {
                  m: 0,
                  color: "#17191d",
                },
              },

              "@media (max-width: 700px)": {
                top: "auto",
                left: "1rem",
                right: "1rem",
                bottom: "1rem",
                width: "auto",
                p: "1rem 1.1rem",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,.94)",
                boxShadow:
                  "0 18px 55px rgba(18,18,22,.16)",
                backdropFilter: "blur(14px)",
                transform:
                  "translate3d(0, var(--airframe-copy-y, 36px), 0)",

                "& .airframe-side__name": {
                  fontSize:
                    "clamp(2rem, 11vw, 3rem)",
                },

                "& .airframe-side__body, & .airframe-side__spec":
                  {
                    display: "none",
                  },
              },
            }}
          >
            <Box
              component="span"
              className="airframe-side__discipline"
            >
              {AIRFRAME.discipline}
            </Box>

            <Typography
              component="h3"
              className="airframe-side__name"
            >
              {AIRFRAME.name}
            </Typography>

            <Box
              component="span"
              className="airframe-side__kicker"
            >
              {AIRFRAME.kicker}
            </Box>

            <Typography
              component="p"
              className="airframe-side__body"
            >
              {AIRFRAME.body}
            </Typography>

            <Box
              component="dl"
              className="airframe-side__spec"
            >
              {AIRFRAME.spec.map(
                ([term, detail]) => (
                  <React.Fragment key={term}>
                    <Box component="dt">
                      {term}
                    </Box>

                    <Box component="dd">
                      {detail}
                    </Box>
                  </React.Fragment>
                ),
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Row2;