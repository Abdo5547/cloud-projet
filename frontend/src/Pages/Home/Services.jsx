import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardOverflow,
  Button,
  Grid,
} from "@mui/joy";
import "./style.css";
import vipRoomImage from "./img/cvip.jpg";
import deluxeRoomImage from "./img/clux.jpg";
import roomWithPrivateBathroomImage from "./img/cbain.jpg";
import doubleRoomImage from "./img/cdoub.jpg";
import sharedRoomImage from "./img/cpart.jpg";
import singleRoomImage from "./img/csimpl.jpg";
import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const services = [
  {
    title: "VIP Room",
    image: vipRoomImage,
    size: "35 m²",
    equipments: "King-size bed, large desk, sofa, mini-fridge, private balcony",
    connection: "High-speed Wi-Fi, 4K TV with streaming services",
    view: "Sea or park view",
    price: "750€ per month",
    delay: "0.2s",
    description:
      "A luxurious room perfect for those seeking comfort and exclusivity, offering breathtaking views and premium amenities.",
    alt: "VIP Room",
  },
  {
    title: "Deluxe Room",
    image: deluxeRoomImage,
    size: "30 m²",
    equipments:
      "King-size bed, desk, armchair, mini-bar, private bathroom with jacuzzi",
    connection: "Ultra-fast Wi-Fi, flat-screen TV with international channels",
    view: "Panoramic city view",
    price: "600€ per month",
    delay: "0.4s",
    description:
      "Designed for luxury lovers, this room offers modern amenities and a panoramic view. Perfect for a memorable stay with moments of relaxation in the jacuzzi.",
    alt: "Deluxe Room",
  },

  {
    title: "Double Room",
    image: doubleRoomImage,
    size: "18 m²",
    equipments: "Double bed, desk, chair, wardrobe, TV",
    connection: "High-speed Wi-Fi",
    view: "N/A",
    price: "350€ per month",
    delay: "0.2s",
    description:
      "Perfect for couples or friends, this room combines comfort and practicality at an affordable price.",
    alt: "Double Room",
  },
  {
    title: "Shared Room",
    image: sharedRoomImage,
    size: "20 m²",
    equipments: "2 single beds, shared desk, storage",
    connection: "Fast Wi-Fi",
    view: "N/A",
    price: "150€ per month (per person)",
    delay: "0.4s",
    description:
      "An economical and friendly option for students or travelers, offering essential amenities and great value for money.",
    alt: "Shared Room",
  },
  {
    title: "Single Room",
    image: singleRoomImage,
    size: "12 m²",
    equipments: "Single bed, desk, chair, wardrobe",
    connection: "Basic Wi-Fi",
    view: "N/A",
    price: "200€ per month",
    delay: "0.6s",
    description:
      "Perfect for one person, this compact room offers a comfortable and functional space ideal for individuals or students.",
    alt: "Single Room",
  },
];

const Services = () => {
  return (
    <div className="container-fluid service pb-5 px-24">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: "800px" }}>
          <h4 className=" text-2xl font-semibold" style={{ color: "#ee6b48" }}>
            Our Services
          </h4>
          <h1 className="display-5 mb-4 text-4xl font-bold">
            We provide the best offers
          </h1>
          <p className="mb-0 text-lg">
            We offer a variety of rooms designed to provide you with comfort and
            convenience. Whether you're staying for a short or long term, we
            have the perfect room for you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
                  <a
                    className="btn btn-primary rounded-pill py-2 px-4"
                    href={"/#"}
                    style={{ backgroundColor: "#2f1fd6" }}>
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
