import Approver from "../../Pages/Approver/Approver";
import constants from "../constants";
import approverImg from "../../Icons/Approver.png";
import tradeImg from "../../Icons/Trade.png";
import Transaction from "../../Pages/ManageEnergy&Funds/Transaction";
import energyImg from "../../Icons/Energy.png";
import LoadEnergy from "../../Pages/ManageEnergy&Funds/LoadEnergy";
import GetEnergy from "../../Pages/ManageEnergy&Funds/GetEnergy";
import LoadFunds from "../../Pages/ManageEnergy&Funds/LoadFunds";
import LoadCSVFile from "../../Pages/ManageEnergy&Funds/LoadCSVFile";

export const sidebar = [
  {
    title: "Approver",
    path: constants.ROUTE.SIDEBAR.APPROVER,
    image: approverImg,
    component: Approver,
    cName: "",
    sidebar: true,
    isChildren: false,
    children: [],
    status: true,
    isOpen: true,
    selected: false,

  },
  {
    title: "Manage Energy & Funds",
    path: "",
    image: energyImg,
    component: null,
    cName: "",
    sidebar: true,
    isChildren: true,
    status: false,
    isOpen: false,
    isHeader:true,
    children: [
      // {
      //   title: "Load Energy For Account",
      //   path: constants.ROUTE.SIDEBAR.LOAD_ENERGY_FOR_ACCOUNT,
      //   component: LoadEnergy,
      //   status: false,
      //   selected: false,
      // },
      // {
      //   title: "Get Energy For Account",
      //   path: constants.ROUTE.SIDEBAR.GET_ENERGY_FOR_ACCOUNT,
      //   component: GetEnergy,
      //   status: false,

      //   selected: false,
      // },
      // {
      //   title: "Load Funds For Account",
      //   path: constants.ROUTE.SIDEBAR.LOAD_FUNDS_FOR_ACCOUNT,
      //   component: LoadFunds,
      //   status: false,

      //   selected: false,
      // },
      {
        title: "Load CSV Energy File",
        path: constants.ROUTE.SIDEBAR.LOAD_CSV_FILE,
        component: LoadCSVFile,
        status: false,
        selected: false,
      },
    ],
  },
];

export const trade_sidebar = [
  {
    title: "Trade Menu",
    // path: constants.ROUTE.SIDEBAR.APPROVER,
    image: tradeImg,
    // component:Approver,
    cName: "",
    sidebar: true,
    children: [],
  },
];
