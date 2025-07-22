import { Order } from '@prisma/client';
import { IPagination } from './pagination.interface';

export interface IOrderCreate extends Omit<Order, 'id'> {}

export interface IOrderResponse {
  data: Order[];
  pagination?: IPagination;
}

export interface IOrderTable extends Omit<Order, 'createdAt' | 'total' | 'cod' | 'feeShip' | 'partialPaid'> {
  createdAt: string;
  rowSpan: number;
  total: string;
  cod: string;
  feeShip: string;
  partialPaid: string;
}
