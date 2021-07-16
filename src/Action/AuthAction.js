import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";
import { getRefreshToken }  from '../utils/storage'

export const callLoginApi = ( data ) => {
  // console.log("data",data);
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.LOGIN}`, 
    data
    );
  };
};


export const callRegistrationApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.LOGIN.SIGNUP}`,
      data
    );
  };
};

export const callOrgListApi = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.LOGIN.ORG_LIST}`,
    );
  };
};