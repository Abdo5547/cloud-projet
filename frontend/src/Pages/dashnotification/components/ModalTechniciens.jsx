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




export default function ModalTechniciens({ open, onClose }) {
  const technicien=[
    {
      "technicienId": 1,
      "speciality": "HVAC Repair",
      "firstName": "James",
      "lastName": "Smith",
      "telephone": 1234567890
    },
    {
      "technicienId": 2,
      "speciality": "Heating Systems",
      "firstName": "Robert",
      "lastName": "Brown",
      "telephone": 1234567891
    },
    {
      "technicienId": 3,
      "speciality": "Window Repairs",
      "firstName": "John",
      "lastName": "Davis",
      "telephone": 1234567892
    },
    {
      "technicienId": 4,
      "speciality": "Cleaning",
      "firstName": "Charles",
      "lastName": "Garcia",
      "telephone": 1234567893
    },
    {
      "technicienId": 5,
      "speciality": "Furniture Repair",
      "firstName": "Christopher",
      "lastName": "Anderson",
      "telephone": 1234567894
    },
    {
      "technicienId": 6,
      "speciality": "Locksmith",
      "firstName": "Daniel",
      "lastName": "Taylor",
      "telephone": 1234567895
    },
    {
      "technicienId": 7,
      "speciality": "Customer Relations",
      "firstName": "Matthew",
      "lastName": "Moore",
      "telephone": 1234567896
    }
  ]
  

  const limitedTechniciens = technicien.slice(0, 4
  );


 
  const ins = technicien.slice(0, 4);

  const [openn, setOpenn] = useState(false);

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
        })}>
        <Typography id="nested-modal-title" level="h2">
          Liste des technicien
        </Typography>
        <Box
          id="nested-modal-description"
          textColor="text.tertiary"
          sx={{ mt: 2, mb: 1 }}>
          {/* Ligne par défaut */}

          {/* Affichage des technicien si présents */}
          {ins && ins.length > 0 ? (
            <ul>
              {ins.map((technicien) => (
                <li key={technicien.incidentid} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>Speciality :</strong> {technicien.speciality}
                  </div>
                  <div>
                    <strong>Name:</strong> {technicien.firstName} {technicien.lastName}
                  </div>
                  <div>
                    <strong>Telephone :</strong> {technicien.telephone}
                  </div>
                  <Button color="primary" size="sm"  >+Add technicien</Button>
                  
                 
                </li>
              ))}
            </ul>
          ) : (
            <Typography sx={{ mt: 2 }}>Aucun technicien à afficher.</Typography>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setOpenn(false)}>
            Continue
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpenn(false)}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
