import { DepartmentCard } from "./DepartmentCard"


const departments = [
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map(department => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  )
}

