import React, { useState } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomInput from "@/components/CustomInput/CustomInput";
import styles from "./page.module.css";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Remember Me" } };

interface RegisterProps {
  onRegister: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
}

export default function Register({ onRegister }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterClick = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    onRegister(name, email, password, confirmPassword);
  };

  return (
    <Stack className={styles.loginContainer}>
      <Typography className={styles.loginText}>Sign Up</Typography>
      <CustomInput
        placeholder="Name"
        color="secondary"
        width="400"
        value={name}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <CustomInput
        placeholder="Email"
        color="secondary"
        width="400"
        value={email}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <CustomInput
        placeholder="Password"
        color="secondary"
        width="400"
        type="password"
        value={password}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <CustomInput
        placeholder="Confirm Password"
        color="secondary"
        width="400"
        type="password"
        value={confirmPassword}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
      />
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox {...label} defaultChecked={true} />
        <Typography className={styles.rememberMeText}>
          Agree to Terms
        </Typography>
      </Stack>
      <CustomButton
        title={"Register"}
        width={"400"}
        onClick={handleRegisterClick}
      />
      <Typography className={styles.rememberMeText} marginTop={2}>
        <Link href={"/"} style={{ color: "yellow", textDecoration: "none" }}>
          Click here to Login
        </Link>
      </Typography>
    </Stack>
  );
}
