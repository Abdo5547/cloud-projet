import React from "react";
import './style.css'
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeatureItem = ({ icon, title, description, link }) => {
  return (
    <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
      <div className="feature-item p-4">
        <div className="feature-icon p-4 mb-4">
          <i className={`${icon} fa-4x `} style={{color:"#ee6b48"}}></i>
        </div>
        <h4>{title}</h4>
        <p className="mb-4">{description}</p>
        <a className="btn btn-primary rounded-pill py-2 px-4" href={link} style={{ backgroundColor: "#2f1fd6" }}>
          Learn More
        </a>
      </div>
    </div>
  );
};

const Features = () => {
  const featuresData = [
    {
      icon: "fas fa-utensils",
      title: "Cafeteria",
      description:
        "To relax and enjoy meals and moments of sharing in a friendly setting, a fully equipped cafeteria is open to all residents.",
      link: "#",
    },
    {
      icon: "fas fa-parking",
      title: "Parking Space",
      description:
        "For residents with cars, motorcycles, bicycles, etc. The university residences in Mohammedia offer a free, private, and secure parking space.",
      link: "#",
    },
    {
      icon: "fas fa-tree",
      title: "Green Space",
      description:
        "A stroll in green spaces is necessary to relax during stressful times, and this is easily accessible for our residents.",
      link: "#",
    },
    {
      icon: "fas fa-laptop",
      title: "Study and Relaxation Room",
      description:
        "To promote group work, residents have access to spacious study rooms with high-speed Wi-Fi, open 24/7.",
      link: "#",
    },
  ];

  return (
    <div className="container-fluid feature pb-5">
      <div className="container pb-5">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: "800px" }}
        >
          <h4 style={{color:"#ee6b48"}}>Our Features</h4>
          <h1 className="display-5 mb-4">
            Connecting businesses, ideas, and people for greater impact.
          </h1>
          <p className="mb-0">
            At our residence, we believe in creating an environment that fosters both academic and personal growth. Our services are designed to cater to the diverse needs of our residents, ensuring a balanced lifestyle and a supportive community.
          </p>
        </div>
        <div className="row g-4">
          {featuresData.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
