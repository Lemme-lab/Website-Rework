import React from "react";
import { Box, Typography } from "@mui/material";
import ScrollSequence, {
  type ScrollSequenceHandle,
} from "@/components/ScrollSequence";

type Reel = {
  slug: string;
  discipline: string;
  name: string;
  kicker: string;
  body: string;
  spec: [string, string][];
  poster: string;
  frameCount: number;
  aspect: number;
  kind?: "sequence" | "app-build";
  framePrefix?: string;
};

const REELS: Reel[] = [
  {
    slug: "wuldor",
    discipline: "Hardware engineering",
    name: "Electronics + Robotics",
    kicker: "Custom electronics, embedded control and robotic systems",
    body:
      "Electronics, embedded systems and mechanical hardware are developed together around the real product requirements. From custom PCBs and sensors to motors, control systems and robotic mechanisms, each layer is engineered as part of one complete system.",
    spec: [
      ["Electronics", "Custom PCB design"],
      ["Embedded", "Firmware + control"],
      ["Robotics", "Motion + mechanisms"],
      ["Integration", "Sensors + actuators"],
    ],
    poster: "/Images/slider/wuldor-full-arm.webp",
    frameCount: 240,
    framePrefix: "wuldor_v2",
    aspect: 4 / 3,
  },
  {
    slug: "app",
    discipline: "Software engineering",
    name: "Software Development",
    kicker: "Apps, APIs and connected product software",
    body:
      "Software is developed as part of the product rather than added at the end. We build mobile applications, backend services, embedded integrations and secure connected systems from the device layer through to the final user experience.",
    spec: [
      ["Apps", "iOS + Android"],
      ["Backend", "APIs + cloud services"],
      ["Devices", "Firmware integration"],
      ["Security", "Secure communication"],
    ],
    poster: "/Images/slider/airframe-app.webp",
    frameCount: 0,
    aspect: 5 / 3,
    kind: "app-build",
  },
];

const FRAME_SRC = new Map<string, (index: number) => string>(
  REELS.map((reel): [string, (index: number) => string] => {
    const stem = reel.framePrefix ?? reel.slug;

    return [
      reel.slug,
      (index: number) =>
        `/Images/reels/${reel.slug}/${stem}_${String(index).padStart(
          4,
          "0",
        )}.webp`,
    ];
  }),
);

const clamp01 = (n: number) =>
  n < 0 ? 0 : n > 1 ? 1 : n;

const ramp = (
  v: number,
  a: number,
  b: number,
) => {
  const t = clamp01((v - a) / (b - a));

  return t * t * (3 - 2 * t);
};

