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
import MonitoringStock from "views/WMS-DC/MonitoringStock";
import CreateOutboundPlanning from "views/SCM-Planner/CreateOutboundPlanning";

// Jika User adalah Administrator
const adminRoutes = [
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
  {
    category: "Master Data",
    icon: "nc-icon nc-notes",
    routes: [
      {
        path: "/table-data",
        name: "Table Data",
        icon: "nc-icon nc-notes",
        component: TableData,
        layout: "/admin",
      },
      {
        path: "/table-photo",
        name: "Table Photo",
        icon: "nc-icon nc-notes",
        component: TablePhoto,
        layout: "/admin",
      },
      {
        path: "/table-jquery",
        name: "Table Users",
        icon: "nc-icon nc-notes",
        component: TableDataJquery,
        layout: "/admin",
      },
    ],
  },
  {
    category: "SCM-Planner",
    icon: "nc-icon nc-paper-2",
    routes: [
      {
        path: "/create-cmo",
        name: "Create CMO Form",
        icon: "nc-icon nc-circle-09",
        component: CreateCMOForm,
        layout: "/admin",
      },

      {
        path: "/monitoring-cmo",
        name: "Monitoring CMO",
        icon: "nc-icon nc-circle-09",
        component: MonitoringCMO,
        layout: "/admin",
      },
      {
        path: "/entry-shipment-plan",
        name: "Create Shipment Plan",
        icon: "nc-icon nc-circle-09",
        component: EntryShipmentPlan,
        layout: "/admin",
      },
      // {
      //   path: "/outbound-planning",
      //   name: "Create Outbound Plan",
      //   icon: "nc-icon nc-circle-09",
      //   component: CreateOutboundPlanning,
      //   layout: "/admin",
      // },
      // {
      //   path: "/outbound-plan-principal",
      //   name: "Outbound Planning",
      //   icon: "nc-icon nc-circle-09",
      //   component: OutboundPlanning,
      //   layout: "/admin",
      // },
      {
        path: "/monitoring-shipment-plan",
        name: "Monitoring Shipment Plan",
        icon: "nc-icon nc-circle-09",
        component: MonitoringShipmentPlan,
        layout: "/admin",
      },
    ],
  },
  {
    category: "WMS-Pcpl Inbound",
    icon: "nc-icon nc-app",
    routes: [
      {
        path: "/incoming-cmo",
        name: "Incoming CMO",
        icon: "nc-icon nc-circle-09",
        component: IncomingCMO,
        layout: "/admin",
      },
    ],
  },
  {
    category: "WMS-Pcpl Outbound",
    icon: "nc-icon nc-app",
    routes: [
      {
        path: "/outbound-plan-principal",
        name: "Outbound Planning",
        icon: "nc-icon nc-circle-09",
        component: OutboundPlanning,
        layout: "/admin",
      },
      {
        path: "/monitoring-driver",
        name: "Monitoring Driver",
        icon: "nc-icon nc-circle-09",
        component: MonitoringDriver,
        layout: "/admin",
      },
    ],
  },
  {
    category: "TMS-Planner",
    icon: "nc-icon nc-delivery-fast",
    routes: [
      {
        path: "/pickup-request",
        name: "Pickup Request",
        icon: "nc-icon nc-circle-09",
        component: PickUpRequest,
        layout: "/admin",
      },
      {
        path: "/ext-pickup-request",
        name: "Ext Pickup Request",
        icon: "nc-icon nc-circle-09",
        component: ExternalPickUpRequest,
        layout: "/admin",
      },
      {
        path: "/monitoring-driver",
        name: "Monitoring Driver",
        icon: "nc-icon nc-circle-09",
        component: MonitoringDriver,
        layout: "/admin",
      },
    ],
  },
  {
    category: "WMS-DC-Inbound",
    icon: "nc-icon nc-vector",
    routes: [
      {
        path: "/inbound-planning",
        name: "Inbound Planning",
        icon: "nc-icon nc-grid-45",
        component: InboundPlanning,
        layout: "/admin",
      },
      {
        path: "/monitoring-stock",
        name: "Inventory List",
        icon: "nc-icon nc-circle-09",
        component: MonitoringStock,
        layout: "/admin",
      },
    ],
  },
  {
    category: "WMS-DC-Outbound",
    icon: "nc-icon nc-vector",
    routes: [
      {
        path: "/inbound-planning",
        name: "Outbound Retur",
        icon: "nc-icon nc-grid-45",
        component: InboundPlanning,
        layout: "/admin",
      },
      {
        path: "/monitoring-stock",
        name: "Create DO Retur",
        icon: "nc-icon nc-circle-09",
        component: MonitoringStock,
        layout: "/admin",
      },
    ],
  },
];

