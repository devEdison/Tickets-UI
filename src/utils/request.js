import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { logout } from "@/store/actions";


const service = axios.create({
  baseURL: 'http://localhost:8080', // api 的 base_url
});

// Solicitar interceptor
service.interceptors.request.use(
  (req) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      // Deje que cada solicitud lleve el token: ['Autorización'] es una clave personalizada, modifíquela de acuerdo con la situación real
      req.headers.common["Authorization"] = "Bearer " + getToken();
  
    }
    return req;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);


// Interceptor de respuesta
service.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 200) {
       console.log('Posted Successfully');
    }
    return res;
 },
  (error) => {
    console.log("err:" + error); // for debug
    let token = store.getState().user.token;
    store.dispatch(logout(token));
    return Promise.reject(error);
  }
);

export default service;
