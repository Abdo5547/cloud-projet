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
import BlockIcon from "@mui/icons-material/Block";

import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";


export default function ModalChambreResidents({ open, onClose, residents }) {
  const ins = residents;

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
          Liste des Incidents
        </Typography>
        <Box
          id="nested-modal-description"
          textColor="text.tertiary"
          sx={{ mt: 2, mb: 1 }}>
          {/* Ligne par défaut */}

          {/* Affichage des incidents si présents */}
          {ins && ins.length > 0 ? (
            <ul>
              {ins.map((incident) => (
                <li key={incident.incidentid} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>first name:</strong> {incident.residentFirstName}
                  </div>
                  <div>
                    <strong>last name :</strong> {incident.residentLastName}
                  </div>
                  <div>
                    <strong>paiment status :</strong> {incident.statusPayment}
                  </div>
                  <div>
                    <strong>resident telephone:</strong> {incident.telephone} 
                  </div>
                  
                  <div>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Paid: <CheckRoundedIcon />,
                          Pending: <AutorenewRoundedIcon />,
                          LatePayment: <BlockIcon/>,

                        }[incident.statusPayment]
                      }
                      color={
                        {
                          Paid: "success",
                          Pending: "neutral",
                          LatePayment: "warning",

                        }[incident.statusPayment]
                      }
                      sx={{
                        flex: 1,
                        textAlign: "left",
                        mr: 50,
                      }}>
                      {incident.statusPayment}
                    </Chip>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Typography sx={{ mt: 2 }}>Aucun incident à afficher.</Typography>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
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
