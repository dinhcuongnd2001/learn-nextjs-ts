import { Method } from "axios";

export interface IAxiosAPI<T> {
    method: Method;
    url: string;
    data?: T;
}