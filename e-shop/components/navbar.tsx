"use client"

import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "../store/store"
import { logout } from "../store/slices/authSlice"
import { toggleDarkMode as toggleTheme } from "../store/slices/themeSlice"
import { Button } from "../components/ui/button"
import { Heart, Moon, Sun, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { isDarkMode } = useSelector((state: RootState) => state.theme)
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", isDarkMode)
    }
  }, [isDarkMode, mounted])

  if (!isAuthenticated) return null

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-xl dark:bg-gray-900/30 shadow-md supports-[backdrop-filter]:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm p-1">
              <Image
                src="/logo (3).png"
                alt="eShop logo"
                width={40}
                height={40}
                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide">
              eShop
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Shop" },
              { href: "/favorites", label: "Favorites" },
              { href: "/create-product", label: "Create" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition duration-300
                after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition"
              >
                <Heart className="w-5 h-5 text-indigo-500" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className="hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </Button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-100 dark:hover:bg-red-800/30 text-red-500 transition"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
