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
import "../Home/style.css";
import vipRoomImage from "../Home/img/cvip.jpg";
import deluxeRoomImage from "../Home/img/clux.jpg";
import roomWithPrivateBathroomImage from "../Home/img/cbain.jpg";
import doubleRoomImage from "../Home/img/cdoub.jpg";
import sharedRoomImage from "../Home/img/cpart.jpg";
import singleRoomImage from "../Home/img/csimpl.jpg";
import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


export const services = [
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
    alt: "VIPRoom",
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
      "Designed for luxury lovers, this room offers modern amenities and a panoramic view. Perfect for a memorable stay with moments .",
    alt: "DeluxeRoom",
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
      "Perfect for couples or friends, this room combines comfort and practicality at an affordable price. ",
    alt: "DoubleRoom",
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
    alt: "SharedRoom",
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
    alt: "SingleRoom",
  },
];

const Service = () => {
  return (
    <div
      className="container-fluid service pb-5 px-24"
      style={{ marginTop: "100px",backgroundColor: "#f0effe" }}>
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
                 

                  <a
                    className="btn btn-primary rounded-pill py-2 px-4"
                    href={"/payment3"}
                    style={{ backgroundColor: "#2f1fd6" }}>
                    Select
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

export default Service;











