"use client"

import type React from "react"

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "../../../store/store"
import { Navbar } from "../../../components/navbar"
import { useEffect } from "react"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
