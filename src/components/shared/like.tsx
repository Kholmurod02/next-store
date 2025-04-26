"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '../lib/utils'
import { Heart } from 'lucide-react'

interface Product {
  id: string | number;
  // add other product properties as needed
}

interface LikeProps {
  el: Product;
  onAddToWishlist?: (id: string | number) => void;
}

const Like: React.FC<LikeProps> = ({ el, onAddToWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  // Check if product is in wishlist on component mount
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishList") || "[]")
      const parsedWishlist = typeof wishlist === 'string' ? JSON.parse(wishlist) : wishlist
      const isInWishlist = parsedWishlist.some((item: Product) => item.id === el.id)
      setIsWishlisted(isInWishlist)
    } catch (error) {
      console.error("Error reading wishlist from localStorage:", error)
      localStorage.setItem("wishList", "[]")
    }
  }, [el.id])

  const handleAddToWishlist = () => {
    try {
      const newWishlistedState = !isWishlisted
      setIsWishlisted(newWishlistedState)
      
      // Get current wishlist
      const wishlistStr = localStorage.getItem("wishList") || "[]"
      const wishlist = JSON.parse(wishlistStr)
      
      let updatedWishlist
      
      if (newWishlistedState) {
        // Add to wishlist if not already there
        if (!wishlist.some((item: Product) => item.id === el.id)) {
          updatedWishlist = [...wishlist, el]
        }
      } else {
        // Remove from wishlist
        updatedWishlist = wishlist.filter((item: Product) => item.id !== el.id)
      }
      
      // Only update if there was a change
      if (updatedWishlist) {
        localStorage.setItem("wishList", JSON.stringify(updatedWishlist))
      }
      
      // Call callback if provided
      onAddToWishlist?.(el.id)
    } catch (error) {
      console.error("Error updating wishlist:", error)
    }
  }

  return (
    <button
      onClick={handleAddToWishlist}
      className="bg-white rounded-full p-2 shadow-sm transition-all hover:scale-110"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn(
        "h-5 w-5", 
        isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
      )} />
    </button>
  )
}

export default Like