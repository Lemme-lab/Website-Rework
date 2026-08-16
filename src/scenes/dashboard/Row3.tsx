import { Box, Divider, Typography } from "@mui/material";
import Footer from "@/components/Footer";
import SocialChips from "@/components/Socials";
import { light } from "@/palette";

type Skill = {
  iconSrc: string;
  text: string;
};

type Experience = {
  year: string;
  title: string;
  company: string;
  description: string;
};

const softwareSkills: Skill[] = [
  { iconSrc: "../../Images/c-.webp", text: "C/C++" },
  { iconSrc: "../../Images/java.webp", text: "Java" },
  { iconSrc: "../../Images/python.webp", text: "Python" },
  { iconSrc: "../../Images/Flutter.webp", text: "Flutter" },
  { iconSrc: "../../Images/java-script.webp", text: "JS" },
  { iconSrc: "../../Images/nodejs.webp", text: "NodeJS" },
  { iconSrc: "../../Images/React.webp", text: "React" },
  { iconSrc: "../../Images/tensorflow.webp", text: "Tensorflow" },
  { iconSrc: "../../Images/hibernate.webp", text: "Hibernate" },
  { iconSrc: "../../Images/api.webp", text: "Rest API" },
  { iconSrc: "../../Images/pentesting.webp", text: "Pentesting" },
  { iconSrc: "../../Images/network.webp", text: "Network" },
  { iconSrc: "../../Images/mysql.webp", text: "MySQL" },
  { iconSrc: "../../Images/mongodb.webp", text: "MongoDB" },
];

const hardwareSkills: Skill[] = [
  { iconSrc: "../../Images/mcu.webp", text: "Microcontroller" },
  { iconSrc: "../../Images/soc.webp", text: "SOC" },
  { iconSrc: "../../Images/analog.webp", text: "Analog" },
  { iconSrc: "../../Images/digital.webp", text: "Digital" },
  { iconSrc: "../../Images/pcb.webp", text: "PCB Design" },
  { iconSrc: "../../Images/multisim.webp", text: "Simulation" },
  { iconSrc: "../../Images/highspeed.webp", text: "Highspeed Design" },
  { iconSrc: "../../Images/chip.webp", text: "IC Design" },
];

const experienceData: Experience[] = [
  {
    year: "2022",
    title: "Technicus Award Winner",
    company: "HTL Mössingerstraße",
    description: 'Winner HTL Mössingerstraße "Technicus Award 2022" with Project Wuldor',
  },
  {
    year: "2022",
    title: "Internship",
    company: "University Klagenfurt",
    description:
      '1 Month "Machine Learning in Constrained Environments" Internship, Developing a Machine Learning Model for Transferring Still Images to Videos in Constrained Environments: Exploring Video Processing, Model Architecture, and Application Scenarios.',
  },
  {
    year: "2023",
    title: "Technicus Award Winner",
    company: "HTL Mössingerstraße",
    description: 'Winner HTL Mössingerstraße "Technicus Award 2023" with Project Airframe',
  },
  {
    year: "2023",
    title: "Internship",
    company: "SYMVARO GmbH",
    description:
      "Two-Month Internship Project: Developing a User-Centric App Utilizing an Alternative Framework to the Companys Standard. Emphasizing an Intuitive Frontend Integration with the Backend, Adhering to Industry Standards for Readable and Efficient Code.",
  },
  {
    year: "2024",
    title: "innovation@school among 10 funded projects - Diplomarbeit",
    company: "HTL Mössingerstraße",
    description: "Among the 10 funded projects with €2000, invited to the Tech-Gala in Carinthia",
  },
  {
    year: "2024",
    title: "innovation@school Winner - Diplomarbeit",
    company: "HTL Mössingerstraße",
    description: "Winner of the 2024 innovation@school Award with Cyclo Test Bench (CTB)",
  },
  {
    year: "2024",
    title: "Bosch Innovationspreis Top 5 - Diplomarbeit",
    company: "HTL Mössingerstraße",
    description: "Among the top 5 projects, invited to the Bosch Gala in Vienna",
  },
];

const sectionSx = {
  width: "100%",
  px: { xs: "1rem", sm: "1.5rem", md: "4rem" },
  py: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
  boxSizing: "border-box",
} as const;

const headingSx = {
  m: 0,
  mb: { xs: "2rem", sm: "2.6rem" },
  color: light.ink,
  fontSize: "clamp(2rem, 7vw, 2.5rem)",
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  textAlign: "center",
  overflowWrap: "anywhere",
} as const;

const SectionMark = () => (
  <Box
    aria-hidden="true"
    sx={{
      width: 50,
      height: 3,
      mx: "auto",
      mb: { xs: "2rem", sm: "2.5rem" },
      borderRadius: "999px",
      backgroundColor: light.teal,
    }}
  />
);

