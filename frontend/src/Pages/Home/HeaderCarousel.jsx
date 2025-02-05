import React from "react";
import "animate.css"; // Ensure the module is installed
import "./style.css"; // Custom CSS file
import videoBackground from "../../Images/video.mp4"

// Import local images
import carouselImage1 from "./img/res.jpg";

// Import local images
import imageLeft from "./img/res.jpg"; // Background image
import imageRight from "./img/res.jpg"; // Right image
import { Box } from "@mui/joy";
import { Link } from "react-router-dom";
import imgaeeee from "../../Images/logo.png";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
};

const HeaderCarousel = () => {
  return (
    <>
      <div
        className="header-carousel-item"
        style={{
          position: "relative",
          height: "100vh", // 100% of the viewport height
          overflow: "hidden", // Ensure content doesn't overflow
        }}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the video covers the entire area
            zIndex: -1, // Ensures the video is behind all content
          }}>
          <source src={videoBackground} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Black overlay with transparency */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.64)", // Black overlay with transparency
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="carousel-caption"
          style={{ position: "relative", zIndex: 2, marginLeft: "-500px" }}>
          <div className="container">
            <div className="row g-5">
              <div
                className="col-12 animated fadeInUp"
                style={{ marginTop: "200px" }}>
                <div className="text-center">
                  <h4
                    className=" text-uppercase fw-bold mb-4"
                    style={{ color: "#ee6b48" }}>
                    Welcome To RESISMART
                  </h4>
                  <h1 className="display-4 text-uppercase text-white mb-4">
                    Your Comfort, Our Priority
                  </h1>
                  <p className="mb-5 fs-5">
                    Every room, every space, every service is designed for one
                    thing: to help you focus on what matters most—your studies
                    and your ambitions.
                  </p>

                  <div className="d-flex align-items-center justify-content-center">
                    <h2 className="text-white me-2">Follow Us:</h2>
                    <div className="d-flex justify-content-end ms-2">
                      <a
                        className="btn btn-md-square btn-light rounded-circle me-2"
                        href="">
                        <i
                          style={{ color: "#ee6b48" }}
                          className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle mx-2"
                        href="">
                        <i
                          style={{ color: "#ee6b48" }}
                          className="fab fa-twitter"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle mx-2"
                        href="">
                        <i
                          style={{ color: "#ee6b48" }}
                          className="fab fa-instagram"></i>
                      </a>
                      <a
                        className="btn btn-md-square btn-light rounded-circle ms-2"
                        href="">
                        <i
                          style={{ color: "#ee6b48" }}
                          className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCarousel;
