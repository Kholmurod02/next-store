"use client"
import Image from "next/image"

import { Card, CardContent} from "@/components/ui/card"
import { URL } from "@/utils/config"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

interface ProductCategoryProps {
  id: number
  categoryImage: string
  categoryName: string
  itemCount?: number
  description?: string
  className?: string
}

export function CategoryCard({el}: {el: ProductCategoryProps}) {
  
  return (
    <Card className="w-[400px] h-[500px] flex flex-col group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
  <div className="relative aspect-[4/3] w-full overflow-hidden">
    <Image
      src={`${URL}/images/${el.categoryImage}` || "/file.svg"}
      alt={el.categoryName}
      width={400}
      height={300}
      className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
  
  <CardContent className="p-6 flex-1 flex flex-col justify-between">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {el.categoryName}
      </h3>
        </div>
  </CardContent>
</Card>
  )
}
