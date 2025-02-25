'use client'
import isAdmin from "@/components/common/IsAdmin";
import TableComponent from "@/components/ui/table";
import useAxiosProtected from "@/hooks/useAxiosProtected";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Role = {
  name: string;
  description: string;
  id: string;
};

type RoleResponse = {
  list: Role[];
  totalPage: number;
};

const RoleManager = () => {

    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const { axiosProtected } = useAxiosProtected();

    const handleGetPermission = async () => {
      const data = await axiosProtected<any, RoleResponse>({
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
        handleGetPermission();
      } else toast.error('Delete fail');
    };

    useEffect(() => {
      handleGetPermission();
    }, [page]);

    const onChangePage = (current: number) => {
      setPage(current);
    };

  return (
    <>
      <TableComponent
        caption="Manager Role"
        rows={roles}
        cols={[
          { key: 'name', title: 'name' },
          { key: 'description', title: 'description' },
        ]}
        pagination={{ current: page, totalPage: totalPage, onChangePage: onChangePage }}
        delete={true}
        handleClickDelete={handleClickDelete}
      />
    </>
  );
};

export default isAdmin(RoleManager);
