import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./AppTheme";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import ColorModeSelect from "./ColorModeSelect";
import logo from "../../Images/logo.png";
import { useState } from "react";
import { Container, createTheme, Grid, ThemeProvider } from "@mui/material";
import axios from "axios";
import { Input as BaseInput } from "@mui/base/Input";
import { Link } from "react-router-dom";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "-31px 0px 0px -382px",
};

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [motDePasse, setMotDePasse] = React.useState("");

  const handleNomChange = (e) => setNom(e.target.value);
  const handlePrenomChange = (e) => setPrenom(e.target.value);
  const handleTelephoneChange = (e) => setTelephone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMotDePasseChange = (e) => setMotDePasse(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/r/addr", {
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        email: email,
        motDePasse: motDePasse,
      });
      console.log(nom, prenom);
    } catch (error) {
      console.error("Error during request:", error.response || error.message);

      let errorMessage = "An error occurred during registration.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Email already exists. Please try another email.";
            break;
          case 500:
            errorMessage = "An error occurred during registration.";
            break;
          default:
            errorMessage = error.response.data.detail || errorMessage;
            break;
        }
      }
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3925ea", // Couleur principale (bleu vibrant)
      },
      secondary: {
        main: "#f48aa8", // Couleur secondaire (rose clair)
      },
      background: {
        default: "#f0effe", // Couleur de fond (lavande claire)
      },
      text: {
        primary: "#060322", // Couleur du texte (presque noir)
      },
      accent: {
        main: "#ee6b48", // Couleur accent (orange rougeâtre)
      },
    },
  });

  const pale = {
    primary: {
      main: "#3925ea", // Couleur principale (bleu vibrant)
    },
    secondary: {
      main: "#f48aa8", // Couleur secondaire (rose clair)
    },
    background: {
      default: "#f0effe", // Couleur de fond (lavande claire)
    },
    text: {
      primary: "#060322", // Couleur du texte (presque noir)
    },
    accent: {
      main: "#ee6b48", // Couleur accent (orange rougeâtre)
    },
  };

  const InputElement = styled("input")(
    ({ theme }) => `
    width: 560px;
    desplay:flex;
    height: 60px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    margin-top: 10px;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${pale.text.main};
    border: 1px solid ${pale.accent.main};
    &:hover {
      border-color: ${pale.accent.main};
    }
  
    &:focus {
      border-color: ${pale.accent.main};
      box-shadow: 0 0 0 2px ${pale.accent.main};
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const InputElementt = styled("inputt")(
    ({ theme }) => `
    width: 60px;
    height: 60px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    margin-top: 10px;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${pale.text.main};
    border: 1px solid ${pale.accent.main};
    &:hover {
      border-color: ${pale.accent.main};
    }
  
    &:focus {
      border-color: ${pale.accent.main};
      box-shadow: 0 0 0 2px ${pale.accent.main};
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const Input = React.forwardRef(function CustomInput(props, ref) {
    return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
  });
  const TextF = React.forwardRef(function CustomInput(props, ref) {
    return <BaseInput slots={{ inputt: InputElementt }} {...props} ref={ref} />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="">
        <CssBaseline />
        <Box
          sx={{
            margin: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}>
          <img src={logo} style={logoStyle} alt="Logo" />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: "clamp(3rem, 10vw, 2.15rem)",
              fontWeight: "bold",
              
              
            }}>
            Join Us Today
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="post"
            sx={{ display: "flex", flexDirection: "column", gap: 2,marginTop:"20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <TextField
                    color="accent"
                    type="Nom"
                    id="Nom"
                    value={nom}
                    onChange={handleNomChange}
                    label="first name"
                    variant="outlined"
                    required
                    sx={{ bgcolor: "white", width: "260px",marginBottom:"20px" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <TextField
                    color="accent"
                    name="Prenom"
                    placeholder="Prenom"
                    type="Prenom"
                    id="Prenom"
                    value={prenom}
                    onChange={handlePrenomChange}
                    label="last name"
                    variant="outlined"
                    required
                    sx={{ bgcolor: "white", width: "260px",marginBottom:"20px" }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl>
              <TextField
                color="accent"
                name="Telephone"
                fullWidth
                type="number"
                id="Telephone"
                value={telephone}
                onChange={handleTelephoneChange}
                label="Telephone"
                variant="outlined"
                required
                sx={{ bgcolor: "white",marginBottom:"20px" }}
              />
            </FormControl>

            <FormControl>
              <TextField
                aria-label="Demo input"
                required
                fullWidth
                variant="outlined"
                id="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailErrorMessage}
                label="Email"
                color="accent"
                sx={{ bgcolor: "white",marginBottom:"20px" }}
              />
            </FormControl>
            <FormControl>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                variant="outlined"
                value={motDePasse}
                onChange={handleMotDePasseChange}
                error={passwordError}
                helperText={passwordErrorMessage}
                sx={{ bgcolor: "white",marginBottom:"20px" }}
                label="Password"
                color="accent"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained"sx={{marginBottom:"10px"}}>
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary",marginBottom:"10px" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
           
           
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/SignIn" style={{color:"#ee6b48"}} >Sign In</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
