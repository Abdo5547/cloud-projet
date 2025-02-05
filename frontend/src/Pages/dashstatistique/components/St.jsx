import React from "react";
import ChambreOccupation from "./Charts/OccupationChambres";
import RepartitionIncidents from "./Charts/RepartitionIncidents";
import AvailableRooms from "./context/AvailableRooms";
import OccupancyRate from "./context/OccupancyRate";
import OccupiedRooms from "./context/OccupiedRooms";
import TotalRoom from "./context/IncidentsType";
import RequetesMaintenance from "./Charts/RequetesMaintenance";
import StatistiquesPaiement from "./Charts/StatistiquesPaiement";

const St = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6 overflow-y-auto h-full py-4 ">
        {/* Première ligne : ChambreOccupation et AvailableRooms */}
        <div className="col-span-12 lg:col-span-8 mb-30">
          <ChambreOccupation />
        </div>
        <div className="col-span-12 lg:col-span-1 mb-30" style={{width:"350px",marginTop:"-200px"}} >
          <AvailableRooms />
        </div>

        {/* Deuxième ligne : RepartitionIncidents */}
        <div className="col-span-12 lg:col-span-8 mb-30">
          <RepartitionIncidents />
        </div>
        <div className="col-span-12 lg:col-span-4 mb-30"  style={{width:"380px"}}>
          <TotalRoom />
        </div>

        {/* Troisième ligne : RequetesMaintenance et OccupiedRooms */}
       

        {/* Quatrième ligne : StatistiquesPaiement et TotalRoom + OccupancyRate */}
        <div className="col-span-12 lg:col-span-8 mb-30">
          <StatistiquesPaiement />
        </div>
       
      </div>
    </>
  );
};

export default St;
