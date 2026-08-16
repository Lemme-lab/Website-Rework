import { Box, Typography } from "@mui/material";
import HardwareIcon from "@mui/icons-material/Memory";
import PrototypingIcon from "@mui/icons-material/Build";
import Console from "@/components/Console";
import DashboardBox from "@/components/DashboardBox";
import FeatureBento from "@/components/FeatureBento";
import Rise from "@/components/Rise";
import { light } from "@/palette";

const capabilityCardSx = {
  minWidth: 0,
  width: "100%",
  height: "100%",
  minHeight: { xs: "14rem", sm: "15rem" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  p: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
  borderRadius: "1.5rem",
  backgroundColor: light.plate,
  border: `1px solid ${light.hairSoft}`,
  boxShadow: `${light.inset}, ${light.lift}`,
  color: light.ink,
  textAlign: "center",
  transition: `transform 620ms ${light.ease}, box-shadow 620ms ${light.ease}`,
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: `${light.inset}, ${light.liftHover}`,
    },
  },
};

const capabilityTitleSx = {
  mt: "1rem",
  mb: "0.65rem",
  fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: "0.055em",
  textTransform: "uppercase",
  color: light.teal,
  overflowWrap: "anywhere",
};

const capabilityDescriptionSx = {
  m: 0,
  maxWidth: "30ch",
  fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
  lineHeight: 1.65,
  color: light.inkSoft,
};

const Row1 = () => (
  <>
    <Box
      component="section"
      id="about"
      aria-label="Engineering overview"
      sx={{
        width: "100%",
        minWidth: 0,
        px: { xs: "clamp(1rem, 5vw, 1.5rem)", md: "4rem" },
        pt: { xs: "3rem", md: "5rem" },
        pb: { xs: "1.5rem", md: "2.5rem" },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1180px", minWidth: 0, mx: "auto" }}>
        <Rise>
          <DashboardBox
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              p: { xs: "1.25rem 0", sm: "1.75rem 0", md: "2.25rem 0" },
              backgroundColor: "transparent",
              borderRadius: 0,
              textAlign: "left",
            }}
          >
            <Typography
              component="p"
              sx={{
                alignSelf: { xs: "flex-start", sm: "flex-end" },
                maxWidth: "42ch",
                mb: { xs: "1.75rem", md: "2.25rem" },
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "clamp(0.66rem, 1.4vw, 0.78rem)",
                lineHeight: 1.65,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textAlign: { xs: "left", sm: "right" },
                color: light.inkFaint,
              }}
            >
              MULTI-DISCIPLINARY ENGINEER WITH 6 YEARS OF EXPERIENCE
            </Typography>

            <Typography
              component="h2"
              sx={{
                m: 0,
                fontSize: "clamp(1.85rem, 10vw, 4.25rem)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "0.035em",
                color: light.ink,
                overflowWrap: "anywhere",
              }}
            >
              SOFTWARE
              <br />
              &amp; HARDWARE,
              <br />
              Mechanical
            </Typography>

            <Typography
              sx={{
                mt: { xs: "1.5rem", md: "2rem" },
                maxWidth: "52ch",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                lineHeight: 1.7,
                color: light.inkSoft,
              }}
            >
              With a foundation in Computer Science and expertise spanning from
              full-stack development to AI and hardware design, I have engineered
              and led large-scale student projects generating 5000€ in prize money
              and multiple awards.
            </Typography>
          </DashboardBox>
        </Rise>

        <Box
          sx={{
            mt: { xs: "1.25rem", md: "1.75rem" },
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: { xs: "1rem", md: "1.25rem" },
            alignItems: "stretch",
            "@media (min-width: 720px)": {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            "@media (min-width: 1120px)": {
              gridTemplateColumns:
                "minmax(0, 0.78fr) minmax(34rem, 1.7fr) minmax(0, 0.78fr)",
            },
          }}
        >
          <Rise
            delay={50}
            sx={{
              minWidth: 0,
              display: "flex",
              "@media (min-width: 720px) and (max-width: 1119px)": {
                gridColumn: "1",
                gridRow: "2",
              },
              "@media (min-width: 1120px)": {
                gridColumn: "1",
                gridRow: "1",
              },
            }}
          >
            <DashboardBox sx={capabilityCardSx}>
              <HardwareIcon sx={{ fontSize: "3rem", color: light.teal }} />
              <Typography component="h3" sx={capabilityTitleSx}>
                Advanced Hardware Design
              </Typography>
              <Typography sx={capabilityDescriptionSx}>
                From PCB design to full system architecture, developing hardware
                solutions that push the boundaries.
              </Typography>
            </DashboardBox>
          </Rise>

          <Rise
            delay={90}
            sx={{
              minWidth: 0,
              display: "flex",
              minHeight: { xs: "25rem", sm: "27rem" },
              "@media (min-width: 720px) and (max-width: 1119px)": {
                gridColumn: "1 / -1",
                gridRow: "1",
              },
              "@media (min-width: 1120px)": {
                gridColumn: "2",
                gridRow: "1",
                minHeight: "30rem",
              },
            }}
          >
            <DashboardBox
              sx={{
                minWidth: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "stretch",
                p: "0.5rem",
                overflow: "hidden",
                borderRadius: "1.5rem",
                backgroundColor: light.plate,
                border: `1px solid ${light.hairSoft}`,
                boxShadow: `${light.inset}, ${light.lift}`,
              }}
            >
              <Console />
            </DashboardBox>
          </Rise>

          <Rise
            delay={130}
            sx={{
              minWidth: 0,
              display: "flex",
              "@media (min-width: 720px) and (max-width: 1119px)": {
                gridColumn: "2",
                gridRow: "2",
              },
              "@media (min-width: 1120px)": {
                gridColumn: "3",
                gridRow: "1",
              },
            }}
          >
            <DashboardBox sx={capabilityCardSx}>
              <PrototypingIcon sx={{ fontSize: "3rem", color: light.teal }} />
              <Typography component="h3" sx={capabilityTitleSx}>
                Innovative Prototyping
              </Typography>
              <Typography sx={capabilityDescriptionSx}>
                Rapid prototyping and development for testing innovative ideas and
                concepts.
              </Typography>
            </DashboardBox>
          </Rise>
        </Box>
      </Box>
    </Box>

    <FeatureBento />
  </>
);

export default Row1;
