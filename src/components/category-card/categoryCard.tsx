import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/components/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card className={cn("overflow-hidden group relative w-[400px]")}>
      {/* <div className="absolute top-3 right-3 z-10">
        <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium px-3 py-1 rounded-full">
           items
        </Badge>
      </div> */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={`/images/${el.categoryImage}`}
          alt={el.categoryName}
          fill
          className="object-cover transition-all group-hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="text-2xl font-bold">{el.categoryName}</h3>
        {/* <p className="text-muted-foreground mt-1">{description}</p> */}
      </CardContent>
      {/* <CardFooter className="p-5 pt-0">
        <Link href={`/category/${el.id}`} className="flex items-center text-gray-700 font-medium hover:text-gray-900">
          Browse Now <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter> */}
    </Card>
  )
}
