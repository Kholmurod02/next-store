"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star } from "lucide-react"
import { useGetBrandsQuery, useGetCategoriesQuery } from "@/store/api/categoryApiSlice"
import { useGetFilterProductsQuery } from "@/store/api/productApiSlice"
import ProductCard from "@/components/shared/productCard"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ProductListing() {
  const [priceRange, setPriceRange] = useState([1, 100000])
  const [categoryId, setCategoryId] = useState("")
  const [brandId, setBrandId] = useState("")
  const params = {
    MinPrice: priceRange[0],
    MaxPrice: priceRange[1],
    BrandId: brandId,
    CategoryId: categoryId
  }

  console.log(categoryId);
  console.log(brandId);

  const { data: filteredProducts } = useGetFilterProductsQuery(params)

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
                    <RadioGroup
                      value={categoryId}
                      onValueChange={(value) => setCategoryId(value)}
                    >
                      {data?.data?.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={category.id.toString()}
                            id={`category-${category.id}`}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {category?.categoryName}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Brands */}
            <Accordion type="single" collapsible defaultValue="brands">
              <AccordionItem value="brands" className="border-b">
                <AccordionTrigger className="text-base font-medium">Brands</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup onValueChange={(value) => setBrandId(value)} className="space-y-2">
                    {brands?.data?.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={brand.id} id={`brand-${brand.id}`} />
                        <label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                          {brand?.brandName}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
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
                      defaultValue={[1, 100000]}
                      max={1000000}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
            {
              filteredProducts?.data?.products?.map((el) => {
                return (
                  <ProductCard el={el} key={el.id} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
