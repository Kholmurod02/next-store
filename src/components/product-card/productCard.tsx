"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Eye, ShoppingCart } from "lucide-react"
import { cn } from "@/components/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  productName: string
  image: string
  color: string
  price: number
  hasDiscount: boolean
  discountPrice: number
  quantity: number
  productInMyCart: boolean
  categoryId: number
  categoryName: string
  productInfoFromCart: any
}

interface ProductCardProps {
  el: Product
  onAddToCart?: (id: number) => void
  onAddToWishlist?: (id: number) => void
  onQuickView?: (id: number) => void
}

export default function ProductCard({ el, onAddToCart, onAddToWishlist, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(el.id)
  }

  const handleQuickView = () => {
    onQuickView?.(el.id)
  }

  const handleAddToCart = () => {
    onAddToCart?.(el.id)
  }

  const imageUrl = `/images/${el.image}` // путь к изображению

  return (
    <Card className="group w-[400px] relative border-0 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        {/* Discount Badge */}
        {el.hasDiscount && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white">
            -{Math.round(((el.price - el.discountPrice) / el.price) * 100)}%
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleAddToWishlist}
            className="bg-white rounded-full p-2 shadow-sm transition-all hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-5 w-5", isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-600")} />
          </button>
          <button
            onClick={handleQuickView}
            className="bg-white rounded-full p-2 shadow-sm transition-all hover:scale-110"
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5 stroke-gray-600" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={imageUrl}
            alt={el.productName}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Add to Cart Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            onClick={handleAddToCart}
            className="bg-white text-gray-800 hover:bg-gray-100 shadow-md transition-transform transform translate-y-4 group-hover:translate-y-0"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-medium text-lg line-clamp-1 mt-1">{el.productName}</h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-red-500 font-bold">${el.hasDiscount ? el.discountPrice : el.price}</span>
          {el.hasDiscount && <span className="text-gray-500 line-through text-sm">${el.price}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
