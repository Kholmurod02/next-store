"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
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

export function CategoryCard({ el }: { el: ProductCategoryProps }) {
  return (
    <Card className="relative w-[350px] h-[450px] flex flex-col group overflow-hidden rounded-2xl bg-transparent border-none shadow-none">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card container with glass morphism effect */}
      <div className="relative h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-white/90 dark:group-hover:bg-gray-900/90">
        {/* Image container with parallax effect */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
          <Image
            src={`${URL}/images/${el.categoryImage}` || "/file.svg"}
            alt={el.categoryName}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
          />
          {/* Floating dots decoration */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {[1, 2, 3].map((i) => (
              <span 
                key={i}
                className="block w-2 h-2 rounded-full bg-white/80 group-hover:bg-primary transition-colors duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
        
        {/* Content with sliding up animation */}
        <CardContent className="p-6 flex-1 flex flex-col justify-between transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative">
              <span className="relative z-10">{el.categoryName}</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 delay-100" />
            </h3>
            {el.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                {el.description}
              </p>
            )}
          </div>
          
          {/* Animated button with floating effect */}
          <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-500 delay-200">
            {el.itemCount && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {el.itemCount} {el.itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full px-4 py-2 transition-all duration-300"
            >
              Explore
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 transform rotate-45 origin-bottom-left translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-500" />
        </div>
      </div>
    </Card>
  )
}