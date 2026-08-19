import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { light } from "@/palette";

/* ------------------------------------------------------------------
   Console — LEMME presented as an end-to-end product engineering service.

   The terminal focuses on what a client can engage LEMME to do: define,
   build, validate and deliver complete technical products. The copy keeps
   the engineering character while avoiding a CV-style list of technologies.
------------------------------------------------------------------- */

type Tone = "dim" | "base" | "bright" | "ok" | "warn" | "mint";

type Line = {
  ts?: string; // kernel timestamp; absent for shell lines
  tag?: string;
  segs: [string, Tone?][];
  pause?: number; // extra ms before the next line
};

const check = (ts: string, tag: string, detail: string): Line => ({
  ts,
  tag,
  segs: [["PASS  ", "ok"], [detail, "dim"]],
});

/* Lines are intentionally short so every row stays on one line. Below 360px
   the renderer drops timestamps but keeps subsystem tags and results. */
const LOG: Line[] = [
  { segs: [["lemme@core", "mint"], [":~$ ", "dim"], ["init --profile product-engineering", "bright"]], pause: 420 },
  { segs: [["engineering service online / concept-to-delivery", "dim"]], pause: 280 },
  { segs: [["", "dim"]] },

  { ts: "0.000", tag: "IDENT", segs: [["LEMME / PRODUCT ENGINEERING", "bright"]] },
  { ts: "0.014", tag: "FOUNDER", segs: [["LUCAS LENARCIC / INDEPENDENT ENGINEER", "bright"]] },
  { ts: "0.028", tag: "SERVICE", segs: [["END-TO-END PRODUCT DEVELOPMENT", "mint"]] },

  { ts: "0.041", tag: "SCOPE", segs: [["project delivery pipeline ready", "base"]], pause: 130 },
  check("0.058", "DEFINE", "REQUIREMENTS / FEASIBILITY / SYSTEM PLAN"),
  check("0.075", "BUILD", "PROTOTYPE / INTEGRATION / ITERATION"),
  check("0.092", "VALIDATE", "TESTING / REFINEMENT / RELIABILITY"),
  check("0.109", "DELIVER", "DOCUMENTATION / HANDOVER / DEPLOYMENT"),
  check("0.126", "SUPPORT", "INTEGRATION / IMPROVEMENT / FOLLOW-THROUGH"),

  { ts: "0.153", tag: "PROCESS", segs: [["BRIEF > BUILD > VALIDATE > DELIVER", "bright"]], pause: 100 },
  { ts: "0.175", tag: "OWNERSHIP", segs: [["ONE ENGINEER / FULL PROJECT CONTEXT", "mint"]] },
  { ts: "0.198", tag: "APPROACH", segs: [["COMPLETE SYSTEMS / PRACTICAL EXECUTION", "bright"]] },
  { ts: "0.221", tag: "PROOF", segs: [["LARGE-SCALE / AWARD-RECOGNIZED WORK", "bright"]], pause: 100 },
  { ts: "0.244", tag: "ENGAGE", segs: [["SELECT PROJECTS / DIRECT COLLABORATION", "dim"]] },
  { ts: "0.267", tag: "CONTACT", segs: [["lucas.lenarcic@gmail.com", "bright"]], pause: 180 },
  { ts: "0.290", tag: "READY", segs: [["NEW PROJECT INTAKE OPEN", "mint"]], pause: 300 },

  { segs: [["lemme@core", "mint"], [":", "dim"], ["~", "base"], ["$ ", "dim"]] },
];

const toneColor: Record<Tone, string> = {
  dim: light.consoleDim,
  base: light.consoleInk,
  bright: light.consoleBright,
  ok: light.consoleMint,
  warn: light.consoleWarn,
  mint: light.consoleMint,
};

