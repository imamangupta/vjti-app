import { DepartmentOverview } from '@/components/admin/DepartmentsOverview'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='px-10'>
      <div className='flex justify-between py-5 mt-5'>
      </div>
      <DepartmentOverview />
    </div>
  )
}

export default page