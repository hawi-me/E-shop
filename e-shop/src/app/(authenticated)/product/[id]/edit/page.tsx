"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "../../../../../../components/ui/button"
import { ProductForm } from "../../../../../../components/product-form"
import { productsAPI } from "../../../../../../lib/api"
interface ProductFormData {
  title: string
  description: string
  price: number
  stock: number
  brand: string
  category: string
}

interface Product extends ProductFormData {
  id: number
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getProductById(id)
        setProduct(response.data as Product)
      } catch {
        toast.error("Failed to load product")
        router.back()
      } finally {
        setIsLoadingProduct(false)
      }
    }

    fetchProduct()
  }, [id, router])

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true)
    try {
      await productsAPI.updateProduct(id, data)
      toast.success("Product updated successfully!")
      router.push(`/product/${id}`)
    } catch {
      toast.error("Failed to update product")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
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
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonLabel="Update Product"
        />
      </div>
    </div>
  )
}
