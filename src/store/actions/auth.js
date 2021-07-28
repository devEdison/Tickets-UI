import { setUserToken, resetUser } from "./user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken, setUser, removeUser} from "@/utils/auth";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ userName: username.trim(), password: password })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          const token = data.token;
          const user = data.userName;
          dispatch(setUserToken(token, user));
          setToken(token);
          setUser(user);
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

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout({ token: token})
      .then((response) => {
        if (response.status === 200) {
          dispatch(resetUser());
          removeToken();
          removeUser();
          resolve(response);
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
