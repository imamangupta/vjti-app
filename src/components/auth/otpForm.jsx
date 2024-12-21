'use client'

import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast'

export default function OTPForm() {
  const [otp, setOtp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      // Here you would typically send the OTP to your server for verification
      console.log('Submitting OTP:', otp)
      toast({
        title: "OTP Submitted",
        description: `Your OTP ${otp} has been submitted successfully.`,
      })
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit OTP.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Enter OTP</h2>
          <p className="text-muted-foreground">Please enter the 6-digit code sent to your device.</p>
        </div>
        <div className='flex justify-center'>

        <InputOTP
          value={otp}
          onChange={setOtp}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </div>
        <Button type="submit" className="w-full">Verify OTP</Button>
      </form>
      <Toaster />
    </div>
  )
}

