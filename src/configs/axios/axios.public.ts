import { IResponse } from '@/interfaces';
import axios, { AxiosError } from 'axios';

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// config for response before return to client

axiosPublic.interceptors.response.use(
  response => {
    return response.data;
  },
  (err: AxiosError) => {
    return Promise.reject<IResponse<any>>(err);
  },
);

export { axiosPublic };
