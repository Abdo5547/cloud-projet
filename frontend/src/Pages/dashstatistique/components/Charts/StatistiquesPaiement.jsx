import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const StatistiquesPaiement = () => {
  const [loading, setLoading] = useState(true);
  const [stat, setStat] = useState({ completedPayments: [], pendingPayments: [] });
  const [series, setSeries] = useState([
    { name: "Completed Payments", data: [] },
    { name: "Pending Payments", data: [] },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetch("http://localhost:8080/payments/statistiques", {
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
            {
              name: "Completed Payments",
              data: data.completedPayments || [0, 0, 0, 0, 0, 0],
            },
            {
              name: "Pending Payments",
              data: data.pendingPayments || [0, 0, 0, 0, 0, 0],
            },
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

  const options = {
    chart: {
      id: "payment-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Les mois que tu souhaites afficher
    },
    colors: ["#e24e2e", "#2f1fd6"], // Rouge pour les paiements effectués et bleu pour les paiements en attente
  };

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="chart-contanier bg-gray-60 p-6 rounded-lg shadow-lg">
      <h3>Payment Statistics</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default StatistiquesPaiement;
