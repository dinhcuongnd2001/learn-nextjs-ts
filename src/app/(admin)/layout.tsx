import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
  // return (
  //   <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
  //     <div className="flex-grow">
  //       <main className="p-4 sm:ml-64">{children}</main>
  //     </div>
  //   </div>
  // );
}
