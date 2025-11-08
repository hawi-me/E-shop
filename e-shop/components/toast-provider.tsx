"use client"

import { Toaster } from "sonner"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export function ToastProvider() {
  const { isDarkMode } = useSelector((state: RootState) => state.theme)

  return <Toaster theme={isDarkMode ? "dark" : "light"} position="top-right" richColors />
}
