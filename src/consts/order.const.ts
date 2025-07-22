export const columns = [
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Thông tin khách hàng',
    children: [
      {
        title: 'Tên',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: 'SĐT',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
      },
    ],
  },
  { title: 'Tổng tiền', dataIndex: 'total', key: 'total' },
  { title: 'COD', dataIndex: 'cod', key: 'cod' },
  { title: 'Phí ship', dataIndex: 'feeShip', key: 'feeShip' },
  { title: 'Đã cọc', dataIndex: 'partialPaid', key: 'partialPaid' },
  { title: 'Tracking', dataIndex: 'tracking', key: 'tracking' },
  { title: 'Trạng Thái', dataIndex: 'type', key: 'type' },
];
