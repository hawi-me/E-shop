"use client"

import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "..//store/store"
import { logout } from "../store/slices/authSlice"
import { toggleDarkMode as toggleTheme } from "../store/slices/themeSlice"
import { Button } from "../components/ui/button"
import { Heart, Moon, Sun, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { isDarkMode } = useSelector((state: RootState) => state.theme)
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDarkMode, mounted])

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">eShop</span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition">
              Shop
            </Link>
            <Link href="/favorites" className="text-sm font-medium hover:text-primary transition">
              Favorites
            </Link>
            <Link href="/create-product" className="text-sm font-medium hover:text-primary transition">
              Create
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites Badge */}
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
              
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => dispatch(toggleTheme())}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l">
              <span className="text-sm font-medium">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
