'use client';
import TableComponent from '@/components/ui/table';
import useAxiosProtected from '@/hooks/useAxiosProtected';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type IPermission = {
  name: string;
  description: string;
  id: string;
};

type PermissionResponse = {
  list: IPermission[];
  totalPage: number;
};

const PermissionManager = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [permission, setPermission] = useState<IPermission[]>([]);
  const { axiosProtected } = useAxiosProtected();

  const onChangePage = (current: number) => {
    setPage(current);
  };

  const handleGetPermission = async () => {
    const data = await axiosProtected<any, PermissionResponse>({
      method: 'GET',
      url: 'permissions',
      params: {
        page: page,
      },
    });

    if (data.result) {
      setPermission(data.result.list);
      setTotalPage(data.result.totalPage);
    }
  };

  const handleClickDelete = async (id: string) => {
    const data = await axiosProtected<any, string>({
      method: 'DELETE',
      url: `permissions/${id}`,
    });

    if (data.result) {
      toast.success(data.result);
      handleGetPermission();
    } else toast.error('Delete fail');
  };

  const handleClickUpdate = (id: string) => {
    console.log('id updated:', id);
  };

  useEffect(() => {
    handleGetPermission();
  }, [page]);

  return (
    <>
      <TableComponent
        caption="Manager Permission"
        rows={permission}
        cols={[
          { key: 'name', title: 'name' },
          { key: 'description', title: 'description' },
        ]}
        pagination={{ current: page, totalPage: totalPage, onChangePage: onChangePage }}
        update={true}
        delete={true}
        handleClickDelete={handleClickDelete}
        hanleClickUpdate={handleClickUpdate}
      />
    </>
  );
};

export default PermissionManager;
