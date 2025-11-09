"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { productsAPI } from "../../../../../lib/api"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent } from "../../../../../components/ui/card"
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../../../store/store"
import { addToFavorites, removeFromFavorites } from "../../../../../store/slices/favoritesSlice"
import Image from "next/image"
import Link from "next/link"
import DeleteProductDialog from "../../../../../components/delete-product-dialog"

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.some((item) => item.id === id)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await productsAPI.getProductById(id)
        setProduct(response.data as Product)
        setSelectedImage(response.data.thumbnail)
        setError(null)
      } catch {
        setError("Failed to load product details")
        toast.error("Failed to load product")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleFavoriteToggle = () => {
    if (!product) return

    if (isFavorite) {
      dispatch(removeFromFavorites(id))
      toast.success("Removed from favorites")
    } else {
      dispatch(
        addToFavorites({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          rating: product.rating,
        }),
      )
      toast.success("Added to favorites")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await productsAPI.deleteProduct(id)
      toast.success("Product deleted successfully!")
      router.push("/")
    } catch {
      toast.error("Failed to delete product")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 p-6 bg-destructive/10 border border-destructive rounded-lg">
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-destructive">{error || "Product not found"}</h3>
            <Button variant="ghost" onClick={() => router.back()} className="mt-4">
              Go back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0 relative bg-muted h-96 sm:h-full">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedImage(product.thumbnail)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                    selectedImage === product.thumbnail ? "border-primary" : "border-border"
                  }`}
                >
                  <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt="thumbnail"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </button>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                      selectedImage === img ? "border-primary" : "border-border"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`product-${idx}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <span className="text-lg bg-yellow-100 text-yellow-800 px-3 py-1 rounded">★ {product.rating}</span>
              </div>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Product Info */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand:</span>
                  <span className="font-semibold">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <Link href={`/product/${product.id}/edit`} className="flex-1">
                <Button className="w-full">Edit Product</Button>
              </Link>
              <DeleteProductDialog
                productId={product.id}
                productTitle={product.title}
                onConfirm={handleDeleteProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
