import React from "react";
import TextField from "@mui/material/TextField";

export default function CustomInput({
  placeholder,
  color,
  width,
  type,
  onInputChange,
}: any) {
  return (
    <TextField
      style={{
        width: width + "px",
        background: "#224957",
        borderRadius: "10px",
        margin: "10px",
      }}
      placeholder={placeholder}
      color={color}
      type={type}
      sx={{
        input: {
          color: "white",
          "&::placeholder": {
            opacity: 1,
            color: "#fff",
          },
        },
        label: { color: "blue" },
      }}
      onChange={onInputChange}
    />
  );
}
