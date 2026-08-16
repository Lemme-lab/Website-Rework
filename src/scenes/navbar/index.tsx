import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { light } from "@/palette";

export { light } from "@/palette";

const Icon = ({ d }: { d: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
    aria-hidden="true"
  >
    {d}
  </svg>
);

const HomeIcon = () => (
  <Icon
    d={
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </>
    }
  />
);
const WorkIcon = () => (
  <Icon
    d={
      <>
        <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
        <path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2" />
        <path d="M3 13h18" />
      </>
    }
  />
);
const MailIcon = () => (
  <Icon
    d={
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </>
    }
  />
);

const NAV = [
  { id: "home", label: "Home", target: "", icon: <HomeIcon /> },
  { id: "work", label: "Work", target: "e", icon: <WorkIcon /> },
  { id: "contact", label: "Contact", target: "v", icon: <MailIcon /> },
];

/* ------------------------------------------------------------------
   Header — a slim bar, not a card. Wordmark and nav share one line on
   the page ground; the only structure is a hairline datum beneath
   them, carrying index ticks that measure out to each nav item.
   Aligned to the same 1180px column and gutters as the hero below.
------------------------------------------------------------------- */
const NavBar = () => {
  const [selected, setSelected] = useState("home");
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [ticks, setTicks] = useState<number[]>([]);

  const placeTicks = useCallback(() => {
    const rule = ruleRef.current;
    if (!rule) return;
    const r = rule.getBoundingClientRect();
    if (!r.width) return;
    setTicks(
      itemRefs.current.map((el) => {
        if (!el) return 0;
        const b = el.getBoundingClientRect();
        return ((b.left + b.width / 2 - r.left) / r.width) * 100;
      })
    );
  }, []);

  useLayoutEffect(() => {
    placeTicks();
    const id = window.setTimeout(placeTicks, 250); // after webfonts settle
    window.addEventListener("resize", placeTicks);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", placeTicks);
    };
  }, [placeTicks]);

  const smoothScrollTo = (id: string) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: light.paper,
        px: { xs: "clamp(0.85rem, 4vw, 1.5rem)", md: "4rem" },
        pt: { xs: "1.4rem", md: "1.9rem" },
      }}
    >
      <Box sx={{ maxWidth: "1180px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: "0.5rem", sm: "2rem" },
            pb: { xs: "1.1rem", md: "1.25rem" },
            minWidth: 0,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              m: 0,
              fontSize: { xs: "clamp(1rem, 5vw, 1.15rem)", md: "1.5rem" },
              fontWeight: 700,
              letterSpacing: { xs: "0.2em", sm: "0.3em", md: "0.42em" },
              color: light.ink,
              lineHeight: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            LEMME
          </Typography>

          <Box
            component="nav"
            aria-label="Primary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: "0.35rem" },
              minWidth: 0,
            }}
          >
            {NAV.map((item, i) => {
              const isOn = selected === item.id;
              return (
                <RouterLink
                  key={item.id}
                  to="/"
                  ref={(el: HTMLAnchorElement | null) => (itemRefs.current[i] = el)}
                  aria-label={item.label}
                  aria-current={isOn ? "page" : undefined}
                  onClick={() => {
                    setSelected(item.id);
                    smoothScrollTo(item.target);
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: { xs: "0.5rem", sm: "0.5rem 0.95rem" },
                      borderRadius: "999px",
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: isOn ? light.ink : light.inkSoft,
                      backgroundColor: isOn ? light.raised : "transparent",
                      boxShadow: isOn
                        ? `0 2px 5px -2px rgba(21,24,27,0.18), inset 0 0 0 1px ${light.hairSoft}`
                        : "none",
                      transition: `color 420ms ${light.ease}, background-color 420ms ${light.ease}, transform 420ms ${light.ease}, box-shadow 420ms ${light.ease}`,
                      "& svg": {
                        color: isOn ? light.teal : "inherit",
                        transition: `transform 520ms ${light.ease}`,
                      },
                      "&:hover": { color: light.ink },
                      "&:hover svg": { transform: "translateY(-1px)" },
                      "&:active": { transform: "scale(0.97)" },
                    }}
                  >
                    {item.icon}
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {item.label}
                    </Box>
                  </Box>
                </RouterLink>
              );
            })}
          </Box>
        </Box>

        {/* datum rule with index ticks */}
        <Box
          ref={ruleRef}
          aria-hidden="true"
          sx={{ position: "relative", height: "1px", backgroundColor: light.hair }}
        >
          {ticks.map((leftPct, i) => {
            const isOn = selected === NAV[i]?.id;
            return (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: `${leftPct}%`,
                  width: "1px",
                  height: isOn ? "12px" : "7px",
                  backgroundColor: isOn ? light.teal : light.hair,
                  transform: "translateX(-50%)",
                  transition: `background-color 420ms ${light.ease}, height 420ms ${light.ease}`,
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
