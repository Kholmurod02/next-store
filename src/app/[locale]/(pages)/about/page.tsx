"use client"

import { Card, CardContent } from "src/components/ui/card"
import { Building, ShoppingBag, Users, Eye, Instagram, Twitter, Linkedin } from "lucide-react"
import portrait from 'src/images/twoafricanfemales.png'
import Image from "next/image"
import image1 from '@/images/Frame874.png'
import image2 from '@/images/Frame875.png'
import image3 from '@/images/Frame876.png'
import FeaturesSection from "@/components/shared/features"

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor?: string;
  textColor?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export default function OurStorySection() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Top section - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left column - Our Story text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              Founded in 2015, Fashionista is South Asia s premier online shopping marketplace with an active presence
              in the region. Supported by a team of over 500 professionals, we have built an extensive database featuring
              10,000 sellers and 350 brands and serve 3 million+ customers across the region.
            </p>
            <p>
              Leveraging cutting-edge technology and passion for retail, we are very fast because there is diverse
              assortment of categories ranging from clothing, tech accessories.
            </p>
          </div>
        </div>

        {/* Right column - Image */}
        <div>
          <Image
            src={portrait}
            alt="Shopping experience"
            className="rounded-lg w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Statistics section - Four cards in a row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard
          icon={<Building className="h-5 w-5" />}
          value="10.5k"
          label="Orders online per site"
          bgColor="bg-white"
        />
        <StatCard
          icon={<ShoppingBag className="h-5 w-5 text-white" />}
          value="33k"
          label="Monthly products live"
          bgColor="bg-red-500"
          textColor="text-white"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value="45.5k"
          label="Customer active per year"
          bgColor="bg-white"
        />
        <StatCard 
          icon={<Eye className="h-5 w-5" />} 
          value="25k" 
          label="Average visits per site" 
          bgColor="bg-white" 
        />
      </div>

      {/* Team section - Three team members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <TeamMember name="Tom Cruise" role="Founder & Chairman" image={image1} />
        <TeamMember name="Emma Watson" role="Managing Director" image={image2} />
        <TeamMember name="Will Smith" role="Product Designer" image={image3} />
      </div>

      <FeaturesSection/>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, value, label, bgColor = "bg-white", textColor = "text-black" }: StatCardProps) {
  return (
    <Card className={`border shadow-sm ${bgColor}`}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <div className={`mb-2 ${textColor === "text-white" ? "" : "text-gray-600"}`}>{icon}</div>
        <p className={`text-xl font-bold ${textColor}`}>{value}</p>
        <p className={`text-xs ${textColor === "text-white" ? "text-white/80" : "text-gray-500"}`}>{label}</p>
      </CardContent>
    </Card>
  )
}

// Team Member Component
function TeamMember({ name, role, image }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center">
      <Image 
        src={image} 
        alt={name} 
        className="w-full h-auto p-5 aspect-square object-cover mb-4" 
        placeholder="blur"
      />
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
      <div className="flex space-x-2 mt-2">
        <Twitter className="w-4 h-4 text-gray-500 hover:text-blue-400 cursor-pointer"/>
        <Instagram className="w-4 h-4 text-gray-500 hover:text-pink-600 cursor-pointer"/>
        <Linkedin className="w-4 h-4 text-gray-500 hover:text-blue-700 cursor-pointer"/>
      </div>
    </div>
  )
}