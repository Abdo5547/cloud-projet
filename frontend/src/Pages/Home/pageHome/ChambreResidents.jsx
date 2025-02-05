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

// Exemple de données d'un résident

export default function ChambreResidents({resident}) {
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

           
          </Sheet>
        </CardContent>
      </Card>
    </Box>
  );
}
