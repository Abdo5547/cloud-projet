import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormControl,
  TextField,
  Typography,
  Container,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Images/logo.png";

axios.defaults.withCredentials = true;

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "-31px 0px 0px -382px",
};

const theme = createTheme({
  palette: {
    primary: { main: "#3925ea" },
    secondary: { main: "#f48aa8" },
    background: { default: "#f0effe" },
    text: { primary: "#060322" },
    accent: { main: "#ee6b48" },
  },
});

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backend: "",
  });

  const navigate = useNavigate();

  // Validation côté client
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const lengthCriteria = value.length >= 8;
    const complexityCriteria =
      /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    return lengthCriteria && complexityCriteria;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Veuillez entrer une adresse email valide.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation finale avant soumission
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        backend: "Veuillez corriger les erreurs dans le formulaire.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/resident/loginresident",
        { userName: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      if (response.status === 200) {
        navigate("/resident");
      }
    } catch (error) {
      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          backend: error.response.data.message || "Erreur de connexion.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          backend: "Une erreur s'est produite. Veuillez réessayer.",
        }));
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <img src={logo} style={logoStyle} alt="Logo" />
          <Typography
            component="h1"
            variant="h6"
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: "clamp(3rem, 10vw, 2.15rem)",
              marginTop: "20px",
              marginBottom: "20px",
            }}>
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="post"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}>
            <TextField
            color="accent"
              id="email"
              value={email}
              onChange={handleEmailChange}
              label="Email"
              required
              placeholder="your@email.com"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: "20px" }}
            />
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "20px" }}>
              <InputLabel color="accent" htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
              color="accent"
                id="password"
                placeholder="***********"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <Typography variant="caption" color="error">
                {errors.password}
              </Typography>
            </FormControl>
            {errors.backend && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2 }}>
                {errors.backend}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography>
              Don't have an account?{" "}
              <Link to="/payment1" style={{ color: theme.palette.accent.main }}>
                Sign Up
              </Link>
            </Typography>
            <Typography
              sx={{ textAlign: "center", marginTop: "20px" }}
              color="accent.main>">
              Sing in as admin{" "}
              <Link to="/SignInAdmin" style={{ color: "#ee6b48" }}>
                Sign In Admin
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
