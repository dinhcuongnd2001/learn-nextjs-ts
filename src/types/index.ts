export * from './permissionType';
export * from './roleType';
export * from './productType'

export type Pagination<T> = {
  list: T[];
  totalPage: number;
};
