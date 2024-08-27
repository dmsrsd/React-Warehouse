// import axios from "axios";
import React, { useState, useEffect } from "react";

import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile.js";

import TableData from "views/MasterData/TableData";
import TablePhoto from "views/MasterData/TablePhoto";
import TableDataJquery from "views/MasterData/TableDataJquery";

// SCM MENU
import CreateCMOForm from "views/SCM-Planner/CreateCMO";
import MonitoringCMO from "views/SCM-Planner/MonitoringCMO";
import EntryShipmentPlan from "views/SCM-Planner/EntryShipmentPlan";
import MonitoringShipmentPlan from "views/SCM-Planner/MonitoringShipmentPlan";

// WMS PRINCIPAL
import IncomingCMO from "views/WMS-Principal/IncomingCMO";

import OutboundPlanning from "views/WMS-Principal/OutboundPlanning";
import MonitoringDriver from "views/WMS-Principal/MonitoringDriver";
import PickUpRequest from "views/TMS/PickUpRequest";
import ExternalPickUpRequest from "views/TMS/ExternalPickUpRequest";
import InboundPlanning from "views/WMS-DC/InboundPlanning";
import MonitoringSctok from "views/WMS-DC/MonitoringStock";
import CreateOutboundPlanning from "views/SCM-Planner/CreateOutboundPlanning";

const componentMap = {
  TableData: TableData,
  TablePhoto: TablePhoto,
  TableDataJquery: TableDataJquery,
  CreateCMOForm: CreateCMOForm,
  MonitoringCMO: MonitoringCMO,
  EntryShipmentPlan: EntryShipmentPlan,
  MonitoringShipmentPlan: MonitoringShipmentPlan,
  IncomingCMO: IncomingCMO,
  OutboundPlanning: OutboundPlanning,
  MonitoringDriver: MonitoringDriver,
  PickUpRequest: PickUpRequest,
  ExternalPickUpRequest: ExternalPickUpRequest,
  InboundPlanning: InboundPlanning,
  MonitoringSctok: MonitoringSctok,
  CreateOutboundPlanning: CreateOutboundPlanning,
};

const Routes = () => {
  const [dataMenu, setDataMenu] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    const getDataMenu = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users/get-menu-details",
          // `http://localhost:8000/api/menus/user/${email}`,
          {
            method: "POST",
            // method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        console.log("data_menu", data);

        const res_dt_menu = data.data.menus;
        // const res_dt_menu = data.data;
        setDataMenu(res_dt_menu);
      } catch (error) {
        console.error(error);
      }
    };

    getDataMenu();
  }, []);

  const routes = [
    {
      category: "Dashboard",
      icon: "nc-icon nc-chart-pie-35",
      routes: [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: "nc-icon nc-chart-pie-35",
          component: Dashboard,
          layout: "/admin",
        },
      ],
    },
    ...dataMenu.reduce((acc, menu) => {
      const category = acc.find(
        (category) => category.category === menu.category_name
      );
      if (!category) {
        acc.push({
          category: menu.category_name,
          icon: menu.category_icon,
          routes: [],
        });
      }
      acc
        .find((category) => category.category === menu.category_name)
        .routes.push({
          path: menu.submenu_path,
          name: menu.submenu_name,
          icon: menu.category_icon,
          component: componentMap[menu.submenu_component],
          layout: menu.layout,
        });
      return acc;
    }, []),
  ];

  return routes;
};

export default Routes;
