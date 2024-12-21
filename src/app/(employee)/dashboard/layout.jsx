import EmployeeSidebar from '@/components/employee/EmployeeSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <SidebarProvider>
        <div>
            <EmployeeSidebar />
        </div>
        {children}
    </SidebarProvider>
  )
}

export default layout