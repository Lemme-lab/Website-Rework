import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "@/components/Footer";
import SocialChips from "@/components/Socials";
import { light } from "@/palette";

// Get a free access key at https://web3forms.com (it is safe to expose publicly).
const WEB3FORMS_ACCESS_KEY = import.meta.env
  .VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const CONTACT_EMAIL = "lucas.lenarcic@gmail.com";

type SubmitStatus = "idle" | "sending" | "success" | "error";

type Service = {
  title: string;
  description: string;
  bullets: string[];
  popular?: boolean;
};

const services: Service[] = [
  {
    title: "Concept Design",
    description:
      "Working out what the product actually is: the technology behind it, how it is used, and which features earn their place.",
    bullets: [
      "Concept and product direction",
      "Technology selection",
      "Interaction and user flow",
      "Feature set and scope",
    ],
  },
  {
    title: "Full Product Build",
    description:
      "Brief to production as a single engagement, with one point of contact for the whole product.",
    bullets: [
      "Prototype through production",
      "Hardware, firmware and app",
      "Testing and validation",
      "Source and docs handed over",
    ],
    popular: true,
  },
  {
    title: "Software Engineering",
    description:
      "Firmware, app and backend built as one system, so the device and the cloud speak the same language.",
    bullets: [
      "Embedded firmware",
      "App and interface",
      "APIs and backend",
      "Secure over-the-air updates",
    ],
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
  color: light.ink,
  fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.04em",
  overflowWrap: "anywhere",
} as const;

const eyebrowSx = {
  mb: "0.75rem",
  color: light.inkFaint,
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: "0.78rem",
  lineHeight: 1.4,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
} as const;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: light.paper,
    color: light.ink,
    "& fieldset": {
      borderColor: light.hairSoft,
    },
    "&:hover fieldset": {
      borderColor: light.hair,
    },
    "&.Mui-focused fieldset": {
      borderColor: light.teal,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: light.inkSoft,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: light.teal,
  },
} as const;

