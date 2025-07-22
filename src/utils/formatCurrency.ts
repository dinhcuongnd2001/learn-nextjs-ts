export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
