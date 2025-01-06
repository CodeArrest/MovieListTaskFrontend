import React from "react";
import Button from "@mui/material/Button";

export default function CustomButton({ title, width, onClick }: any) {
  return (
    <Button
      style={{
        width: width + "px",
        height: "54px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        background: "#2bd17e",
        color: "#fff",
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
