import React from "react";
import "./style.css";
import testimonialImg1 from "./img/testimonial-1.jpg";
import testimonialImg2 from "./img/testimonial-2.jpg";
import testimonialImg3 from "./img/testimonial-3.jpg";

const Testimonials = () => {
  return (
    <div className="testimonial-section container-fluid py-5 ">
      <div className="container text-center pb-5">
        <div className="header mx-auto" style={{ maxWidth: "700px" }}>
          <h4 style={{ color: "#e24e2e" }}>Testimonial</h4>
          <h1 className="display-5 mb-4">Our Students' Reviews</h1>
          <p className="mb-0">
            Our students share their experiences living in the university
            residences. Here's what they have to say!
          </p>
        </div>

        <div
          className="testimonial-carousel d-flex justify-content-center  "
          style={{ marginTop: "40px" }}>
          <div className="testimonial-item mx-2 bg-gray-100">
            <div className="testimonial-image text-center">
              <img
                src={testimonialImg1}
                className="rounded-circle img-fluid"
                alt="Student 1"
                style={{ marginLeft: "150px" }}
              />
            </div>
            <div className="testimonial-content mt-3">
              <p>
                "The residence has been a wonderful place to stay. I feel safe,
                and the community spirit is great. It's a home away from home!"
              </p>
              <h4 className="mt-3">John Doe</h4>
              <p className="text-muted">Computer Science Student</p>
              <div className="rating text-warning">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="quote-icon quote-right">
              <i
                className="fas fa-quote-right fa-2x "
                style={{ color: "#2f1fd6" }}></i>
            </div>
          </div>

          <div className="testimonial-item mx-2  bg-gray-100">
            <div className="testimonial-image text-center">
              <img
                src={testimonialImg2}
                className="rounded-circle img-fluid"
                alt="Student 2"
                style={{ marginLeft: "150px" }}
              />
            </div>
            <div className="testimonial-content mt-3">
              <p>
                "Living in the residence is a fantastic experience! It's
                affordable and has everything I need for my studies and personal
                life."
              </p>
              <h4 className="mt-3">Jane Smith</h4>
              <p className="text-muted">Business Administration Student</p>
              <div className="rating text-warning">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="quote-icon quote-right">
              <i
                className="fas fa-quote-right fa-2x "
                style={{ color: "#2f1fd6" }}></i>
            </div>
          </div>

          <div className="testimonial-item mx-2 bg-gray-100">
            <div className="testimonial-image text-center">
              <img
                src={testimonialImg3}
                className="rounded-circle img-fluid"
                alt="Student 3"
                style={{ marginLeft: "150px" }}
              />
            </div>
            <div className="testimonial-content mt-3">
              <p>
                "The residence is not just a place to live, it's a community.
                I’ve met so many amazing people, and the atmosphere is really
                encouraging for studying."
              </p>
              <h4 className="mt-3">Alex Lee</h4>
              <p className="text-muted">Engineering Student</p>
              <div className="rating text-warning">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="quote-icon quote-right">
              <i
                className="fas fa-quote-right fa-2x "
                style={{ color: "#2f1fd6" }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
