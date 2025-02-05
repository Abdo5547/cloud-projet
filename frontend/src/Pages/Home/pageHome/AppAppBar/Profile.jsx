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

import { Link } from "react-router-dom";
import {
  AdminPanelSettings,
  AssistantPhotoSharp,
  Call,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";
import logo from "../../../../Images/profile.png";
import { Autocomplete } from "@mui/material";

export default function Profile(resident) {
  const [adminProfile, setAdminProfile] = useState({});

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
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
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
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
                      startDecorator={<Person color="primary" />}
                      sx={{ flexGrow: 1 }} // Ensure it takes available space
                    />

                    <Input
                      size="sm"
                      placeholder={adminProfile.lastName}
                      disabled
                      sx={{ flexGrow: 1 }} // Ensure it takes available space
                      startDecorator={<Person color="primary" />}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Resident"
                    startDecorator={<AdminPanelSettings color="primary" />}
                    disabled
                    sx={{ flexGrow: 1, width: "250px" }}
                  />
                </FormControl>

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<Call color="primary" />}
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
                    startDecorator={<EmailRoundedIcon color="primary" />}
                    placeholder={adminProfile.userName}
                    disabled
                  />
                </FormControl>
              </Stack>

              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Timezone</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    sx={{ flexGrow: 1 }}
                    startDecorator={
                      <AccessTimeFilledRoundedIcon color="primary" />
                    }
                    placeholder={"Morocco Time (Casablanca)  — GMT+01:00 "}
                    disabled
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}></CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
