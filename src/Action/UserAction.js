import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callUserListApi = (limit, skip) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.USERS_LIST.USER_LIST}`,
    {
      params: {
        '$limit': limit,
        '$skip': (skip * 10) - 10,
      },
    }

    );
  };
};



export const UpdateUserStatusAPI = (id) => {
  console.log('id', id);
  return (_dispatch, _getState) => {
    return fetchClient.patch(`${constants.API.USERS_LIST.UPDATE_USER_STATUS}${id}`,);
  };
};