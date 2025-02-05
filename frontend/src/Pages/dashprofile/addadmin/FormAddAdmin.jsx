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
  Call,
  Password,
  PasswordSharp,
  Person,
} from "@mui/icons-material";
import axios from "axios";

export default function MyProfile() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [timezone, setTimezone] = React.useState("1");
  const [telephone, setTelephone] = React.useState("");






  const handleSubmit = async (e) => {
    e.preventDefault();
  

   
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/adda",
        {
          //resident info
          firstName:lastName,
          lastName:firstName,
          telephone:telephone,
          userName:email,
          password:password,
          roles: "Admin",
          country:"Morocco",
          active: true

        }
      );
      console.log(response);
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
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Add Admin
            </Typography>
          </Breadcrumbs>

          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Add Admin
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
          <Stack direction="row" spacing={3} sx={{ my: 1 }}>
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
                      color="primary"
                      placeholder="fist name"
                      value={firstName}
                      startDecorator={<Person color="primary" />}
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <Input
                      size="sm"
                      color="primary"
                      placeholder="last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      sx={{ flexGrow: 1 }}
                      startDecorator={<Person color="primary" />}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    color="primary"
                    startDecorator={<Call color="primary" />}
                    placeholder="telephone"
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
                    color="primary"
                    sx={{ flexGrow: 1 }}
                    startDecorator={<EmailRoundedIcon color="primary" />}
                    placeholder="email"
                    aria-label="Demo input"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    label="Email"
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => setPassword(e.target.value)}

                    startDecorator={<Password color="primary" />}
                    placeholder="password"
                    variant="outlined"
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
