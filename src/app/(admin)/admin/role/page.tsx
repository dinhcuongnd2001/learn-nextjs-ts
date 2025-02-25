'use client'
import isAdmin from "@/components/common/IsAdmin";
import TableComponent from "@/components/ui/table";
import useAxiosProtected from "@/hooks/useAxiosProtected";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import RoleUpdate from "./update";
import { Pagination, Role } from "@/types";

const RoleManager = () => {

    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const [openUpdate, setOpenUpdate]= useState<boolean>(false);
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
      } else toast.error('Delete fail');
    };

    const handleClickUpdate = (id: string) => {
      setCurrentId(id);
      setOpenUpdate(true);
    }

    const rows = useMemo(() => {
      return roles.map(({permissions, ...rest}) => rest)
    }, [roles])



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
        handleClickDelete={handleClickDelete}
        hanleClickUpdate={handleClickUpdate}
      />
      <RoleUpdate open={openUpdate} setOpen={status => setOpenUpdate(status)} roleId={currentId} />
    </>
  );
};

export default isAdmin(RoleManager);
