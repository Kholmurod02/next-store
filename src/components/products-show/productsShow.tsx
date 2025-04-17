import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ps from "@/images/ps5slim.png"
import hatt from "@/images/womanhat.png"
import parfume from "@/images/parfume.png"
import speakers from "@/images/amazonecho.png"

export default function ProductShowcase() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PlayStation 5 Card - Large */}
        <Card className="bg-black text-white overflow-hidden">
          <CardContent className="p-0 relative h-[400px] flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <Image
                src={ps}
                alt="PlayStation 5"
                fill
                className="object-cover"
                priority
                
              />
            </div>
            <div className="relative z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-3xl font-bold mb-2">PlayStation 5</h2>
              <p className="text-sm text-gray-300 mb-4">Black and White version of the PS5 coming out on sale.</p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Stacked Cards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Women's Collections Card */}
          <Card className="bg-black text-white overflow-hidden">
            <CardContent className="p-0 relative h-[200px] flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image
                  src={hatt}
                  alt="Women's Collections"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold mb-1">Women s Collections</h2>
                <p className="text-sm text-gray-300 mb-3">Featured woman collections that give you another vibe.</p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Row - Two Cards Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Speakers Card */}
            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-0 relative h-[180px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                  <Image src={speakers} alt="Speakers" fill className="object-cover" priority />
                </div>
                <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-xl font-bold mb-1">Speakers</h2>
                  <p className="text-xs text-gray-300 mb-2">Amazon wireless speakers</p>
                </div>
              </CardContent>
            </Card>

            {/* Perfume Card */}
            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-0 relative h-[180px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                  <Image src={parfume} alt="Perfume" fill className="object-cover" priority />
                </div>
                <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-xl font-bold mb-1">Perfume</h2>
                  <p className="text-xs text-gray-300 mb-2">GUCCI INTENSE OUD EDP</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
