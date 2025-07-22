export const isEmpty = <T>(data: T): boolean => {
  if (data === undefined || data === null) return true;
  if (data instanceof Object) return !!!Object.keys(data).length;
  if (data instanceof Array) return !!!data.length;
  return !!data;
};
