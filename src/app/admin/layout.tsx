import React from "react";
import SidebarAdmin from "@/components/SidebarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      <SidebarAdmin />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
