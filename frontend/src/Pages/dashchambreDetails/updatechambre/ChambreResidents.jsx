import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import profil from "../../../Images/profRes.png";
import { Chip } from "@mui/joy";
import axios from "axios";

// Exemple de données d'un résident

export default function ChambreResidents({ resident }) {
  const [showDeletetAlert, setDeleteShowAlert] = React.useState(false);

  const handleDelete = async () => {
    // Afficher une boîte de confirmation simple
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Resident from this room? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        // Récupérer le token
        const token = localStorage.getItem("token");

        // Effectuer la requête API
        const response = await axios.put(
          `http://localhost:8080/resident/${resident.id}/deletechambre`,
        
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Réponse de l'API:", response.data);
        // Recharger la page pour refléter les changements
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

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
        <AspectRatio flex ratio="1" maxHeight={100} sx={{ minWidth: 182 }}>
          <img
            src={profil}
            loading="lazy"
            alt={`${resident.firstNameResident} ${resident.lastNameResident}`}
          />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
            {resident.firstNameResident} {resident.lastNameResident}
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
                Telephone
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                <Chip>{resident.telephone}</Chip>
              </Typography>
            </div>

            <div>
              <Typography level="h5" sx={{ fontWeight: "lg" }}>
                Payment status
              </Typography>

              {resident.statusPayment && resident.statusPayment != "Paid" ? (
                <Chip
                  size="lg"
                  color="warning"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}>
                  {resident.statusPayment}
                </Chip>
              ) : (
                <Chip
                  size="lg"
                  color="success"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}>
                  {resident.statusPayment}
                </Chip>
              )}
            </div>
            <div>
              <Button color="warning" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
