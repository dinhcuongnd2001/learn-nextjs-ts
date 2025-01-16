import { InternalAxiosRequestConfig, Method } from "axios";

export interface IAxiosAPI<T> {
    method: Method;
    url: string;
    data?: T;
}

export interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}
