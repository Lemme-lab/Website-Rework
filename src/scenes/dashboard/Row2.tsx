import { Box, Link, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

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
    image: "/Images/slider/airframe-smartwatch-hero.png",
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

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const Row2 = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const surroundingTiles = Array.from(
      track.querySelectorAll<HTMLElement>("[data-project-tile='surrounding']")
    );
    let frame = 0;

    const draw = () => {
      frame = 0;

      if (reducedMotion.matches) {
        track.style.setProperty("--center-scale", "1");
        track.style.setProperty("--surround-opacity", "1");
        track.style.setProperty("--center-copy-opacity", "1");
        track.style.setProperty("--handoff-opacity", "0");
        surroundingTiles.forEach((tile) =>
          tile.style.setProperty("--tile-transform", "translate3d(0, 0, 0)")
        );
        return;
      }

      const viewportHeight = window.innerHeight;
      const rect = track.getBoundingClientRect();
      const scrollDistance = Math.max(track.offsetHeight - viewportHeight, 1);
      const rawProgress = clamp(-rect.top / scrollDistance);
      const zoomProgress = clamp((rawProgress - 0.12) / 0.66);
      const eased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

      track.style.setProperty("--center-scale", (1 + eased * 2.045).toFixed(4));
      track.style.setProperty("--surround-opacity", (1 - eased * 0.965).toFixed(4));
      track.style.setProperty(
        "--center-copy-opacity",
        Math.max(0, 1 - eased * 2.35).toFixed(4)
      );
      track.style.setProperty(
        "--handoff-opacity",
        clamp((eased - 0.82) / 0.18).toFixed(4)
      );

      const driftUnitX = window.innerWidth * 0.045 * eased;
      const driftUnitY = viewportHeight * 0.045 * eased;
      surroundingTiles.forEach((tile) => {
        const x = Number(tile.dataset.driftX ?? 0) * driftUnitX;
        const y = Number(tile.dataset.driftY ?? 0) * driftUnitY;
        tile.style.setProperty(
          "--tile-transform",
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
        );
      });
    };

    const scheduleDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    scheduleDraw();
    window.addEventListener("scroll", scheduleDraw, { passive: true });
    window.addEventListener("resize", scheduleDraw);
    reducedMotion.addEventListener("change", scheduleDraw);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleDraw);
      window.removeEventListener("resize", scheduleDraw);
      reducedMotion.removeEventListener("change", scheduleDraw);
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
          <Box component="span" className="project-field__eyebrow">
            Selected work <span aria-hidden="true">/</span> 09 projects
          </Box>

          <Typography component="h2" id="work-heading" className="project-field__heading">
            Built across
            <br />
            the stack.
          </Typography>

          <Typography component="p" className="project-field__lede">
            Nine projects across three connected disciplines—from power electronics
            and physical systems to silicon and software.
          </Typography>
        </Box>

        <Box component="ol" className="project-field__categories" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <Box component="li" key={category.index} className="project-category">
              <Box component="span" className="project-category__index">
                {category.index}
              </Box>
              <Box>
                <Box component="span" className="project-category__name">
                  {category.name}
                </Box>
                <Box component="span" className="project-category__detail">
                  {category.detail}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="project-field__scroll-note" aria-hidden="true">
          <Box component="span">Scroll to focus Airframe</Box>
          <Box component="span" className="project-field__scroll-line" />
        </Box>
      </Box>

      <Box ref={trackRef} className="project-scroll-track">
        <Box className="project-stage">
          <Box component="ol" className="project-grid" aria-label="Selected projects">
            {PROJECTS.map((project, index) => {
              const indexLabel = String(index + 1).padStart(2, "0");
              return (
                <Box component="li" key={project.name} className="project-grid__item">
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-tile${project.featured ? " project-tile--featured" : ""}`}
                    data-project-tile={project.featured ? "featured" : "surrounding"}
                    data-drift-x={project.driftX}
                    data-drift-y={project.driftY}
                    aria-label={`Open ${project.name} project`}
                  >
                    <Box
                      component="img"
                      className={`project-tile__media ${project.imageClassName ?? ""}`}
                      src={project.image}
                      alt=""
                      loading={project.featured ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      sx={{
                        objectFit: project.imageFit ?? "cover",
                        objectPosition: project.imagePosition ?? "50% 50%",
                      }}
                    />

                    <Box className="project-tile__veil" aria-hidden="true" />

                    <Box className="project-tile__topline">
                      <Box component="span" className="project-tile__index">
                        {indexLabel}
                      </Box>
                      <Box component="span" className="project-tile__category">
                        {project.category}
                      </Box>
                      <Box component="span" className="project-tile__arrow" aria-hidden="true">
                        ↗
                      </Box>
                    </Box>

                    <Box className="project-tile__copy">
                      <Typography component="h3" className="project-tile__name">
                        {project.name}
                      </Typography>
                      <Box component="span" className="project-tile__subtheme">
                        {project.subtheme}
                      </Box>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>

          <Box className="project-stage__handoff" aria-hidden="true">
            <Box component="span">Airframe</Box>
            <Box component="span">Wearable computing / 2023</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Row2;
