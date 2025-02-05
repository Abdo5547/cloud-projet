import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Chip } from "@mui/joy";
import {
  Air,
  BugReport,
  Carpenter,
  ElectricBolt,
  Plumbing,
} from "@mui/icons-material";

// Exemple de données d'un incident
const incident = {
  description: "Electricity",
  dateAlert: null,
  dateResolved: null,
  status: "Pending",
  firstNameTechnicien: null,
  lastNameTechnicien: null,
};
const incidentIcons = {
  Electricity: (
    <ElectricBolt sx={{ fontSize: 30, color: "rgb(255, 251, 0)" }} />
  ),
  AirConditioning: <Air sx={{ fontSize: 30, color: "rgb(42, 219, 107)" }} />,
  Plumbing: <Plumbing sx={{ fontSize: 30, color: "rgb(255, 56, 123)" }} />,
  Structure: <Carpenter sx={{ fontSize: 30, color: "rgb(143, 7, 158)" }} />,
  Others: <BugReport sx={{ fontSize: 30, color: "rgb(10, 13, 197)" }} />,
};

export default function ChambreMyIncidents({ incident }) {
  console.log(incident);
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        marginTop: "10px",
        left: "-17px",
      }}>
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          right: "-32px",
        }}>
        <CardContent>
          <Typography
            startDecorator={
              incidentIcons[incident.description] || (
                <BugReport sx={{ fontSize: 30, color: "gray" }} />
              )
            }
            sx={{ fontSize: "xl", fontWeight: "lg" }}>
            {incident.description}
          </Typography>

          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}>
            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Alert Date
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                {incident.dateAlert ? incident.dateAlert : "Not available"}
              </Typography>
            </div>

            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Resolution Date
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                {incident.dateResolved
                  ? incident.dateResolved
                  : "Not resolved yet"}
              </Typography>
            </div>

            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Status
              </Typography>
              <Chip
                size="lg"
                color={incident.status === "Pending" ? "warning" : "success"}
                variant="outlined"
                sx={{ flexGrow: 1 }}>
                {incident.status}
              </Chip>
            </div>
            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Resolution Date
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                {incident.lastNameTechnicien
                  ? `${incident.lastNameTechnicien} ${incident.firstNameTechnicien}`
                  : "Not resolved yet"}
              </Typography>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
