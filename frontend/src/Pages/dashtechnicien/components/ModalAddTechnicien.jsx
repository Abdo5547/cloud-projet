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
} from "@mui/joy";
import axios from "axios";

const ModalAddTechnicien = ({ open, onClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [formData, setFormData] = React.useState("");

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
    const toString = (val) => {
      return "val";
    };

    const updatedData = {
      firstName: firstName,
      lastName: lastName,
      speciality: speciality,
      telephone: telephone,
      adminId: adminProfile.id,
    };
    console.log(updatedData); // Objet pour stocker uniquement les champs modifiés

    // Vérifier s'il y a des données à envoyer

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.post(
        " http://localhost:8080/techniciens/add",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );

      console.log("Réponse de l'API:", response.data);
      onClose()
      
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleSpecialityChange = (e) => setSpeciality(e.target.value);
  const handleTelephoneChange = (e) => setTelephone(e.target.value);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description">
        <Typography id="nested-modal-title" level="h2">
          Add Technician
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
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Enter first name"
              size="lg"
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Enter last name"
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Specialty</FormLabel>
            <Input
              name="specialty"
              value={speciality}
              onChange={handleSpecialityChange}
              placeholder="Enter specialty"
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Telephone</FormLabel>
            <Input
              name="telephone"
              value={telephone}
              onChange={handleTelephoneChange}
              placeholder="Enter telephone number"
              fullWidth
            />
          </FormControl>
        </Box>

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

export default ModalAddTechnicien;
