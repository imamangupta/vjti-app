"use client"

import { useState } from "react"
import { DepartmentCard } from "./DepartmentCard"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateDepartmentForm } from "./CreateDepartmentForm"

const initialDepartments = [
  {
    id: "1",
    name: "Human Resources",
    description: "Manages employee relations, recruitment, and workplace policies",
    employeeCount: 15,
    budget: 500000,
    manager: "Jane Smith"
  },
  {
    id: "2",
    name: "Marketing",
    description: "Develops and implements marketing strategies to promote products/services",
    employeeCount: 25,
    budget: 1000000,
    manager: "John Doe"
  },
  {
    id: "3",
    name: "Engineering",
    description: "Designs, develops, and maintains software products and infrastructure",
    employeeCount: 50,
    budget: 2000000,
    manager: "Alice Johnson"
  },
  {
    id: "4",
    name: "Finance",
    description: "Manages company finances, budgeting, and financial reporting",
    employeeCount: 20,
    budget: 750000,
    manager: "Bob Williams"
  }
]

export function DepartmentOverview() {
  const [departments, setDepartments] = useState(initialDepartments)

  const handleCreateDepartment = (newDepartment) => {
    setDepartments([...departments, { ...newDepartment, id: (departments.length + 1).toString() }])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Departments Overview</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>
                Enter the details of the new department here.
              </DialogDescription>
            </DialogHeader>
            <CreateDepartmentForm onCreateDepartment={handleCreateDepartment} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(department => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  )
}
