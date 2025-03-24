'use client';
import isAdmin from '@/components/common/IsAdmin';
import TableComponent from '@/components/ui/table';
import useAxiosProtected from '@/hooks/useAxiosProtected';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Pagination, Role } from '@/types';
import dynamic from 'next/dynamic';

const RoleUpdate = dynamic(() => import('./update'));
const RoleCreate = dynamic(() => import('./create'));

const RoleManager = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [roles, setRoles] = useState<Role[]>([]);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>();

  const { axiosProtected } = useAxiosProtected();

  useEffect(() => {
    handleGetAllRole();
  }, [page]);

  const handleGetAllRole = async () => {
    const data = await axiosProtected<any, Pagination<Role>>({
      method: 'GET',
      url: 'roles',
      params: {
        page: page,
      },
    });

    if (data.result) {
      setRoles(data.result.list);
      setTotalPage(data.result.totalPage);
    }
  };

  const handleClickDelete = async (id: string) => {
    const data = await axiosProtected<any, string>({
      method: 'DELETE',
      url: `roles/${id}`,
    });

    if (data.result) {
      toast.success(data.result);
      handleGetAllRole();
    }
  };

  const handleClickUpdate = (id: string) => {
    setCurrentId(id);
    setOpenUpdate(true);
  };

  const rows = useMemo(() => {
    return roles.map(({ permissions, ...rest }) => rest);
  }, [roles]);

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const onChangePage = (current: number) => {
    setPage(current);
  };

  return (
    <>
      <TableComponent
        caption="Manager Role"
        rows={rows}
        cols={[
          { key: 'name', title: 'name' },
          { key: 'description', title: 'description' },
        ]}
        pagination={{ current: page, totalPage: totalPage, onChangePage: onChangePage }}
        delete={true}
        update={true}
        create={true}
        handleClickDelete={handleClickDelete}
        hanleClickUpdate={handleClickUpdate}
        handleClickCreate={handleClickCreate}
      />
      <RoleUpdate open={openUpdate} setOpen={status => setOpenUpdate(status)} roleId={currentId} />
      <RoleCreate open={openCreate} setOpen={status => setOpenCreate(status)} cbFunction={handleGetAllRole} />
    </>
  );
};

export default isAdmin(RoleManager);
