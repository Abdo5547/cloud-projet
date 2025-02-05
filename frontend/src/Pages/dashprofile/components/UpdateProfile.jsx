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

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DropZone from "./DropZone";
import CountrySelector from "./CountrySelector";
import EditorToolbar from "./EditorToolbar";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AdminPanelSettings,
  AssistantPhotoSharp,
  Call,
  Person,
} from "@mui/icons-material";
import logo from "../../../Images/profile.png";
import { Autocomplete } from "@mui/material";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

export default function MyProfile() {
  const [adminProfile, setAdminProfile] = useState({});

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
  console.log(adminProfile);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    handleSubmit();
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    const updatedData = {}; // Objet pour stocker uniquement les champs modifiés

    // Comparer chaque champ pour voir s'il a été modifié
    if (firstName && firstName !== adminProfile.firstName) {
      updatedData.firstName = firstName;
    }
    if (lastName && lastName !== adminProfile.lastName) {
      updatedData.lastName = lastName;
    }
    if (email && email !== adminProfile.userName) {
      updatedData.userName = email;
    }
    if (country && country !== adminProfile.country) {
      updatedData.country = country;
    }
    if (telephone && telephone !== adminProfile.telephone) {
      updatedData.telephone = telephone;
    }

    updatedData.role = "admin";

    // Vérifier s'il y a des données à envoyer
    if (Object.keys(updatedData).length === 0) {
      console.log("Aucune donnée modifiée à envoyer");
      return;
    }

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        ` http://localhost:8080/up/${adminProfile.id}`,

        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );
      console.log("Réponse de l'API:", response.data);
      // Ajoutez votre logique ici pour gérer la réponse
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !telephone || !country) {
      setError("Tous les champs doivent être remplis.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}>
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}>
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home">
              <HomeRoundedIcon />
            </Link>

            <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Home</Typography>
            <Typography color="warning" sx={{ fontWeight: 500, fontSize: 12 }}>
              Update profile
            </Typography>
          </Breadcrumbs>

          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Update profile
          </Typography>
        </Box>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the
              networks.
            </Typography>
          </Box>
          <Divider />
          <Stack direction="row" spacing={3} sx={{ my: 1 }}>
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}>
                <img src={logo} loading="lazy" alt="" />
              </AspectRatio>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row", // Align the inputs side by side
                      gap: 2,
                      alignItems: "center", // Center the inputs vertically if needed
                    }}>
                    <Input
                      size="sm"
                      color="warning"
                      placeholder={adminProfile.firstName}
                      value={firstName}
                      required
                      startDecorator={<Person color="warning" />}
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <Input
                      required
                      size="sm"
                      color="warning"
                      placeholder={adminProfile.lastName}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      sx={{ flexGrow: 2 }}
                      startDecorator={<Person color="warning" />}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Admin"
                    color="warning"
                    disabled
                    startDecorator={<AdminPanelSettings color="warning" />}
                    sx={{ flexGrow: 1, width: "250px" }}
                  />
                </FormControl>

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    color="warning"
                    required
                    startDecorator={<Call color="warning" />}
                    placeholder={adminProfile.telephone}
                    sx={{ width: "250px" }}
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    color="warning"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    startDecorator={<EmailRoundedIcon color="warning" />}
                    placeholder={adminProfile.userName}
                  />
                </FormControl>
              </Stack>

              <div>
                <CountrySelector
                  value={country}
                  color="warning"
                  placeholder={adminProfile.country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Timezone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    color="warning"
                    sx={{ flexGrow: 1 }}
                    disabled
                    startDecorator={
                      <AccessTimeFilledRoundedIcon color="warning" />
                    }
                    placeholder={"Morocco Time (Casablanca) — GMT+01:00 "}
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSave}>
                Save
              </Button>

              {error && (
                <Box
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    textAlign: "center",
                    mt: 2,
                  }}>
                  <Typography>{error}</Typography>
                </Box>
              )}

              {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                  <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Are you sure?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to modify your data? This action
                      cannot be undone.
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={handleCancel}>
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={handleConfirm}>
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
