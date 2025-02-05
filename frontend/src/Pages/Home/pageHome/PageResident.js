import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import imgaeeee from "../../../Images/logo.png";
import "./style.css";

import { Box } from "@mui/material";
import Services from "../Services";
import MyProfile from "../../dashprofile/components/MyProfile";
import Room from "./Room";

const token = localStorage.getItem("token");
console.log(token);

function PageResident() {
  const logoStyle = {
    width: "200px",
    height: "auto",
    cursor: "pointer",
  };

  return (
    <div className="homeContainer">
        <Room />
    </div>
  );
}

export default PageResident;
