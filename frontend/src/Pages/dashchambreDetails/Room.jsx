import * as React from "react";
import { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Chip from "@mui/joy/Chip";
import { Link, useNavigate } from "react-router-dom";
import {
  AdminPanelSettings,
  ArrowForwardIosRounded,
  AssistantPhotoSharp,
  Call,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";
import { Autocomplete, CardContent, CardMedia } from "@mui/material";
import { CardCover } from "@mui/joy";
import {
  chambreDetails,
  DeluxeRoomDetails,
  DoubleRoomDetails,
  SharedRoomDetails,
  SingleRoomDetails,
  VipRoomDetails,
} from "./chamberType/ChambreDeatils.js";
import { TabPanel } from "@mui/base";
import ChambreResidents from "./ChambreResidents";
import ChambreIncidents from "./ChambreIncidents";

import vip1 from "./chambreImages/vip1.jpg";
import vip2 from "./chambreImages/vip2.jpg";
import vip3 from "./chambreImages/vip3.png";

import deluxe1 from "./chambreImages/deluxe1.jpg";
import deluxe2 from "./chambreImages/deluxe2.jpg";
import deluxe3 from "./chambreImages/deluxe3.jpg";

import double1 from "./chambreImages/double1.jpg";
import double2 from "./chambreImages/double2.jpg";
import double3 from "./chambreImages/double3.jpg";

import simple1 from "./chambreImages/simple1.jpg";
import simple2 from "./chambreImages/simple2.webp";
import simple3 from "./chambreImages/simple3.jpg";

import shared from "./chambreImages/cpart.jpg";
import axios from "axios";

export default function Room(chambre) {
  const RoomData = chambre.chambre;
  console.log(RoomData);

  const [adminProfile, setAdminProfile] = useState({});
  const imageVip = [vip1, vip2, vip3];
  const imageDeluxe = [deluxe1, deluxe2, deluxe3];
  const imageSimple = [simple1, simple2, simple3];
  const imageDouble = [double1, double2, double3];
  const imageShared = [shared];
  const [showDeletetAlert, setDeleteShowAlert] = React.useState(false);

  const handleDelete = () => {
    setDeleteShowAlert(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteShowAlert(true);
    handleSubmitDelete();
  };

  const handleDeleteCancel = () => {
    setDeleteShowAlert(false);
  };

  const [index, setIndex] = React.useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesType.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesType.length - 1 : prevIndex - 1
    );
  };

  let imagesType = [];
  switch (RoomData.type) {
    case "VipRoom":
      imagesType = [vip1, vip2, vip3];
      break;
    case "DeluxeRoom":
      imagesType = [deluxe1, deluxe2, deluxe3];
      break;
    case "SingleRoom":
      imagesType = [simple1, simple2, simple3];
      break;
    case "DoubleRoom":
      imagesType = [double1, double2, double3];
      break;
    case "SharedRoom":
      imagesType = [shared];
      break;
    default:
      imagesType = [];
  }

  let chambreDetails;
  switch (RoomData.type) {
    case "VipRoom":
      chambreDetails = VipRoomDetails;
      break;
    case "DeluxeRoom":
      chambreDetails = DeluxeRoomDetails;
      break;
    case "SingleRoom":
      chambreDetails = SingleRoomDetails;
      break;
    case "DoubleRoom":
      chambreDetails = DoubleRoomDetails;
      break;
    case "SharedRoom":
      chambreDetails = SharedRoomDetails;
      break;
    default:
      chambreDetails = [];
  }
  const nave = useNavigate()

  const handleSubmitDelete = async () => {
    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.delete(
        ` http://localhost:8080/chambres/delete/${RoomData.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );
      nave("/dashrooms")

      console.log("Réponse de l'API:", response.data);
      // Ajoutez votre logique ici pour gérer la réponse
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };


  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="h6">Personal info</Typography>
          </Box>
          <Divider />

          <Stack direction="row" spacing={3} sx={{ my: 1 }}>
            <Stack direction="column" spacing={1}>
              <Card
                component="li"
                sx={{ minWidth: 500, flexGrow: 1, position: "relative" }}>
                <CardMedia
                  component="img"
                  image={imagesType[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  sx={{
                    width: "100%", // Ajuste à la largeur du conteneur
                    height: "300px", // Hauteur constante
                    objectFit: "cover", // Garde les proportions de l'image
                    transition: "opacity 0.5s ease-in-out", // Animation de transition
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                  }}>
                  <Button
                    onClick={prevImage}
                    sx={{
                      position: "absolute",
                      top: "-350%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      backgroundColor: "rgba(128, 128, 128, 0.5)", // Gris avec 50% de transparence
                      "&:hover": {
                        backgroundColor: "rgba(128, 128, 128, 0.7)", // Gris avec plus de transparence lors du survol
                      },
                    }}>
                    <ArrowBackIosNewIcon />
                  </Button>
                  <Button
                    onClick={nextImage}
                    sx={{
                      position: "absolute",
                      top: "-350%",
                      right: "40px",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      color: "#fff",
                      backgroundColor: "rgba(128, 128, 128, 0.5)", // Gris avec 50% de transparence
                      "&:hover": {
                        backgroundColor: "rgba(128, 128, 128, 0.7)", // Gris avec plus de transparence lors du survol
                      },
                    }}>
                    <ArrowForwardIosIcon />
                  </Button>
                </CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Button
                    sx={{ width: "100px", marginLeft: "10px" }}
                    size="sm"
                    variant="solid"
                    onClick={() => {
                      console.log("Update profile");
                    }}>
                    Update
                  </Button>

                  <Button
                    sx={{ width: "100px", marginRight: "10px" }}
                    size="sm"
                    variant="solid"
                    color="warning"
                    onClick={() => {
                      handleDelete()
                    }}>
                    Delete
                  </Button>
                </Stack>
              </Card>
            </Stack>

            <Stack spacing={2}>
              {/* Affichage du type de chambre */}
              <Typography level="h2" sx={{ flexGrow: 1, width: "250px" }}>
                {chambreDetails.type}
              </Typography>

              {/* Affichage des détails généraux de la chambre */}
              <Stack direction="row" spacing={1}>
                <FormControl sx={{ flexGrow: 1, width: "100px" }}>
                  <FormLabel>Room Number</FormLabel>
                  <Chip size="lg" variant="outlined" sx={{ flexGrow: 1 }}>
                    {RoomData.number}
                  </Chip>
                </FormControl>

                <FormControl sx={{ flexGrow: 1, width: "150px" }}>
                  <FormLabel>Number resident possible</FormLabel>
                  <Chip
                    size="lg"
                    variant="outlined"
                    sx={{ flexGrow: 1, width: "200px" }}>
                    {RoomData.numberResidentPossible &&
                    RoomData.numberResidentPossible >= 1
                      ? RoomData.numberResidentPossible
                      : "0"}
                  </Chip>{" "}
                </FormControl>

                <FormControl sx={{ flexGrow: 1, width: "100px" }}>
                  <FormLabel>Curent number</FormLabel>
                  <Chip
                    size="lg"
                    variant="outlined"
                    sx={{ flexGrow: 1, width: "200px" }}>
                    {RoomData.numberCurent && RoomData.numberCurent >= 1
                      ? RoomData.numberCurent
                      : "0"}
                  </Chip>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={1}>
                <FormControl sx={{ flexGrow: 1, width: "100px" }}>
                  <FormLabel>Price</FormLabel>
                  <Chip size="lg" variant="outlined">
                    ${RoomData.price}
                  </Chip>
                </FormControl>

                <FormControl sx={{ flexGrow: 1, width: "150px" }}>
                  <FormLabel>Size</FormLabel>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    <Chip size="lg" variant="outlined" sx={{ flexGrow: 1 }}>
                      {chambreDetails.size}
                    </Chip>
                  </Typography>
                </FormControl>
                <FormControl sx={{ flexGrow: 1, width: "100px" }}>
                  <FormLabel>Status</FormLabel>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {RoomData.status && RoomData.status === "Occupied" ? (
                      <Chip
                        size="lg"
                        color="warning"
                        variant="outlined"
                        sx={{ flexGrow: 1 }}>
                        {RoomData.status}
                      </Chip>
                    ) : (
                      <Chip
                        size="lg"
                        color="success"
                        variant="outlined"
                        sx={{ flexGrow: 1 }}>
                        {RoomData.status}
                      </Chip>
                    )}
                  </Typography>
                </FormControl>
              </Stack>

              {/* Affichage des détails supplémentaires de la chambre */}

              <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                <FormControl>
                  <FormLabel>Amenities</FormLabel>
                  <Typography variant="body1" sx={{ width: "550px" }}>
                    {chambreDetails.amenities}
                  </Typography>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Connection</FormLabel>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {chambreDetails.connection}
                  </Typography>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {chambreDetails.description}
                  </Typography>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          <Box>
            <Tabs
              aria-label="Pipeline"
              value={index}
              onChange={(event, value) => setIndex(value)}>
              <TabList
                sx={{
                  "--Tabs-spacing": "30px",
                  "--Tab-indicatorSize": "50px",

                  pt: 1,
                  justifyContent: "left",

                  [`&& .${tabClasses.root}`]: {
                    flex: "initial",
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                    [`&.${tabClasses.selected}`]: {
                      color: "primary.plainColor",
                      "&::after": {
                        height: 2,
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        bgcolor: "primary.500",
                      },
                    },
                  },
                }}>
                <Tab
                  sx={{
                    fontSize: "1.2rem",
                    padding: "8px 16px",
                  }}
                  indicatorInset>
                  Residents{" "}
                </Tab>
                <Tab
                  sx={{
                    fontSize: "1.2rem",
                    padding: "8px 16px",
                  }}
                  indicatorInset>
                  Incidents{" "}
                </Tab>
              </TabList>
              <Box
                sx={(theme) => ({
                  "--bg": theme.vars.palette.background.surface,
                  background: "var(--bg)",
                  boxShadow: "0 0 0 100vmax var(--bg)",
                  clipPath: "inset(0 -100vmax)",
                })}>
                <TabPanel value={0}>
                  {RoomData.residents && RoomData.residents.length > 0 ? (
                    RoomData.residents.map((resident, index) => (
                      <ChambreResidents key={index} resident={resident} />
                    ))
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "gray",
                      }}>
                      No residents found
                    </Typography>
                  )}
                </TabPanel>
                <TabPanel value={1}>
                  {RoomData.incidents && RoomData.incidents.length > 0 ? (
                    RoomData.incidents.map((incident, index) => (
                      <ChambreIncidents key={index} incident={incident} />
                    ))
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "gray",
                      }}>
                      No Incident found
                    </Typography>
                  )}
                </TabPanel>{" "}
              </Box>
            </Tabs>
          </Box>
        </Card>
      </Stack>
      {showDeletetAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this room ? This action cannot be
              undone.
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleDeleteCancel} color="neutral">
                Cancel
              </Button>
              <Button color="primary" onClick={handleDeleteConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
