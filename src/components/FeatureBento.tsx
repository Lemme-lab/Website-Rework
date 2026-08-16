import React from "react";
import { Box, Typography } from "@mui/material";
import { light } from "@/palette";
import Rise from "@/components/Rise";

/* ------------------------------------------------------------------
   Practice — an asymmetric bento describing the studio and the last
   shipped build.

   Ported from a shadcn/Tailwind block. This project is MUI/emotion, so
   Card/CardContent became a local `Panel`, the utility classes became
   sx, and lucide-react was dropped in favour of the hairline stroke
   icons already used across the site. The bento's span rhythm
   (2·2·2 over 3·3) is kept.
------------------------------------------------------------------- */

const Panel = ({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: any;
}) => (
  <Box
    sx={{
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minWidth: 0,
      height: "100%",
      backgroundColor: light.plate,
      border: `1px solid ${light.hairSoft}`,
      borderRadius: { xs: "1.15rem", sm: "1.5rem" },
      boxShadow: `${light.inset}, ${light.lift}`,
      p: { xs: "1.25rem", sm: "1.6rem", md: "2rem" },
      transition: `transform 620ms ${light.ease}, box-shadow 620ms ${light.ease}`,
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `${light.inset}, ${light.liftHover}`,
        },
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: "1.15rem",
      fontWeight: 600,
      color: light.ink,
      letterSpacing: "-0.01em",
      mb: "0.6rem",
    }}
  >
    {children}
  </Typography>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.6, color: light.inkSoft, m: 0 }}>
    {children}
  </Typography>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="span"
    sx={{
      display: "block",
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: "9.5px",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: light.inkFaint,
      mb: "0.9rem",
    }}
  >
    {children}
  </Box>
);

/* Hairline mark: a board stack-up seen on edge. Replaces the block's
   filled stock illustration — same slot, drawn in the site's icon
   language and actually about the thing the card claims. */
