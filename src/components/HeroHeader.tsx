import { Box, Link, Typography } from "@mui/material";
import { SOCIALS, StrokeIcon } from "@/components/Socials";

const YELLOW = "#f3c400";
const WHITE = "#f7f7f4";

const NAV_ITEMS = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Work", target: "e" },
  { label: "Contact", target: "v" },
];

const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
  event.preventDefault();
  document.getElementById(target)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
};

const HeroHeader = () => (
  <Box
    component="section"
    id="home"
    className="portfolio-hero"
    aria-labelledby="hero-heading"
    sx={{
      position: "relative",
      isolation: "isolate",
      width: "100%",
      minHeight: { xs: "max(720px, 100svh)", md: "max(680px, 100svh)" },
      overflow: "clip",
      backgroundColor: "#050505",
      color: WHITE,
    }}
  >
    <Box
      component="nav"
      aria-label="Primary navigation"
      sx={{
        position: "absolute",
        zIndex: 6,
        top: 0,
        left: 0,
        width: "100%",
        minHeight: { xs: "4.75rem", md: "6.75rem" },
        px: { xs: "1rem", sm: "2rem", md: "clamp(2.5rem, 3.25vw, 4rem)" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Link
        href="#home"
        onClick={(event) => scrollTo(event, "home")}
        aria-label="Back to the top"
        sx={{
          flexShrink: 0,
          color: WHITE,
          fontSize: { xs: "0.9rem", md: "1.05rem" },
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.28em",
          textDecoration: "none",
          textTransform: "uppercase",
          transition: "color 240ms ease",
          "&:hover": { color: YELLOW },
          "&:focus-visible": {
            outline: `2px solid ${YELLOW}`,
            outlineOffset: "6px",
            borderRadius: "2px",
          },
        }}
      >
        Lemme
      </Link>

      <Box
        component="ul"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: { xs: "0.05rem", sm: "0.55rem", md: "1.3rem" },
          m: 0,
          p: 0,
          listStyle: "none",
          minWidth: 0,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Box component="li" key={item.target}>
            <Link
              href={`#${item.target}`}
              onClick={(event) => scrollTo(event, item.target)}
              sx={{
                minHeight: "44px",
                px: { xs: "0.38rem", sm: "0.6rem" },
                display: "inline-flex",
                alignItems: "center",
                color: "rgba(247,247,244,0.7)",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: { xs: "0.55rem", sm: "0.65rem", md: "0.72rem" },
                fontWeight: 500,
                letterSpacing: { xs: "0.08em", sm: "0.14em" },
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 240ms ease, transform 240ms ease",
                "&:hover": { color: WHITE, transform: "translateY(-1px)" },
                "&:focus-visible": {
                  outline: `2px solid ${YELLOW}`,
                  outlineOffset: "2px",
                  borderRadius: "2px",
                },
              }}
            >
              {item.label}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>

    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        zIndex: 1,
        left: { xs: "50%", sm: "49%" },
        top: { xs: "56%", sm: "53%", lg: "52%" },
        width: {
          xs: "min(88vw, 430px)",
          sm: "min(54vw, 520px)",
          lg: "clamp(430px, 42vw, 640px)",
        },
        aspectRatio: "1",
        borderRadius: "50%",
        backgroundColor: YELLOW,
        transform: "translate(-50%, -50%)",
      }}
    />

    <Box
      className="hero-portrait-wrap"
      aria-hidden="true"
      sx={{
        position: "absolute",
        zIndex: 2,
        left: { xs: "53%", sm: "50%", lg: "47.5%" },
        bottom: 0,
        height: {
          xs: "min(69svh, 660px)",
          sm: "min(84svh, 800px)",
          md: "min(94svh, 880px)",
          xl: "min(96svh, 930px)",
        },
        aspectRatio: "1086 / 1448",
        transformOrigin: "center bottom",
        pointerEvents: "none",
      }}
    >
      <Box
        component="img"
        src="/Images/lucas-hero.png"
        alt=""
        width={1086}
        height={1448}
        loading="eager"
        decoding="async"
        draggable={false}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center bottom",
          filter: "grayscale(1) contrast(1.09) brightness(0.92)",
        }}
      />
    </Box>

    <Typography
      component="h1"
      id="hero-heading"
      aria-label="Ideas made real."
      sx={{
        position: "absolute",
        zIndex: 4,
        top: { xs: "13.5%", sm: "22%", md: "24%" },
        left: { xs: "50%", sm: "auto" },
        right: { xs: "auto", sm: "clamp(1.5rem, 3vw, 3.5rem)" },
        width: { xs: "calc(100% - 2rem)", sm: "clamp(285px, 38vw, 520px)", lg: "clamp(340px, 34vw, 540px)" },
        m: 0,
        color: WHITE,
        fontSize: {
          xs: "clamp(3.55rem, 16.5vw, 5.2rem)",
          sm: "clamp(4rem, 9vw, 6.6rem)",
          lg: "clamp(6.3rem, 10.6vw, 9.75rem)",
        },
        fontWeight: 700,
        lineHeight: 0.86,
        letterSpacing: "-0.065em",
        textAlign: "center",
        transform: { xs: "translateX(-50%)", sm: "none" },
        textWrap: "balance",
        pointerEvents: "none",
      }}
    >
      {[
        ["ideas", "620ms"],
        ["made", "700ms"],
        ["real.", "780ms"],
      ].map(([line, delay]) => (
        <Box
          component="span"
          className="hero-headline-line"
          key={line}
          sx={{ display: "block", animationDelay: delay }}
        >
          {line}
        </Box>
      ))}
    </Typography>

    <Box
      className="hero-support"
      sx={{
        position: "absolute",
        zIndex: 4,
        left: { xs: "1rem", sm: "2rem", md: "clamp(2.5rem, 3.25vw, 4rem)" },
        top: { xs: "auto", sm: "43%", md: "45%" },
        bottom: { xs: "5.9rem", sm: "auto" },
        width: { xs: "min(62vw, 15rem)", sm: "clamp(190px, 24vw, 285px)" },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "block",
          mb: { xs: "0.5rem", md: "0.8rem" },
          color: YELLOW,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: { xs: "0.62rem", md: "0.72rem" },
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Lucas Lenarcic
      </Box>
      <Typography
        component="p"
        sx={{
          m: 0,
          mb: { xs: "0.65rem", md: "1.1rem" },
          color: "rgba(247,247,244,0.76)",
          fontSize: { xs: "0.78rem", sm: "0.9rem", md: "1rem" },
          lineHeight: { xs: 1.5, md: 1.6 },
        }}
      >
        I build hardware and software together—turning early concepts into working prototypes.
      </Typography>
      <Link
        href="#e"
        onClick={(event) => scrollTo(event, "e")}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: WHITE,
          fontSize: { xs: "0.78rem", md: "0.88rem" },
          fontWeight: 600,
          textUnderlineOffset: "0.28em",
          textDecorationThickness: "1px",
          "&:hover": { color: YELLOW },
          "&:focus-visible": {
            outline: `2px solid ${YELLOW}`,
            outlineOffset: "4px",
            borderRadius: "2px",
          },
        }}
      >
        Explore selected work <Box component="span" aria-hidden="true">↗</Box>
      </Link>
    </Box>

    <Box
      aria-hidden="true"
      sx={{
        display: { xs: "block", sm: "none" },
        position: "absolute",
        zIndex: 3,
        inset: "42% 0 0",
        background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.04) 44%, rgba(5,5,5,0.82) 100%)",
        pointerEvents: "none",
      }}
    />

    <Box
      className="hero-meta"
      sx={{
        position: "absolute",
        zIndex: 5,
        left: { xs: "0.55rem", sm: "1.5rem", md: "clamp(2rem, 3vw, 3.25rem)" },
        right: { xs: "1rem", sm: "2rem", md: "clamp(2.5rem, 3.25vw, 4rem)" },
        bottom: { xs: "1rem", md: "1.45rem" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: "0.12rem" } }}>
        {SOCIALS.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={social.label}
            sx={{
              width: "44px",
              height: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(247,247,244,0.55)",
              borderRadius: "50%",
              transition: "color 240ms ease, transform 240ms ease",
              "&:hover": { color: YELLOW, transform: "translateY(-2px)" },
              "&:focus-visible": {
                color: YELLOW,
                outline: `2px solid ${YELLOW}`,
                outlineOffset: "1px",
              },
            }}
          >
            <StrokeIcon size={17} width={1.35}>{social.path}</StrokeIcon>
          </Link>
        ))}
      </Box>

      <Box
        component="span"
        sx={{
          color: "rgba(247,247,244,0.78)",
          fontSize: { xs: "0.65rem", md: "0.72rem" },
          fontWeight: 500,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        Graz, Austria
      </Box>
    </Box>
  </Box>
);

export default HeroHeader;
