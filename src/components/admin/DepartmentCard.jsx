import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, DollarSign } from 'lucide-react'
import Link from "next/link"
import { buttonVariants } from "../ui/button"


export function DepartmentCard({ department }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{department.name}</CardTitle>
        <CardDescription>{department.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${department.manager}`} alt={department.manager} />
            <AvatarFallback>{department.manager.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Manager</p>
            <p className="text-sm text-gray-500">{department.manager}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">{department.employeeCount} employees</span>
          </div>
          <div className="flex items-center">
            <Link href={`/admin/departments/${department.id}`} className={buttonVariants()}>View details</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

