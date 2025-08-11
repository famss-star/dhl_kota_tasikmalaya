import React from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SidebarAdmin />
        <main className="ml-80 p-4 md:p-8">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
