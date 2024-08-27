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
// import OutboundPlanning from "views/WMS-Principal/OutboundPlanning";
import MonitoringDriver from "views/WMS-Principal/MonitoringDriver";
import PickUpRequest from "views/TMS/PickUpRequest";
import ExternalPickUpRequest from "views/TMS/ExternalPickUpRequest";
// import InboundPlanning from "views/WMS-DC/InboundPlanning";
import MonitoringStock from "views/WMS-DC/MonitoringStock";
import CreateOutboundPlanning from "views/SCM-Planner/CreateOutboundPlanning";

// Inbound
import InboundPlanning from "views/Inbound/InboundPlanning";
import GoodReceiving from "views/Inbound/GoodReceiving";
import Return from "views/Inbound/Return";
import GRreturn from "views/Inbound/GRreturn";

// Inventory
import InventoryList from "views/Inventory/InventoryList";
import MovementLocation from "views/Inventory/MovementLocation";
import StockTransfer from "views/Inventory/StockTransfer";
import InventoryAdjusment from "views/Inventory/InventoryAdjusment";
import StockCount from "views/Inventory/StockCount";

// Outbound
import OutboundPlanning from "views/Outbound/OutboundPlanning";
import Picking from "views/Outbound/Picking";
import Checking from "views/Outbound/Checking";
import Packing from "views/Outbound/Packing";


// Transport
import moduleName from 'views/Transport/Transport'

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
    category: "Inbound",
    icon: "nc-icon nc-cloud-upload-94",
    routes: [
      {
        path: "/inbound-planning",
        name: "Inbound Planning",
        icon: "nc-icon nc-circle-09",
        component: InboundPlanning,
        layout: "/admin",
      },

      {
        path: "/good-receiving",
        name: "Good Receiving",
        icon: "nc-icon nc-circle-09",
        component: GoodReceiving,
        layout: "/admin",
      },
      {
        path: "/inbound-return",
        name: "Return",
        icon: "nc-icon nc-circle-09",
        component: Return,
        layout: "/admin",
      },
      {
        path: "/gr-return",
        name: "GR Return",
        icon: "nc-icon nc-circle-09",
        component: GRreturn,
        layout: "/admin",
      },
    ],
  },
  {
    category: "Inventory",
    icon: "nc-icon nc-app",
    routes: [
      {
        path: "/inventory-list",
        name: "Inventory List",
        icon: "nc-icon nc-circle-09",
        component: InventoryList,
        layout: "/admin",
      },
      {
        path: "/movement-location",
        name: "Movement Location",
        icon: "nc-icon nc-circle-09",
        component: MovementLocation,
        layout: "/admin",
      },
      {
        path: "/stock-transfer",
        name: "Stock Transfer",
        icon: "nc-icon nc-circle-09",
        component: StockTransfer,
        layout: "/admin",
      },
      {
        path: "/stock-count",
        name: "Stock Count",
        icon: "nc-icon nc-circle-09",
        component: StockCount,
        layout: "/admin",
      },
    ],
  },
  {
    category: "Outbound",
    icon: "nc-icon nc-cloud-download-93",
    routes: [
      {
        path: "/outbound-planning",
        name: "Outbound Planning",
        icon: "nc-icon nc-circle-09",
        component: OutboundPlanning,
        layout: "/admin",
      },
      {
        path: "/picking",
        name: "Picking",
        icon: "nc-icon nc-circle-09",
        component: Picking,
        layout: "/admin",
      },
      {
        path: "/checking",
        name: "Checking",
        icon: "nc-icon nc-circle-09",
        component: Checking,
        layout: "/admin",
      },
      {
        path: "/packing",
        name: "Packing",
        icon: "nc-icon nc-circle-09",
        component: Packing,
        layout: "/admin",
      },
    ],
  },
  {
    category: "Transport",
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
        path: "/monitoring-driver",
        name: "Monitoring Driver",
        icon: "nc-icon nc-circle-09",
        component: MonitoringDriver,
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
