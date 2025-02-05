import * as React from "react";

import AppTheme from "../Sign/AppTheme";
import ColorModeSelect from "../Sign/ColorModeSelect";
import logo from "../../Images/logo.png";
import { useState } from "react";
import axios from "axios";
import { createTheme, styled } from "@mui/system";
import { Input as BaseInput } from "@mui/base";
import { Link } from "react-router-dom";

import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import theme from "../dashIncident/components/Theme";
import {
  Box,
  Button,
  Card,
  CssVarsProvider,
  FormControl,
  Grid,
  Typography,
} from "@mui/joy";
import { TextField } from "@mui/material";
import { Check } from "@mui/icons-material";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "-31px 0px 0px -382px",
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function Etap4(props) {
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

  return (
    <div className="contanire" style={{backgroundColor: "#f0effe"}}>
      <img src={logo} style={{ width: "10%" }} />

      <Stepper
        size="lg"
        sx={{
          mt: "60px",
          ml: "300px",
          width: "60%",
          "--StepIndicator-size": "3rem",
          "--Step-connectorInset": "0px",
          [`& .${stepIndicatorClasses.root}`]: {
            borderWidth: 4,
          },
          [`& .${stepClasses.root}::after`]: {
            height: 4,
          },
          [`& .${stepClasses.completed}`]: {
            [`& .${stepIndicatorClasses.root}`]: {
              borderColor: "success",
              color: "success",
            },
            "&::after": {
              bgcolor: "rgba(13, 255, 0, 0.29)",
            },
          },
          [`& .${stepClasses.active}`]: {
            [`& .${stepIndicatorClasses.root}`]: {
              borderColor: "currentColor",
            },
          },
          [`& .${stepClasses.disabled} *`]: {
            color: "neutral.outlinedDisabledColor",
          },
        }}>
        <Step
          orientation="vertical"
          completed
          indicator={
            <StepIndicator variant="outlined" color="success">
              <Check />
            </StepIndicator>
          }
        />
        <Step
          orientation="vertical"
          completed
          color="success"
          indicator={
            <StepIndicator variant="outlined" color="success">
              <Check />
            </StepIndicator>
          }
        />
        <Step
          orientation="vertical"
          completed
          color="success"
          indicator={
            <StepIndicator variant="outlined" color="success">
              <Check />
            </StepIndicator>
          }
        />
        <Step
          orientation="vertical"
          active
          indicator={
            <StepIndicator variant="outlined" sx={{ color: "#2f1fd6" }}>
              <CheckCircleRoundedIcon />
            </StepIndicator>
          }>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "lg",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}>
            Final step
          </Typography>
        </Step>
      </Stepper>

      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "50%",
          mx: "auto",
          marginTop: "50px",
          overflow: "auto",
          resize: "horizontal",
        }}>
        <h4>
          Your application has been successfully submitted. Please wait for the
          administrator's approval. In the meantime, click the button below to
          access your account.
        </h4>
        <Button sx={{ width: "100px" }}>
          <Link to="/signIn" style={{ textDecoration: "none", color: "white" }}>
            sign in
          </Link>
        </Button>
      </Card>

      
    </div>
  );
}
