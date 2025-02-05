import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./m.css";
import { Button, CircularProgress } from "@mui/material";
import AddPaymentModal from "./AddPaymentModal";
import { Add, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../Images/logo.png";
import QRious from "qrious";
import signature from "./signature.png";

const UserList = ({ info }) => {
  const [adminProfile, setAdminProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userHistorie, setUserHistorie] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [chambrePrice, setChambrePrice] = useState("");

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
          throw new Error(
            "Erreur lors de la récupération des données du profil"
          );
        }

        const userData = await userResponse.json();
        if (!userData.id) {
          throw new Error("Aucun ID utilisateur trouvé dans la réponse");
        }
        setAdminProfile(userData);

        // Récupération des données de la chambre
        if (userData.chambre && userData.chambre.id) {
          const chambreResponse = await fetch(
            `http://127.0.0.1:8080/chambres/${userData.chambre.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!chambreResponse.ok) {
            throw new Error(
              "Erreur lors de la récupération des données de la chambre"
            );
          }

          const chambreData = await chambreResponse.json();

          if (chambreData.price) {
            setChambrePrice(chambreData.price);
          }

          // Vérification si le résident a payé
        }
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !adminProfile.id) {
      setIsLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8080/paymenthistorie/resident/${adminProfile.id}`, {
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
        const formattedData = Array.isArray(data) ? data : [data];
        setUserHistorie(formattedData);
      });
  }, [adminProfile.id]);

  

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const generateReceipt = async (user) => {
    const doc = new jsPDF();

    // Définir la couleur du fond et le cadre du reçu
    doc.setFillColor(240, 240, 240); // Gris clair
    doc.roundedRect(10, 10, 190, 250, 5, 5, "F"); // Cadre du reçu

    // Logo
    doc.addImage(logo, 15, 15, 50, 20);

    // Nom de l'entreprise
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Resismart", 80, 22);

    // Adresse de l'entreprise
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123, ------ Street, Casablanca, Morocco", 80, 28);
    doc.text("support-resismart@gmail.com | +212 606261002", 80, 34);

    // Ligne de séparation
    doc.setDrawColor(180, 180, 180);
    doc.line(10, 40, 200, 40);

    // Titre du reçu
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("PAYMENT RECEIPT", 80, 50);

    // Informations de paiement (cadre)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 55, 180, 90, 3, 3, "F");

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(
      `Full Name: ${user.resident.firstName} ${user.resident.lastName}`,
      20,
      75
    );
    doc.text(`Email Address: ${user.resident.userName}`, 20, 85);
    doc.text(`Room Number: ${user.resident.chambreNumber}`, 20, 95);
    doc.text(`Payment Date: ${user.datePayment}`, 20, 105);
    doc.text(`Amount Paid: ${chambrePrice || "N/A"} MAD`, 20, 115);
    doc.text(`Transaction ID: ${user.id || "N/A"}`, 20, 125);

    // Ligne de séparation
    doc.setDrawColor(180, 180, 180);
    doc.line(10, 160, 200, 160);

    // Message de remerciement
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for your payment!", 20, 170);

    // Informations supplémentaires
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(
      "For any inquiries, please contact support-resismart@gmail.com",
      20,
      180
    );

    // QR Code (Optionnel)
    const qrCodeBase64 = generateQRCode(
      `Receipt ID: ${user.id} | Amount: ${chambrePrice} MAD`
    );
    doc.addImage(qrCodeBase64, "PNG", 150, 190, 40, 40);

    // Signature par défaut (Image Base64)
    doc.setFont("helvetica", "italic");
    doc.text("Authorized Signature:", 20, 240);
    doc.line(20, 245, 80, 245); // Ligne de signature
    doc.addImage(signature, "PNG", 20, 250, 50, 20); // Ajout de la signature

    // Sauvegarder le PDF
    doc.save(`Receipt_${user.resident.firstName}_${user.datePayment}.pdf`);
  };

  // Fonction pour générer un QR Code en base64
  const generateQRCode = (data) => {
    const qr = new QRious({
      value: data,
      size: 100,
    });
    return qr.toDataURL(); // Retourne une image base64
  };

  return (
    <div className="card">
      <div className="card-header pb-0 p-3">
        <div className="row">
          <div className="col-6 d-flex align-items-center">
            <h6 className="mb-0">Payment History</h6>
          </div>
          <div className="col-6 text-end">
            <button
              onClick={handleOpenModal}
              className="btn mb-0 text-white"
              style={{ backgroundColor: "#2f1fd6" }}>
              <Add /> Add Payment
            </button>
          </div>
        </div>
      </div>

      <div className="card-body pt-4 p-3">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}>
            <CircularProgress />
          </div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {userHistorie.map((user) => (
              <li
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  marginBottom: "12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                }}>
                <div className="d-flex flex-column">
                  <h6
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                    }}>
                    {user.resident.firstName} {user.resident.lastName}
                  </h6>
                  {user.datePayment && (
                    <span style={{ fontSize: "14px", color: "#555" }}>
                      Payment Date :{" "}
                      <span style={{ fontWeight: "bold", color: "#000" }}>
                        {user.datePayment}
                      </span>
                    </span>
                  )}
                  {user.resident.userName && (
                    <span style={{ fontSize: "14px", color: "#555" }}>
                      Email Address:{" "}
                      <span style={{ fontWeight: "bold", color: "#000" }}>
                        {user.resident.userName}
                      </span>
                    </span>
                  )}
                  {user.resident.chambreNumber && (
                    <span style={{ fontSize: "14px", color: "#555" }}>
                      Room Number :{" "}
                      <span style={{ fontWeight: "bold", color: "#000" }}>
                        {user.resident.chambreNumber}
                      </span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => generateReceipt(user)}
                  className="btn mb-0 text-white"
                  style={{ backgroundColor: "rgb(33, 195, 62)" }}>
                  <Download /> Download Receipt
                </button>

               
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddPaymentModal
        open={openModal}
        onClose={handleCloseModal}
        info={info}
      />
    </div>
  );
};

export default UserList;
