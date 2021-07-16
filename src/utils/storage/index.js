import constants from "../constants";

export const storeAuthToken = (_token) => {
  console.log("storeAuth Token", _token);
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.TOKEN);
  }
};

export const storeAdminLogin = (data) => {
  if (data) {
    localStorage.setItem(constants.STORAGE.AUTH.FROM_ADMIN, data);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.FROM_ADMIN);
  }
};
export const storeAccountData = (_token) => {

  if (_token) {
    console.log("token", _token);
    localStorage.setItem(constants.STORAGE.AUTH.ACCOUNT_DATA, JSON.stringify(_token));
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ACCOUNT_DATA);
  }
  
};
export const getAccountData = () => {
  return JSON.parse(localStorage.getItem(constants.STORAGE.AUTH.ACCOUNT_DATA));
};

export const getAdminLogin = () => {
  return JSON.parse(localStorage.getItem(constants.STORAGE.AUTH.FROM_ADMIN));

};

export const getAuthToken = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.TOKEN);
};


export const storeRefreshToken = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.REF_TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.REF_TOKEN);
  }
};

export const getRefreshToken = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.REF_TOKEN);
};

export const storeAdminData = (_data) => {
  if (_data) {
    localStorage.setItem(
      constants.STORAGE.AUTH.ADMIN_DATA,
      JSON.stringify(_data)
    );
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ADMIN_DATA);
  }
};
