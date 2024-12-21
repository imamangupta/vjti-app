import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";

const page = async ({ params }) => {
  const slug = (await params).id;
  return (
    <div className="p-10 ">
      <h2 className="text-lg font-semibold">Department Name</h2>
      <Tabs defaultValue="account" className="">
        <TabsList className="flex w-[500px] justify-between my-5">
          <TabsTrigger className="" value="overview">
            Account
          </TabsTrigger>
          <TabsTrigger className="" value="Tasks">
            Password
          </TabsTrigger>
          <TabsTrigger className="" value="Video Meet">
            Password
          </TabsTrigger>
          <TabsTrigger className="" value="VR Office">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <h1>Overview</h1>
        </TabsContent>
        <TabsContent value="Tasks">
          <h1>Tasks</h1>
        </TabsContent>
        <TabsContent value="Video meet">
          <h1>Overview</h1>
        </TabsContent>
        <TabsContent value="VR Office">
          <h1>VR Office</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
