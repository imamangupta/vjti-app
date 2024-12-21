"use client";
import AuthWarp from "@/components/AuthWraper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a new FormData object
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const username = formData.get("username");
    const role = formData.get("role");
    const password = formData.get("password");

    console.log({ email, username, role, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <AuthWarp
        title="Create New Account"
        description="Start Exploring your Organization with Blue Circle"
      >
        <form onSubmit={handleSubmit} className="my-4">
          <div className="flex flex-col space-y-2 my-2">
            <Label>Email</Label>
            <Input name="email" type="email" required />
          </div>
          <div className="flex flex-col space-y-2 my-4">
            <Label>User Name</Label>
            <Input name="username" required />
          </div>
          <div className="flex flex-col space-y-2 my-5">
            <Label className="mb-3">Create Role as</Label>
            <RadioGroup className="flex" name="role" defaultValue="admin" required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="admin" />
                <Label htmlFor="admin">Company</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employee" id="user" />
                <Label htmlFor="user">Employee</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex mt-5 flex-col space-y-2 my-2">
            <Label>Password</Label>
            <Input name="password" type="password" required />
          </div>

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </form>
        <div className="">
          <p className="text-center my-5">Already have account ? <Link href={"/login"} className="underline">login</Link></p>
        </div>
      </AuthWarp>
    </section>
  );
};

export default SignUpPage;
