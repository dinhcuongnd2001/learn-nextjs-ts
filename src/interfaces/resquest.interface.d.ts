import { InternalAxiosRequestConfig, Method } from 'axios';

export interface IAxiosAPI<T> {
  method: Method;
  url: string;
  data?: T;
  param?: string;
}

export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}
