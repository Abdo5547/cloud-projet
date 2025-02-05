import * as React from "react";

import AppTheme from "../Sign/AppTheme";
import ColorModeSelect from "../Sign/ColorModeSelect";
import logo from "../../Images/logo.png";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { Input as BaseInput } from "@mui/base";
import { Link, useNavigate } from "react-router-dom";

import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import {
  Box,
  Button,
  CssVarsProvider,
  FormControl,
  Grid,
  Typography,
} from "@mui/joy";
import { TextField } from "@mui/material";
import { Chair, Image } from "@mui/icons-material";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import theme from "../dashIncident/components/Theme";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "-31px 0px 0px -382px",
};

export default function Etap1(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const nav = useNavigate();

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleTelephoneChange = (e) => setTelephone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Vérification de la validité de l'email
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Vérification de la validité du mot de passe
  const validatePassword = () => {
    return password.length >= 8; // Exemple: Le mot de passe doit faire au moins 6 caractères
  };

  // Vérification si tous les champs sont remplis et valides
  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      telephone &&
      validateEmail() &&
      validatePassword()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("etap1");
    // Ici vous pouvez envoyer vos données à une API ou les stocker localement
    const etap1 = { firstName, lastName, telephone, email, password };

    localStorage.setItem("etap1", JSON.stringify(etap1));
    console.log(localStorage.getItem("etap1"));
    nav("/payment2");
  };

  return (
    <div style={{backgroundColor: "#f0effe" }}>
      <img src={logo} style={{width:"10%"}}/>
      <Stepper
        size="lg"
        sx={{
          mt: "40px",
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
              borderColor: "#2f1fd6",
              color: "#2f1fd6",
            },
            "&::after": {
              bgcolor: "#2f1fd6",
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
          active
          indicator={
            <StepIndicator sx={{ color: "#2f1fd6" }} variant="outlined">
              <ContactsRoundedIcon />
            </StepIndicator>
          }>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "lg",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}>
            Registration
          </Typography>
        </Step>
        <Step
          orientation="vertical"
          disabled
          indicator={
            <StepIndicator sx={{ color: "#2f1fd6" }} variant="outlined">
              <Chair />
            </StepIndicator>
          }
        />

        <Step
          orientation="vertical"
          disabled
          indicator={
            <StepIndicator variant="outlined">
              <CreditCardRoundedIcon />
            </StepIndicator>
          }
        />

        <Step
          orientation="vertical"
          disabled
          indicator={
            <StepIndicator variant="outlined">
              <CheckCircleRoundedIcon />
            </StepIndicator>
          }
        />
      </Stepper>

      <Card
        //onSubmit={handleeSubmit}
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "50%",
          mt: "50px",
          mx: "auto",
          // to make the demo resizable
          overflow: "auto",
          resize: "horizontal",
        }}>
        {" "}
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Personal informations
        </Typography>{" "}
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="FirstName"
              placeholder="first name"
              id="FirstName"
              value={firstName}
              onChange={handleFirstNameChange}
              label="first name"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="LastName"
              placeholder="last name"
              type="LastName"
              id="LastName"
              value={lastName}
              onChange={handleLastNameChange}
              label="last name"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Telephone</FormLabel>
            <Input
              name="Telephone"
              fullWidth
              type="number"
              id="Telephone"
              placeholder="Telephone"
              value={telephone}
              onChange={handleTelephoneChange}
              label="Telephone"
              required
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Email</FormLabel>
            <Input
              aria-label="Demo input"
              required
              fullWidth
              variant="outlined"
              id="email"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!validateEmail()}
              helperText={validateEmail() ? "" : "Invalid email address"}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              placeholder="••••••"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              error={!validatePassword()}
              helperText={
                validatePassword()
                  ? ""
                  : "Password must be at least 6 characters"
              }
            />
          </FormControl>
          <Checkbox label="Save card" sx={{ gridColumn: "1/-1", my: 1 }} />
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button
              variant="solid"
              color="primary"
              onClick={handleSubmit}
              disabled={!isFormValid()} // Le bouton sera désactivé si le formulaire n'est pas valide
            >
              Next
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
