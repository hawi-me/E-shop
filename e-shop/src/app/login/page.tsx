"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { login } from "../../../store/slices/authSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { toast } from "sonner"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !name) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      dispatch(login({ email, name }))
      toast.success("Login successful!")
      router.push("/")
      setIsLoading(false)
    }, 500)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-blue-950"
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
        {/* Left side - Logo */}
        <div className="flex items-center justify-center bg-white w-full md:w-1/2 h-[400px] md:h-[480px]">
          <Image
            src="/E-Shop (1).png"
            alt="E-Shop Logo"
            width={300}
            height={300}
            className="object-contain w-3/4 md:w-2/3 drop-shadow-lg"
          />
        </div>

        {/* Right side - Transparent Login Card */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[480px] flex items-center justify-center bg-white/10 backdrop-blur-lg p-6 border border-white/30 rounded-none md:rounded-r-2xl">
          <Card className="w-full max-w-sm bg-transparent border-0 shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white drop-shadow-md">
                Welcome to E-Shop
              </CardTitle>
              <CardDescription className="text-white/80">
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">Name</label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/20 text-white placeholder:text-white/70 border-white/40 focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/20 text-white placeholder:text-white/70 border-white/40 focus:border-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold hover:bg-gray-200 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <h1>admin@gmail.com</h1>
                <h2>password:admin123</h2>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
