"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 mt-[100px] mb-[100px]">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Contact Information */}
          <div className="w-full md:w-1/3 p-6 md:p-8 bg-white border-r border-gray-100">
            <div className="space-y-8">
              {/* Call Us Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Call To Us</h3>
                </div>
                <div className="space-y-1 pl-[52px]">
                  <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
                  <p className="text-sm">Phone: +8801611112222</p>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Write To Us Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Write To US</h3>
                </div>
                <div className="space-y-1 pl-[52px]">
                  <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                  <p className="text-sm">Emails: customer@exclusive.com</p>
                  <p className="text-sm">Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="w-full md:w-2/3 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-gray-200"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-200"
                />
                <Input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-gray-200"
                />
              </div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[160px] border-gray-200"
              />
              <Button type="submit" className="w-full md:w-auto md:px-10 bg-red-500 hover:bg-red-600 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
