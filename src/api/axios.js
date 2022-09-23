import axios from "axios";
import { getCookie, removeCookie, setCookie } from '../shared/cookie'

/* --------------------------------- 토큰 없을 때 -------------------------------- */
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/* --------------------------------- 토큰 있을 때 -------------------------------- */
export const tokenInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/* --------------------------- 전달할 때 INTERCEPTORS --------------------------- */
tokenInstance.interceptors.request.use(
  // 요청이 전달되기 전에 작업 수행
  (config) => {
    const accessToken = getCookie("mycookie");
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

/* -------------------------- 전달 받을 때 INTERCEPTORS -------------------------- */
tokenInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터가 있는 작업 수행 : STATUS CODE 2XX
    return response;
  },
  async (error) => {
    // 응답 오류가 있는 작업 수행 : STATUS CODE WITHOUT 2XX
    console.log("RESPONSE INTERCEPTORS : FAILED", error);
    try {
      const { message, response, config } = error;
      const originalRequest = config;

      // ACCESSTOKEN FAILED : 401
      // REFRESHTOKEN FAILED : ???
      if (message === "만료된 토큰입니다." || response.data.code === "401") {
        const refreshToken = getCookie("refreshToken");
        /* GET : NEW ACCESSTOKEN ---------------------------------------------------- */
        try {
          const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL_NOT_AIP}/user/reissue`,
            headers: {
              "Content-Type": "application/json",
              refreshToken: refreshToken,
            },
          });
          /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
          console.log("RESPONSE=>",response);
          console.log(
            "NEW ACCESSTOKEN AUTHORIZATION",
            response.headers.authorization
          );
          console.log("REFRESHTOKEN SUCCESSED : 405");
          originalRequest.headers.Authorization =
            response.headers.authorization;
          removeCookie("mycookie");
          setCookie("mycookie", response.headers.authorization);
          return axios(originalRequest);
        } catch (error) {
          console.log("REFRESHTOKEN FAILED", error.response);
          removeCookie("mycookie");
          removeCookie("refreshToken");
        }
      }
    } catch (error) {
      console.log("GET NEW ACCESSTOKEN : FAIL", error);
      removeCookie("mycookie");
      removeCookie("refreshToken");
      return false;
    }
    return Promise.reject(error);
  }
);