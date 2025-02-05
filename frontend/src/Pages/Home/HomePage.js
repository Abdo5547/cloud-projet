import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import imgaeeee from "../../Images/logo.png";
import "./style.css";

import { Box } from "@mui/material";
import Services from "./Services";
import Features from "./Features";
import About from "./About";
import HeaderCarousel from "./HeaderCarousel";
import Testimonials from "./Testimonials";

const token = localStorage.getItem("token");
console.log(token);

function HomePage() {
  const logoStyle = {
    width: "160px",
    height: "auto",
    cursor: "pointer",
  };

  return (
    <div className="homeContainer" style={{marginTop:"-20px",marginRight:"-20px",marginLeft:"-20px"}}>
      <nav className="navbar" >
        <Link to="/" className="logo">
          <Box
            sx={{
              flexGrow: 10,
              display: "flex",
              alignItems: "center",
              ml: "-10px",
            }}>
            <img src={imgaeeee} style={logoStyle} alt="logo of ResearchUnity" />
          </Box>
        </Link>
        <div className="navLinks">
          <Link to="/SignIn" className="navButton">
            Sign In
          </Link>
          <Link to="/payment1" className="navButton">
            Get started
          </Link>
        </div>
      </nav>

      <header className="headerSection">
        <HeaderCarousel />
      </header>
      <header className="headerSection">
        <About />
      </header>

      <header className="headerSection">
        <Services />
      </header>

      <header className="headerSection">
        <Features />
      </header>

      <header className="headerSection">
        <Testimonials />
      </header>
    </div>
  );
}

export default HomePage;
