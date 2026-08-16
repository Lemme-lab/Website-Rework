/* ------------------------------------------------------------------
   Light scheme tokens.

   Cool bench grey rather than warm cream — the page reads as anodised
   aluminium and datasheet paper, which is the subject's own material
   world. Mint survives in exactly one place: the terminal, because a
   terminal is a screen.
------------------------------------------------------------------- */
export const light = {
  /* surfaces, lightest last */
  paper: "#E8EBEE", // page ground
  plate: "#F5F7F8", // card core
  raised: "#FFFFFF", // pills, chips, controls

  /* type */
  ink: "#15181B", // 16.6:1 on plate
  inkSoft: "#5B646C", // 5.6:1
  inkFaint: "#5F686F", // 4.75:1 on paper, 5.3:1 on plate — safe at 9–11px

  /* structure */
  hair: "rgba(21,24,27,0.12)",
  hairSoft: "rgba(21,24,27,0.07)",

  /* accent — the old #12EFC8 deepened so it holds up on light */
  teal: "#0B6F5E", // 5.7:1
  tealDeep: "#084F44",
  tealWash: "rgba(11,111,94,0.07)",

  /* the one dark surface: the console. The original neon mint survives
     here and nowhere else — a screen is where a glowing colour belongs. */
  console: "#14171A",
  consoleBar: "#1B1F23",
  consoleEdge: "rgba(255,255,255,0.08)",
  consoleInk: "#C9D1D4",
  consoleBright: "#EDF1F2",
  consoleDim: "#7C8A91", // 5.1:1 on the console ground, 4.7:1 on its title bar
  consoleMint: "#4FD1B5",
  consoleWarn: "#E0A458",

  /* soft, diffused elevation — never a hard black drop shadow */
  lift: "0 20px 44px -30px rgba(21,24,27,0.5)",
  liftHover: "0 34px 60px -32px rgba(21,24,27,0.55)",
  inset: "inset 0 1px 0 rgba(255,255,255,0.95)",

  ease: "cubic-bezier(0.32,0.72,0,1)",
} as const;

export default light;
