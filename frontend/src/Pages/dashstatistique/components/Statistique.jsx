import React from "react";
import {
  PieSeries,
  BarChart,
  BarSeries,
  LineChart,
  LineSeries,
} from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import RepartitionIncidents from "./Charts/RepartitionIncidents";
import RequetesMaintenance from "./Charts/RequetesMaintenance";
import OccupationChambres from "./Charts/OccupationChambres";
import StatistiquesPaiement from "./Charts/StatistiquesPaiement";

const Statstique = () => {
  return (
    <div className="overflow-y-auto h-full py-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <OccupationChambres />
          <StatistiquesPaiement />
        </div>
        <div className="flex flex-col">
          <RepartitionIncidents />
          <RequetesMaintenance />
        </div>
      </div>
    </div>
  );
};

export default Statstique;
