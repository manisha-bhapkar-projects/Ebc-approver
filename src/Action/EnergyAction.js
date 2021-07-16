import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callGetTransactionApi = (id) => {
  console.log("id", id);
  return (_dispatch, _getState) => {
    return fetchClient.get(
      `${constants.API.TRANSACTION.TRANSACTION_DATA}${id}`
    );
  };
};

export const callAddEnergyAndFundAPI = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.TRANSACTION.TRANSACTION}`, data);
  };
};

export const callFileUploadAPI = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.TRANSACTION.FILE_UPLOAD}`, data);
  };
};
