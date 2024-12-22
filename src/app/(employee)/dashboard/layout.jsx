import EmployeeSidebar from '@/components/employee/EmployeeSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { motion, } from "framer-motion"
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "@/app/globals.css";

const selectedComponent = 'overview'
const layout = ({children}) => {
  return (
    <SidebarProvider>
        <div>
            <EmployeeSidebar />
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
            {children}
          </main>
    </SidebarProvider>
  )
}

export default layout