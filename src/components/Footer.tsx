import { Box, Typography, Link } from "@mui/material";
import { light } from "@/palette";
import Rise from "@/components/Rise";
import SocialChips, { StrokeIcon } from "@/components/Socials";
import PillButton from "@/components/PillButton";

/* ------------------------------------------------------------------
   Footer — the closing plate. Content is set as an engineering drawing
   title block: labelled fields, hairline dividers, mono keys.
------------------------------------------------------------------- */

const labelSx = {
  display: "block",
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: "9.5px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: light.inkFaint,
  mb: "0.75rem",
} as const;

const valueSx = {
  display: "block",
  minWidth: 0,
  maxWidth: "100%",
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: "0.98rem",
  lineHeight: 1.45,
  fontWeight: 500,
  color: light.ink,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
} as const;

const FIELDS = [
  { lab: "Name", val: "Lucas Lenarcic" },
  { lab: "Discipline", val: "Software, hardware & prototype engineering" },
  {
    lab: "Contact",
    val: "Lucas.lenarcic@gmail.com",
    href: "mailto:Lucas.lenarcic@gmail.com",
  },
];

const Footer = () => {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: light.paper,
        px: { xs: "0.75rem", sm: "1.25rem" },
        py: { xs: "1rem", sm: "1.75rem" },
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box",
      }}
    >
      {/* outer shell */}
      <Box
        sx={{
          maxWidth: "1180px",
          mx: "auto",
          backgroundColor: "rgba(21,24,27,0.05)",
          border: `1px solid ${light.hairSoft}`,
          borderRadius: { xs: "1.35rem", sm: "2rem" },
          p: { xs: "0.3rem", sm: "0.4rem" },
          minWidth: 0,
        }}
      >
        {/* inner core */}
        <Box
          sx={{
            backgroundColor: light.plate,
            borderRadius: { xs: "calc(1.35rem - 0.3rem)", sm: "calc(2rem - 0.4rem)" },
            boxShadow: `${light.inset}, ${light.lift}`,
            px: { xs: "1rem", sm: "1.5rem", md: "2.3rem" },
            pt: { xs: "2rem", sm: "3rem" },
            pb: { xs: "1.2rem", sm: "1.5rem" },
            textAlign: "left",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "2.2rem", md: "3.5rem" },
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: { xs: "nowrap", md: "wrap" },
              pb: "2.8rem",
            }}
          >
            <Rise sx={{ width: { xs: "100%", md: "auto" }, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.4em",
                  color: light.ink,
                  m: 0,
                  mb: "1.1rem",
                }}
              >
                LEMME
              </Typography>
              <Typography
                sx={{
                  maxWidth: "46ch",
                  fontSize: "1.02rem",
                  lineHeight: 1.6,
                  color: light.inkSoft,
                  m: 0,
                }}
              >
                I build across the stack —{" "}
                <Box component="span" sx={{ color: light.ink, fontWeight: 500 }}>
                  PCB layout and firmware
                </Box>{" "}
                through to the interfaces that sit on top. If you have something to
                prototype, get in touch.
              </Typography>
            </Rise>

            <Rise delay={70} sx={{ minWidth: 0 }}>
              <Box component="span" sx={labelSx}>
                Elsewhere
              </Box>
              <SocialChips />
            </Rise>
          </Box>

          {/* title block */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              borderTop: `1px solid ${light.hair}`,
            }}
          >
            {FIELDS.map((c, i) => (
              <Rise
                key={c.lab}
                delay={140 + i * 70}
                sx={{
                  minWidth: 0,
                  px: { xs: 0, md: "1.6rem" },
                  pt: { xs: "1.2rem", md: "1.4rem" },
                  pb: { xs: "1.3rem", md: "1.6rem" },
                  borderLeft: { xs: 0, md: `1px solid ${light.hair}` },
                  borderTop: { xs: i === 0 ? 0 : `1px solid ${light.hair}`, md: 0 },
                  "&:first-of-type": { borderLeft: 0, pl: 0 },
                }}
              >
                <Box component="span" sx={labelSx}>
                  {c.lab}
                </Box>
                {c.href ? (
                  <Link
                    href={c.href}
                    sx={{
                      ...valueSx,
                      textDecoration: "none",
                      backgroundImage: `linear-gradient(${light.teal}, ${light.teal})`,
                      backgroundSize: "0% 1px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 100%",
                      transition: `background-size 520ms ${light.ease}, color 380ms ${light.ease}`,
                      "&:hover": { color: light.teal, backgroundSize: "100% 1px" },
                      "&:focus-visible": {
                        outline: `2px solid ${light.teal}`,
                        outlineOffset: "3px",
                      },
                    }}
                  >
                    {c.val}
                  </Link>
                ) : (
                  <Box component="span" sx={valueSx}>
                    {c.val}
                  </Box>
                )}
              </Rise>
            ))}
          </Box>

          <Box
            sx={{
              borderTop: `1px solid ${light.hair}`,
              pt: "1.25rem",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: light.inkFaint,
                m: 0,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              © 2024 Lucas Lenarcic — All rights reserved
            </Typography>

            <PillButton
              onClick={toTop}
              icon={
                <StrokeIcon size={14} width={1.4}>
                  <>
                    <path d="M12 19V5" />
                    <path d="m6 11 6-6 6 6" />
                  </>
                </StrokeIcon>
              }
            >
              Back to top
            </PillButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
