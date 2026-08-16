import { Box } from "@mui/material";
import { light } from "@/palette";
import HeroHeader from "@/components/HeroHeader";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const DashBoard = () => {
  return (
    <Box
      sx={{
        backgroundColor: light.paper,
        width: "100%",
        minWidth: 0,
        position: "relative",
        overflowX: "clip",
      }}
    >
      <HeroHeader />

      <Box component="main" sx={{ width: "100%", minWidth: 0 }}>
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </Box>
  );
};

export default DashBoard;
