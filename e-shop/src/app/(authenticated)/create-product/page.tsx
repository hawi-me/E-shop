"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "../../../../components/product-form"
import { toast } from "sonner"
import { ChevronLeft } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { productsAPI } from "../../../../lib/api"

interface ProductFormData {
  title: string
  description: string
  price: number
  stock: number
  brand: string
  category: string
}

export default function CreateProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    try {
      const response = await productsAPI.createProduct(data)
      toast.success("Product created successfully!")
      router.push(`/product/${response.data.id}`)
    } catch {
      toast.error("Failed to create product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Form */}
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} submitButtonLabel="Create Product" />
      </div>
    </div>
  )
}
