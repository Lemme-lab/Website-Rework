import React from "react";
import { Box, Link } from "@mui/material";
import { light } from "@/palette";

/* One hairline icon set for the whole site. The brand .webp logos were
   built for a dark page and read as clip-art on light, so social links
   are drawn as strokes in currentColor instead. */

export const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-lenarcic-072ba4253/",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.6 10.6V17" />
        <circle cx="7.6" cy="7.4" r="0.95" fill="currentColor" stroke="none" />
        <path d="M11.6 17v-6.4" />
        <path d="M11.6 13.6a2.7 2.7 0 0 1 5.4 0V17" />
      </>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Lemme-lab",
    path: (
      <path d="M9 19.3c-3.6 1.1-3.6-2-5.1-2.4m10.2 4.6v-3.1a2.7 2.7 0 0 0-.7-2.1c2.5-.3 5-1.2 5-5.5a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C5.9 4.5 4.9 4.8 4.9 4.8a4 4 0 0 0-.1 3 4.3 4.3 0 0 0-1.2 3c0 4.3 2.5 5.2 5 5.5a2.7 2.7 0 0 0-.7 2.1v3.1" />
    ),
  },
  {
    label: "Email",
    href: "mailto:Lucas.lenarcic@gmail.com",
    path: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </>
    ),
  },
];

export const StrokeIcon = ({
  children,
  size = 19,
  width = 1.3,
}: {
  children: React.ReactNode;
  size?: number;
  width?: number;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const SocialChips = ({
  size = 46,
  direction = "row",
  labels = false,
}: {
  size?: number;
  direction?: "row" | "column";
  /* labelled variant for the standalone contact section; the footer keeps
     the compact icon-only row so the two don't read as the same block */
  labels?: boolean;
}) => {
  const responsiveSize = labels
    ? { xs: Math.min(size, 64), sm: Math.min(size, 78), md: size }
    : size;
  const responsiveIconSize = labels
    ? {
        xs: Math.round(Math.min(size, 64) * 0.41),
        sm: Math.round(Math.min(size, 78) * 0.41),
        md: Math.round(size * 0.41),
      }
    : Math.round(size * 0.41);

  return (
    <Box
      sx={{
        display: "flex",
        width: labels && direction === "row" ? "100%" : "fit-content",
        maxWidth: "100%",
        flexDirection: direction,
        flexWrap: labels && direction === "row" ? "wrap" : "nowrap",
        justifyContent: labels && direction === "row" ? "center" : "flex-start",
        gap: labels ? { xs: "0.8rem", sm: "1.4rem", md: "2.2rem" } : "0.55rem",
        alignItems: "center",
      }}
    >
      {SOCIALS.map((s) => (
        <Box
          key={s.label}
          sx={{
            minWidth: 0,
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: labels ? { xs: "0.65rem", sm: "0.9rem" } : 0,
          }}
        >
          <Link
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            sx={{
              width: responsiveSize,
              height: responsiveSize,
              flexShrink: 0,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: light.raised,
              border: `1px solid ${light.hair}`,
              color: light.inkSoft,
              boxShadow: "0 10px 22px -18px rgba(21,24,27,0.6)",
              transition: `transform 520ms ${light.ease}, color 380ms ${light.ease}, border-color 380ms ${light.ease}, box-shadow 520ms ${light.ease}`,
              "& svg": {
                width: responsiveIconSize,
                height: responsiveIconSize,
              },
              "&:hover": {
                transform: "translateY(-3px)",
                color: light.teal,
                borderColor: "rgba(11,111,94,0.32)",
                boxShadow: "0 18px 30px -20px rgba(11,111,94,0.75)",
              },
              "&:active": { transform: "translateY(-1px) scale(0.97)" },
              "&:focus-visible": {
                outline: `2px solid ${light.teal}`,
                outlineOffset: "3px",
              },
            }}
          >
            <StrokeIcon size={Math.round(size * 0.41)}>{s.path}</StrokeIcon>
          </Link>
          {labels && (
            <Box
              component="span"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: { xs: "8.5px", sm: "9.5px" },
                letterSpacing: { xs: "0.14em", sm: "0.22em" },
                textTransform: "uppercase",
                color: light.inkFaint,
              }}
            >
              {s.label}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SocialChips;
