'use client';
import TableComponent from '@/components/ui/table';
import useAxiosProtected from '@/hooks/useAxiosProtected';
import { useEffect, useState } from 'react';

type IPermission = {
  name: string;
  description: string;
};

const PermissionManager = () => {
  const [page, setPage] = useState<number>(1);
  const [permission, setPermission] = useState<IPermission[]>([]);
  // const [params, setParams] = useState({});
  const { axiosProtected } = useAxiosProtected();

  const onChangePage = (current: number) => {
    setPage(current);
  };

  const handleGetPermission = async () => {
    const data = await axiosProtected<any, IPermission[]>({
      method: 'GET',
      url: 'permissions',
    });

    if (data.result) setPermission(data.result);
  };

  useEffect(() => {
    handleGetPermission();
  }, [page]);

  return (
    <>
      <TableComponent
        caption="Manager-role"
        rows={permission}
        cols={[
          { key: 'name', title: 'name' },
          { key: 'description', title: 'description' },
        ]}
        pagination={{ current: page, totalPage: 10, onChangePage: onChangePage }}
      />
    </>
  );
};

export default PermissionManager;
