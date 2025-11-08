"use client"

import { Heart } from "lucide-react"
import { Button } from "..//components/ui/button"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "..//store/store"
import { addToFavorites, removeFromFavorites } from "../store/slices/favoritesSlice"
import { toast } from "sonner"

interface ProductCardProps {
  id: number
  title: string
  price: number
  rating: number
  category: string
  thumbnail: string
}

export function ProductCard({ id, title, price, rating, category, thumbnail }: ProductCardProps) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.some((item: { id: number }) => item.id === id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id))
      toast.success("Removed from favorites")
    } else {
      dispatch(
        addToFavorites({
          id,
          title,
          price,
          thumbnail,
          rating,
        }),
      )
      toast.success("Added to favorites")
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${id}`}>
        <CardContent className="p-0 relative overflow-hidden bg-muted h-48">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform"
            unoptimized
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {category}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex flex-col gap-3 p-4">
        <div className="w-full">
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 cursor-pointer">{title}</h3>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-blue-600">${price}</span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">★ {rating.toFixed(1)}</span>
          </div>
        </div>

        <Button
          onClick={handleFavoriteToggle}
          variant={isFavorite ? "default" : "outline"}
          size="sm"
          className="w-full gap-2"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
      </CardFooter>
    </Card>
  )
}
