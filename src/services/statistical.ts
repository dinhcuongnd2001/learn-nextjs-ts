import { IStatisticalUpdate } from '@/interfaces/statistical.interface';
import { clearFieldEmpty } from '@/utils/clearFieldEmpty';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const update = async (id: string, data: IStatisticalUpdate) => {
  const formatData = clearFieldEmpty<IStatisticalUpdate>(data);
  return prisma.statistical.update({
    where: {
      id,
    },
    data: {
      ...formatData,
    },
  });
};
