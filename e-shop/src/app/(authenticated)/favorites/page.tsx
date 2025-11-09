"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../store/store"
import { removeFromFavorites } from "../../../../store/slices/favoritesSlice"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../../components/ui/card"
import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)

  const handleRemove = (id: number) => {
    dispatch(removeFromFavorites(id))
    toast.success("Removed from favorites")
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Favorites</h1>
          <p className="text-muted-foreground">
            {favorites.length === 0
              ? "You have no favorite products yet"
              : `You have ${favorites.length} favorite product${favorites.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Products Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <Link href={`/product/${product.id}`}>
                  <CardContent className="p-0 relative overflow-hidden bg-muted h-48">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      unoptimized
                    />
                  </CardContent>
                </Link>

                <CardFooter className="flex flex-col gap-3 p-4 flex-1">
                  <div className="w-full">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-blue-600">${product.price}</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        ★ {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Button onClick={() => handleRemove(product.id)} variant="destructive" size="sm" className="gap-1">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <CardContent className="text-center space-y-4">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-6">Start adding products to your favorites list!</p>
              </div>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
