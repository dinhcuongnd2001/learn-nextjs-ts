import { Permission } from './permissionType';

export type Role = {
  name: string;
  description: string;
  id: string;
  permissions: Permission[];
};

export type RoleRequest = Pick<Role, 'description' | 'name'> & {
  permissions: string[];
};