const setAppBuildProgress = (
  node: HTMLDivElement,
  p: number,
) => {
  const phone = ramp(p, 0.02, 0.2);
  const header = ramp(p, 0.15, 0.32);
  const hero = ramp(p, 0.23, 0.4);
  const buttons = ramp(p, 0.32, 0.52);
  const graph = ramp(p, 0.42, 0.64);

  const api = ramp(p, 0.5, 0.7);
  const cloud = ramp(p, 0.57, 0.76);
  const security = ramp(p, 0.64, 0.84);
  const finish = ramp(p, 0.75, 0.96);

  node.style.setProperty(
    "--phone-o",
    phone.toFixed(4),
  );

  node.style.setProperty(
    "--phone-y",
    `${((1 - phone) * 130).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--phone-s",
    (0.68 + phone * 0.32).toFixed(4),
  );

  node.style.setProperty(
    "--phone-r",
    `${((1 - phone) * -10).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--header-o",
    header.toFixed(4),
  );

  node.style.setProperty(
    "--header-y",
    `${((1 - header) * -120).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--header-r",
    `${((1 - header) * -12).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--hero-o",
    hero.toFixed(4),
  );

  node.style.setProperty(
    "--hero-x",
    `${((1 - hero) * 210).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--hero-r",
    `${((1 - hero) * 14).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--buttons-o",
    buttons.toFixed(4),
  );

  node.style.setProperty(
    "--buttons-y",
    `${((1 - buttons) * 150).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--buttons-x",
    `${((1 - buttons) * -90).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--graph-o",
    graph.toFixed(4),
  );

  node.style.setProperty(
    "--graph-x",
    `${((1 - graph) * 170).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--graph-y",
    `${((1 - graph) * 120).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--graph-progress",
    graph.toFixed(4),
  );

  node.style.setProperty(
    "--api-o",
    api.toFixed(4),
  );

  node.style.setProperty(
    "--api-x",
    `${((1 - api) * -310).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--api-y",
    `${((1 - api) * 80).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--api-r",
    `${((1 - api) * -24).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--cloud-o",
    cloud.toFixed(4),
  );

  node.style.setProperty(
    "--cloud-x",
    `${((1 - cloud) * 180).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--cloud-y",
    `${((1 - cloud) * -210).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--cloud-r",
    `${((1 - cloud) * 20).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--security-o",
    security.toFixed(4),
  );

  node.style.setProperty(
    "--security-x",
    `${((1 - security) * -220).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--security-y",
    `${((1 - security) * 220).toFixed(2)}px`,
  );

  node.style.setProperty(
    "--security-r",
    `${((1 - security) * -30).toFixed(2)}deg`,
  );

  node.style.setProperty(
    "--finish-o",
    finish.toFixed(4),
  );

  node.style.setProperty(
    "--finish-s",
    (0.7 + finish * 0.3).toFixed(4),
  );
};

const AppBuildArt = () => {
  return (
    <Box
      role="img"
      aria-label="Mobile app, backend and security components assembling into a connected software product"
      sx={{
        position: "relative",
        width: "100%",
        height: "clamp(500px, 58vw, 720px)",
        overflow: "visible",
        isolation: "isolate",
        pointerEvents: "none",

        "& .app-phone": {
          position: "absolute",
          zIndex: 10,
          top: "50%",
          left: "50%",
          width: "clamp(225px, 32%, 310px)",
          aspectRatio: "0.515",
          borderRadius: "44px",
          background: "#F2F1EB",
          overflow: "hidden",
          opacity: "var(--phone-o, 0)",
          transform:
            "translate(-50%, -50%) translateY(var(--phone-y, 130px)) rotate(var(--phone-r, -10deg)) scale(var(--phone-s, .68))",
          transformOrigin: "50% 50%",
          boxShadow:
            "0 38px 100px rgba(18, 18, 22, 0.14)",
          willChange: "transform, opacity",
        },

        "& .app-phone__screen": {
          position: "absolute",
          inset: 0,
          padding: "23px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "13px",
        },

        "& .app-phone__island": {
          position: "absolute",
          zIndex: 5,
          top: 10,
          left: "50%",
          width: 62,
          height: 18,
          borderRadius: 999,
          background: "#17181B",
          transform: "translateX(-50%)",
        },

        "& .app-header": {
          marginTop: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: "var(--header-o, 0)",
          transform:
            "translateY(var(--header-y, -120px)) rotate(var(--header-r, -12deg))",
          willChange: "transform, opacity",
        },

        "& .app-header__copy": {
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        },

        "& .app-header__eyebrow": {
          width: 48,
          height: 5,
          borderRadius: 999,
          background: "#B8B6AF",
        },

        "& .app-header__title": {
          width: 88,
          height: 12,
          borderRadius: 999,
          background: "#17181B",
        },

        "& .app-avatar": {
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: "50%",
          background: "#FFAE53",
        },

        "& .app-avatar::after": {
          content: '""',
          position: "absolute",
          right: -2,
          bottom: 0,
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "#22C79A",
          boxShadow: "0 0 0 3px #F2F1EB",
        },

        "& .app-feature": {
          position: "relative",
          minHeight: 134,
          padding: "18px",
          borderRadius: "26px",
          overflow: "hidden",
          background: "#7568F8",
          color: "#fff",
          opacity: "var(--hero-o, 0)",
          transform:
            "translateX(var(--hero-x, 210px)) rotate(var(--hero-r, 14deg))",
          willChange: "transform, opacity",
        },

        "& .app-feature__label": {
          width: 48,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,.55)",
        },

        "& .app-feature__value": {
          marginTop: "10px",
          width: 90,
          height: 19,
          borderRadius: 999,
          background: "#fff",
        },

        "& .app-feature__sub": {
          marginTop: "9px",
          width: 64,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,.42)",
        },

        "& .app-feature__orb": {
          position: "absolute",
          right: -10,
          bottom: -28,
          width: 112,
          height: 112,
          borderRadius: "50%",
          background: "#A8F0D5",
        },

        "& .app-feature__orb::after": {
          content: '""',
          position: "absolute",
          inset: 27,
          borderRadius: "50%",
          background: "#7568F8",
        },

        "& .app-actions": {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "9px",
          opacity: "var(--buttons-o, 0)",
          transform:
            "translate(var(--buttons-x, -90px), var(--buttons-y, 150px))",
          willChange: "transform, opacity",
        },

        "& .app-action": {
          minHeight: 70,
          borderRadius: "20px",
          background: "#E4E2DC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        },

        "& .app-action:nth-of-type(2)": {
          background: "#FFE0EA",
        },

        "& .app-action:nth-of-type(3)": {
          background: "#DDF4EC",
        },

        "& .app-action__icon": {
          position: "relative",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#17181B",
        },

        "& .app-action:nth-of-type(2) .app-action__icon":
          {
            borderRadius: "6px",
            transform: "rotate(45deg)",
          },

        "& .app-action:nth-of-type(3) .app-action__icon":
          {
            width: 22,
            height: 14,
            borderRadius: "999px",
          },

        "& .app-action__line": {
          width: 28,
          height: 4,
          borderRadius: 999,
          background: "rgba(24,25,29,.32)",
        },

        "& .app-chart": {
          padding: "14px 15px 12px",
          borderRadius: "22px",
          background: "#fff",
          opacity: "var(--graph-o, 0)",
          transform:
            "translate(var(--graph-x, 170px), var(--graph-y, 120px))",
          willChange: "transform, opacity",
        },

        "& .app-chart__head": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        },

        "& .app-chart__heading": {
          width: 61,
          height: 7,
          borderRadius: 999,
          background: "#17181B",
        },

        "& .app-chart__badge": {
          width: 31,
          height: 14,
          borderRadius: 999,
          background: "#DDF4EC",
        },

        "& .app-chart__bars": {
          height: 58,
          display: "flex",
          gap: "7px",
          alignItems: "flex-end",
        },

        "& .app-chart__bar": {
          flex: 1,
          minWidth: 0,
          borderRadius: "8px 8px 4px 4px",
          background: "#CEC9FF",
          transformOrigin: "50% 100%",
          transform:
            "scaleY(var(--graph-progress, 0))",
          willChange: "transform",
        },

        "& .app-chart__bar:nth-of-type(2n)": {
          background: "#7568F8",
        },

        "& .app-chart__bar:nth-of-type(1)": {
          height: "38%",
        },

        "& .app-chart__bar:nth-of-type(2)": {
          height: "64%",
        },

        "& .app-chart__bar:nth-of-type(3)": {
          height: "49%",
        },

        "& .app-chart__bar:nth-of-type(4)": {
          height: "84%",
        },

        "& .app-chart__bar:nth-of-type(5)": {
          height: "68%",
        },

        "& .app-chart__bar:nth-of-type(6)": {
          height: "100%",
        },

        "& .software-node": {
          position: "absolute",
          zIndex: 12,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 17px",
          borderRadius: "22px",
          background: "#fff",
          boxShadow:
            "0 24px 70px rgba(18,18,22,.11)",
          willChange: "transform, opacity",
        },

        "& .software-node--api": {
          left: "5%",
          top: "32%",
          opacity: "var(--api-o, 0)",
          transform:
            "translate(var(--api-x, -310px), var(--api-y, 80px)) rotate(var(--api-r, -24deg))",
        },

        "& .software-node__icon": {
          width: 42,
          height: 42,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          borderRadius: "14px",
          background: "#17181B",
          color: "#A8F0D5",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "monospace",
        },

        "& .software-node__title": {
          width: 64,
          height: 8,
          borderRadius: 999,
          background: "#17181B",
        },

        "& .software-node__line": {
          marginTop: "8px",
          width: 43,
          height: 5,
          borderRadius: 999,
          background: "#C7C5BE",
        },

        "& .software-node--cloud": {
          right: "8%",
          top: "12%",
          width: 96,
          height: 96,
          padding: 0,
          borderRadius: "50%",
          justifyContent: "center",
          opacity: "var(--cloud-o, 0)",
          transform:
            "translate(var(--cloud-x, 180px), var(--cloud-y, -210px)) rotate(var(--cloud-r, 20deg))",
        },

        "& .cloud-shape": {
          position: "relative",
          width: 52,
          height: 34,
          borderRadius: "20px",
          background: "#7568F8",
        },

        "& .cloud-shape::before": {
          content: '""',
          position: "absolute",
          left: 7,
          top: -12,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#7568F8",
        },

        "& .cloud-shape::after": {
          content: '""',
          position: "absolute",
          right: 4,
          top: -5,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#7568F8",
        },

        "& .cloud-shape__dots": {
          position: "absolute",
          zIndex: 2,
          left: 13,
          bottom: 10,
          display: "flex",
          gap: "5px",
        },

        "& .cloud-shape__dot": {
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#fff",
        },

        "& .security-node": {
          position: "absolute",
          zIndex: 13,
          left: "8%",
          bottom: "13%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: "var(--security-o, 0)",
          transform:
            "translate(var(--security-x, -220px), var(--security-y, 220px)) rotate(var(--security-r, -30deg))",
          willChange: "transform, opacity",
        },

        "& .security-shield": {
          position: "relative",
          width: 76,
          height: 88,
          display: "grid",
          placeItems: "center",
          background: "#A8F0D5",
          clipPath:
            "polygon(50% 0%, 92% 16%, 87% 67%, 50% 100%, 13% 67%, 8% 16%)",
          filter:
            "drop-shadow(0 20px 30px rgba(18,18,22,.08))",
        },

        "& .security-shield__keyhole": {
          position: "relative",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#17181B",
        },

        "& .security-shield__keyhole::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          top: 12,
          width: 7,
          height: 18,
          borderRadius: 4,
          background: "#17181B",
          transform: "translateX(-50%)",
        },

        "& .security-node__copy": {
          padding: "13px 15px",
          borderRadius: "18px",
          background: "#17181B",
          boxShadow:
            "0 22px 55px rgba(18,18,22,.13)",
        },

        "& .security-node__title": {
          width: 70,
          height: 7,
          borderRadius: 999,
          background: "#fff",
        },

        "& .security-node__line": {
          width: 47,
          height: 5,
          marginTop: "8px",
          borderRadius: 999,
          background: "#A8F0D5",
        },

        "& .floating-graph": {
          position: "absolute",
          zIndex: 7,
          right: "3%",
          bottom: "17%",
          width: "clamp(150px, 23%, 215px)",
          padding: "17px",
          borderRadius: "26px",
          background: "#fff",
          boxShadow:
            "0 26px 70px rgba(18,18,22,.1)",
          opacity: "var(--graph-o, 0)",
          transform:
            "translate(var(--graph-x, 170px), var(--graph-y, 120px)) rotate(7deg)",
          willChange: "transform, opacity",
        },

        "& .floating-graph__head": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        },

        "& .floating-graph__title": {
          width: "44%",
          height: 7,
          borderRadius: 999,
          background: "#17181B",
        },

        "& .floating-graph__pill": {
          width: 38,
          height: 17,
          borderRadius: 999,
          background: "#FFE0EA",
        },

        "& .floating-graph__plot": {
          height: 68,
          display: "flex",
          alignItems: "flex-end",
          gap: "7px",
        },

        "& .floating-graph__bar": {
          flex: 1,
          borderRadius: "8px 8px 3px 3px",
          background: "#A8F0D5",
          transformOrigin: "50% 100%",
          transform:
            "scaleY(var(--graph-progress, 0))",
        },

        "& .floating-graph__bar:nth-of-type(2n)": {
          background: "#7568F8",
        },

        "& .floating-graph__bar:nth-of-type(1)": {
          height: "45%",
        },

        "& .floating-graph__bar:nth-of-type(2)": {
          height: "72%",
        },

        "& .floating-graph__bar:nth-of-type(3)": {
          height: "58%",
        },

        "& .floating-graph__bar:nth-of-type(4)": {
          height: "95%",
        },

        "& .floating-graph__bar:nth-of-type(5)": {
          height: "69%",
        },

        "& .finish-accent": {
          position: "absolute",
          zIndex: 5,
          opacity: "var(--finish-o, 0)",
          transform:
            "scale(var(--finish-s, .7))",
          willChange: "transform, opacity",
        },

        "& .finish-accent--circle": {
          left: "20%",
          top: "22%",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#7568F8",
        },

        "& .finish-accent--pill": {
          right: "18%",
          top: "47%",
          width: 91,
          height: 28,
          borderRadius: 999,
          background: "#FFE0EA",
          transform:
            "rotate(-9deg) scale(var(--finish-s, .7))",
        },

        "& .finish-accent--button": {
          left: "18%",
          bottom: "21%",
          width: 76,
          height: 76,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "#FFAE53",
          transform:
            "rotate(-12deg) scale(var(--finish-s, .7))",
        },

        "& .finish-accent--button::after": {
          content: '""',
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#17181B",
        },

        "& .finish-accent--dot": {
          right: "24%",
          bottom: "29%",
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: "#22C79A",
        },

        "@media (max-width: 760px)": {
          height: "520px",

          "& .app-phone": {
            width: "215px",
          },

          "& .software-node--api": {
            left: "-4%",
            top: "33%",
            transform:
              "translate(calc(var(--api-x, -310px) * .7), var(--api-y, 80px)) rotate(var(--api-r, -24deg)) scale(.84)",
          },

          "& .software-node--cloud": {
            right: "-1%",
            top: "10%",
            transform:
              "translate(calc(var(--cloud-x, 180px) * .65), calc(var(--cloud-y, -210px) * .65)) rotate(var(--cloud-r, 20deg)) scale(.78)",
          },

          "& .security-node": {
            left: "0%",
            bottom: "10%",
            transform:
              "translate(calc(var(--security-x, -220px) * .7), calc(var(--security-y, 220px) * .7)) rotate(var(--security-r, -30deg)) scale(.78)",
          },

          "& .security-node__copy": {
            display: "none",
          },

          "& .floating-graph": {
            right: "-5%",
            bottom: "16%",
            width: 145,
            transform:
              "translate(calc(var(--graph-x, 170px) * .65), calc(var(--graph-y, 120px) * .65)) rotate(7deg) scale(.82)",
          },

          "& .finish-accent--button": {
            left: "5%",
          },

          "& .finish-accent--pill": {
            right: "2%",
          },
        },
      }}
    >
      <Box className="app-phone">
        <Box className="app-phone__island" />

        <Box className="app-phone__screen">
          <Box className="app-header">
            <Box className="app-header__copy">
              <Box className="app-header__eyebrow" />
              <Box className="app-header__title" />
            </Box>

            <Box className="app-avatar" />
          </Box>

          <Box className="app-feature">
            <Box className="app-feature__label" />
            <Box className="app-feature__value" />
            <Box className="app-feature__sub" />
            <Box className="app-feature__orb" />
          </Box>

          <Box className="app-actions">
            {[0, 1, 2].map((item) => (
              <Box
                className="app-action"
                key={item}
              >
                <Box className="app-action__icon" />
                <Box className="app-action__line" />
              </Box>
            ))}
          </Box>

          <Box className="app-chart">
            <Box className="app-chart__head">
              <Box className="app-chart__heading" />
              <Box className="app-chart__badge" />
            </Box>

            <Box className="app-chart__bars">
              {[0, 1, 2, 3, 4, 5].map(
                (item) => (
                  <Box
                    className="app-chart__bar"
                    key={item}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="software-node software-node--api">
        <Box className="software-node__icon">
          {"{}"}
        </Box>

        <Box>
          <Box className="software-node__title" />
          <Box className="software-node__line" />
        </Box>
      </Box>

      <Box className="software-node software-node--cloud">
        <Box className="cloud-shape">
          <Box className="cloud-shape__dots">
            <Box className="cloud-shape__dot" />
            <Box className="cloud-shape__dot" />
            <Box className="cloud-shape__dot" />
          </Box>
        </Box>
      </Box>

      <Box className="security-node">
        <Box className="security-shield">
          <Box className="security-shield__keyhole" />
        </Box>

        <Box className="security-node__copy">
          <Box className="security-node__title" />
          <Box className="security-node__line" />
        </Box>
      </Box>

      <Box className="floating-graph">
        <Box className="floating-graph__head">
          <Box className="floating-graph__title" />
          <Box className="floating-graph__pill" />
        </Box>

        <Box className="floating-graph__plot">
          {[0, 1, 2, 3, 4].map((item) => (
            <Box
              className="floating-graph__bar"
              key={item}
            />
          ))}
        </Box>
      </Box>

      <Box className="finish-accent finish-accent--circle" />
      <Box className="finish-accent finish-accent--pill" />
      <Box className="finish-accent finish-accent--button" />
      <Box className="finish-accent finish-accent--dot" />
    </Box>
  );
};

const DemoReel = () => {
  const runwayRefs = React.useRef<
    (HTMLDivElement | null)[]
  >([]);

  const seqRefs = React.useRef<
    (ScrollSequenceHandle | null)[]
  >([]);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let frame = 0;

    const draw = () => {
      frame = 0;

      if (reducedMotion.matches) {
        runwayRefs.current.forEach(
          (runway, i) => {
            if (!runway) return;

            runway.style.setProperty(
              "--dock",
              "0",
            );

            runway.style.setProperty(
              "--tell",
              "1",
            );

            runway.style.setProperty(
              "--sequence-center-x",
              "0px",
            );

            if (
              REELS[i]?.kind === "app-build"
            ) {
              setAppBuildProgress(
                runway,
                1,
              );
            }
          },
        );

        seqRefs.current.forEach((seq) => {
          seq?.setProgress(0.5);
        });

        return;
      }

      const viewportHeight =
        window.innerHeight;

      runwayRefs.current.forEach(
        (runway, i) => {
          if (!runway) return;

          const reel = REELS[i];
          const sequence =
            seqRefs.current[i];

          const rect =
            runway.getBoundingClientRect();

          const scrollable = Math.max(
            runway.offsetHeight -
              viewportHeight,
            1,
          );

          const p = clamp01(
            -rect.top / scrollable,
          );

          runway.style.setProperty(
            "--dock",
            (
              1 -
              ramp(p, 0.04, 0.32)
            ).toFixed(4),
          );

          const tell = ramp(
            p,
            0.18,
            0.42,
          );

          runway.style.setProperty(
            "--tell",
            tell.toFixed(4),
          );

          /*
           * Keep the sequence centered while the copy is hidden, then
           * hand it back to its normal grid column as the copy appears.
           * For the first reel that means the robot arm starts centered
           * in the viewport and glides left in sync with the text reveal.
           */
          if (
            reel.kind !== "app-build" &&
            window.innerWidth > 1000
          ) {
            const stage =
              runway.querySelector<HTMLElement>(
                ".study__stage",
              );

            if (stage) {
              const stageRect =
                stage.getBoundingClientRect();

              const centeredOffset =
                window.innerWidth / 2 -
                (stageRect.left +
                  stageRect.width / 2);

              runway.style.setProperty(
                "--sequence-center-x",
                `${(
                  centeredOffset *
                  (1 - tell)
                ).toFixed(2)}px`,
              );
            }
          } else {
            runway.style.setProperty(
              "--sequence-center-x",
              "0px",
            );
          }

          if (
            reel.kind === "app-build"
          ) {
            setAppBuildProgress(
              runway,
              p,
            );
          } else {
            sequence?.setProgress(
              clamp01(
                (p - 0.05) / 0.88,
              ),
            );
          }
        },
      );
    };

    const schedule = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            draw,
          );
      }
    };

    schedule();

    window.addEventListener(
      "scroll",
      schedule,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      schedule,
    );

    reducedMotion.addEventListener(
      "change",
      schedule,
    );

    return () => {
      if (frame) {
        window.cancelAnimationFrame(
          frame,
        );
      }

      window.removeEventListener(
        "scroll",
        schedule,
      );

      window.removeEventListener(
        "resize",
        schedule,
      );

      reducedMotion.removeEventListener(
        "change",
        schedule,
      );
    };
  }, []);

  return (
    <Box
      component="section"
      id="demos"
      className="studies studies--handoff"
      aria-label="Engineering services"
      sx={{
        mt: 0,
        pt: 0,
        width: "100%",
        backgroundColor: "#fff !important",
        color: "#17181B",
        overflow: "clip",
      }}
    >
      {REELS.map((reel, i) => {
        const isAppBuild =
          reel.kind === "app-build";

        return (
          <Box
            key={reel.slug}
            className="study"
            data-side={
              i % 2 === 0
                ? "right"
                : "left"
            }
            ref={(
              node: HTMLDivElement | null,
            ) => {
              runwayRefs.current[i] =
                node;
            }}
          >
            <Box className="study__pin">
              <Box
                className="study__grid"
                sx={{
                  width:
                    "calc(100% - clamp(20px, 2vw, 40px))",

                  maxWidth: "1760px",
                  mx: "auto",

                  /*
                   * Big animation / sequence.
                   */
                  gridTemplateColumns:
                    "minmax(0, 1.8fr) minmax(320px, 0.82fr) !important",

                  /*
                   * Smaller space between
                   * visual and text.
                   */
                  columnGap:
                    "clamp(14px, 2vw, 34px)",

                  alignItems: "center",

                  "& .study__stage": {
                    minWidth: 0,
                  },

                  "& .study__copy": {
                    minWidth: 0,
                  },

                  ".study[data-side='left'] & .study__stage":
                    {
                      order: 2,
                    },

                  ".study[data-side='left'] & .study__copy":
                    {
                      order: 1,
                    },

                  ".study[data-side='right'] & .study__stage":
                    {
                      order: 1,
                    },

                  ".study[data-side='right'] & .study__copy":
                    {
                      order: 2,
                    },

                  "@media (max-width: 1000px)": {
                    width:
                      "calc(100% - 28px)",

                    gridTemplateColumns:
                      "1fr !important",

                    rowGap: "26px",

                    "& .study__stage": {
                      order:
                        "1 !important",
                    },

                    "& .study__copy": {
                      order:
                        "2 !important",
                    },
                  },

                  "@media (max-width: 600px)": {
                    width:
                      "calc(100% - 20px)",

                    rowGap: "20px",
                  },
                }}
              >
                <Box
                  className={`study__stage ${
                    isAppBuild
                      ? "study__stage--app-build"
                      : ""
                  }`}
                  sx={{
                    width: "100% !important",
                    maxWidth:
                      "none !important",

                    minWidth: 0,

                    justifySelf: "stretch",

                    "& > *": {
                      width:
                        "100% !important",

                      maxWidth:
                        "none !important",
                    },

                    /*
                     * Prevent old global limits
                     * from shrinking the sequence.
                     */
                    "& canvas": {
                      width:
                        "100% !important",

                      maxWidth:
                        "none !important",
                    },

                    ...(isAppBuild
                      ? {
                          background:
                            "transparent !important",

                          border:
                            "0 !important",

                          outline:
                            "0 !important",

                          boxShadow:
                            "none !important",

                          overflow:
                            "visible !important",

                          padding:
                            "0 !important",

                          "&::before, &::after":
                            {
                              display:
                                "none !important",
                            },
                        }
                      : {}),
                  }}
                >
                  {isAppBuild ? (
                    <AppBuildArt />
                  ) : (
                    <Box
                      className="study__sequence-dock"
                      sx={{
                        width: "100%",
                        transform:
                          "translate3d(var(--sequence-center-x, 0px), 0, 0)",
                        willChange: "transform",
                      }}
                    >
                      <ScrollSequence
                        ref={(node) => {
                          seqRefs.current[i] =
                            node;
                        }}
                        frameCount={
                          reel.frameCount
                        }
                        frameSrc={
                          FRAME_SRC.get(
                            reel.slug,
                          )!
                        }
                        poster={
                          reel.poster
                        }
                        aspect={
                          reel.aspect
                        }
                        label={reel.name}
                      />
                    </Box>
                  )}
                </Box>

                <Box
                  className="study__copy"
                  sx={{
                    width: "100%",
                    maxWidth: "520px",
                    boxSizing: "border-box",

                    /*
                     * Small text gutter.
                     */
                    pl: {
                      xs: "8px",
                      sm: "10px",
                      md: "clamp(12px, 1vw, 20px)",
                    },

                    pr: {
                      xs: "8px",
                      sm: "10px",
                      md: "8px",
                    },

                    ".study[data-side='left'] &":
                      {
                        justifySelf: "end",
                      },

                    ".study[data-side='right'] &":
                      {
                        justifySelf:
                          "start",
                      },

                    "@media (max-width: 1000px)": {
                      maxWidth: "680px",

                      justifySelf:
                        "start !important",

                      pl: "10px",
                      pr: "10px",
                    },
                  }}
                >
                  <Box
                    component="span"
                    className="study__discipline"
                  >
                    {reel.discipline}
                  </Box>

                  <Typography
                    component="h3"
                    className="study__name"
                  >
                    {reel.name}
                  </Typography>

                  <Box
                    component="span"
                    className="study__kicker"
                  >
                    {reel.kicker}
                  </Box>

                  <Typography
                    component="p"
                    className="study__body"
                  >
                    {reel.body}
                  </Typography>

                  <Box
                    component="dl"
                    className="study__spec"
                  >
                    {reel.spec.map(
                      ([term, detail]) => (
                        <React.Fragment
                          key={term}
                        >
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
      })}
    </Box>
  );
};

export default DemoReel;