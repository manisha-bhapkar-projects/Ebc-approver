import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callDeviceListApi = (limit, skip) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.DEVICE_LIST.DEVICE_LIST}`,
        {
            params: {
              '$limit': limit,
              '$skip': (skip * 10) - 10,
            },
          }

        );
    };
};



export const UpdateDeviceStatusAPI = (id) => {
    console.log('id', id);
    return (_dispatch, _getState) => {
        return fetchClient.patch(`${constants.API.DEVICE_LIST.UPDATE_DEVICE_LIST}${id}`,);
    };
};