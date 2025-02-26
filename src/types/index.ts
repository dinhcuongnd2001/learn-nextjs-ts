export * from './typePermission';
export * from './typeRole';

export type Pagination<T> = {
  list: T[];
  totalPage: number;
};
