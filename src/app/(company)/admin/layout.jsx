import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <div>
          <AdminSidebar />
          <h1>sidebar</h1>
        </div>
        <div>
            {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
