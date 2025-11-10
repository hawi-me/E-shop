import { useState, useEffect, useRef, useCallback } from "react"
import { ProductCard } from "../../../components/product-card"
import { SearchBar } from "../../../components/search-bar"
import { productsAPI } from "../../../lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  rating: number
  category: string
  thumbnail: string
}

interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [skip, setSkip] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const LIMIT = 10

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore || searchQuery) return

    setIsLoading(true)
    try {
      const response = await productsAPI.getAllProducts(LIMIT, skip + LIMIT)
      const data = response.data as ApiResponse

      if (data.products.length === 0) {
        setHasMore(false)
      } else {
        setProducts((prev) => [...prev, ...data.products])
        setSkip((prev) => prev + LIMIT)
      }
    } catch {
      toast.error("Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }, [skip, hasMore, isLoading, searchQuery])

  // Initial load
  useEffect(() => {
    const loadInitialProducts = async () => {
      setIsLoading(true)
      try {
        const response = await productsAPI.getAllProducts(LIMIT, 0)
        const data = response.data as ApiResponse
        setProducts(data.products)
        setSkip(LIMIT)
      } catch {
        toast.error("Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialProducts()
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && hasMore && !searchQuery) {
        loadMoreProducts()
      }
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [loadMoreProducts, isLoading, hasMore, searchQuery])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery("")
      setProducts([])
      setSkip(0)
      setHasMore(true)

      const response = await productsAPI.getAllProducts(LIMIT, 0)
      const data = response.data as ApiResponse
      setProducts(data.products)
      setSkip(LIMIT)
      return
    }

    setSearchQuery(query)
    setIsSearching(true)
    try {
      const response = await productsAPI.searchProducts(query)
      const data = response.data as ApiResponse
      setProducts(data.products)
      setHasMore(false)
    } catch {
      toast.error("Search failed")
      setProducts([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">Discover amazing products</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {!searchQuery && (
          <div ref={observerTarget} className="flex justify-center py-8">
            {isLoading && <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />}
          </div>
        )}
      </div>
    </div>
  )
}