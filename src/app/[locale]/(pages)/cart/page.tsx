"use client"


import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useClearCartMutation, useDeleteProductFromCartMutation, useGetProductsFromCartQuery, useIncreaseProductMutation, useReduceProductMutation } from "@/store/api/cartApiSlice"
import { URL } from "@/utils/config"
import Link from "next/link"

// Type definitions based on the provided data structure
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

// interface CartItem {
//   product: Product
//   id: number
//   quantity: number
// }

// interface CartData {
//   productsInCart: CartItem[]
//   totalProducts: number
//   totalPrice: number
//   totalDiscountPrice: number
// }

// interface ShoppingCartProps {
//   data: {
//     data: CartData[]
//     errors: any[]
//     statusCode: number
//   }
// }

export default function ShoppingCartPage() {
  // Extract cart data from the provided structure
  // Safely extract cart data with fallbacks
  const { data, isLoading, error , refetch }= useGetProductsFromCartQuery()
  const [increaseProduct] = useIncreaseProductMutation()
  const [reduceProduct] = useReduceProductMutation()
  const [deleteProductFromCart] = useDeleteProductFromCartMutation()
  const [clearCart] = useClearCartMutation()
  async function deleteProductInCart(id : number) {
    try {
      await deleteProductFromCart(id).unwrap()
      refetch()
    } catch (error) {
      console.error(error);
    }
  }



  const cartData = data?.data?.[0] || []



  // const { productsInCart, totalProducts, totalPrice, totalDiscountPrice } = cartData

  // // Function to handle quantity change
  // const handleQuantityChange = (id: number, newQuantity: number) => {
  //   console.log(`Change quantity for product ${id} to ${newQuantity}`)
  //   // In a real app, you would update the state and possibly call an API
  // }

  // Function to handle remove item
  // const handleRemoveItem = (id: number) => {
  //   console.log(`Remove product ${id} from cart`)
  //   // In a real app, you would update the state and possibly call an API
  // }

  // // Function to handle remove all items
  // const handleRemoveAll = () => {
  //   console.log("Remove all products from cart")
  //   // In a real app, you would update the state and possibly call an API
  // }

  // // Function to handle apply coupon
  // const handleApplyCoupon = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const form = e.target as HTMLFormElement
  //   const couponCode = new FormData(form).get("couponCode") as string
  //   console.log(`Apply coupon: ${couponCode}`)
  //   // In a real app, you would validate the coupon and update the state
  //   form.reset()
  // }

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
        {cartData?.productsInCart?.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Your cart is empty</div>
        ) : (
          cartData?.productsInCart?.map((item: Product) => {
            return (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b">
                {/* Product info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={URL + "/images/" + item.product.image}
                      alt={item.product.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item?.product?.productName}</h3>
                    <p className="text-sm text-muted-foreground">Color: {item.product.color}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-right">
                  {item.hasDiscount ? (
                    <div>
                      {/* <span className="font-medium">${item.discountPrice}</span> */}
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${item?.product?.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium">${item.product.price}</span>
                  )}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                    onClick={() => {reduceProduct(item.id)}}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <div className="w-10 text-center text-sm">{item.quantity}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                    onClick={() => {increaseProduct(item.id)}}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                </div>

                {/* Subtotal and remove button */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <span className="font-medium">${item?.product?.price * item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                  onClick={() => deleteProductInCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Cart actions */}
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
       <Link href={"/"}>
       <Button variant="outline" className="md:w-auto">
          Return To Shop
        </Button>
       </Link>
        <div className="flex gap-2">
          <Button
          variant="outline" className="flex-1 md:flex-none">
            Update Cart
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none text-destructive hover:bg-destructive/10"
            onClick={clearCart}
          >
            Remove all
          </Button>
        </div>
      </div>

      {/* Cart summary section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coupon section */}
        <form  className="flex gap-2">
          <Input name="couponCode" placeholder="Coupon Code" className="max-w-xs" />
          <Button type="submit" variant="secondary">
            Apply
          </Button>
        </form>

        {/* Cart totals */}
        <div className="border rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Cart Total</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${cartData?.totalPrice}</span>
            </div>

            {cartData.totalPrice !== cartData.totalDiscountPrice && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span className="font-medium">-${cartData?.totalPrice - cartData?.totalDiscountPrice}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${cartData?.totalDiscountPrice}</span>
            </div>

            <Button className="w-full bg-red-500 hover:bg-red-600 mt-4">Proceed to checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
