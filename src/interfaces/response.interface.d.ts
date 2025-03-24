export interface IResponse<T> {
  code?: string;
  result?: T;
  message?: string;
}

export interface IResponseError {
  code: string;
  message: string;
}
