import * as React from "react";
import { useParams } from "react-router-dom";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SidebarTechnicien from "./components/SidebarTechnicien.jsx";
import HeaderTechnicien from "./components/HeaderTechnicien.tsx";
import theme from "./components/Theme.jsx";
import OrderList from "./components/OrderList.tsx";
import OrderTable from "./components/OrderTable.tsx";

import {
  VipRoomDetails,
  DeluxeRoomDetails,
  DoubleRoomDetails,
  SharedRoomDetails,
  SingleRoomDetails,
} from "./chamberType/ChambreDeatils.js";
import RoomDetails from "./chamberType/RoomDetails.jsx";
import MyProfile from "./Room.jsx";
import Room from "./Room.jsx";

export default function DashDetailsChambre() {
  const [idChambre, setIdChambre] = React.useState("");
  const [chambre, setChambre] = React.useState([{}]);

  const { id } = useParams();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch(`http://127.0.0.1:8080/chambres/${id}`, {
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
      .then((data) => {
        setChambre(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  let chambreDetails;
  switch (chambre.type) {
    case "VipRoom":
      chambreDetails = VipRoomDetails;
      break;
    case "DeluxeRoom":
      chambreDetails = DeluxeRoomDetails;
      break;
    case "SimpleRoom":
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

  console.log(chambre);
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <HeaderTechnicien />
        <SidebarTechnicien />
        <Box
          component="main"
          className="MainContent"
          sx={{
            overflowY: "auto",
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              </Link>{" "}
              <Typography sx={{ fontWeight: 500, fontSize: 12 }}>
                Home
              </Typography>
              <Link
                href="/dashrooms"
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                  color: "rgba(1, 1, 1, 0.56)",
                }}>
                Rooms
              </Link>
              <Typography
                color="warning"
                sx={{ fontWeight: 500, fontSize: 12 }}>
                Rooms details
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}>
            <Typography level="h2" component="h1">
              Room details
            </Typography>
          </Box>

          <Room chambre={chambre}  />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
