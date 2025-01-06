import { Typography } from "@mui/material";
import React from "react";
export default function StyledTypography({ title }: any) {
  return (
    <Typography
      sx={{ cursor: "pointer", fontSize: { xs: 12, sm: 16, md: 20 } }}
      color={"white"}
    >
      {title}
    </Typography>
  );
}
