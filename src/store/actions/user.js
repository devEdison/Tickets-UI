import * as types from "../action-types";
import { reqUserInfo } from "@/api/user";

export const getUserInfo = (token, userName) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo(token,userName)
      .then((response) => {
        
        if (response.status === 200) {
          const { data } = response;
          const userInfo = data;
          dispatch(setUserInfo(userInfo));
          resolve(data);
        } else {
          const msg = response.statusText;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserToken = (token, userName) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
    userName,
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
  };
};

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  };
};
