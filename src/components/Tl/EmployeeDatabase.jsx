"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Mail, User, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialEmployeeData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johnd",
    dob: "1990-05-15",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    username: "janes",
    dob: "1988-09-22",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    username: "alicej",
    dob: "1992-11-30",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Bob Williams",
    email: "bob.williams@example.com",
    username: "bobw",
    dob: "1985-03-18",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EmployeeOverview() {
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    username: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.username && newEmployee.dob) {
      setEmployeeData((prev) => [
        ...prev,
        { ...newEmployee, avatar: "/placeholder.svg?height=100&width=100" },
      ]);
      setNewEmployee({ name: "", email: "", username: "", dob: "" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Overview</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the details of the new employee here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={newEmployee.username}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dob" className="text-right">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={newEmployee.dob}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddEmployee}>Add Employee</Button>
          </DialogContent>
        </Dialog>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {employeeData.map((employee, index) => (
          <MotionCard key={index} variants={cardVariants}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {employee.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="font-medium">Email:</span> {employee.email}
                </p>
                <p className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">Username:</span> {employee.username}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="font-medium">Date of Birth:</span> {employee.dob}
                </p>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}

