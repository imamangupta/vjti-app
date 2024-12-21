"use client"
import AuthWarp from '@/components/AuthWraper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BaseApiUrl } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'

import { useRouter } from 'next/navigation'


const LoginPage = () => {

  
  const router = useRouter()

  const handlesubmit = async (e)=>{
    e.preventDefault(); // Prevent default form submission

    // Create a new FormData object
    const formData = new FormData(e.target);

    // Access the form data using FormData's get method
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(`${BaseApiUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    const json = await response.json()

    if (json.data) {
      console.log(json)
      // toast.success("Login Successful")
      localStorage.setItem('token', json.data.token)
      router.push("/dashboard")
    } else {
      // toast.error("Invalid Credentials")
    }

    // console.log({ email, password });
  }




  
  return (
    <section className="flex justify-center items-center h-screen">
      <AuthWarp
       title="Login in to your account" description="Welcome back , to your account"
      >
        <form onSubmit={handlesubmit} className="my-4">
          <div className="flex flex-col space-y-2 my-2">
            <Label>Email</Label>
            <Input name="email" />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            <Label>Password</Label>
            <Input name="password" />
          </div>

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </form>
        <div className="">
          <p className="text-center my-5">Don't Have Account ? <Link href={"/login"} className="underline">login</Link></p>
        </div>
      </AuthWarp>
    </section>
  )
}

export default LoginPage