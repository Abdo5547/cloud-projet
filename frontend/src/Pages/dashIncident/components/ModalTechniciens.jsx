import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
  Stack,
  Chip,
} from "@mui/joy";
import { ColorPaletteProp } from "@mui/joy/styles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import axios from "axios";

export default function ModalTechniciens({ open, onClose, id }) {
  console.log(id);

  // Fonction pour ajouter un technicien
  const handleAddTechnicien = async (techid) => {
    const token = localStorage.getItem("token");
    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await axios.put(
        `http://localhost:8080/incidents/${id}/${techid}`,
        {
          status: "InProgress",
          dateAlert: today,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );

      console.log("Réponse de l'API:", response.data);
      window.location.reload(); // Recharger la page après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const [row, setRow] = React.useState([]);

  // Récupérer les informations de l'incident
  React.useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch(`http://localhost:8080/incidents/description/${id}`, {
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
      .then((data) => setRow(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [id]);

  const [techDescription, setTechDescription] = React.useState([]);

  // Récupérer la liste des techniciens
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://localhost:8080/techniciens/listti", {
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
      .then((data) => setTechDescription(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const techniciens = techDescription.slice(0, 4);

  const filteredTechniciens = techDescription.filter(
    (technicien) => technicien.speciality === row.description
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        size="sm"
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only("xs")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
          },
        })}
      >
        <Typography id="nested-modal-title" level="h2">
          Liste des techniciens
        </Typography>
        <Box
          id="nested-modal-description"
          textColor="text.tertiary"
          sx={{ mt: 2, mb: 1 }}
        >
          {/* Affichage des techniciens filtrés */}
          {filteredTechniciens && filteredTechniciens.length > 0 ? (
            <ul>
              {filteredTechniciens.map((technicien) => (
                <li key={technicien.id} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>Speciality:</strong> {technicien.speciality}
                  </div>
                  <div>
                    <strong>Name:</strong> {technicien.firstName}{" "}
                    {technicien.lastName}
                  </div>
                  <div>
                    <strong>Telephone:</strong> {technicien.telephone}
                  </div>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleAddTechnicien(technicien.id)} // Appeler la fonction au clic
                  >
                    +Add Technicien
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {techniciens.map((technicien) => (
                <li key={technicien.id} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>Speciality:</strong>{" "}
                    {technicien.speciality === row.description
                      ? technicien.speciality
                      : "Others"}
                  </div>
                  <div>
                    <strong>Name:</strong> {technicien.firstName}{" "}
                    {technicien.lastName}
                  </div>
                  <div>
                    <strong>Telephone:</strong> {technicien.telephone}
                  </div>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleAddTechnicien(technicien.id)} // Appeler la fonction au clic
                  >
                    +Add Technicien
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}
        >
          <Button variant="solid" color="primary" onClick={() => onClose()}>
            Continue
          </Button>
          <Button variant="outlined" color="neutral" onClick={() => onClose()}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
