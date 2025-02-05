import React, { useState } from "react";
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

function AddCardModal({ open, onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateCardNumber = (value) => {
    if (!/^\d{0,16}$/.test(value)) {
      return "Card number must be numeric and up to 16 digits.";
    }
    return "";
  };

  const validateExpiryDate = (value) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return "Expiry date must be in MM/YY format.";
    }
    const [month, year] = value.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100; // Last two digits of the year
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Expiry date must be in the future.";
    }
    return "";
  };

  const validateCvc = (value) => {
    if (!/^\d{3,4}$/.test(value)) {
      return "CVC must be 3 or 4 digits.";
    }
    return "";
  };

  const validateCardHolderName = (value) => {
    if (!value.trim()) {
      return "Card holder name cannot be empty.";
    }
    return "";
  };

  // Handle changes for each input field
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      cardNumber: validateCardNumber(value), // Validate each field
    }));
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    setExpiryDate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      expiryDate: validateExpiryDate(value),
    }));
  };

  const handleCvcChange = (e) => {
    const value = e.target.value;
    setCvc(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      cvc: validateCvc(value),
    }));
  };

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    setCardHolderName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      cardHolderName: validateCardHolderName(value),
    }));
  };

  const isFormValid = () => {
    return (
      !errors.cardNumber &&
      !errors.expiryDate &&
      !errors.cvc &&
      !errors.cardHolderName &&
      cardNumber &&
      expiryDate &&
      cvc &&
      cardHolderName
    );
  };

  const [adminProfile, setAdminProfile] = useState({});

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
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
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Format expiryDate (s'assurer qu'il est sous la forme MM/YY)
    const formattedExpiryDate = expiryDate.replace("/", "").padStart(4, "0"); // "MMYY" sans "/"
    const formattedExpiryDateWithSlash = `${formattedExpiryDate.slice(0, 2)}/${formattedExpiryDate.slice(2)}`;
  
    // Format cardNumber (ajouter un espace toutes les 4 positions)
    const formattedCardNumber = cardNumber.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  
    try {
      const response = await axios.post("http://127.0.0.1:8080/cards/add", {
        resident: { id: adminProfile.id },
        cardNumber: formattedCardNumber, // Envoi avec les espaces formatés
        expirationDate: formattedExpiryDateWithSlash, // Envoi au format MM/YY
        cvv: cvc,
        cardHolderName: cardHolderName,
      });
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
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mb: "20px", mt: "10px" }}>
          <TextField
            label="Card number"
            variant="outlined"
            endDecorator={<CreditCardIcon />}
            value={cardNumber}
            onChange={handleCardNumberChange} // Validation on change
            error={Boolean(errors.cardNumber)} // Show error if exists
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
            onChange={handleExpiryDateChange} // Validation on change
            error={Boolean(errors.expiryDate)} // Show error if exists
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
            onChange={handleCvcChange} // Validation on change
            error={Boolean(errors.cvc)} // Show error if exists
            placeholder="123"
          />
          {errors.cvc && <Typography color="error">{errors.cvc}</Typography>}
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Card holder name"
            variant="outlined"
            placeholder="Enter cardholder's full name"
            value={cardHolderName}
            onChange={handleCardHolderNameChange} // Validation on change
            error={Boolean(errors.cardHolderName)} // Show error if exists
          />
          {errors.cardHolderName && (
            <Typography color="error">{errors.cardHolderName}</Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#2f1fd6" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#2f1fd6" }}
          disabled={!isFormValid()} // Disable button if form is invalid
        >
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCardModal;
