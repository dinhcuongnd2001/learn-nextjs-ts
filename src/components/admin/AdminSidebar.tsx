'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Settings, UserCog, ChartColumnStacked, LayoutList, ProjectorIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  // Manager.
  const items = [
    {
      title: 'Role',
      url: '/admin/role',
      icon: UserCog,
    },
    {
      title: 'Permission',
      url: '/admin/permission',
      icon: Settings,
    },
  ];

  // Product

  const managerProduct = [
    {
      title: 'Category',
      url: '/admin/category',
      icon: ChartColumnStacked,
    },
    {
      title: 'Attribute',
      url: '/admin/attribute',
      icon: LayoutList,
    },
    {
      title: 'Product',
      url: '/admin/product',
      icon: ProjectorIcon,
    },
  ];

  const contents = [
    { key: 'User', data: items },
    {
      key: 'Product',
      data: managerProduct,
    },
  ];

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-start gap-4">
          <Home /> Admin
        </div>
      </SidebarHeader>

      <SidebarContent>
        {contents.map((each, ind) => (
          <SidebarGroup key={ind}>
            <SidebarGroupLabel>{each.key}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {each.data.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        className={`${pathname === item.url ? 'text-blue-600' : ''}`}
                        href={item.url}
                        replace={true}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
