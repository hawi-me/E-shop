"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "../store/store"
import { ToastProvider } from "./toast-provider"


export function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider />
      {children}
    </Provider>
  )
}
