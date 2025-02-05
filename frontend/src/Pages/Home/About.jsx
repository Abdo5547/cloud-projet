import React from "react";
import "animate.css"; // Ensure the module is installed
import "./style.css";
import img1 from "./img/20944371.jpg";
import img2 from "./img/20944371.jpg";

const About = () => {
  return (
    <div className="container-fluid about py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          {/* Left Section */}
          <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
            <div>
              <h4 style={{color:"#ee6b48"}}>About Us</h4>
              <h1 className="display-5 mb-4">
                Experience the Perfect Student Life
              </h1>
              <p className="mb-4">
                Find the perfect balance between studies and social life in our
                student residence. We offer comfortable rooms, welcoming common
                areas, and an ideal location close to universities and
                amenities.
              </p>
              <div className="row g-4">
                {/* Resident Services */}
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i
                        className="fas fa-lightbulb fa-3x"
                        style={{ color: "#ee6b48" }}></i>
                    </div>
                    <div className="ms-4">
                      <h4>Resident Services</h4>
                      <p>
                        Simplify residents' lives: room management, payments,
                        and requests, all at your fingertips.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Years of Experience */}
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <div className="d-flex">
                    <div>
                      <i
                        className="bi bi-bookmark-heart-fill fa-3x"
                        style={{ color: "purple" }}></i>
                    </div>
                    <div className="ms-4">
                      <h4>Years of Experience</h4>
                      <p>
                        Over 10 years of simplifying student residence
                        management.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Discover Now Button */}
                <div className="col-sm-6">
                  <a
                    className="btn btn-primary rounded-pill py-2 px-4"
                    href={"/payment1"}
                    style={{ backgroundColor: "#2f1fd6" }}>
                    Discover Now
                  </a>
                </div>
                {/* Call Us */}
                <div className="col-sm-6">
                  <div className="d-flex">
                    <i
                      className="fas fa-phone-alt fa-2x me-4"
                      style={{ color: "#ee6b48" }}></i>
                    <div>
                      <h4>Call Us</h4>
                      <p>
                        +01234567890 – Our team is available for any questions
                        you may have.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div
            className="col-xl-5 wow fadeInRight"
            data-wow-delay="0.2s"
            style={{ maxWidth: "65%" }}>
            <div className="rounded position-relative overflow-hidden">
              <img
                src={img1}
                className="img-fluid rounded w-100"
                alt="Main Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
