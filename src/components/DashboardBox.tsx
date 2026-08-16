import { Box } from "@mui/material";
import { styled } from "@mui/system";

/* Layout wrapper only. Surfaces (plate, hairline, lift) are declared by
   the cards themselves so grid cells used purely for spacing stay invisible. */
const DashboardBox = styled(Box)({
  backgroundColor: "transparent",
  borderRadius: "1.25rem",
});

export default DashboardBox;
