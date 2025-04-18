"use client"
import Image from "next/image"

import { Card, CardContent} from "@/components/ui/card"
import { URL } from "@/utils/config"

interface ProductCategoryProps {
  id: number
  categoryImage: string
  categoryName: string
  itemCount?: number
  description?: string
  className?: string
}

export function CategoryCard({el}: {el: ProductCategoryProps}) {
  console.log(URL);
  
  return (
    <Card className="w-[600px] h-[400px] flex flex-col">
      <div className=" aspect-[4/3] w-full">
        <Image
          src={`${URL}/images/${el.categoryImage}` || "/file.svg"}
          alt={el.categoryName}
          width={300}
          height={200}
          className="object-cover transition-all group-hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="text-2xl font-bold">{el.categoryName}</h3>
      </CardContent>
     
    </Card>
  )
}
