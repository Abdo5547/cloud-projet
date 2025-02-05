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
  Label,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { CardCover } from "@mui/joy";
import {
  chambreDetails,
  DeluxeRoomDetails,
  DoubleRoomDetails,
  SharedRoomDetails,
  SingleRoomDetails,
  VipRoomDetails,
} from "./ChambreDeatils.js";
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
import AppAppBar from "./AppAppBar/ResidentProfile.jsx";
import ChambreMyIncidents from "./ChambreMyIncidents.jsx";

import { MenuItem, InputLabel } from "@mui/material";
import {
  ElectricBolt,
  Air,
  Plumbing,
  Carpenter,
  BugReport,
} from "@mui/icons-material";

// Définition des icônes
const incidentIcons = {
  Electricity: (
    <ElectricBolt sx={{ fontSize: 30, color: "rgb(255, 251, 0)" }} />
  ),
  AirConditioningAndHeating: (
    <Air sx={{ fontSize: 30, color: "rgb(42, 219, 107)" }} />
  ),
  Plumbing: <Plumbing sx={{ fontSize: 30, color: "rgb(255, 56, 123)" }} />,
  Structure: <Carpenter sx={{ fontSize: 30, color: "rgb(143, 7, 158)" }} />,
  Others: <BugReport sx={{ fontSize: 30, color: "rgb(10, 13, 197)" }} />,
};

export default function Room(chambre, incidentResident) {
  const RoomData = chambre.chambre;
  const incidentResdent = chambre.incidentResident;

  const imageVip = [vip1, vip2, vip3];
  const imageDeluxe = [deluxe1, deluxe2, deluxe3];
  const imageSimple = [simple1, simple2, simple3];
  const imageDouble = [double1, double2, double3];
  const imageShared = [shared];
  const [showDeletetAlert, setDeleteShowAlert] = React.useState(false);

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
  const nave = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  // Gestion de l'ouverture/fermeture du modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [incidentType, setIncidentType] = useState("");

  // Fonction pour gérer le changement de type d'incident
  const handleIncidentTypeChange = (event) => {
    setIncidentType(event.target.value);
  };

  const MyModal = ({ open, handleClose }) => {
    const [selectedType, setSelectedType] = useState("");
  };

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Déclaration de l'état pour gérer la description sélectionnée

  // Fonction pour gérer le changement de description
  const handleDescriptionChange = (event) => {
    setSelectedDescription(event.target.value);
  };

  const [selectedDescription, setSelectedDescription] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleCancel = () => {
    handleClose(); // Fermer le modal sans enregistrer
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true); // Ouvrir la boîte de confirmation
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false); // Fermer la boîte de confirmation
  };

  const handleConfirmSubmit = () => {
    // Si confirmé, soumettre les données
    setOpenConfirmDialog(false); // Fermer la boîte de confirmation
  };

  const [adminProfile, setAdminProfile] = useState({});
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      setIsLoading(false); // Arrêter le chargement même si le token est absent
      return;
    }

    fetch("http://127.0.0.1:8080/resident/me/", {
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
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      )
      .finally(() => setIsLoading(false)); // Désactiver le chargement après l'appel API
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8080/incidents/add", {
        resident: { id: adminProfile.id },
        chambre: { id: RoomData.id },
        description: selectedDescription,
        status: "Pending",
        isResolved: false,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error during request:", error.response || error.message);

      let errorMessage = "An error occurred during registration.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Email already exists. Please try another email.";
            break;
          case 500:
            errorMessage = "An error occurred during registration.";
            break;
          default:
            errorMessage = error.response.data.detail || errorMessage;
            break;
        }
      }
    }
  };

  const [value, setValue] = useState(0);

  return (
    <Box sx={{ flex: 1, width: "100%", marginTop: "-100px" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          width: "1190px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
          marginTop: "100px",
          ml: "-40px",
        }}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="h6">Personal info</Typography>
          </Box>
          <Button
            color="warning"
            onClick={handleOpen}
            sx={{ ml: "900px", mt: "-45px", width: "15%", bgcolor: "#ee6b48" }}>
            +Add Incident
          </Button>
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
                <Tab
                  sx={{
                    fontSize: "1.2rem",
                    padding: "8px 16px",
                  }}
                  indicatorInset>
                  My Incidents
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
                  </TabPanel>
                  <TabPanel value={2}>
                    {incidentResdent.length > 0 ? (
                      incidentResdent.map((incident, index) => (
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
                  </TabPanel>
              </Box>
            </Tabs>
          </Box>
        </Card>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Incident
          </Typography>

          <RadioGroup
            value={selectedDescription}
            onChange={handleDescriptionChange}
            sx={{ mb: 2 }}>
            {Object.keys(incidentIcons).map((key) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {incidentIcons[key]}
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {key}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="danger"
              onClick={handleCancel}
              sx={{ width: "48%" }}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenConfirmDialog} // Ouvre la boîte de dialogue de confirmation
              sx={{ width: "48%" }}
              disabled={!selectedDescription}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to submit this incident?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmDialog}
            color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
