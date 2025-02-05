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

import DropZone from "./DropZone";
import CountrySelector from "./CountrySelector";
import EditorToolbar from "./EditorToolbar";
import { Link } from "react-router-dom";
import {
  AdminPanelSettings,
  AssistantPhotoSharp,
  Call,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";
import logo from "../../../Images/profile.png";
import { Autocomplete } from "@mui/material";

export default function MyProfile() {
  const [adminProfile, setAdminProfile] = useState({});


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
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
              My profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
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
                      placeholder={adminProfile.firstName}
                      disabled
                      startDecorator={<Person color="warning" />}
                      sx={{ flexGrow: 1 }} // Ensure it takes available space
                    />

                    <Input
                      size="sm"
                      placeholder={adminProfile.lastName}
                      disabled
                      sx={{ flexGrow: 1 }} // Ensure it takes available space
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
                    startDecorator={<AdminPanelSettings color="warning" />}
                    disabled
                    sx={{ flexGrow: 1, width: "250px" }}
                  />
                </FormControl>

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<Call color="warning" />}
                    placeholder={adminProfile.telephone}
                    disabled
                    sx={{ width: "250px" }}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    sx={{ flexGrow: 1 }}
                    startDecorator={<EmailRoundedIcon color="warning" />}
                    placeholder={adminProfile.userName}
                    disabled
                  />
                </FormControl>
              </Stack>

              <div>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Country</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    sx={{ flexGrow: 1 }}
                    startDecorator={<AssistantPhotoSharp color="warning" />}
                    placeholder={adminProfile.country}
                    disabled
                  />
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Timezone</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    sx={{ flexGrow: 1 }}
                    startDecorator={
                      <AccessTimeFilledRoundedIcon color="warning" />
                    }
                    placeholder={"Morocco Time (Casablanca)  — GMT+01:00 "}
                    disabled
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="solid"
                onClick={() => {
                  console.log("Update profile");
                }}>
                <Link
                  to="/updateprofile"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  Update
                </Link>
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
