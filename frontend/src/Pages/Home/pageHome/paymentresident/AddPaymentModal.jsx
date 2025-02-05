import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  InfoOutlined,
} from "@mui/icons-material";
import axios from "axios";

function AddPaymentModal({ open, onClose, info }) {
  const [adminProfile, setAdminProfile] = useState({});
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [chambre, setChambre] = useState({});
  const [hasPaid, setHasPaid] = useState(false); // Variable pour vérifier si le paiement est effectué

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [chambrePrice, setChambrePrice] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolderName: "",
  });

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
        const cardsArray = Array.isArray(cardData) ? cardData : [cardData];
        setCart(cardsArray);

        // Initialiser les champs avec la première carte
        if (cardsArray.length > 0) {
          const firstCard = cardsArray[0];
          setCardNumber(firstCard.cardNumber || "");
          setExpiryDate(firstCard.expirationDate || ""); // Assurez-vous que l'API retourne une date au format MM/YY
          setCvc(firstCard.cvv || "");
          setCardHolderName(firstCard.cardHolderName || "");
        }

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
          setChambre(chambreData);

          if (chambreData.price) {
            setChambrePrice(chambreData.price);
          }

          // Vérification si le résident a payé
          if (chambreData.residents && chambreData.residents.length > 0) {
            const isPaid = chambreData.residents.some(
              (resident) => resident.statusPayment === "Paid"
            );
            setHasPaid(isPaid); // Mettre à jour l'état de paiement
          }
        }
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion des changements de champs
  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvcChange = (e) => setCvc(e.target.value);
  const handleCardHolderNameChange = (e) => setCardHolderName(e.target.value);
  const handleChambrePrice = (e) => setChambrePrice(e.target.value);

  // Validation des champs de formulaire
  const isFormValid = () => {
    let valid = true;
    let tempErrors = { ...errors };

    if (!cardNumber || cardNumber.length < 16) {
      tempErrors.cardNumber = "Le numéro de carte doit comporter 16 chiffres";
      valid = false;
    } else {
      tempErrors.cardNumber = "";
    }

    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      tempErrors.expiryDate = "Le format de la date d'expiration est MM/AA";
      valid = false;
    } else {
      tempErrors.expiryDate = "";
    }

    if (!cvc || cvc.length !== 3) {
      tempErrors.cvc = "Le code CVC doit comporter 3 chiffres";
      valid = false;
    } else {
      tempErrors.cvc = "";
    }

    if (!cardHolderName) {
      tempErrors.cardHolderName = "Le nom du titulaire est requis";
      valid = false;
    } else {
      tempErrors.cardHolderName = "";
    }

    setErrors(tempErrors);
    return valid;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format expiryDate (s'assurer qu'il est sous la forme MM/YY)

    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/payments/update/${adminProfile.id}`,
        {
          status: "Paid",
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error during request:", error.response || error.message);

      let errorMessage = "An error occurred during registration.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Email already exists. Please try another email.";
            break;
          case 500:
            errorMessage = "An error occurred during registration.";
            break;
          default:
            errorMessage = error.response.data.detail || errorMessage;
            break;
        }
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {hasPaid ? "You have already paid" : "Add New Card"}
      </DialogTitle>
      <DialogContent>
        {hasPaid ? (
          <>
            <Typography>You have already made your payment.</Typography>
            <Typography>
              Please wait until the first of next month (
              {`${new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).getFullYear()}-${(
                new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ).getMonth() 
              )
                .toString()
                .padStart(2, "0")}-01`}
              ).
            </Typography>
          </>
        ) : (
          <>
            <FormControl fullWidth sx={{ mb: "20px", mt: "10px" }}>
              <TextField
                label="Card number"
                variant="outlined"
                endDecorator={<CreditCardIcon />}
                value={cardNumber}
                onChange={handleCardNumberChange}
                error={Boolean(errors.cardNumber)}
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && (
                <Typography color="error">{errors.cardNumber}</Typography>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: "20px" }}>
              <TextField
                label="Expiry date"
                variant="outlined"
                endDecorator={<CreditCardIcon />}
                value={expiryDate}
                onChange={handleExpiryDateChange}
                error={Boolean(errors.expiryDate)}
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <Typography color="error">{errors.expiryDate}</Typography>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: "20px" }}>
              <TextField
                label="CVC/CVV"
                variant="outlined"
                endDecorator={<InfoOutlined />}
                value={cvc}
                onChange={handleCvcChange}
                error={Boolean(errors.cvc)}
                placeholder="123"
              />
              {errors.cvc && (
                <Typography color="error">{errors.cvc}</Typography>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Card holder name"
                variant="outlined"
                placeholder="Enter cardholder's full name"
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                error={Boolean(errors.cardHolderName)}
              />
              {errors.cardHolderName && (
                <Typography color="error">{errors.cardHolderName}</Typography>
              )}
            </FormControl>
            <Typography variant="h5" sx={{ ml: "50px" }}>
              The price : {chambrePrice} $
            </Typography>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddPaymentModal;
