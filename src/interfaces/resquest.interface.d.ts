import { InternalAxiosRequestConfig, Method } from 'axios';

export interface IAxiosAPI<T> {
  url: string;
  method?: Method;
  data?: T;
  params?: Record<string, string | number>;
  loading?: boolean
}

export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}
