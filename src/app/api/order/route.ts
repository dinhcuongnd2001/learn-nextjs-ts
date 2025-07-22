import { IOrderResponse } from '@/interfaces';
import * as orderService from '@/services/order';
import { CustomResponse } from '@/utils/CustomResponse';
import { orderSchema } from '@/validation';
import { Order } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await orderSchema.validate(data);
    await orderService.create(data);
    return new CustomResponse<Order>(data, 201, 'success');
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected exception';
    return new CustomResponse<null>(null, 500, message);
  }
}

export async function GET(request: Request) {
  try {
    const data = await orderService.getOrder();
    return new CustomResponse<IOrderResponse>({ data, pagination: undefined }, 200, 'success');
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected exception';
    return new CustomResponse<null>(null, 500, message);
  }
}
