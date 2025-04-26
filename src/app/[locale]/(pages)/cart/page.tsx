"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  useClearCartMutation,
  useDeleteProductFromCartMutation,
  useGetProductsFromCartQuery,
  useIncreaseProductMutation,
  useReduceProductMutation
} from "@/store/api/cartApiSlice"
import { URL } from "@/utils/config"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"

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
  categoryName: string | null
  productInfoFromCart: any
}

interface CartItem {
  product: Product
  id: number
  quantity: number
}

interface CartData {
  productsInCart: CartItem[]
  totalProducts: number
  totalPrice: number
  totalDiscountPrice: number
}

export default function ShoppingCartPage() {
  const { data, isLoading, error, refetch } = useGetProductsFromCartQuery()
  const [increaseProduct] = useIncreaseProductMutation()
  const [reduceProduct] = useReduceProductMutation()
  const [deleteProductFromCart] = useDeleteProductFromCartMutation()
  const [clearCart] = useClearCartMutation()

  useEffect(() => {
    if (error) {
      toast.error("Failed to load cart items")
    }
  }, [error])

  const cartData = data?.data?.[0] as CartData || {
    productsInCart: [],
    totalProducts: 0,
    totalPrice: 0,
    totalDiscountPrice: 0
  }

  async function handleDeleteProduct(id: number) {
    try {
      await deleteProductFromCart(id).unwrap()
      toast.success("Product removed from cart")
      refetch()
    } catch (error) {
      toast.error("Failed to remove product")
      console.error(error)
    }
  }

  async function handleIncreaseProduct(id: number) {
    try {
      await increaseProduct(id).unwrap()
      refetch()
    } catch (error) {
      toast.error("Failed to update quantity")
      console.error(error)
    }
  }

  async function handleReduceProduct(id: number) {
    try {
      await reduceProduct(id).unwrap()
      refetch()
    } catch (error) {
      toast.error("Failed to update quantity")
      console.error(error)
    }
  }

  async function handleClearCart() {
    try {
      await clearCart().unwrap()
      toast.success("Cart cleared successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to clear cart")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="rounded-md border">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center border-b">
              <div className="col-span-6 flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="col-span-2 h-4 w-16 ml-auto" />
              <div className="col-span-2 flex justify-center">
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="col-span-2 h-4 w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart items table */}
      <div className="rounded-md border">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Cart items */}
        {cartData.productsInCart?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Your cart is empty
            <Link href="/" className="block mt-4">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          cartData.productsInCart?.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b">
              {/* Product info - changes to col-span-12 on mobile */}
              <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                <div className="relative h-16 w-16 min-w-[64px] overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={`${URL}/images/${item.product.image}`}
                    alt={item.product.productName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 64px, 64px"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-medium truncate">{item.product.productName}</h3>
                  <p className="text-sm text-muted-foreground">Color: {item.product.color}</p>
                </div>
              </div>

              {/* Price - stacks under product info on mobile */}
              <div className="col-span-6 md:col-span-2 flex justify-between md:justify-end items-center">
                <span className="md:hidden text-sm text-muted-foreground">Price:</span>
                {item.product.hasDiscount ? (
                  <div className="text-right">
                    <span className="font-medium">${item.product.discountPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-medium">${item.product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Quantity - stacks under price on mobile */}
              <div className="col-span-6 md:col-span-2 flex justify-between md:justify-center items-center">
                <span className="md:hidden text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => handleReduceProduct(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="w-10 text-center text-sm">{item.quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => handleIncreaseProduct(item.id)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>

              {/* Subtotal and remove button - stacks under quantity on mobile */}
              <div className="col-span-6 md:col-span-2 flex justify-between md:justify-end items-center">
                <div className="flex items-center gap-2">
                  <span className="md:hidden text-sm text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">
                    ${(item.product.hasDiscount
                      ? item.product.discountPrice * item.quantity
                      : item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDeleteProduct(item.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart actions */}
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <Link href="/">
          <Button variant="outline" className="w-full md:w-auto">
            Continue Shopping
          </Button>
        </Link>
        {cartData.productsInCart?.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 md:flex-none"
              onClick={() => refetch()}
            >
              Update Cart
            </Button>
            <Button
              variant="outline"
              className="flex-1 md:flex-none text-destructive hover:bg-destructive/10"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>

      {/* Cart summary section */}
      {cartData.productsInCart?.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coupon section */}
          <form className="flex gap-2">
            <Input
              name="couponCode"
              placeholder="Coupon Code"
              className="max-w-xs"
            />
            <Button type="button" variant="secondary">
              Apply Coupon
            </Button>
          </form>

          {/* Cart totals */}
          <div className="border rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">Cart Total</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${cartData.totalPrice.toFixed(2)}</span>
              </div>

              {cartData.totalPrice !== cartData.totalDiscountPrice && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">
                    -${(cartData.totalPrice - cartData.totalDiscountPrice).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${cartData.totalDiscountPrice.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full bg-red-500 hover:bg-red-600 mt-4">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 