const SkillBox = ({ iconSrc, text }: Skill) => (
  <Box
    sx={{
      minWidth: 0,
      minHeight: { xs: 136, sm: 160, md: 175 },
      width: "100%",
      p: { xs: "1rem 0.7rem", sm: "1.35rem 0.9rem", md: "1.5rem 1rem" },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: { xs: "0.8rem", sm: "1rem" },
      textAlign: "center",
      borderRadius: { xs: "1rem", sm: "1.25rem" },
      backgroundColor: light.plate,
      border: `1px solid ${light.hairSoft}`,
      boxShadow: light.lift,
      transition: `transform 620ms ${light.ease}, box-shadow 620ms ${light.ease}`,
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: light.liftHover,
        },
      },
    }}
  >
    <Box
      sx={{
        width: { xs: "3.7rem", sm: "4.25rem", md: "4.6rem" },
        height: { xs: "3.7rem", sm: "4.25rem", md: "4.6rem" },
        flexShrink: 0,
        borderRadius: { xs: "0.85rem", sm: "1rem" },
        backgroundColor: light.console,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <Box
        component="img"
        src={iconSrc}
        alt=""
        sx={{
          width: { xs: "2rem", sm: "2.35rem", md: "2.6rem" },
          height: { xs: "2rem", sm: "2.35rem", md: "2.6rem" },
          objectFit: "contain",
        }}
      />
    </Box>
    <Typography
      sx={{
        color: light.ink,
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
        fontWeight: 500,
        lineHeight: 1.2,
        overflowWrap: "anywhere",
      }}
    >
      {text}
    </Typography>
  </Box>
);

const SkillSection = ({ title, skills }: { title: string; skills: Skill[] }) => (
  <Box component="section" sx={sectionSx}>
    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
      <Typography variant="h3" sx={headingSx}>
        {title}
      </Typography>
      <SectionMark />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: "0.75rem", sm: "1rem", md: "1.25rem" },
          "@media (max-width: 319px)": {
            gridTemplateColumns: "minmax(0, 1fr)",
          },
        }}
      >
        {skills.map((skill) => (
          <SkillBox key={skill.text} {...skill} />
        ))}
      </Box>
    </Box>
  </Box>
);

const ExperienceItem = ({ year, title, company, description }: Experience) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      minWidth: 0,
      px: { xs: "1.15rem", sm: "2rem", md: "2.5rem" },
      py: { xs: "2rem", sm: "2.35rem", md: "2.5rem" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      borderRadius: { xs: "1rem", sm: "12px" },
      backgroundColor: light.plate,
      border: `1px solid ${light.hairSoft}`,
      boxShadow: `${light.inset}, ${light.lift}`,
      transition: `transform 620ms ${light.ease}, box-shadow 620ms ${light.ease}`,
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `${light.inset}, ${light.liftHover}`,
        },
      },
    }}
  >
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: -15,
        left: "calc(50% - 15px)",
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: light.teal,
        border: `3px solid ${light.paper}`,
      }}
    />

    <Typography
      sx={{
        mb: "0.9rem",
        fontFamily: '"IBM Plex Mono", monospace',
        color: light.inkFaint,
        letterSpacing: "0.18em",
        fontSize: "0.8rem",
      }}
    >
      {year}
    </Typography>
    <Typography
      variant="h5"
      sx={{
        mb: "0.8rem",
        maxWidth: "100%",
        color: light.ink,
        fontWeight: 600,
        fontSize: "clamp(1.1rem, 5vw, 1.35rem)",
        lineHeight: 1.3,
        overflowWrap: "anywhere",
      }}
    >
      {title}
    </Typography>

    <Box
      sx={{
        display: "inline-flex",
        maxWidth: "100%",
        px: { xs: "0.7rem", sm: "1rem" },
        py: "0.3rem",
        mb: "1rem",
        borderRadius: "8px",
        border: "1px solid rgba(11,111,94,0.24)",
        backgroundColor: light.tealWash,
      }}
    >
      <Typography
        sx={{
          maxWidth: "100%",
          color: light.teal,
          fontWeight: 500,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          overflowWrap: "anywhere",
        }}
      >
        {company}
      </Typography>
    </Box>

    <Typography
      sx={{
        maxWidth: "100%",
        color: light.inkSoft,
        fontSize: { xs: "0.94rem", sm: "1.02rem" },
        lineHeight: 1.6,
        overflowWrap: "anywhere",
      }}
    >
      {description}
    </Typography>
  </Box>
);

const Row3 = () => (
  <>
    <SkillSection title="Software Skills" skills={softwareSkills} />
    <SkillSection title="Hardware Skills" skills={hardwareSkills} />

    <Box component="section" sx={sectionSx}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={headingSx}>
          My Experience
        </Typography>
        <SectionMark />

        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: "2rem", sm: "2.5rem" },
          }}
        >
          {experienceData.map((experience) => (
            <ExperienceItem
              key={`${experience.year}-${experience.title}`}
              {...experience}
            />
          ))}
        </Box>

        <Divider
          sx={{
            width: "80%",
            mt: { xs: "3.5rem", sm: "4.5rem" },
            borderColor: light.hair,
          }}
        />
      </Box>
    </Box>

    <Box
      component="section"
      id="v"
      sx={{
        ...sectionSx,
        pt: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
        pb: { xs: "4rem", sm: "5rem", md: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          ...headingSx,
          mb: { xs: "2rem", sm: "3rem" },
          maxWidth: "100%",
          fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
          textTransform: "uppercase",
          letterSpacing: { xs: "0.08em", sm: "0.15em" },
        }}
      >
        Connect with Me
      </Typography>
      <SocialChips size={96} labels />
    </Box>

    <Footer />
  </>
);

export default Row3;
