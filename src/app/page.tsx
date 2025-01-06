"use client";

import Login from "@/components/Login/Login";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { BASE_URL } from "@/config/config";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      setSuccess(true);
      setError(""); // Clear error if successful

      // Store token if needed
      localStorage.setItem("token", response.data.accessToken);

      // Navigate to movielist
      router.push("/movielist");
    } catch (err: any) {
      console.log("Errror", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
      setSuccess(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/movielist");
    }
  }, []);

  return (
    <main className={styles.main}>
      <Login onLogin={handleLogin} />
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
            Login Successful!
          </Alert>
        ) : undefined}
      </Snackbar>
    </main>
  );
}
