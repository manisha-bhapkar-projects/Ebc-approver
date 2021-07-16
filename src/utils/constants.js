let API_URL = "https://ebc-approvers-dev.sysopsnetwork.com/";
// let API_URL = "https://ebc-approvers-qa.sysopsnetwork.com/";


console.log(window.location.origin);

if (
  window.location.origin ==
    "https://ebc-approver-frontend-qa.sysopsnetwork.com" ||
  window.location.origin == "http://ebc-frontend-approvers-qa.s3.amazonaws.com"
) {
  API_URL = "https://ebc-approvers-qa.sysopsnetwork.com/";
    // API_URL = "https://ebc-approvers-dev.sysopsnetwork.com/";

}



export default {
  API: {
    BASEURL: {
      URL: API_URL,
    },
    LOGIN: {
      LOGIN: "/authentication",
      SIGNUP: "/approvers/",
      ORG_LIST: "/orgs",
    },
    ACCOUNT: {
      ACCOUNT: "/accounts",
    },
    USERS_LIST: {
      GET_USER_LIST: "/accounts/",
      USER_LIST: "/accounts",
      UPDATE_USER_STATUS: "/accounts/",
    },
    DEVICE_LIST: {
      GET_DEVICE_LIST: "/devices/",
      UPDATE_DEVICE_LIST: "/devices/",
      DEVICE_LIST: "/devices",
    },
    TRANSACTION: {
      TRANSACTION: "/transactions",
      TRANSACTION_DATA: "/transactions/",
      ENERGY:"/accounts/",
      FILE_UPLOAD:"/importer"
    },
  },

  STORAGE: {
    AUTH: {
      TOKEN: "auth-token",
      REF_TOKEN: "refresh-token",
      ACCOUNT_DATA: "account-data",
      FROM_ADMIN: "from-admin",
    },
  },
  ROUTE: {
    LOGIN: {
      LOGIN: "/",
      REGISTRATION: "/registration",
    },
    SIDEBAR: {
      APPROVER: "/approver",
      TRANSACTION: "/transaction",
      LOAD_ENERGY_FOR_ACCOUNT: "/load-energy",
      GET_ENERGY_FOR_ACCOUNT: "/get-energy",
      LOAD_FUNDS_FOR_ACCOUNT: "/load-funds",
      LOAD_CSV_FILE: "/load-csv-file",
    },
    APPROVER: {
      USERS_LIST: "/approver/users-list",
      DEVICE_LIST: "/approver/devices-list",
    },
  },
};
