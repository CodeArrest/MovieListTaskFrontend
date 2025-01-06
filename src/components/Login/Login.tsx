import React, { useState } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomInput from "@/components/CustomInput/CustomInput";
import styles from "./page.module.css";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Remember Me" } };

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    onLogin(email, password);
  };

  return (
    <Stack className={styles.loginContainer}>
      <Typography className={styles.loginText}>Sign in</Typography>
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
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox {...label} defaultChecked={true} />
        <Typography className={styles.rememberMeText}>Remember Me</Typography>
      </Stack>
      <CustomButton title={"Login"} width={"400"} onClick={handleLoginClick} />
      <Typography className={styles.rememberMeText} marginTop={2}>
        Don't have an account?{" "}
        <Link
          href={"/register"}
          style={{ color: "yellow", textDecoration: "none" }}
        >
          Click here to Register
        </Link>
      </Typography>
    </Stack>
  );
}
