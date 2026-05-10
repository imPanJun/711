"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coffee, Bike, Salad, Clock, ChevronRight, Percent } from "lucide-react"

const heroCards = [
  {
    id: "morning",
    title: "早八打卡挑戰",
    subtitle: "8 AM Check-in",
    icon: Coffee,
    gradient: "from-amber-400 via-orange-400 to-rose-400",
    buttonText: "Claim",
    badge: "Morning",
    hasCountdown: true,
  },
  {
    id: "foodomo",
    title: "外送揪團神器",
    subtitle: "無痛分帳賺點數",
    icon: Bike,
    gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    buttonText: "Order",
    badge: "foodomo",
    hasCountdown: false,
  },
  {
    id: "night",
    title: "i珍食雷達",
    subtitle: "i-Food Radar",
    icon: Salad,
    gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
    buttonText: "View",
    badge: "65% OFF",
    hasCountdown: false,
  },
]

export function HeroCarousel() {
  const [countdown, setCountdown] = useState("00:58:12")

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const [h, m, s] = prev.split(":").map(Number)
        let totalSeconds = h * 3600 + m * 60 + s - 1
        if (totalSeconds < 0) totalSeconds = 3492 // Reset to ~58 minutes
        const newH = Math.floor(totalSeconds / 3600)
        const newM = Math.floor((totalSeconds % 3600) / 60)
        const newS = totalSeconds % 60
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="px-4 py-3">
      <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {heroCards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.id}
              className={`min-w-[240px] flex-shrink-0 cursor-pointer border-0 bg-gradient-to-br ${card.gradient} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <CardContent className="p-4 text-white h-32 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-white/25 text-white backdrop-blur-sm border-0 text-xs mb-1">
                      {card.id === "night" && <Percent className="mr-1 h-3 w-3" />}
                      {card.badge}
                    </Badge>
                    <h3 className="text-lg font-bold leading-tight">{card.title}</h3>
                    <p className="text-xs opacity-90">{card.subtitle}</p>
                  </div>
                  <div className="rounded-full bg-white/25 p-2 backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {card.hasCountdown ? (
                    <div className="flex items-center gap-1.5 rounded-md bg-white/20 px-2 py-1 backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono text-sm font-bold">{countdown}</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <Button 
                    className="h-7 bg-white text-gray-800 hover:bg-white/90 font-semibold text-xs px-3"
                    size="sm"
                  >
                    {card.buttonText}
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
