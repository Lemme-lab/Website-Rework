import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { light } from "@/palette";

/* Heavy fade-up on entry. IntersectionObserver rather than a scroll
   listener so it costs nothing while scrolling; honours reduced motion. */
const Rise = ({
  delay = 0,
  children,
  sx = {},
}: {
  delay?: number;
  children: React.ReactNode;
  sx?: any;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = (t: HTMLElement) => {
      t.style.opacity = "1";
      t.style.transform = "none";
      t.style.filter = "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal(el);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: 0,
        transform: "translateY(18px)",
        filter: "blur(4px)",
        transition: `opacity 800ms ${light.ease} ${delay}ms, transform 800ms ${light.ease} ${delay}ms, filter 800ms ${light.ease} ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Rise;
