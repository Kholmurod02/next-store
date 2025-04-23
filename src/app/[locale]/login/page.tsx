"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Router } from "lucide-react"
import { useLoginMutation } from "@/store/api/authApiSlice"
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast'


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [data,setData] = useState("")
  const router = useRouter()
  const [login] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      userName: email,
      password: password
    }
    try {
      const { data } = await login(user).unwrap()
      toast.success("Successfully entered")
      setData(data)
      if(data){
        localStorage.setItem("access_token", data)
        router.push("/")
      }
    } catch (error) {
      console.error(error);
      toast.error("Your UserName or Password is incorrect!!!")
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl font-bold text-center">Log in to Exclusive</CardTitle>
          <CardDescription className="text-center">Enter your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="User Name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-sm font-medium text-red-500 hover:text-red-600">
                Forget Password?
              </a>
            </div>
            <Button type="submit" className="w-full h-12 bg-red-500 hover:bg-red-600">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