const SCMRoutes = [
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
  {
    category: "Master Data",
    icon: "nc-icon nc-notes",
    routes: [
      {
        path: "/table-data",
        name: "Table Data",
        icon: "nc-icon nc-notes",
        component: TableData,
        layout: "/admin",
      },
      {
        path: "/table-photo",
        name: "Table Photo",
        icon: "nc-icon nc-notes",
        component: TablePhoto,
        layout: "/admin",
      },
      {
        path: "/table-jquery",
        name: "Table Users",
        icon: "nc-icon nc-notes",
        component: TableDataJquery,
        layout: "/admin",
      },
    ],
  },
  {
    category: "SCM Planner",
    icon: "nc-icon nc-paper-2",
    routes: [
      {
        path: "/create-cmo",
        name: "Create CMO Form",
        icon: "nc-icon nc-circle-09",
        component: CreateCMOForm,
        layout: "/admin",
      },

      {
        path: "/monitoring-cmo",
        name: "Monitoring CMO",
        icon: "nc-icon nc-circle-09",
        component: MonitoringCMO,
        layout: "/admin",
      },
      {
        path: "/entry-shipment-plan",
        name: "Entry Shipment Plan",
        icon: "nc-icon nc-circle-09",
        component: EntryShipmentPlan,
        layout: "/admin",
      },
      {
        path: "/monitoring-shipment-plan",
        name: "Monitoring Shipment Plan",
        icon: "nc-icon nc-circle-09",
        component: MonitoringShipmentPlan,
        layout: "/admin",
      },
    ],
  },
];

// Jika pengguna adalah WMS User
const WMSroutes = [
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
  {
    category: "Master Data",
    icon: "nc-icon nc-notes",
    routes: [
      {
        path: "/table-data",
        name: "Table Data",
        icon: "nc-icon nc-notes",
        component: TableData,
        layout: "/admin",
      },
      {
        path: "/table-photo",
        name: "Table Photo",
        icon: "nc-icon nc-notes",
        component: TablePhoto,
        layout: "/admin",
      },
      {
        path: "/table-jquery",
        name: "Table Users",
        icon: "nc-icon nc-notes",
        component: TableDataJquery,
        layout: "/admin",
      },
    ],
  },
  {
    category: "WMS Principle",
    icon: "nc-icon nc-app",
    routes: [
      {
        path: "/incoming-cmo",
        name: "Incoming CMO",
        icon: "nc-icon nc-circle-09",
        component: IncomingCMO,
        layout: "/admin",
      },
      {
        path: "/monitoring-po-shipment-plan",
        name: "Monitoring PO & Ship Plan",
        icon: "nc-icon nc-circle-09",
        component: OutboundPlanning,
        layout: "/admin",
      },
      {
        path: "/monitoring-driver",
        name: "Monitoring Driver",
        icon: "nc-icon nc-circle-09",
        component: MonitoringDriver,
        layout: "/admin",
      },
    ],
  },
];

// Jika pengguna adalah TMS User
const TMSroutes = [
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
  {
    category: "Master Data",
    icon: "nc-icon nc-notes",
    routes: [
      {
        path: "/table-data",
        name: "Table Data",
        icon: "nc-icon nc-notes",
        component: TableData,
        layout: "/admin",
      },
      {
        path: "/table-photo",
        name: "Table Photo",
        icon: "nc-icon nc-notes",
        component: TablePhoto,
        layout: "/admin",
      },
      {
        path: "/table-jquery",
        name: "Table Users",
        icon: "nc-icon nc-notes",
        component: TableDataJquery,
        layout: "/admin",
      },
    ],
  },
  {
    category: "TMS-Planner",
    icon: "nc-icon nc-delivery-fast",
    routes: [
      {
        path: "/pickup-request",
        name: "Pickup Request",
        icon: "nc-icon nc-circle-09",
        component: PickUpRequest,
        layout: "/admin",
      },
      {
        path: "/ext-pickup-request",
        name: "Ext Pickup Request",
        icon: "nc-icon nc-circle-09",
        component: ExternalPickUpRequest,
        layout: "/admin",
      },
    ],
  },
];

const DCWMSroutes = [
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
  {
    category: "WMS-DC",
    icon: "nc-icon nc-vector",
    routesInbound: [
      {
        path: "/inbound-planning",
        name: "Inbound Planning",
        icon: "nc-icon nc-grid-45",
        component: InboundPlanning,
        layout: "/admin",
      },
    ],
    routesOutbound: [
      {
        path: "/monitoring-stock",
        name: "Monitoring Stock",
        icon: "nc-icon nc-circle-09",
        component: MonitoringStock,
        layout: "/admin",
      },
    ],
  },
];

// Fungsi untuk mendapatkan rute sesuai dengan peran pengguna dari local storage
const getDashboardRoutes = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole === "Administrator"
    ? adminRoutes
    : userRole === "SCM"
    ? SCMRoutes
    : userRole === "WMS"
    ? WMSroutes
    : userRole === "TMS"
    ? TMSroutes
    : DCWMSroutes;
};

// Export rute sesuai dengan peran pengguna yang telah didapatkan
export default getDashboardRoutes();
