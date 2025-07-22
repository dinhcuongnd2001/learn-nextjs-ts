import { object, string, number } from 'yup';

export const orderSchema = object({
  customerName: string().required('Customer name is required'),
  customerPhone: string().required('Customer Phone is required'),
  address: string().required('Customer address is required'),
  cod: number().required('COD is required'),
  feeShip: number().required('Fee ship is required'),
  partialPaid: number().required('Partial paid is required'),
  total: number().required('Total is required'),
  type: string().required('type is required'),
});
