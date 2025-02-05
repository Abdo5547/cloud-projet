import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ChartOne from '../Charts/ChartOne';
import ChartThree from '../Charts/ChartThree';
import ChartTwo from '../Charts/ChartTwo';



ChartJS.register(ArcElement, Title, Tooltip, Legend);

const LatePaymentsChart = ({ data }) => {
  const chartData = {
    labels: ['Paiements à temps', 'Paiements en retard'],
    datasets: [
      {
        data: [data.onTime, data.late],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default LatePaymentsChart;
