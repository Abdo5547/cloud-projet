import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const RepartitionIncidents = () => {
  const [stat, setStat] = useState(null);
  const [loading, setLoading] = useState(true);
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
        // Vérification des données reçues
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
  

  const options = {
    chart: {
      type: "pie",
    },
    labels: [
      "Security & Ventilation",
      "Air Conditioning & Heating",
      "Electricity",
      "Plumbing",
      "Structure",
      "Others",
    ],
  };

  return (
    <div className="chart-contanier bg-gray-60 p-6 rounded-lg shadow-lg">
      <h3>Incident Distribution</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={250}
          />
        </>
      )}
    </div>
  );
};

export default RepartitionIncidents;
