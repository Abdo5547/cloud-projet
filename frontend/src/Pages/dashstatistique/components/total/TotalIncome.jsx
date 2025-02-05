import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Chart from "react-apexcharts"; // Importation directe du composant

const TotalIncome = () => {
  const Action = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];

  // Utilisez useState sans annotations de type

  // Chargement des données du graphique dans useEffect

  {
    /**
    
    
      useEffect(() => {
    const newData = {
      series: [
        {
          name: "monthly earnings",
          color: "var(--color-secondary)",
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],
      chart: {
        id: "total-income",
        type: "area",
        height: 70,
        sparkline: { enabled: true },
        group: "sparklines",
        fontFamily: "inherit",
        foreColor: "#adb0bb",
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      markers: { size: 0 },
      tooltip: {
        theme: "dark",
        fixed: { enabled: true, position: "right" },
        x: { show: false },
      },
    };

    console.log("Setting chart data:", newData);
    setChartData(newData);
  }, []); // Dépendance vide pour ne l'exécuter qu'une seule fois

    
    */
  }
  // Vérification du chargement des données avant le rendu

  return (
    <div className="bg-lightsecondary rounded-lg p-6 relative w-full break-words">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-14 h-10 rounded-full flex items-center justify-center bg-secondary text-white">
            <Icon icon="solar:wallet-2-line-duotone" height={24} />
          </span>
          <h5 className="text-base opacity-70">Total Income</h5>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-12 gap-[24px] items-end mt-10">
        <div className="xl:col-span-6 col-span-7">
          <h2 className="text-3xl mb-3">$6,280</h2>
          <span className="font-semibold border rounded-full border-black/5 dark:border-white/10 py-0.5 px-[10px] leading-[normal] text-xs text-dark dark:text-darklink">
            <span className="opacity-70">+18% last month</span>
          </span>
        </div>
        <div className="xl:col-span-6 col-span-5">
          <div className="rounded-bars md:ps-7"></div>
        </div>
      </div>
    </div>
  );
};

export default TotalIncome;
