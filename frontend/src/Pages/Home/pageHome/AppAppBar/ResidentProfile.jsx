import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//mui material import
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import imageeee from "../../../../Images/logo.png";
import { Alert, Avatar, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

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

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Badge from "@mui/material/Badge";
//components imports

//notification icons
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Exemple from "./Exemple";
import theme from "./Theme";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import Profile from "./Profile";
import Room from "../Room";

import {
  AdminPanelSettings,
  AssistantPhotoSharp,
  Call,
  Person,
  Person2,
  PrecisionManufacturingOutlined,
} from "@mui/icons-material";

import logo from "../../../../Images/profile.png";
import PaymentHistory from "../paymentresident/PaymentHistory";

//import Home from "../../pages/sign/Home/Home";

// styling variables begin

const logoStyle = {
  marginTop: "16px",
  width: "160px",
  height: "auto",
  cursor: "pointer",
};

const addnewstyle = {
  marginRight: "-10px",
  marginLeft: "18px",
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: "black",
};

// styling variables end

// Composant de la barre de navigation
// Utilisez le hook useContext pour obtenir le degré de l'utilisateur

export default function Resident({ mode, toggleColorMode }) {
  const [openExemple, setOpenExemple] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openUpdates, setOpenUpdates] = useState(false);
  const [value, setValue] = useState(0);
  const [index, setIndex] = React.useState(0);

  const [me, setMe] = useState({});

  const containerrRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerrRef.current &&
        !containerrRef.current.contains(event.target)
      ) {
        setOpenRequest(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenExemple(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [openProfile, setOpenProfile] = useState(false);

  const [status, setStatus] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      setIsLoading(false); // Arrêter le chargement même si le token est absent
      return;
    }
    // Désactiver le chargement après l'appel API
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé. Veuillez vous connecter.");
        setIsLoading(false);
        return;
      }
      try {
        // Récupération des données utilisateur
        const userResponse = await fetch("http://127.0.0.1:8080/resident/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          throw new Error(
            "Erreur lors de la récupération des données du profil"
          );
        }

        const userData = await userResponse.json();
        if (!userData.id) {
          throw new Error("Aucun ID utilisateur trouvé dans la réponse");
        }
        setAdminProfile(userData);

        // Récupération des notifications après avoir défini le profil
        const notificationsResponse = await fetch(
          `http://127.0.0.1:8080/notifications/resident/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!notificationsResponse.ok) {
          throw new Error("Erreur lors de la récupération des notifications");
        }

        const notificationsData = await notificationsResponse.json();
        setStatus(notificationsData[0].status);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const containeerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containeerRef.current &&
        !containeerRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  //recuperation du user authetifier

  const [adminProfile, setAdminProfile] = useState({});

  return (
    <div>
      <AppBar
        sx={{
          boxShadow: 0,
          backgroundColor: "transparent",
          backgroundImage: "none",
          mt: 1,
        }}>
        <Container maxWidth="1g">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              height: "50px",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
              backdropFilter: "blur(24px)",
              maxHeight: 30,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}>
            <Box
              sx={{
                flexGrow: 10,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
              }}>
              {/* image begin */}
              <img
                src={imageeee}
                style={logoStyle}
                alt="logo of ResearchUnity"
              />

              {/* image end */}

              {/* link begin */}
            </Box>

            {/* link end */}

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}>
              {/* icons start */}
              <Badge color="secondary">
                <div ref={containerrRef}>
                  <IconButton>
                    <NotificationsIcon />
                  </IconButton>
                </div>
              </Badge>

              <Badge color="secondary">
                <div ref={containerRef}>
                  <IconButton>
                    <MailOutlineIcon />
                  </IconButton>
                </div>
              </Badge>
              {/* icons end */}
              {/* image start */}
              <div ref={containeerRef}>
                <IconButton
                  size="large"
                  style={{ color: "#212121" }}
                  onClick={() => setOpenProfile((prev) => !prev)}>
                  <Avatar src={logo} />
                </IconButton>
              </div>
              {/* image end */}

              {/* button endd */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          bgcolor: "white",
          flexGrow: 1,
          m: -2,
          overflowX: "hidden",
          mt: "110px",
          ml: "200px",
          mr: "200px",
        }}>
        <Tabs
          aria-label="Pipeline"
          value={index}
          onChange={(event, value) => setIndex(value)}>
          <TabList
            sx={{
              pt: 1,
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                flex: "initial",
                bgcolor: "transparent",
                "&:hover": {
                  bgcolor: "#fef0f2",
                },
                [`&.${tabClasses.selected}`]: {
                  color: "#2f1fd6",
                  "&::after": {
                    height: 2,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    bgcolor: "#2f1fd6",
                  },
                },
              },
            }}>
            <Tab indicatorInset sx={{ fontSize: "20px" }}>
              Profile{" "}
            </Tab>
            <Tab indicatorInset sx={{ fontSize: "20px" }}>
              Room
            </Tab>
            <Tab indicatorInset sx={{ fontSize: "20px" }}>
              Payment
            </Tab>
          </TabList>
          <Box
            sx={(theme) => ({
              "--bg": theme.vars.palette.background.surface,
              background: "var(--bg)",
              boxShadow: "0 0 0 100vmax var(--bg)",
              clipPath: "inset(0 -100vmax)",
            })}>
            {/*  Profile  */}
            <TabPanel value={0}>
              <Profile />
            </TabPanel>

            {/*  Room  */}
            <TabPanel value={1}>
              {status !== "Accepted" ? (
                <Box sx={{ p: 3, textAlign: "center", color: "red" }}>
                  You must wait until the administrator accepts your
                  reservation.
                </Box>
              ) : (
                <Room
                  chambre={adminProfile.chambre}
                  incidentResident={adminProfile.incidents}
                />
              )}
            </TabPanel>

            {/* Payment */}
            <TabPanel value={2}>
              {status !== "Accepted" ? (
                <Box sx={{ p: 3, textAlign: "center", color: "red" }}>
                  You must wait until the administrator accepts your
                  reservation.
                </Box>
              ) : (
                <PaymentHistory />
              )}
            </TabPanel>
          </Box>
        </Tabs>
      </Box>
    </div>
  );
}
