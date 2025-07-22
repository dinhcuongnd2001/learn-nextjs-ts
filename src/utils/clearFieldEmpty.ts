export function clearFieldEmpty<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
      result[key as keyof T] = value;
    }
  });
  return result;
}
