import { InternalAxiosRequestConfig, Method } from 'axios';

export interface IAxiosAPI<T> {
  method: Method;
  url: string;
  data?: T;
  params?: Record<string, string | number>;
}

export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}
