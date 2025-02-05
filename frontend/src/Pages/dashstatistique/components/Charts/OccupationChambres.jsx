import React from "react";
import ReactApexChart from "react-apexcharts";
import { Hotel, People, CheckCircle, AccessTime } from "@mui/icons-material";

const ChambreOccupation = () => {
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
    <div className="chart-contanier bg-gray-60 p-6 rounded-lg shadow-lg">
       <h3>Room Occupancy Rate</h3>
      <ReactApexChart
        options={{
          chart: {
            type: "donut",
          },
          labels: data.labels,
          colors: ["#e24e2e", "#2f1fd6"],
          dataLabels: {
            enabled: true,
            formatter: (val) => `${val}%`,
          },
        }}
        series={data.datasets[0].data} // Utilisation des données mises à jour
        type="donut"
        height={250}
      />
    </div>
  );
};

export default ChambreOccupation;
