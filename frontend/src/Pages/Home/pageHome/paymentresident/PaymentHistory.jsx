import React, { useState, useEffect } from "react";
import PaymentMethod from "./PaymentMethod";
import UserList from "./UserList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./m.css";
import Card from "./Card";

const PaymentHistory = () => {

const [cart, setCart] = useState({});


  const cartff = [
    {
      id: 1,
      cardNumber: "1234 5678 9876 5432",
      cardType: "Visa",
      cardHolderName: "John Doe",
      expirationDate: "12/25",
      cvv: "123",
    },
    {
      id: 2,
      cardNumber: "4321 8765 6789 2341",
      cardType: "MasterCard",
      cardHolderName: "John Doe",
      expirationDate: "05/26",
      cvv: "456",
    },
    {
      id: 3,
      cardNumber: "9876 5432 1234 6789",
      cardType: "American Express",
      cardHolderName: "John Doe",
      expirationDate: "09/27",
      cvv: "789",
    },
  ];

  const [adminProfile, setAdminProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      setIsLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8080/resident/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => setAdminProfile(data))
      .catch((error) => console.error("Erreur :", error))
      .finally(() => setIsLoading(false));
  }, []);




  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !adminProfile.id) {
      setIsLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8080/cards/resident/${adminProfile.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        // Si data n'est pas un tableau, transformez-le en tableau
        const formattedData = Array.isArray(data) ? data : [data];
        setCart(formattedData);
      })
      .catch((error) => console.error("Erreur :", error))
      .finally(() => setIsLoading(false));
  }, [adminProfile.id]);







  console.log(cart);

  const Loading = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        color: "#555",
        fontFamily: "Arial, sans-serif",
      }}>
      <div
        style={{
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
        }}></div>
      <p>Chargement en cours...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }



  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <Card  />
            <PaymentMethod info={cart} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7 mt-4" style={{ width: "1025px" }}>
          <UserList info={cart[0]} />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
