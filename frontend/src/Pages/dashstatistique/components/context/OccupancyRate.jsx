import React from "react";
import ReactApexChart from "react-apexcharts";
import { Hotel, People, CheckCircle, AccessTime } from "@mui/icons-material";

const OccupancyRate = () => {
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
        // Vérification des données reçues
        console.log("Données récupérées :", data);
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
    ); // Affiche un loader pendant le chargement
  }

  // Vérification des valeurs avant de les afficher
  const isValidData =
    occupiedChambres !== undefined &&
    availableChambres !== undefined &&
    stat.occupancyRate !== undefined;

  if (!isValidData) {
    return <div>Les données reçues sont incorrectes ou manquantes.</div>; // Affiche un message d'erreur si les données sont invalides
  }

  const data = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [occupiedChambres, availableChambres],
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Occupancy Rate */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <AccessTime className="text-gray-500 text-3xl" />
          <h4 className="text-xl font-medium ml-3">Occupancy Rate</h4>
        </div>
        <p className="text-2xl font-semibold">
          {stat.occupancyRate || "Donnée non disponible"}%
        </p>
        <div className="mt-4">
          <ReactApexChart
            options={{
              chart: {
                type: "donut",
                toolbar: { show: false },
              },
              colors: ["#5d9cec"],
              labels: ["Rate"],
              dataLabels: { enabled: false },
              plotOptions: {
                pie: {
                  customScale: 0.6,
                },
              },
            }}
            series={[stat.occupancyRate || 0]}
            type="donut"
            height={60}
          />
        </div>
      </div>

    </div>
  );
};

export default OccupancyRate;
