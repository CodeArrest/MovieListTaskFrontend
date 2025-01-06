import { Box, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import StyledTypography from "../StyledTypography/StyledTypography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const router = useRouter();

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Smaller than sm
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // Between sm and md

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Stack
      sx={{
        marginLeft: { xs: "50px 20px", sm: "150px", md: "150px" },
        marginRight: { xs: "50px 20px", sm: "150px", md: "150px" },
      }}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Box onClick={() => router.push("/movielist")}>
          <StyledTypography title={"My Movies"} />
        </Box>

        <ControlPointIcon
          onClick={() => {
            router.push("/addMovie");
          }}
          sx={{ color: "#fff", cursor: "pointer" }}
        />
      </Box>
      <Box onClick={handleLogout}>
        {isXs || isSm ? (
          <LogoutIcon sx={{ color: "#fff" }} />
        ) : (
          <StyledTypography title={"Logout"} />
        )}
      </Box>
    </Stack>
  );
};

export default Header;
