"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)

    // Create a new FormData object
    const formData = new FormData(e.target);

    // Access the form data using FormData's get method
    const email = formData.get('email');
    const password = formData.get('password');

    try {
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
        toast.success("Login Successful")
        localStorage.setItem('token', json.data.token)
        if (json.data.role ==="company") {
          
          router.push("/admin")
        }else{
          router.push("/dashboard")

        }
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-3xl -z-10">
        <div className="rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 w-[500px] h-[500px] blur-3xl opacity-20" />
      </div>

      <Card className="w-[400px] shadow-2xl border-0 bg-white/70 backdrop-blur-lg">
        <CardHeader className="space-y-6">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-blue-600 inline-flex items-center transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="space-y-2 text-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="mx-auto"
            />
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="pl-10 bg-white/50"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="pl-10 bg-white/50"
                  required 
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

