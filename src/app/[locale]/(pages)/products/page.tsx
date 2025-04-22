"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"
import Products from "@/widgets/products"
import { useGetBrandsQuery, useGetCategoriesQuery } from "@/store/api/categoryApiSlice"

export default function ProductListing() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  // const products = [
  //   {
  //     id: 1,
  //     name: "Breed Dry Dog Food",
  //     price: 19.99,
  //     originalPrice: null,
  //     rating: 4.5,
  //     reviews: 132,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: true,
  //     colors: [],
  //   },
  //   {
  //     id: 2,
  //     name: "CANON EOS DSLR Camera",
  //     price: 299.0,
  //     originalPrice: null,
  //     rating: 4.8,
  //     reviews: 92,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: [],
  //   },
  //   {
  //     id: 3,
  //     name: "ASUS FHD Gaming Laptop",
  //     price: 799.0,
  //     originalPrice: null,
  //     rating: 4.7,
  //     reviews: 223,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: [],
  //   },
  //   {
  //     id: 4,
  //     name: "Kids Electric Car",
  //     price: 149.0,
  //     originalPrice: 189.0,
  //     rating: 4.6,
  //     reviews: 145,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: true,
  //     colors: ["red", "blue"],
  //   },
  //   {
  //     id: 5,
  //     name: "Zoom Soccer Cleats",
  //     price: 89.0,
  //     originalPrice: null,
  //     rating: 4.4,
  //     reviews: 76,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: ["yellow", "black"],
  //   },
  //   {
  //     id: 6,
  //     name: "GP11 Shooter USB Gamepad",
  //     price: 49.0,
  //     originalPrice: 69.0,
  //     rating: 4.3,
  //     reviews: 45,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: ["black", "red"],
  //   },
  //   {
  //     id: 7,
  //     name: "Curology Product Set",
  //     price: 39.0,
  //     originalPrice: null,
  //     rating: 4.5,
  //     reviews: 145,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: [],
  //   },
  //   {
  //     id: 8,
  //     name: "Quilted Satin Jacket",
  //     price: 129.0,
  //     originalPrice: null,
  //     rating: 4.4,
  //     reviews: 32,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: ["green", "red"],
  //   },
  //   {
  //     id: 9,
  //     name: "IPS LCD Gaming Monitor",
  //     price: 319.0,
  //     originalPrice: null,
  //     rating: 4.7,
  //     reviews: 91,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: true,
  //     colors: [],
  //   },
  //   {
  //     id: 10,
  //     name: "HAVIT HV-G92 Gamepad",
  //     price: 59.0,
  //     originalPrice: null,
  //     rating: 4.6,
  //     reviews: 65,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: true,
  //     colors: [],
  //   },
  //   {
  //     id: 11,
  //     name: "AK-900 Wired Keyboard",
  //     price: 89.0,
  //     originalPrice: null,
  //     rating: 4.8,
  //     reviews: 95,
  //     image: "/placeholder.svg?height=200&width=200",
  //     sale: false,
  //     colors: [],
  //   },
  // ]

  const { data } = useGetCategoriesQuery("")




  const { data: brands } = useGetBrandsQuery("")
 

  const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"]

  const conditions = ["Any", "Refurbished", "Brand new", "Old items"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="space-y-6">
            {/* Categories */}
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-b">
                <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {data?.data?.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <label htmlFor={`category-${index}`} className="text-sm cursor-pointer">
                          {category?.categoryName}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Brands */}
            <Accordion type="single" collapsible defaultValue="brands">
              <AccordionItem value="brands" className="border-b">
                <AccordionTrigger className="text-base font-medium">Brands</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {brands?.data?.map((brand, index) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${index}`} />
                        <label htmlFor={`brand-${index}`} className="text-sm cursor-pointer">
                          {brand?.brandName}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Features */}
            <Accordion type="single" collapsible defaultValue="features">
              <AccordionItem value="features" className="border-b">
                <AccordionTrigger className="text-base font-medium">Features</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`feature-${index}`} />
                        <label htmlFor={`feature-${index}`} className="text-sm cursor-pointer">
                          {feature}
                        </label>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button variant="link" className="text-sm p-0 h-auto text-gray-500">
                        See all
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Price Range */}
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-b">
                <AccordionTrigger className="text-base font-medium">Price range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="border rounded p-2 w-20 text-center text-sm">${priceRange[0]}</div>
                      <div className="border rounded p-2 w-20 text-center text-sm">${priceRange[1]}</div>
                    </div>
                    <Button className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white">Apply</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Condition */}
            <Accordion type="single" collapsible defaultValue="condition">
              <AccordionItem value="condition" className="border-b">
                <AccordionTrigger className="text-base font-medium">Condition</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`condition-${index}`} />
                        <label htmlFor={`condition-${index}`} className="text-sm cursor-pointer">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Ratings */}
            <Accordion type="single" collapsible defaultValue="ratings">
              <AccordionItem value="ratings" className="border-b">
                <AccordionTrigger className="text-base font-medium">Ratings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                          {Array(rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          {Array(5 - rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}
