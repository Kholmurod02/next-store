"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button" 
import jblSpeaker from "@/images/JBL_BOOMBOX.png"

export default function Speaker() {
  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Simple countdown logic
        let newSeconds = prev.seconds - 1
        let newMinutes = prev.minutes
        let newHours = prev.hours
        let newDays = prev.days

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        if (newDays < 0) {
          // Reset or stop timer when it reaches zero
          return { hours: 0, days: 0, minutes: 0, seconds: 0 }
        }

        return {
          hours: newHours,
          days: newDays,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center justify-around w-full min-h-screen bg-black text-white p-6 md:p-12 overflow-hidden">
      <div className="w-full md:w-1/2 space-y-6 md:space-y-10 z-10">
        <div>
          <p className="text-green-500 font-medium">Categories</p>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Enhance Your
            <br />
            Music Experience
          </h1>

          {/* Countdown timer UI */}
          <div className="flex flex-wrap gap-4 my-8">
            <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-xs">Hours</span>
            </div>
            <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-xs">Days</span>
            </div>
            <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-xs">Minutes</span>
            </div>
            <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-xs">Seconds</span>
            </div>
          </div>

          <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-6 h-auto rounded-md">
            Buy Now!
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-center mt-10 md:mt-0">
        <Image
          src={jblSpeaker}
          alt="JBL Boombox Speaker"
          width={600}
          height={400}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
