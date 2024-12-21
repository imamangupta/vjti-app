
import React from "react";

import {
  Settings,
  Database,
  FolderKanban,
  ChartArea,
  Building2,
  ClipboardList,
  ListChecks
} from "lucide-react";

import Link from "next/link";
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
} from "../ui/sidebar";




const companyNav = [
  { name: "Dashboard", Icon: ChartArea, link: "/dashboard/overview" },
  { name: "Tasks", Icon: ClipboardList, link: "/dashboard/tasks" },
  { name: "AI Task Breakdown", Icon: ListChecks, link: "/dashboard/todo" },
  { name: "Employees", Icon: Database, link: "/admin/employee" },
  { name: "Settings", Icon: Settings, link: "/admin/settings" },
];

const EmployeeSidebar = async () => {

  return (
    <Sidebar>
      <SidebarHeader className="px-5 border-b py-2">
        <div>
          <div className="flex gap-3">
            <h1 className="text-lg font-semibold">
              blue<span className="text-blue-700">Circle</span>.
            </h1>
          </div>
          <p className="text-sm text-slate-500">for Employees</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Company</SidebarGroupLabel>
          <SidebarGroupContent className="p-3 flex gap-3 text-sm rounded-lg font-medium bg-blue-100">
            <Building2 size={18} />
            <h2>Slash Ritesh</h2>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">
            Applications
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companyNav.map((data, index) => {
                return <SingleSideBtn data={data} key={index} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
       
      </SidebarContent>
    </Sidebar>
  );
};

export default EmployeeSidebar;


const SingleSideBtn = ({ data }) => {
  const { Icon, name, link } = data;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <div>
          <Icon />
          <Link className="text-sm font-medium" href={link}>
            {name}
          </Link>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
