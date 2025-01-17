import axios, { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from '../common';
import { CustomAxiosConfig } from '@/interfaces/resquest.interface';

// base axios
const axiosProtected = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// before send req
// we will get accessToken from localhost and bind it into header;
axiosProtected.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = String(localStorage.getItem('accessToken'));
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },

  err => {
    return Promise.reject(err);
  },
);

// handle refresh-token if the token invalid

axiosProtected.interceptors.response.use(
  response => {
    return response.data;
  },
  async (err: AxiosError) => {
    // get config in error request to check the request has been re-sent?;
    const config = err.config as CustomAxiosConfig;

    // if this error request is authentication and has not been re-sent => access token has expired, call api to get new token pair;
    if (err.response?.status === 401 && !config.sent) {
      config.sent = true;
      const { accessToken } = await refreshToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        } as AxiosRequestHeaders;

        // re-send error api
        return await axiosProtected(config);
      }
    }

    return Promise.reject(err);
  },
);

// export protected axios

export { axiosProtected };