const Console = () => {
  const [shown, setShown] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  /* Play the log once, when it actually comes into view. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(LOG.length);
      return;
    }

    const step = (i: number) => {
      setShown(i + 1);
      if (i + 1 >= LOG.length) return;
      const delay = 58 + Math.round(Math.random() * 34) + (LOG[i].pause ?? 0);
      timer.current = window.setTimeout(() => step(i + 1), delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          io.disconnect();
          timer.current = window.setTimeout(() => step(0), 260);
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timer.current);
    };
  }, []);

  /* keep the newest line in view while the log fills */
  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [shown]);

  const done = shown >= LOG.length;

  return (
    <Box
      ref={rootRef}
      className="serial-console"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: 0,
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: light.console,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {/* title bar */}
      <Box
        sx={{
          flex: "0 0 auto",
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 1fr) auto",
          alignItems: "center",
          gap: { xs: "0.65rem", sm: "1rem" },
          px: { xs: "0.8rem", sm: "1rem" },
          py: "0.72rem",
          backgroundColor: light.consoleBar,
          borderBottom: `1px solid ${light.consoleEdge}`,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: { xs: "8px", sm: "9px" },
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: light.consoleDim,
          whiteSpace: "nowrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.28rem" }} aria-hidden="true">
            {["#f0b45d", "#7d8790", light.consoleMint].map((color) => (
              <Box
                key={color}
                sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color }}
              />
            ))}
          </Box>
          <Box component="span" sx={{ color: light.consoleInk }}>
            LEMME / ENGINEERING SERVICES
          </Box>
        </Box>

        <Box
          component="span"
          sx={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            display: { xs: "none", sm: "block" },
          }}
        >
          /dev/ttyUSB0 · 115200 8N1
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "999px",
              backgroundColor: light.consoleMint,
              boxShadow: `0 0 8px ${light.consoleMint}`,
            }}
          />
          online
        </Box>
      </Box>

      {/* log */}
      <Box
        ref={bodyRef}
        className="serial-console__body"
        aria-label="LEMME product engineering service: project definition, development, validation, delivery and contact"
        aria-live="off"
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          px: { xs: "0.72rem", sm: "0.9rem", md: "1.1rem" },
          py: { xs: "0.85rem", sm: "1rem" },
          textAlign: "left",
          fontFamily: '"IBM Plex Mono", monospace',
          fontVariantNumeric: "tabular-nums",
          display: "flex",
          flexDirection: "column",
          fontSize: "clamp(0.54rem, 1vw, 0.7rem)",
          lineHeight: { xs: 1.72, sm: 1.82, md: 1.9 },
          color: light.consoleInk,
          whiteSpace: "nowrap",
          overflowWrap: "normal",
          overflowX: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: 6, height: 6 },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.12)",
            borderRadius: 999,
          },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "@media (max-width: 359px)": {
            fontSize: "0.5rem",
          },
        }}
      >
        {LOG.slice(0, shown).map((line, i) => (
          <Box
            key={i}
            component="div"
            sx={{
              display: "grid",
              gridTemplateColumns: line.ts
                ? "8ch 9.5ch minmax(0, 1fr)"
                : "minmax(0, 1fr)",
              columnGap: line.ts ? "0.8ch" : 0,
              minWidth: 0,
              minHeight: "1.65em",
              "@media (max-width: 359px)": {
                gridTemplateColumns: line.ts
                  ? "8.5ch minmax(0, 1fr)"
                  : "minmax(0, 1fr)",
              },
            }}
          >
            {line.ts && (
              <Box
                component="span"
                sx={{
                  color: light.consoleDim,
                  "@media (max-width: 359px)": { display: "none" },
                }}
              >
                {`[${line.ts.padStart(6)}]`}
              </Box>
            )}
            {line.tag && (
              <Box
                component="span"
                sx={{ color: line.tag === "READY" || line.tag === "STATUS" ? light.consoleMint : light.consoleInk }}
              >
                {line.tag}
              </Box>
            )}
            <Box component="span" sx={{ minWidth: 0 }}>
              {line.segs.map(([text, tone], j) => (
                <Box
                  key={j}
                  component="span"
                  sx={{ color: toneColor[tone ?? "base"] }}
                >
                  {text}
                </Box>
              ))}
              {i === shown - 1 && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "0.55em",
                    height: "1.05em",
                    verticalAlign: "-0.18em",
                    ml: "0.1em",
                    backgroundColor: done ? light.consoleMint : light.consoleInk,
                    animation: done ? "lemmeBlink 1.1s steps(1) infinite" : "none",
                    "@keyframes lemmeBlink": {
                      "0%, 50%": { opacity: 1 },
                      "50.01%, 100%": { opacity: 0 },
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Console;