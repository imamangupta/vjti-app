import AuthWarp from '@/components/AuthWraper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <AuthWarp
       title="Login" description="Welcome back , to your account"
      >
        <form className="my-4">
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
      </AuthWarp>
    </section>
  )
}

export default LoginPage