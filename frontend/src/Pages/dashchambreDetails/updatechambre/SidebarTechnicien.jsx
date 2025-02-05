import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ColorSchemeToggle from "./ColorSchemeToggle.js";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import logo from "../../../Images/logo.png";
import imgProfile from "../../../Images/profile.png";
import {
  BarChart,
  BarChartOutlined,
  Domain,
  Engineering,
  Group,
  Message,
  SettingsSuggest,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function Toggler({ defaultExpanded = true, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}>
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function SidebarTechnicien() {
  const [adminProfile, setAdminProfile] = React.useState({});

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

  return (
    <>
      <CssBaseline />
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}>
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "260px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img src={logo} alt="" style={{ width: "80%" }} />
        </Box>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}>
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}>
            <ListItem>
              <ListItemButton selected>
                <Domain color="warning" />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashrooms">
                    Rooms
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Group />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashresidents">
                    Residents
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Message />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashnotification">
                    Notification
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashpayment">
                    Payments
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Engineering />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashtechnicien">
                    Technicien
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <SettingsSuggest />
                <ListItemContent>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashincident">
                    Incidents
                  </ListItemButton>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <GroupRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Users</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: "rotate(180deg)",
                            }
                          : {
                              transform: "none",
                            },
                      ]}
                    />
                  </ListItemButton>
                )}>
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton
                      role="menuitem"
                      component="a"
                      href="/dashprofile">
                      Profil
                    </ListItemButton>
                  </ListItem>

                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton
                      role="menuitem"
                      component="a"
                      href="/dashupdateprofile">
                      Update Profil
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component="a"
                      href="/dashaddadmin">
                      Add Admin
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          </List>
          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}>
            <ListItem>
              <ListItemButton>
                <BarChartOutlined />
                <ListItemButton
                  role="menuitem"
                  component="a"
                  href="/dashstatistiques">
                  Statistics
                </ListItemButton>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar variant="outlined" size="sm" src={imgProfile} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {adminProfile.firstName} {adminProfile.lastName}.
            </Typography>
            <Typography level="body-xs">{adminProfile.userName}</Typography>
          </Box>
        </Box>
      </Sheet>
    </>
  );
}
