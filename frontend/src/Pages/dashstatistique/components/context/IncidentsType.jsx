import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Hotel,
  People,
  CheckCircle,
  AccessTime,
  Roofing,
  PeopleAlt,
  Security,
  Air,
  ElectricBolt,
  Plumbing,
  Carpenter,
  BugReport,
} from "@mui/icons-material";

const TotalRoom = () => {
  const [stat, setStat] = React.useState({});
  const [occupiedChambres, setOccupiedChambres] = React.useState(0);
  const [availableChambres, setAvailableChambres] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // État pour le chargement

  const [series, setSeries] = useState([0, 0, 0, 0, 0, 0]); // Initialiser avec 6 valeurs


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://127.0.0.1:8080/statistiques/repartition", {
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
          setSeries([
            data.securityAndVentilation || 0,
            data.airConditioningAndHeating || 0,
            data.electricity || 0,
            data.plumbing || 0,
            data.structure || 0,
            data.others || 0,
          ]);
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
    ); // Affiche un loader pendant le chargement
  }

  // Vérification des valeurs avant de les afficher
  const isValidData =
    occupiedChambres !== undefined &&
    availableChambres !== undefined &&
    stat.occupancyRate !== undefined;


  return (
    <>
      <div className="p-6 rounded-lg shadow-lg bg-gray-100">
        {/* Titre de la section */}
        <div className="flex items-center mb-4">
          <Security sx={{ fontSize: 30, color: "rgb(84, 72, 248)" }} />
          <h5 className="text-lg font-medium ml-3">
            Secutity & Ventilation ={" "}
            {series[0] || "Donnée non disponible"}
          </h5>
        </div>

        {/* Occupancy Rate */}
        <div className="flex items-center mb-4 ">
          <Air sx={{ fontSize: 30, color: "rgb(42, 219, 107)" }} />
          <h4 className="text-lg font-medium ml-3">
            Air Conditing & Helting ={" "}
            {series[1]|| "Donnée non disponible"}
          </h4>
        </div>

        <div className="flex items-center mb-4  ">
          {" "}
          <ElectricBolt sx={{ fontSize: 30, color: "rgb(255, 251, 0)" }} />
          <h4 className="text-lg font-medium ml-3">
            Electricity = {series[2] || "Donnée non disponible"}
          </h4>
        </div>

        <div className="flex items-center mb-4  ">
          <Plumbing sx={{ fontSize: 30, color: "rgb(255, 56, 123)" }} />
          <h4 className="text-lg font-medium ml-3">
            Plumbing = {series[3]|| "Donnée non disponible"}
          </h4>
        </div>
        <div className="flex items-center mb-4  ">
          <Carpenter sx={{ fontSize: 30, color: "rgb(143, 7, 158)" }} />
          <h4 className="text-lg font-medium ml-3">
            Structure = {series[4]|| "Donnée non disponible"}
          </h4>
        </div>
        <div className="flex items-center mb-4  ">
          <BugReport sx={{ fontSize: 30, color: "rgb(10, 13, 197)" }} />
          <h4 className="text-lg font-medium ml-3">
            Others = {series[5] || "Donnée non disponible"}
          </h4>
        </div>
      </div>
    </>
  );
};

export default TotalRoom;
