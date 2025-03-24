'use client';
import { DialogComponent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multiSelect';
import useAxiosProtected from '@/hooks/useAxiosProtected';
import { Pagination, Permission, Role, RoleRequest } from '@/types';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';

type RoleCreateProps = {
  open: boolean;
  setOpen: (status: boolean) => void;
  cbFunction?: () => void;
};

export default function RoleCreate({ open, setOpen, cbFunction }: RoleCreateProps) {
  const { axiosProtected } = useAxiosProtected();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<RoleRequest>({ name: '', description: '', permissions: [] });

  const getData = async () => {
    const permissionData = await axiosProtected<any, Pagination<Permission>>({
      url: `permissions`,
      params: { pageSize: 1000 },
      loading: false,
    });
    if (permissionData.result?.list) setPermissions(permissionData.result.list);
  };

  useEffect(() => {
    getData();
  }, []);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleConfirm = async () => {
    await axiosProtected<any, Role>({
      url: `roles`,
      method: 'POST',
      data: role,
      message: 'Create successfull',
    });
    setOpen(false);
    if (cbFunction) cbFunction();
  };

  const handleChange = (key: Extract<keyof RoleRequest, string>, value: string | string[]) => {
    setRole({ ...role, [key]: value });
  };

  const options = permissions.map(permission => ({ label: permission.name, value: permission.id }));

  const body: React.ReactNode = (
    <div className="flex items-center flex-col gap-5">
      <div className="flex-1 w-full flex justify-start items-center gap-10">
        <Label htmlFor="link" className="w-20">
          Name:
        </Label>
        <Input
          className="flex-1 h-10"
          id="link"
          value={role.name}
          onChange={e => handleChange('name', e.target.value)}
        />
      </div>

      <div className="flex-1 w-full flex justify-start items-center gap-10">
        <Label className="w-20" htmlFor="link">
          Description:
        </Label>
        <Input
          className="flex-1 h-10"
          id="link"
          value={role.description}
          onChange={e => handleChange('description', e.target.value)}
        />
      </div>

      <div className="flex-1 w-full flex justify-start items-center gap-10">
        <Label className="w-20" htmlFor="link">
          Permission:
        </Label>

        <MultiSelect
          defaultValue={role.permissions}
          options={options}
          onValueChange={val => handleChange('permissions', val)}
          placeholder="Select Permission"
          variant="inverted"
          maxCount={2}
        />
      </div>
    </div>
  );

  return (
    <DialogComponent
      title="Role Create"
      cancleOption={true}
      confirmOption={true}
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleConfirm}
      body={body}
    />
  );
}
