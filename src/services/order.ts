import { IOrderCreate } from '@/interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data: IOrderCreate) => {
  return await prisma.$transaction(async tx => {
    // Tạo Order mới
    const order = await tx.order.create({
      data: { ...data, createdAt: data.createdAt ? new Date(data.createdAt) : new Date() },
    });

    // Tìm Statistical hiện tại (ví dụ: theo ngày, hoặc chỉ lấy bản ghi đầu tiên)
    let statistical = await tx.statistical.findFirst();

    if (statistical) {
      // Nếu đã có, cập nhật lại các trường (ví dụ: cộng thêm doanh thu)
      statistical = await tx.statistical.update({
        where: { id: statistical.id },
        data: {
          revenue: statistical.revenue + data.total,
          total: statistical.total + 1,
        },
      });
    } else {
      // Nếu chưa có, tạo mới
      statistical = await tx.statistical.create({
        data: {
          revenue: data.total,
          refund: 0,
          investment: 0,
          total: 1,
        },
      });
    }

    return { order, statistical };
  });
};

export const getOrder = async () => {
  return await prisma.order.findMany();
};
