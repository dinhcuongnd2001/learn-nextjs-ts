import { DialogComponent } from "@/components/ui/dialog";
import useAxiosProtected from "@/hooks/useAxiosProtected";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiSelect";
import { Pagination, Permission, Role } from "@/types";

type RoleUpdateProps = {
  roleId?: string,
  open: boolean,
  setOpen: (status: boolean) => void,
}

type RoleUpdate = Pick<Role, "id" | "description" | "name"> & {
  permissions: string[]
}


export default function RoleUpdate({ open, setOpen, roleId }: RoleUpdateProps) {
  const { axiosProtected } = useAxiosProtected();
  const [role, setRole] = useState<RoleUpdate>();
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const getData = async () => {
    const promiseGetRole = axiosProtected<any, Role>({ url: `roles/${roleId}` });
    const promiseGetListPermission = axiosProtected<any, Pagination<Permission>>({
      url: `permissions`,
      params: { pageSize: 1000 },
    });

    const [roleData, listPermission] = await Promise.all([promiseGetRole, promiseGetListPermission]);

    if (roleData.result) {
      const {permissions, ...rest} = roleData.result;
      setRole({...rest, permissions: [...permissions.map(permission => permission.id)]})
    }
    else setOpen(false);

    if (listPermission.result?.list) setPermissions(listPermission.result.list);
  };

  const options = useMemo(() => {
    return permissions.map(permission => ({ label: permission.name, value: permission.id }));
  }, [permissions]);

  const defaultValue = useMemo(() => {
    if (!role) return [];
    return role.permissions;
  }, [role]);

  useEffect(() => {
    if (!roleId) return;

    getData();
  }, [roleId]);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onMultiSelectChange = (value: string[]) => {
    if(role)
      setRole({ ...role, permissions: value });
  };

  const handleConfirm = () => {
    console.log("role :", role)
  };

  const body: React.ReactNode = useMemo(() => {
    if (!role) return null;

    return (
      <div className="flex items-center flex-col gap-5">
        <div className="flex-1 w-full flex justify-start items-center gap-10">
          <Label htmlFor="link" className="w-20">
            Name:
          </Label>
          <Input className="flex-1 h-10" id="link" value={role.name} readOnly />
        </div>

        <div className="flex-1 w-full flex justify-start items-center gap-10">
          <Label className="w-20" htmlFor="link">
            Description:
          </Label>
          <Input
            className="flex-1 h-10"
            id="link"
            value={role.description}
            onChange={e => {
              setRole({ ...role, description: e.target.value });
            }}
          />
        </div>

        <div className="flex-1 w-full flex justify-start items-center gap-10">
          <Label className="w-20" htmlFor="link">
            Permission:
          </Label>

          <MultiSelect
            options={options}
            defaultValue={defaultValue}
            onValueChange={onMultiSelectChange}
            placeholder="Select Permission"
            variant="inverted"
            maxCount={2}
          />
        </div>
      </div>
    );
  }, [role]);

  return (
    <DialogComponent
      title="Role Update"
      cancleOption={true}
      confirmOption={true}
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleConfirm}
      body={body}
    />
  );
}