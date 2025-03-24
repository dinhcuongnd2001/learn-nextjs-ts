'use client';
import {
  NavMain,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Home, Bot, BookOpen, ShoppingCart} from 'lucide-react';

export default function AdminSidebar() {

  const data = {
    navMain: [
      {
        title: 'General',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Role',
            url: '/admin/role',
          },
          {
            title: 'Permission',
            url: '/admin/permission',
          },
        ],
      },
      {
        title: 'Ecommerce',
        url: '#',
        icon: ShoppingCart,
        items: [
          {
            title: 'Category',
            url: '/admin/category',
          },
          {
            title: 'Attribute',
            url: '/admin/attribute',
          },
          {
            title: 'Product',
            url: '/admin/product',
            items: [
              {
                title: 'Create',
                url: '/admin/product/create',
              }
            ],
          },
        ],
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-start gap-4">
          <Home /> Admin
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
