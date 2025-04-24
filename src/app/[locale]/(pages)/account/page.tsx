"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, X } from "lucide-react"
import toast from "react-hot-toast"

export default function SuperSimpleProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove selected image
  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // Add image preview to data
    if (imagePreview) {
      data.imagePreview = imagePreview
    }

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSubmitting(false)
      toast.success("Profile updated successfully!")
    }, 1000)
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    return "KH" // Default initials for "kholmurod"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg my-10">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Preview */}
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-32 h-32 border-2 border-primary/10 mb-4">
              <AvatarImage src={imagePreview || ""} alt="Profile" />
              <AvatarFallback className="text-2xl bg-primary/10">{getInitials()}</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>

              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-destructive"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              )}

              <input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: Square JPG, PNG, or GIF, at least 500x500 pixels.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Username */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input id="userName" name="userName" defaultValue="kholmurod" placeholder="Username" />
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input id="firstName" name="firstName" placeholder="First name" />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input id="lastName" name="lastName" placeholder="Last name" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input id="email" name="email" type="email" placeholder="Email address" />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input id="phoneNumber" name="phoneNumber" placeholder="Phone number" />
            </div>

            {/* Date of Birth - Simple date input */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <Input id="dob" name="dob" type="date" defaultValue="2000-01-01" />
            </div>

            {/* Role - Display Only */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="h-10 px-3 py-2 rounded-md bg-primary/10 text-primary flex items-center">User</div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-6">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button onClick={() => document.querySelector("form")?.requestSubmit()} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
