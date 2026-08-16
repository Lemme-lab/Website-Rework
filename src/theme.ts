import { light } from "./palette";

export const tokens = {
  // graphite scale, 100 = lightest surface, 900 = darkest ink
  grey: {
    100: "#FFFFFF",
    200: "#F5F7F8",
    300: "#E8EBEE",
    400: "#D5DADE",
    500: "#B4BCC2",
    600: "#8A939B",
    700: "#656E76",
    800: "#3A4247",
    900: "#15181B",
  },
  primary: {
    // deepened mint — legible on light surfaces
    100: "#E6F4F1",
    200: "#C2E5DD",
    300: "#8FCEC1",
    400: "#4FA895",
    500: "#0B6F5E",
    600: "#0A6153",
    700: "#084F44",
    800: "#063A32",
    900: "#042620",
  },
  secondary: {
    // amber, held back
    100: "#FBF1E1",
    200: "#F5DDB8",
    300: "#EDC98C",
    400: "#D9A253",
    500: "#B8802F",
    600: "#996823",
    700: "#77501A",
    800: "#553912",
    900: "#33220A",
  },
  tertiary: {
    500: "#5C63B8",
  },
  background: {
    light: light.plate,
    main: light.paper,
  },
};

const display = ['"Space Grotesk"', "sans-serif"].join(",");
const body = ['"Space Grotesk"', "sans-serif"].join(",");

// mui theme settings
export const themeSettings = {
  palette: {
    mode: "light" as const,
    common: { black: light.ink, white: "#FFFFFF" },
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
      dark: tokens.primary[700],
      contrastText: "#FFFFFF",
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    text: {
      primary: light.ink,
      secondary: light.inkSoft,
      disabled: light.inkFaint,
    },
    divider: light.hair,
    background: {
      default: tokens.background.main,
      paper: tokens.background.light,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: body,
    fontSize: 12,
    h1: { fontFamily: display, fontSize: 32, color: light.ink },
    h2: { fontFamily: display, fontSize: 24, color: light.ink },
    h3: { fontFamily: display, fontSize: 20, fontWeight: 700, color: light.ink },
    h4: { fontFamily: display, fontSize: 14, fontWeight: 600, color: light.ink },
    h5: { fontFamily: body, fontSize: 12, fontWeight: 400, color: light.inkSoft },
    h6: { fontFamily: body, fontSize: 10, color: light.inkFaint },
  },
};
