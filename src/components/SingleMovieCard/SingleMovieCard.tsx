import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import StyledTypography from "../StyledTypography/StyledTypography";
import { BASE_URL } from "@/config/config";
import { useRouter } from "next/navigation";

export default function SingleMovieCard({ item }: any) {
  const router = useRouter(); // Initialize the router

  const theme = useTheme();

  // Define breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Smaller than sm
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // Between sm and md

  // Image sizes for rectangular shape
  const imageWidth = isXs ? 150 : isSm ? 250 : 280; // Narrow width
  const imageHeight = isXs ? 200 : isSm ? 400 : 400; // Taller height

  const handleCardClick = () => {
    // Redirect to the edit page using the movie's _id
    router.push(`/editMovie/${item._id}`);
  };
  return (
    <Stack
      sx={{
        width: { xs: "50%", sm: "15%", md: "15%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: { xs: "10px 0px", sm: "80px", md: "50px" },
      }}
      onClick={handleCardClick}
    >
      <Image
        src={`http://localhost:5000${item.poster}`}
        alt=""
        width={imageWidth}
        height={imageHeight}
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />
      <StyledTypography title={item.title} />
      <StyledTypography title={item.publishingYear} />
    </Stack>
  );
}
