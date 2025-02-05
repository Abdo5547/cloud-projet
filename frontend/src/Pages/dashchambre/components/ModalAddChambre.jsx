import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
  Stack,
  Chip,
  Input,
  FormControl,
  FormLabel,
  Autocomplete,
  TextField,
} from "@mui/joy";
import axios from "axios";
import { House } from "@mui/icons-material";

const ModalAddChambre = ({ open, onClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [selectedType, setSelectedType] = React.useState(null);
  const [roomNumbe, setRoomNumber] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [formData, setFormData] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [adminProfile, setAdminProfile] = React.useState({});
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/me/", {
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
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Construisez l'objet à envoyer
    const updatedData = {
      numberResidentPossible: roomTypeMapping[selectedType?.label] || null, // Assurez-vous qu'une valeur par défaut est fournie
      type: selectedType?.label || "", // Le type de chambre en texte
      number: roomNumbe, // Le numéro de chambre saisi
      price: price,
      status: "Available",
      numberCurent: 0,
      admin: { id: adminProfile.id }, // Ajouter le prix défini par l'utilisateur
    };

    console.log("Données envoyées :", updatedData);

    // Récupérer le token
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/chambres/add",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Réponse de l'API :", response.data);

      window.location.reload(); // Fermez le modal après un succès
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const handleRoomNumberChange = (e) => setRoomNumber(e.target.value);
  const handleSelectedTypeChange = (event, newValue) => {
    setSelectedType(newValue);
    if (newValue) {
      setPrice(roomPriceMapping[newValue.label] || 0); // Assurez un prix par défaut
    }
  };

  const roomTypes = [
    { label: "VipRoom" },
    { label: "DeluxeRoom" },
    { label: "SingleRoom" },
    { label: "DoubleRoom" },
    { label: "SharedRoom" },
  ];
  const roomTypeMapping = {
    "VipRoom": 1,
    "DeluxeRoom": 2,
    "SharedRoom": 4,
    "SingleRoom": 1,
    "DoubleRoom": 2,
  };
  const roomPriceMapping = {
    "VipRoom": 500,
    "DeluxeRoom": 400,
    "SharedRoom": 200,
    "SingleRoom": 300,
    "DoubleRoom": 350,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description">
        <Typography
          id="nested-modal-title"
          level="h2"
          startDecorator={<House sx={{ color: "black" }} />}>
          Add Room
        </Typography>

        <Box
          component="form"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <FormControl>
            <FormLabel>Room's type</FormLabel>

            <Autocomplete
              value={selectedType}
              onChange={handleSelectedTypeChange}
              options={roomTypes}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Room's type" />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Room Number</FormLabel>
            <Input
              name="roomNumbe"
              value={roomNumbe}
              onChange={handleRoomNumberChange}
              placeholder="Enter last Room number"
              fullWidth
            />
          </FormControl>
        </Box>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))} // Permettre à l'utilisateur de modifier
            placeholder="Enter room price"
            fullWidth
          />
        </FormControl>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Continue
          </Button>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalAddChambre;