const StackMark = () => (
  <Box
    sx={{
      position: "relative",
      display: "flex",
      aspectRatio: "1",
      width: 108,
      borderRadius: "999px",
      border: `1px solid ${light.hair}`,
      "&::before": {
        content: '""',
        position: "absolute",
        inset: "-10px",
        borderRadius: "999px",
        border: `1px solid ${light.hairSoft}`,
      },
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      sx={{ m: "auto", width: 58, height: 58, color: light.teal }}
    >
      <g stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round">
        <path d="M32 12 52 22 32 32 12 22Z" opacity={0.35} />
        <path d="M32 24 52 34 32 44 12 34Z" opacity={0.6} />
        <path d="M32 36 52 46 32 56 12 46Z" />
      </g>
    </Box>
  </Box>
);

/* The blob behind the headline figure — kept from the original block. */
const Blob = () => (
  <Box
    component="svg"
    viewBox="0 0 254 104"
    fill="none"
    aria-hidden="true"
    sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", color: light.hair }}
  >
    <path
      d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
      fill="currentColor"
    />
  </Box>
);

const DELIVERY_STAGES = ["Source", "Release", "Updates", "Docs", "Yours"] as const;

const SYSTEM_POINTS = [
  { label: "Hardware", position: "top" },
  { label: "Firmware", position: "left" },
  { label: "App", position: "right" },
  { label: "Enclosure", position: "bottom" },
] as const;

const SYSTEM_POSITIONS = {
  top: { top: "2%", left: "50%", transform: "translateX(-50%)" },
  left: { top: "50%", left: 0, transform: "translate(-38%, -50%)" },
  right: { top: "50%", right: 0, transform: "translateY(-50%)" },
  bottom: { bottom: "2%", left: "50%", transform: "translateX(-50%)" },
} as const;

const SECURITY_RAILS = [
  { label: "Device", top: "16%" },
  { label: "Transport", top: "39%" },
  { label: "Backend", top: "62%" },
  { label: "Updates", top: "85%" },
] as const;

/* A delivery chain drawn as one open hairline object. At the smallest
   widths it turns vertically, preserving the full sequence without a
   nested scroller or dense status panel. */
const DeliveryFlow = () => (
  <Box
    role="img"
    aria-label="Delivery flow: source, release, updates and documentation are transferred into full client ownership"
    sx={{
      width: "100%",
      minWidth: 0,
      py: { xs: "0.5rem", sm: "0.8rem" },
      fontFamily: '"IBM Plex Mono", monospace',
      "@media (max-width: 319px)": {
        "& .delivery-flow": {
          width: "fit-content",
          mx: "auto",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& .delivery-node": {
          width: "auto",
          flexDirection: "row",
          gap: "0.65rem",
        },
        "& .delivery-label": { mt: 0 },
        "& .delivery-link": {
          flex: "0 0 14px",
          width: "1px",
          minWidth: "1px",
          height: 14,
          ml: "15px",
          mt: 0,
        },
      },
    }}
  >
    <Box
      className="delivery-flow"
      aria-hidden="true"
      sx={{ display: "flex", width: "100%", minWidth: 0, alignItems: "flex-start" }}
    >
      {DELIVERY_STAGES.map((stage, index) => {
        const isLast = index === DELIVERY_STAGES.length - 1;

        return (
          <React.Fragment key={stage}>
            <Box
              className="delivery-node"
              sx={{
                width: { xs: 32, sm: 40 },
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  border: `1px solid ${isLast ? light.teal : light.hair}`,
                  backgroundColor: isLast ? light.teal : light.raised,
                  color: isLast ? light.paper : light.teal,
                  boxShadow: isLast ? `0 0 0 5px ${light.tealWash}` : "none",
                }}
              >
                {isLast ? (
                  <Box
                    component="span"
                    sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.85rem", fontWeight: 700 }}
                  >
                    ✓
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{ width: 5, height: 5, borderRadius: "999px", backgroundColor: light.teal }}
                  />
                )}
              </Box>
              <Box
                component="span"
                className="delivery-label"
                sx={{
                  mt: "0.55rem",
                  color: isLast ? light.teal : light.inkFaint,
                  fontSize: { xs: "7px", sm: "8.5px" },
                  fontWeight: isLast ? 500 : 400,
                  letterSpacing: { xs: "0.04em", sm: "0.08em" },
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {stage}
              </Box>
            </Box>

            {!isLast && (
              <Box
                className="delivery-link"
                sx={{
                  position: "relative",
                  flex: "1 1 0",
                  minWidth: 4,
                  height: "1px",
                  mt: { xs: "15px", sm: "19px" },
                  backgroundColor: light.hair,
                  "&::after": {
                    content: '\"\"',
                    position: "absolute",
                    top: "50%",
                    right: -1,
                    width: 3,
                    height: 3,
                    borderRadius: "999px",
                    backgroundColor: light.teal,
                    transform: "translateY(-50%)",
                  },
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  </Box>
);

/* A light coordination dial: four product disciplines share one datum
   instead of appearing as disconnected rows of technical output. */
const SystemDial = () => (
  <Box
    role="img"
    aria-label="Hardware, firmware, app and enclosure aligned around one product system"
    sx={{
      position: "relative",
      width: { xs: "min(100%, 230px)", sm: "min(100%, 270px)" },
      aspectRatio: "1",
      minWidth: 0,
      mx: "auto",
      alignSelf: "center",
      "@media (max-width: 319px)": {
        "& .system-center": { width: 66, height: 66 },
        "& .system-tag": {
          gap: "0.25rem",
          px: "0.3rem",
          py: "0.25rem",
          fontSize: "7px",
          letterSpacing: "0.04em",
        },
      },
    }}
  >
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "12%",
          right: "12%",
          height: "1px",
          backgroundColor: light.hair,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "12%",
          bottom: "12%",
          left: "50%",
          width: "1px",
          backgroundColor: light.hair,
        }}
      />

      <Box
        className="system-center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: { xs: 76, sm: 88 },
          height: { xs: 76, sm: 88 },
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.35rem",
          borderRadius: "999px",
          border: `1px solid ${light.hair}`,
          backgroundColor: light.raised,
          boxShadow: `0 0 0 9px ${light.paper}, 0 0 0 10px ${light.hairSoft}`,
        }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: "999px", backgroundColor: light.teal }} />
        <Box
          component="span"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: light.ink,
            fontSize: { xs: "7.5px", sm: "8.5px" },
            lineHeight: 1.25,
            letterSpacing: "0.1em",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          One
          <br />
          system
        </Box>
      </Box>

      {SYSTEM_POINTS.map(({ label, position }) => (
        <Box
          key={label}
          className="system-tag"
          sx={{
            ...SYSTEM_POSITIONS[position],
            position: "absolute",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            px: { xs: "0.45rem", sm: "0.6rem" },
            py: { xs: "0.3rem", sm: "0.38rem" },
            borderRadius: "999px",
            border: `1px solid ${light.hair}`,
            backgroundColor: light.paper,
            color: light.inkFaint,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: { xs: "7.5px", sm: "8.5px" },
            letterSpacing: { xs: "0.05em", sm: "0.08em" },
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          <Box sx={{ width: 4, height: 4, flexShrink: 0, borderRadius: "999px", backgroundColor: light.teal }} />
          {label}
        </Box>
      ))}
    </Box>
  </Box>
);

/* Four exposed security rails terminate in one physical lock. The visual
   stays schematic and open rather than nesting coverage/status panels. */
const SecurityBus = () => (
  <Box
    role="img"
    aria-label="Device, transport, backend and update security converge in one protected product"
    sx={{
      position: "relative",
      width: { xs: "min(100%, 240px)", sm: "min(100%, 290px)" },
      aspectRatio: "6 / 5",
      minWidth: 0,
      mx: "auto",
      alignSelf: "center",
      fontFamily: '"IBM Plex Mono", monospace',
      "@media (max-width: 319px)": {
        "& .security-label": { width: 44, fontSize: "7px", letterSpacing: "0.03em" },
        "& .security-lock": { width: 38, height: 32 },
      },
    }}
  >
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "12%",
          bottom: "8%",
          left: "58%",
          width: "1px",
          backgroundColor: light.hair,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "58%",
          width: "12%",
          height: "1px",
          backgroundColor: light.hair,
        }}
      />

      {SECURITY_RAILS.map(({ label, top }) => (
        <Box
          key={label}
          sx={{
            position: "absolute",
            top,
            left: 0,
            width: "58%",
            display: "flex",
            alignItems: "center",
            transform: "translateY(-50%)",
          }}
        >
          <Box
            component="span"
            className="security-label"
            sx={{
              width: { xs: 54, sm: 66 },
              flexShrink: 0,
              color: light.inkFaint,
              fontSize: { xs: "7.5px", sm: "8.5px" },
              letterSpacing: { xs: "0.04em", sm: "0.08em" },
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Box>
          <Box
            sx={{
              position: "relative",
              flex: "1 1 auto",
              minWidth: 0,
              height: "1px",
              backgroundColor: light.hair,
              "&::after": {
                content: '\"\"',
                position: "absolute",
                top: "50%",
                right: -2,
                width: 5,
                height: 5,
                borderRadius: "999px",
                backgroundColor: light.teal,
                transform: "translateY(-50%)",
              },
            }}
          />
        </Box>
      ))}

      <Box
        className="security-lock"
        sx={{
          position: "absolute",
          top: "50%",
          left: "70%",
          width: { xs: 44, sm: 52 },
          height: { xs: 38, sm: 44 },
          transform: "translateY(-35%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: { xs: "0.65rem", sm: "0.8rem" },
          border: `1px solid ${light.hair}`,
          backgroundColor: light.tealWash,
          "&::before": {
            content: '\"\"',
            position: "absolute",
            top: "-52%",
            left: "24%",
            width: "52%",
            height: "58%",
            border: `1px solid ${light.teal}`,
            borderBottom: 0,
            borderRadius: "999px 999px 0 0",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 8,
            height: 8,
            borderRadius: "999px",
            backgroundColor: light.teal,
            "&::after": {
              content: '\"\"',
              position: "absolute",
              top: 6,
              left: "50%",
              width: "1px",
              height: 8,
              backgroundColor: light.teal,
              transform: "translateX(-50%)",
            },
          }}
        />
      </Box>
    </Box>
  </Box>
);

export default function FeatureBento() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: light.paper,
        px: { xs: "clamp(1rem, 5vw, 1.5rem)", md: "4rem" },
        py: { xs: "3rem", md: "5rem" },
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box sx={{ maxWidth: "1180px", mx: "auto" }}>
        <Rise>
          <Label>What I deliver</Label>
          <Typography
            variant="h2"
            sx={{
              m: 0,
              mb: { xs: "2rem", md: "2.8rem" },
              fontSize: { xs: "1.9rem", md: "2.7rem" },
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: light.ink,
              maxWidth: { xs: "18ch", md: "26ch" },
            }}
          >
            A finished product, not a pile of prototypes.
          </Typography>
        </Rise>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: { xs: "0.75rem", sm: "0.9rem", md: "1.1rem" },
          }}
        >
          {/* 1 — the figure */}
          <Rise sx={{ gridColumn: { xs: "span 6", sm: "span 3", lg: "span 2" }, display: "flex", minWidth: 0 }}>
            <Panel>
              <Box sx={{ position: "relative", display: "flex", height: { xs: 82, sm: 92 }, width: "min(210px, 100%)", alignItems: "center" }}>
                <Blob />
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    width: "fit-content",
                    pl: { xs: "1.1rem", sm: "1.6rem" },
                    fontSize: { xs: "2.55rem", sm: "3rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: light.ink,
                  }}
                >
                  100%
                </Box>
              </Box>
              <Box sx={{ mt: "1.4rem" }}>
                <Title>One supplier, whole product</Title>
                <Body>
                  Electronics, firmware, app and the security review come from one
                  desk. You brief once and get a working product back, instead of
                  managing four vendors who each blame the next one.
                </Body>
              </Box>
            </Panel>
          </Rise>

          {/* 2 — transport security */}
          <Rise sx={{ gridColumn: { xs: "span 6", sm: "span 3", lg: "span 2" }, display: "flex", minWidth: 0 }}>
            <Panel>
              <StackMark />
              <Box sx={{ mt: "1.6rem" }}>
                <Title>Built to be manufactured</Title>
                <Body>
                  Designed for a real enclosure, a real power budget and a real
                  assembly line from the first sketch — so what works on the bench
                  is the same thing that leaves the factory.
                </Body>
              </Box>
            </Panel>
          </Rise>

          {/* 3 — delivery pipeline */}
          <Rise sx={{ gridColumn: { xs: "span 6", sm: "span 6", lg: "span 2" }, display: "flex", minWidth: 0 }}>
            <Panel>
              <DeliveryFlow />
              <Box sx={{ mt: "1.5rem" }}>
                <Title>Complete pipeline, full ownership</Title>
                <Body>
                  Source, release tooling, product updates and working documentation
                  are delivered as one maintainable pipeline. Your team can ship,
                  support and extend the product with full ownership and no vendor lock-in.
                </Body>
              </Box>
            </Panel>
          </Rise>

          {/* 4 — system engineering */}
          <Rise sx={{ gridColumn: { xs: "span 6", sm: "span 6", lg: "span 3" }, display: "flex", minWidth: 0 }}>
            <Panel>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: "1.6rem",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.6rem" }}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      width: 46,
                      height: 46,
                      borderRadius: "999px",
                      border: `1px solid ${light.hair}`,
                      color: light.teal,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: "-7px",
                        borderRadius: "999px",
                        border: `1px solid ${light.hairSoft}`,
                      },
                    }}
                  >
                    <Box
                      component="svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      sx={{ m: "auto", width: 20, height: 20 }}
                    >
                      <rect x="6.5" y="4" width="11" height="16" rx="3" />
                      <path d="M9.5 4V2.2h5V4M9.5 20v1.8h5V20" />
                      <path d="M12 9v3.2l2.2 1.4" />
                    </Box>
                  </Box>
                  <Box>
                    <Label>System engineering</Label>
                    <Title>Engineered as one system</Title>
                    <Body>
                      Size, cost, battery life, performance and reliability are
                      balanced before they turn into expensive redesigns. Hardware,
                      firmware, app and enclosure are developed against the same
                      requirements, so the final product works as one coherent system.
                    </Body>
                  </Box>
                </Box>

                <SystemDial />
              </Box>
            </Panel>
          </Rise>

          {/* 5 — security coverage */}
          <Rise sx={{ gridColumn: { xs: "span 6", sm: "span 6", lg: "span 3" }, display: "flex", minWidth: 0 }}>
            <Panel>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) minmax(0, 1fr)" },
                  gap: "1.6rem",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.6rem" }}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      width: 46,
                      height: 46,
                      borderRadius: "999px",
                      border: `1px solid ${light.hair}`,
                      color: light.teal,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: "-7px",
                        borderRadius: "999px",
                        border: `1px solid ${light.hairSoft}`,
                      },
                    }}
                  >
                    <Box
                      component="svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      sx={{ m: "auto", width: 20, height: 20 }}
                    >
                      <path d="M12 3.2 19 6v6.2c0 4-2.9 7.1-7 8.6-4.1-1.5-7-4.6-7-8.6V6Z" />
                      <path d="m9.2 12.2 2 2 3.6-3.9" />
                    </Box>
                  </Box>
                  <Box>
                    <Label>Security</Label>
                    <Title>Secure from day one</Title>
                    <Body>
                      Security is designed into the product from day one — across the
                      device, transport, backend and update path. Risks are addressed
                      early, reducing rework and preparing the product for real-world
                      deployment.
                    </Body>
                  </Box>
                </Box>

                <SecurityBus />
              </Box>
            </Panel>
          </Rise>
        </Box>
      </Box>
    </Box>
  );
}
