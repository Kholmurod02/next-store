"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, ShoppingCart, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"
import { useGetProductByIdQuery } from "@/store/api/productApiSlice"
import { URL } from "@/utils/config"

interface ProductImage {
  id: number
  images: string
}

interface User {
  userId: string
  userName: string
  fullName: string
  imageName: string
}

interface ProductInfoFromCart {
  id: number
  quantity: number
}

interface ProductData {
  id: number
  brand: string
  color: string
  productInMyCart: boolean
  images: ProductImage[]
  users: User[]
  productInfoFromCart: ProductInfoFromCart
  productName: string
  description: string
  quantity: number
  weight: string
  size: string
  code: string
  price: number
  hasDiscount: boolean
  discountPrice: number
  subCategoryId: number
}

// interface ProductDetailProps {
//   data: ProductData
// }

export default function ProductDetail() {

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { data, isLoading, error } = useGetProductByIdQuery(id)

  // Default data if none is provided
  const productData = data?.data || 
   {
    id: 14,
    brand: "Apple",
    color: "black",
    productInMyCart: false,
    images: [
      {
        id: 26,
        images: "3ecd72ab-79c1-47ce-b369-c2be92955950.jpg",
      },
      {
        id: 28,
        images: "95a1bd79-d45c-4657-92da-158f41442e53.jpg",
      },
    ],
    users: [
      {
        userId: "0015a9d6-7e39-4266-aa3c-ccf2a7d59702",
        userName: "SuperAdmin",
        fullName: "Ismoil Ismoil",
        imageName: "8533469f-5455-4d6a-aa92-56c5df05d801.webp",
      },
    ],
    productInfoFromCart: {
      id: 0,
      quantity: 0,
    },
    productName: "Iphone 15",
    description: "15pro Max",
    quantity: 0,
    weight: "300",
    size: "L",
    code: "IP-871969-411",
    price: 1500,
    hasDiscount: true,
    discountPrice: 1200,
    subCategoryId: 144,
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-background">
            <Image
              src={`${URL}/images/${productData.image}`}
              alt={productData.productName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2 hide-scrollbar">
            {productData.images.map((img, index) => (
              <button
                key={img.id}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${selectedImage === index ? "border-primary" : "border-border"
                  }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt={`${productData.productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{productData.productName}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-muted-foreground">{productData.brand}</p>
              <span className="text-sm text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">Code: {productData.code}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            {productData.hasDiscount ? (
              <>
                <h2 className="text-3xl font-bold text-primary">${productData.discountPrice.toFixed(2)}</h2>
                <span className="text-xl text-muted-foreground line-through">${productData.price.toFixed(2)}</span>
                <Badge className="bg-emerald-600 hover:bg-emerald-700">
                  {Math.round((1 - productData.discountPrice / productData.price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <h2 className="text-3xl font-bold">${productData.price.toFixed(2)}</h2>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color:</h3>
              <div className="flex gap-2">
                <button
                  className="h-8 w-8 rounded-full  ring-2 ring-primary ring-offset-2"
                  aria-label="Select black color"
                  style={{backgroundColor:productData.color}}
                />
               
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {/* {["S", "M", "L", "XL"].map((size) => (
                  <Button key={size} variant={size === productData.size ? "default" : "outline"} className="h-10 w-10">
                    {size}
                  </Button>
                ))} */}
                <Button key={productData.size} variant={productData.size === productData.size ? "default" : "outline"} className="h-10 w-10">
                    {productData?.size}
                  </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity:</h3>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center">{productData.quantity}</div>
                <Button variant="ghost" size="icon" onClick={handleIncrement} className="h-10 w-10 rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 gap-2" size="lg">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1 gap-2">
              <Heart className="h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">Enter your postal code for delivery availability</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Return Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Free 30 Days Delivery Returns. <span className="text-primary font-medium">Details</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">
                {productData.description}. The latest model from {productData.brand} featuring cutting-edge technology,
                exceptional camera quality, and all-day battery life. Experience the next generation of smartphone
                innovation with the {productData.productName}.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Brand</p>
                  <p>{productData.brand}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Weight</p>
                  <p>{productData.weight}g</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Size</p>
                  <p>{productData.size}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Color</p>
                  <p className="capitalize">{productData.color}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Code</p>
                  <p>{productData.id}</p>
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                {productData.users.map((user) => (
                  <Card key={user.userId} className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.fullName} />
                        <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">@{user.userName}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      Great product! I have been using it for a month now and I am very satisfied with the quality.
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
