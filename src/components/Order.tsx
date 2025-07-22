'use client';
import { Table } from 'antd';
import useOrder from '@/hooks/useOrder';

const OrderPage = () => {
  const { orders, columns } = useOrder();

  return (
    <div>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderPage;
