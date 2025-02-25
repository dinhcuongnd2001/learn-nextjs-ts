import { Permission } from "./typePermission";

export type Role = {
  name: string;
  description: string;
  id: string;
  permissions: Permission[];
};