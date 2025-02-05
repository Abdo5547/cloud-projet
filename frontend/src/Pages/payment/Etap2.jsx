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
import { services } from "./Service";
import {
  Box,
  Button,
  CssVarsProvider,
  FormControl,
  Grid,
  Typography,
} from "@mui/joy";
import { TextField } from "@mui/material";
import { Chair, Check, Roofing, Room } from "@mui/icons-material";
import Services from "./Service";
import Service from "./Service";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "-31px 0px 0px -382px",
};

export default function Etap2(props) {
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

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    console.log(e);


    const etap2 =  e ;
    localStorage.removeItem("etap2");


    localStorage.setItem("etap2", JSON.stringify(etap2));
    console.log(localStorage.getItem("etap2"));
    nav("/payment3");
  };

  const [type, setType] = React.useState("");

  return (
    
        <div style={{backgroundColor: "#f0effe" }}>

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
          active
          indicator={
            <StepIndicator variant="outlined" sx={{ color: "#2f1fd6" }}>
              <Chair />
            </StepIndicator>
          }>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "lg",
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
            }}>
            Room Selection and Preferences
          </Typography>
        </Step>

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
            <StepIndicator variant="outlined" color="neutral">
              <CheckCircleRoundedIcon />
            </StepIndicator>
          }
        />
      </Stepper>

      <div
        className="container-fluid service pb-5 px-24"
        style={{ marginTop: "100px" }}>
        <div className="container pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="wow fadeInUp"
                data-wow-delay={service.delay}>
                <div className="card border rounded-lg overflow-hidden shadow-lg">
                  <div className="overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <a
                      href="#"
                      className="text-xl font-semibold text-black hover:text-purple-600 mb-4 block">
                      {service.title}
                    </a>
                    <ul className="mb-4">
                      <li>
                        <strong>Size:</strong> {service.size}
                      </li>
                      <li>
                        <strong>Equipment:</strong> {service.equipments}
                      </li>
                      <li>
                        <strong>Connection:</strong> {service.connection}
                      </li>

                      <li>
                        <strong>Price:</strong> {service.price}
                      </li>
                      <li>
                        <strong>Price:</strong> {service.description}
                      </li>
                    </ul>

                    <Button
                      onClick={() => handleSubmit(service.alt)}
                      style={{ backgroundColor: "#2f1fd6" }}>
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
