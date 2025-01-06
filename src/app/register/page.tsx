"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { BASE_URL } from "@/config/config";
import Register from "@/components/Register/Register";

export default function RegisterUser() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        name,
        email,
        password,
      });

      setSuccess(true);
      setError(""); // Clear any error

      // Navigate to login page
      router.push("/");
    } catch (err: any) {
      console.log("Error:", err);
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
      setSuccess(false);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#093545",
        width: "100%",
      }}
    >
      <Register onRegister={handleRegister} />
      {/* Snackbar for feedback */}
      <Snackbar
        open={Boolean(error || success)}
        autoHideDuration={4000}
        onClose={() => {
          setError("");
          setSuccess(false);
        }}
      >
        {error ? (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        ) : success ? (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Registration Successful! Redirecting...
          </Alert>
        ) : undefined}
      </Snackbar>
    </main>
  );
}
