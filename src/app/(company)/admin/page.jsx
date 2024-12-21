'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const DashboardPage = () => {
  const [organizationDetails, setOrganizationDetails] = useState({
    name: "TechCorp",
    established: "2005",
    address: "123 Silicon Valley, CA",
  });

  const employees = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Manager" },
  ];

  const departments = [
    { id: 1, name: "Development", head: "Alice" },
    { id: 2, name: "Design", head: "Bob" },
    { id: 3, name: "HR", head: "Charlie" },
  ];

  const tasks = [
    { id: 1, title: "Build Landing Page", status: "In Progress" },
    { id: 2, title: "Design Logo", status: "Completed" },
    { id: 3, title: "Setup CI/CD Pipeline", status: "Pending" },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Organization Details */}
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {organizationDetails.name}</p>
              <p><strong>Established:</strong> {organizationDetails.established}</p>
              <p><strong>Address:</strong> {organizationDetails.address}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees */}
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {employees.map((employee) => (
                  <li key={employee.id} className="my-2">
                    {employee.name} - <span className="text-muted">{employee.role}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {departments.map((department) => (
                  <li key={department.id} className="my-2">
                    {department.name} (Head: {department.head})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id} className="my-2">
                    {task.title} - <span className="text-muted">{task.status}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-4">Add New Task</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