const ServiceCard = ({
  title,
  description,
  bullets,
  popular,
}: Service) => (
  <Box
    sx={{
      position: "relative",
      minWidth: 0,
      minHeight: { md: 440 },
      p: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
      display: "flex",
      flexDirection: "column",
      borderRadius: { xs: "1rem", sm: "1.25rem" },
      backgroundColor: light.plate,
      border: `1px solid ${light.hairSoft}`,
      boxShadow: popular ? light.liftHover : light.lift,
      transform: { md: popular ? "translateY(-10px)" : "none" },
      transition: `transform 420ms ${light.ease}, box-shadow 420ms ${light.ease}`,
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          transform: { md: "translateY(-10px)" },
          boxShadow: light.liftHover,
        },
      },
    }}
  >
    {popular && (
      <Box
        sx={{
          position: "absolute",
          top: { xs: 18, sm: 22 },
          right: { xs: 18, sm: 22 },
          px: "0.7rem",
          py: "0.32rem",
          borderRadius: "999px",
          backgroundColor: light.ink,
          color: light.paper,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        Popular
      </Box>
    )}

    <Box
      aria-hidden="true"
      sx={{
        width: 44,
        height: 44,
        mb: "1.25rem",
        display: "grid",
        placeItems: "center",
        borderRadius: "50%",
        backgroundColor: light.tealWash,
        color: light.teal,
        fontFamily: '"IBM Plex Mono", monospace',
        fontWeight: 700,
      }}
    >
      +
    </Box>

    <Typography
      variant="h4"
      sx={{
        mb: "0.65rem",
        color: light.ink,
        fontSize: "clamp(1.35rem, 4vw, 1.65rem)",
        fontWeight: 650,
        lineHeight: 1.15,
        letterSpacing: "-0.025em",
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        mb: "1.5rem",
        color: light.inkSoft,
        fontSize: { xs: "0.95rem", sm: "1rem" },
        lineHeight: 1.6,
      }}
    >
      {description}
    </Typography>

    <Box
      component="ul"
      sx={{
        m: 0,
        p: 0,
        mb: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        listStyle: "none",
      }}
    >
      {bullets.map((bullet) => (
        <Box
          component="li"
          key={bullet}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.7rem",
            color: light.inkSoft,
            fontSize: { xs: "0.92rem", sm: "0.98rem" },
            lineHeight: 1.45,
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              mt: "0.05rem",
              color: light.teal,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            ✓
          </Box>
          <Box component="span">{bullet}</Box>
        </Box>
      ))}
    </Box>

    <Button
      component="a"
      href="#book-a-meeting"
      variant={popular ? "contained" : "outlined"}
      disableElevation
      sx={{
        mt: "auto",
        minHeight: 48,
        borderRadius: "10px",
        borderColor: popular ? light.ink : light.hair,
        backgroundColor: popular ? light.ink : "transparent",
        color: popular ? light.paper : light.ink,
        fontWeight: 650,
        textTransform: "none",
        "&:hover": {
          borderColor: light.ink,
          backgroundColor: popular ? light.console : light.tealWash,
        },
      }}
    >
      Book a Meeting&nbsp;&nbsp;→
    </Button>
  </Box>
);

const ServicesSection = () => (
  <Box component="section" sx={sectionSx}>
    <Box sx={{ width: "100%", maxWidth: "1180px", mx: "auto" }}>
      <Box sx={{ mb: { xs: "2.5rem", md: "4rem" }, textAlign: "center" }}>
        <Typography sx={eyebrowSx}>Services</Typography>
        <Typography variant="h2" sx={{ ...headingSx, maxWidth: 900, mx: "auto" }}>
          Choose how we can work together
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          alignItems: "stretch",
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </Box>
    </Box>
  </Box>
);

const BookingSection = () => {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans do not.
    if (data.get("botcheck")) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        "The form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.",
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New project inquiry from your portfolio",
          from_name: "Portfolio booking form",
          name: data.get("fullName"),
          email: data.get("email"),
          "Project type": data.get("projectType") || "Not specified",
          "Budget range": data.get("budgetRange") || "Not specified",
          "Preferred meeting time":
            data.get("preferredMeetingTime") || "Not specified",
          message: data.get("projectDetails") || "No details provided",
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          result.message ?? `Something went wrong. Email me at ${CONTACT_EMAIL}.`,
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        `Could not reach the server. Check your connection, or email me at ${CONTACT_EMAIL}.`,
      );
    }
  };

  const isSending = status === "sending";

  return (
  <Box
    component="section"
    id="book-a-meeting"
    sx={{
      ...sectionSx,
      pt: { xs: "3rem", sm: "4rem", md: "5rem" },
      borderTop: `1px solid ${light.hairSoft}`,
    }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: "1180px",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.25fr" },
        gap: { xs: "2.5rem", md: "4rem" },
        alignItems: "start",
      }}
    >
      <Box sx={{ pt: { md: "0.4rem" } }}>
        <Typography sx={eyebrowSx}>Contact / Book a Meeting</Typography>
        <Typography variant="h2" sx={{ ...headingSx, mb: "2rem" }}>
          Let&apos;s Work Together
        </Typography>

        <Box
          sx={{
            mb: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.95rem",
          }}
        >
          {[
            "Share your project goals",
            "Discuss what you need help with",
            "Plan the next steps together",
          ].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                color: light.ink,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 26,
                  height: 26,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: light.tealWash,
                  color: light.teal,
                  fontSize: "0.8rem",
                  fontWeight: 800,
                }}
              >
                ✓
              </Box>
              <Typography sx={{ fontSize: { xs: "0.98rem", sm: "1.05rem" } }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="form"
        aria-label="Book a meeting form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: "1.25rem", sm: "1.75rem", md: "2.25rem" },
          borderRadius: { xs: "1rem", sm: "1.25rem" },
          border: `1px solid ${light.hairSoft}`,
          backgroundColor: light.plate,
          boxShadow: light.lift,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: "1rem",
          }}
        >
          <TextField
            label="Full Name"
            name="fullName"
            placeholder="Your name"
            required
            disabled={isSending}
            fullWidth
            sx={fieldSx}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isSending}
            fullWidth
            sx={fieldSx}
          />
          <TextField
            select
            label="Project Type"
            name="projectType"
            defaultValue=""
            disabled={isSending}
            fullWidth
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              Select project type
            </MenuItem>
            <MenuItem value="concept-design">Concept Design</MenuItem>
            <MenuItem value="full-product-build">Full Product Build</MenuItem>
            <MenuItem value="software-engineering">
              Software Engineering
            </MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Budget Range"
            name="budgetRange"
            defaultValue=""
            disabled={isSending}
            fullWidth
            sx={fieldSx}
          >
            <MenuItem value="" disabled>
              Select budget range
            </MenuItem>
            <MenuItem value="under-500">Under €500</MenuItem>
            <MenuItem value="500-1000">€500 – €1,000</MenuItem>
            <MenuItem value="1000-2500">€1,000 – €2,500</MenuItem>
            <MenuItem value="2500-plus">€2,500+</MenuItem>
            <MenuItem value="not-sure">Not sure yet</MenuItem>
          </TextField>
        </Box>

        <TextField
          label="Project Details (Optional)"
          name="projectDetails"
          placeholder="Tell me about your project, goals, and what you need help with..."
          multiline
          minRows={5}
          disabled={isSending}
          fullWidth
          sx={{ ...fieldSx, mt: "1rem" }}
        />

        <TextField
          label="Preferred Meeting Time (Optional)"
          name="preferredMeetingTime"
          placeholder="e.g. Tuesday afternoon"
          disabled={isSending}
          fullWidth
          sx={{ ...fieldSx, mt: "1rem" }}
        />

        {/* Honeypot: hidden from people, tempting to bots. */}
        <Box
          component="input"
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          sx={{ display: "none" }}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          disabled={isSending}
          startIcon={
            isSending ? (
              <CircularProgress size={18} sx={{ color: light.paper }} />
            ) : undefined
          }
          sx={{
            mt: "1.25rem",
            minHeight: 50,
            borderRadius: "10px",
            backgroundColor: light.ink,
            color: light.paper,
            fontWeight: 650,
            textTransform: "none",
            "&:hover": {
              backgroundColor: light.console,
            },
          }}
        >
          {isSending ? "Sending…" : "Book a Meeting  →"}
        </Button>

        <Box aria-live="polite" sx={{ minHeight: "1.5rem" }}>
          {status === "success" && (
            <Typography
              sx={{
                mt: "0.9rem",
                p: "0.75rem 1rem",
                borderRadius: "10px",
                backgroundColor: light.tealWash,
                color: light.teal,
                fontSize: "0.9rem",
                fontWeight: 600,
                lineHeight: 1.55,
                textAlign: "center",
              }}
            >
              Thanks — your message is on its way. I&apos;ll get back to you
              shortly.
            </Typography>
          )}

          {status === "error" && (
            <Typography
              sx={{
                mt: "0.9rem",
                p: "0.75rem 1rem",
                borderRadius: "10px",
                border: `1px solid ${light.hair}`,
                color: light.ink,
                fontSize: "0.9rem",
                lineHeight: 1.55,
                textAlign: "center",
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>

        <Typography
          sx={{
            mt: "0.9rem",
            color: light.inkFaint,
            fontSize: "0.78rem",
            lineHeight: 1.55,
            textAlign: "center",
          }}
        >
          Your information is only used to respond to your inquiry.
        </Typography>
      </Box>
    </Box>
  </Box>
  );
};

const Row3 = () => (
  <>
    <ServicesSection />
    <BookingSection />

    <Box sx={{ px: { xs: "1rem", sm: "1.5rem", md: "4rem" } }}>
      <Divider
        sx={{
          width: "100%",
          maxWidth: "1000px",
          mx: "auto",
          borderColor: light.hair,
        }}
      />
    </Box>

    <Box
      component="section"
      id="v"
      sx={{
        ...sectionSx,
        pt: { xs: "3rem", sm: "4rem", md: "4.5rem" },
        pb: { xs: "4rem", sm: "5rem", md: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: { xs: "2rem", sm: "3rem" },
          maxWidth: "100%",
          color: light.ink,
          fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
          lineHeight: 1.08,
          textAlign: "center",
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
