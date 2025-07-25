"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userRole, setUserRole] = useState("")
  const [name, setName] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    try {
      const roleFromParams = searchParams.get('role')
      if (roleFromParams) {
        setUserRole(roleFromParams)
        if (roleFromParams === 'teacher') {
          router.push("/teacherpage")
        }
      }
    } catch (error) {
      console.error('Error reading search params:', error)
    }
  }, [searchParams, router])

  const handleGetStarted = () => {
    if (!name.trim()) {
      alert("Please enter your name before continuing")
      return
    }
    
    if (userRole === "student") {
      if (typeof window !== 'undefined') {
        localStorage.setItem('studentName', name.trim())
        localStorage.setItem('studentId', 'student_' + Math.random().toString(36).substr(2, 9))
      }
      router.push("/studentpage")
    } else if (userRole === "teacher") {
      router.push("/teacherpage")
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#7765DA] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex-col flex items-center justify-center p-4">
      <div className="w-full">
        <div className="mb-2 flex flex-col items-center">
          <div className="flex items-center mb-4 w-full">
            <div className="flex-1 flex justify-center">
              <Badge className="bg-[#7765DA] text-white">Intervue Poll</Badge>
            </div>
          </div>
            <h1 className="text-3xl text-[#000000] mb-2 text-center">
              <span>Let&apos;s </span>
              <span className="font-bold">Get Started</span>
            </h1>
            <p className="text-[#454545] text-center">
              If you’re a student, you’ll be able to submit your answers, participate in live polls, 
            </p>
            <p className="text-[#454545] text-center mt-2">
              and see how your responses compare with your classmates
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto mt-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#000000]">
              Enter your name
            </Label>
            <Input 
              id="name" 
              placeholder="Your name" 
              className="border-[#d9d9d9]" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


            <div className="flex justify-center">
            <Button
              className="bg-[#7451b6] hover:bg-[#480fb3] text-white px-8"
              onClick={handleGetStarted}
              disabled={!userRole || !name.trim()}
            >
              Continue
            </Button>
            </div>
        </div>
      </div>
  )
}
