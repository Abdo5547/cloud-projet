import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  CheckCircle,
  Hotel,
  People,
  PeopleAlt,
  Roofing,
} from "@mui/icons-material";

const AvailableRooms = () => {
  const [stat, setStat] = React.useState({});
  const [occupiedChambres, setOccupiedChambres] = React.useState(0);
  const [availableChambres, setAvailableChambres] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // État pour le chargement

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/statistiques/ov", {
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
        if (data) {
          setStat(data);
          setOccupiedChambres(data.occupiedChambres || 0);
          setAvailableChambres(data.availableChambres || 0);
        } else {
          console.error("Les données sont invalides ou vides.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    ); // Loader pendant le chargement
  }

  const isValidData =
    occupiedChambres !== undefined &&
    availableChambres !== undefined &&
    stat.occupancyRate !== undefined;

  if (!isValidData) {
    return <div>Les données reçues sont incorrectes ou manquantes.</div>; // Gestion des erreurs de données
  }

  return (
    <>
      <div className="p-6 rounded-lg shadow-lg bg-gray-100 mt-11">
        {/* Titre de la section */}
        <div className="flex items-center mb-4">
          <CheckCircle sx={{ fontSize: 30, color:" #e24e2e" }} />
          <h4 className="text-xl font-medium ml-3">
            Available Rooms  = {availableChambres || "Donnée non disponible"}
          </h4>
        </div>

        {/* Occupancy Rate */}
        <div className="flex items-center mb-4 ">
          <Roofing sx={{ fontSize: 30, color: "#e24e2e" }} />
          <h4 className="text-xl font-medium ml-3">
          Occupancy Rate = {stat.occupancyRate || "Donnée non disponible"}%
          </h4>
        </div>

        <div className="flex items-center mb-4  ">          <PeopleAlt sx={{ fontSize: 30, color: "#e24e2e" }} />
          <h4 className="text-xl font-medium ml-3">
            Occupied Rooms = {occupiedChambres || "Donnée non disponible"}
          </h4>
        </div>

        <div className="flex items-center mb-4  ">
          <Hotel sx={{ fontSize: 30, color: "#e24e2e" }} />
          <h4 className="text-xl font-medium ml-3">
            Total Rooms = {stat.totalChambres || "Donnée non disponible"}
          </h4>
        </div>
      </div>
    </>
  );
};

export default AvailableRooms;
