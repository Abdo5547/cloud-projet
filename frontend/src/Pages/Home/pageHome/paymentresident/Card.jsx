import React, { useEffect, useState } from "react";
import icon from "./pattern-tree.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./m.css";
import mst from "./mst.png";
import { WifiCallingOutlined } from "@mui/icons-material";
import WifiIcon from "@mui/icons-material/Wifi";

const Card = () => {



    const [adminProfile, setAdminProfile] = useState({});
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Aucun token trouvé. Veuillez vous connecter.");
          setIsLoading(false);
          return;
        }
    
        try {
          // Récupération des données utilisateur
          const userResponse = await fetch("http://127.0.0.1:8080/resident/me/", {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (!userResponse.ok) {
            throw new Error("Erreur lors de la récupération des données du profil");
          }
    
          const userData = await userResponse.json();
          if (!userData.id) {
            throw new Error("Aucun ID utilisateur trouvé dans la réponse");
          }
          setAdminProfile(userData);
    
          // Récupération des cartes après avoir obtenu l'ID utilisateur
          const cardResponse = await fetch(
            `http://127.0.0.1:8080/cards/resident/${userData.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          if (!cardResponse.ok) {
            throw new Error("Erreur lors de la récupération des cartes");
          }
    
          const cardData = await cardResponse.json();
          setCart(Array.isArray(cardData) ? cardData : [cardData]);
        } catch (error) {
          console.error("Erreur :", error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, []);


    
    console.log(cart)
  
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
    <div className="col-xl-6 mb-xl-0 mb-4" style={{ width: "400px" }}>
      <div className="card bg-transparent shadow-xl">
        <div className="overflow-hidden position-relative border-radius-xl">
          <img
            src={icon}
            className="position-absolute opacity-2 start-0 top-0 w-100 z-index-1 h-100"
            alt="pattern-tree"
          />
          <span className="mask  opacity-10" style={{backgroundColor: "#ee6b48"}}></span>
          <div className="card-body position-relative z-index-1 p-3">
            <WifiIcon style={{ color: "white" }} />
            <h5 className="text-white mt-4 mb-5 pb-2">{cart[0].cardNumber} </h5>
            <div className="d-flex">
              <div className="d-flex">
                <div className="me-4">
                  <p className="text-white text-sm opacity-8 mb-0">
                    Card Holder
                  </p>
                  <h6 className="text-white mb-0">{cart[0].cardHolderName}</h6>
                </div>
                <div>
                  <p className="text-white text-sm opacity-8 mb-0">Expires</p>
                  <h6 className="text-white mb-0">{cart[0].expirationDate}</h6>
                </div>
              </div>
              <div className="ms-auto w-20 d-flex align-items-end justify-content-end">
                <img className="w-60 mt-2" src={mst} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
