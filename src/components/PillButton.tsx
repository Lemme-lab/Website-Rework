import React from "react";
import { Box } from "@mui/material";
import { light } from "@/palette";

/* The site's one button shape: a pill whose trailing icon lives in its
   own circular knob, flush with the right inner padding. The knob is
   what moves on hover, so the button has internal tension rather than
   just changing colour. */

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  solid?: boolean;
  size?: "sm" | "md";
};

const PillButton = ({
  children,
  icon,
  href,
  onClick,
  target,
  rel,
  solid = false,
  size = "sm",
}: Props) => {
  const knob = size === "md" ? 34 : 28;

  return (
    <Box
      component={href ? "a" : "button"}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      type={href ? undefined : "button"}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        border: `1px solid ${solid ? "transparent" : light.hair}`,
        backgroundColor: solid ? light.ink : light.raised,
        color: solid ? "#FFFFFF" : light.ink,
        borderRadius: "999px",
        padding:
          size === "md"
            ? "0.4rem 0.4rem 0.4rem 1.4rem"
            : "0.32rem 0.32rem 0.32rem 1.05rem",
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: size === "md" ? "0.95rem" : "0.82rem",
        fontWeight: 500,
        lineHeight: 1,
        textDecoration: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: solid
          ? "0 18px 34px -22px rgba(21,24,27,0.85)"
          : "0 10px 22px -18px rgba(21,24,27,0.6)",
        transition: `transform 460ms ${light.ease}, box-shadow 460ms ${light.ease}, background-color 460ms ${light.ease}`,
        "& .knob": {
          width: knob,
          height: knob,
          borderRadius: "999px",
          backgroundColor: solid ? "rgba(255,255,255,0.14)" : "rgba(21,24,27,0.055)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: `transform 520ms ${light.ease}, background-color 460ms ${light.ease}, color 460ms ${light.ease}`,
        },
        "&:hover .knob": {
          transform: "translateY(-2px) scale(1.06)",
          backgroundColor: solid ? "rgba(255,255,255,0.22)" : light.tealWash,
          color: solid ? "#FFFFFF" : light.teal,
        },
        "&:active": { transform: "scale(0.98)" },
        "&:focus-visible": {
          outline: `2px solid ${light.teal}`,
          outlineOffset: "3px",
        },
      }}
    >
      {children}
      <Box component="span" className="knob">
        {icon}
      </Box>
    </Box>
  );
};

export default PillButton;
