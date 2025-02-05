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
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Button, CssVarsProvider, Grid } from "@mui/joy";
import { TextField } from "@mui/material";
import { Check, Css } from "@mui/icons-material";
const AddCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [errors, setErrors] = useState({});

  const validateCardNumber = (value) => {
    if (!/^\d{0,16}$/.test(value)) {
      return "Card number must be numeric and up to 16 digits.";
    }
    return "";
  };

  const validateExpiryDate = (value) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return "Expiry date must be in MM/YY format.";
    }
    const [month, year] = value.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100; // Last two digits of the year
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Expiry date must be in the future.";
    }
    return "";
  };

  const validateCvc = (value) => {
    if (!/^\d{3,4}$/.test(value)) {
      return "CVC must be 3 or 4 digits.";
    }
    return "";
  };

  const validateCardHolderName = (value) => {
    if (!value.trim()) {
      return "Card holder name cannot be empty.";
    }
    return "";
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    setCardNumber(value);
    setErrors((prev) => ({ ...prev, cardNumber: validateCardNumber(value) }));
  };

  const handleExpiryDateChange = (event) => {
    const value = event.target.value;
    setExpiryDate(value);
    setErrors((prev) => ({ ...prev, expiryDate: validateExpiryDate(value) }));
  };

  const handleCvcChange = (event) => {
    const value = event.target.value;
    setCvc(value);
    setErrors((prev) => ({ ...prev, cvc: validateCvc(value) }));
  };

  const handleCardHolderNameChange = (event) => {
    const value = event.target.value;
    setCardHolderName(value);
    setErrors((prev) => ({
      ...prev,
      cardHolderName: validateCardHolderName(value),
    }));
  };

  const handleSaveCardChange = (event) => {
    setSaveCard(event.target.checked);
  };
  const nav = useNavigate();

  const handleSubmit = (e) => {
    handleSubmitResident(e);
    handleSubmitNotification(e);
  };


  const handleSubmitResident = async (e) => {
    e.preventDefault();

    const resident = localStorage.getItem("etap1");


    let residentObj = JSON.parse(resident) || {}; // Parse si c'est une chaîne JSON, sinon crée un objet vide
    console.log(residentObj);

    // Format expiryDate (s'assurer qu'il est sous la forme MM/YY)
    const formattedExpiryDate = expiryDate.replace("/", "").padStart(4, "0"); // "MMYY" sans "/"
    const formattedExpiryDateWithSlash = `${formattedExpiryDate.slice(
      0,
      2
    )}/${formattedExpiryDate.slice(2)}`;

    // Format cardNumber (ajouter un espace toutes les 4 positions)
    const formattedCardNumber = cardNumber
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // "2025-01-20"

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/resident/register",
        {
          //resident info
          residentLastName: residentObj.lastName,
          residentFirstName: residentObj.firstName,
          residentUserName: residentObj.email,
          residentTelephone: residentObj.telephone,
          residentPassword: residentObj.password,
          residentRoles: "resident",
          residentDate: formattedDate,
          cardNumber: formattedCardNumber,
          expirationDate: formattedExpiryDateWithSlash,
          cvv: cvc,
          cardHolderName: cardHolderName,
        }
      );
      console.log(response);

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

  const handleSubmitNotification = async (e) => {
    e.preventDefault();

    const resident = localStorage.getItem("etap1");

    const chambreType = localStorage.getItem("etap2");

    let residentObj = JSON.parse(resident) || {}; 
    let chambreTypeObj = JSON.parse(chambreType) || {};
   
    const formattedExpiryDate = expiryDate.replace("/", "").padStart(4, "0"); // "MMYY" sans "/"
    const formattedExpiryDateWithSlash = `${formattedExpiryDate.slice(
      0,
      2
    )}/${formattedExpiryDate.slice(2)}`;

    const formattedCardNumber = cardNumber
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // "2025-01-20"
    console.log(residentObj.userName)

    try {
      const responsee = await axios.post(
        "http://127.0.0.1:8080/notifications/addnotif",
        {
          chambreType: chambreTypeObj,
          userName: residentObj.email,
          status: "",
          date: formattedDate,
        }
      );
      console.log(responsee);
      nav("/payment4");


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

  return (
    <div style={{ backgroundColor: "#f0effe" }}>
      <img src={logo} style={{ width: "10%" }} />

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
          active
          indicator={
            <StepIndicator variant="outlined" sx={{ color: "#2f1fd6" }}>
              <CreditCardRoundedIcon />
            </StepIndicator>
          }>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "lg",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}>
            Payment and Billing
          </Typography>
        </Step>
        <Step
          orientation="vertical"
          disabled
          indicator={
            <StepIndicator variant="outlined" color="neutral">
              <CheckCircleRoundedIcon />
            </StepIndicator>
          }
        />
      </Stepper>

      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "50%",
          mx: "auto",
          overflow: "auto",
          resize: "horizontal",
        }}>
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Add new card
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Card number</FormLabel>
            <Input
              endDecorator={<CreditCardIcon />}
              value={cardNumber}
              onChange={handleCardNumberChange}
              error={Boolean(errors.cardNumber)}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <Typography color="danger">{errors.cardNumber}</Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Expiry date</FormLabel>
            <Input
              endDecorator={<CreditCardIcon />}
              value={expiryDate}
              onChange={handleExpiryDateChange}
              error={Boolean(errors.expiryDate)}
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <Typography color="danger">{errors.expiryDate}</Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>CVC/CVV</FormLabel>
            <Input
              endDecorator={<InfoOutlined />}
              value={cvc}
              onChange={handleCvcChange}
              error={Boolean(errors.cvc)}
              placeholder="123"
            />
            {errors.cvc && <Typography color="danger">{errors.cvc}</Typography>}
          </FormControl>
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Card holder name</FormLabel>
            <Input
              placeholder="Enter cardholder's full name"
              value={cardHolderName}
              onChange={handleCardHolderNameChange}
              error={Boolean(errors.cardHolderName)}
            />
            {errors.cardHolderName && (
              <Typography color="danger">{errors.cardHolderName}</Typography>
            )}
          </FormControl>
          <Checkbox
            label="Save card"
            sx={{ gridColumn: "1/-1", my: 1 }}
            checked={saveCard}
            onChange={handleSaveCardChange}
          />
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Add card
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCardForm;
