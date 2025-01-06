import { Stack, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/navigation";

export default function EmptyMovieList() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/addMovie");
  };

  return (
    <Stack
      sx={{
        height: { xs: "100vh", sm: "100vh", md: "100vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Typography
        component={"h2"}
        sx={{
          fontSize: { xs: "20px", sm: "30px", md: "48px" },
          color: "white",
          marginBottom: { xs: "5px", sm: "10px", md: "20px" },
          textTransform: "none",
        }}
      >
        Your movie list is empty
      </Typography>
      <CustomButton
        title={"Add a new Movie"}
        width={202}
        onClick={handleButtonClick}
      />
    </Stack>
  );
}
