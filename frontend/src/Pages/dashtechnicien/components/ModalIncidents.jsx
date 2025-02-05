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

export default function ModalIncidents({ open, onClose, incidents }) {
  console.log(incidents);
  const ins = incidents;
  console.log(ins)



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
                    <strong>Description :</strong> {incident.description}
                  </div>
                  <div>
                    <strong>start date :</strong> {incident.dateAlert}
                  </div>
                  <div>
                    <strong>End date :</strong> {incident.dateResolved}
                  </div>
                  <div>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Resolved: <CheckRoundedIcon />,
                          InProgress: <AutorenewRoundedIcon />,
                        }[incident.status]
                      }
                      color={
                        {
                          Resolved: "success",
                          InProgress: "neutral",
                        }[incident.status]
                      }
                      sx={{
                        flex: 1,
                        textAlign: "left",
                        mr: 50,
                      }}>
                      {incident.status}
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
