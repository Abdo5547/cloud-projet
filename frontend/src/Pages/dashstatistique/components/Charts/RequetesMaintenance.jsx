import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const RequetesMaintenance = () => {
  // Ajout d'un état pour stocker les données récupérées
  const [stat, setStat] = useState({
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true); // Pour indiquer si les données sont en cours de chargement

  const options = {
    chart: {
      id: "maintenance-requests",
      type: "bar",
      stacked: true,
    },
    xaxis: {
      categories: ["In Progress", "Resolved"],
    },
    colors: ["#e24e2e", "#2f1fd6"], // Red for in-progress requests, blue for resolved
  };

  // Mise à jour de la série de données en fonction de l'état stat
  const state = {
    series: [
      {
        name: "Number of Requests",
        data: [stat.inProgress, stat.resolved], // Utilisation des valeurs de inProgress et resolved
      },
    ],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://localhost:8080/incidents/requests/statistiques", {
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
          // Mise à jour des données dans l'état
          setStat({
            inProgress: data.inProgress || 0,
            resolved: data.resolved || 0,
          });
        } else {
          console.error("Les données sont invalides ou vides.");
        }
        setLoading(false); // Désactivation du message de chargement
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>; // Affiche un message pendant le chargement
  }

  return (
    <div className="chart-contanier bg-gray-60 p-6 rounded-lg shadow-lg">
      <h3>Maintenance Requests</h3>
      <ReactApexChart
        options={options}
        series={state.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default RequetesMaintenance;
