import { formatCurrency } from '@/utils/formatCurrency';
import { Order } from '@prisma/client';
import useAxiosPublic from './useAxiosPublic';
import { useEffect, useMemo, useState } from 'react';
import { IOrderResponse, IOrderTable } from '@/interfaces';
import { isEmpty } from '@/utils/isEmpty';
import { format } from 'date-fns';
import { columns } from '@/consts';

const useOrder = () => {
  const initialValue = {
    page: 1,
    limit: 10,
    search: 'test',
  };
  const { axiosPublic } = useAxiosPublic();
  const [dataSource, setDataSource] = useState<IOrderTable[]>([]);
  const [query, setQuery] = useState<Record<string, string | number>>(initialValue);

  const columnsFormatted = useMemo(() => {
    return columns.map(col => {
      if (col.key === 'createdAt') {
        return {
          ...col,
          onCell: (record: IOrderTable) => ({
            rowSpan: record.rowSpan || 0,
          }),
        };
      }
      return col;
    });
  }, [columns]);

  const formatData = (orders: Order[]): IOrderTable[] => {
    const result = orders.map(order => ({
      ...order,
      total: formatCurrency(order.total),
      cod: formatCurrency(order.cod),
      feeShip: formatCurrency(order.feeShip),
      partialPaid: formatCurrency(order.partialPaid),
      rowSpan: 1,
      createdAt: format(new Date(order.createdAt), 'dd-MM-yyyy'),
    }));

    for (let i = 0; i < result.length; i++) {
      let rowSpan = result[i].rowSpan;
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].createdAt === result[i].createdAt) {
          rowSpan++;
        } else {
          break;
        }
      }
      result[i] = { ...result[i], rowSpan };
      // Set rowSpan to 0 for subsequent rows to hide them
      for (let k = i + 1; k < i + rowSpan && k < result.length; k++) {
        result[k] = { ...result[k], rowSpan: 0 };
      }
      i += rowSpan - 1; // Skip the counted rows
    }
    return result;
  };

  const getOrder = async (query: Record<string, string | number>) => {
    const { result } = await axiosPublic<undefined, IOrderResponse>({
      method: 'GET',
      url: '/order',
      param: JSON.stringify(query),
    });
    if (isEmpty(result)) return;
    const { data } = result!;
    const formatted = formatData(data);
    setDataSource(formatted);
  };

  const handleChangeQuery = (key: string, value: string | number) => {
    setQuery(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    getOrder(initialValue);
  }, []);

  return { orders: dataSource, query, handleChangeQuery, getOrder, columns: columnsFormatted };
};

export default useOrder;
