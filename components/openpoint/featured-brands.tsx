"use client"

import { Truck, BookOpen, Coffee, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const featuredBrands = [
  {
    id: "foodomo",
    name: "foodomo 外送",
    action: "校園免運",
    icon: Truck,
    bgColor: "bg-[var(--op-orange)]",
    lightBg: "bg-orange-50",
  },
  {
    id: "books",
    name: "博客來",
    action: "教科書79折",
    icon: BookOpen,
    bgColor: "bg-amber-500",
    lightBg: "bg-amber-50",
  },
  {
    id: "starbucks",
    name: "星巴克",
    action: "寄杯優惠",
    icon: Coffee,
    bgColor: "bg-[var(--op-green)]",
    lightBg: "bg-emerald-50",
  },
  {
    id: "cosmed",
    name: "康是美",
    action: "醫美賞點數加倍",
    icon: Heart,
    bgColor: "bg-[var(--op-blue)]",
    lightBg: "bg-blue-50",
  },
]

export function FeaturedBrands() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground mb-3">核心精選</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {featuredBrands.map((brand) => {
          const Icon = brand.icon
          return (
            <Card 
              key={brand.id}
              className={`border-0 ${brand.lightBg} cursor-pointer transition-all hover:shadow-md active:scale-[0.98]`}
            >
              <CardContent className="p-4">
                <div className={`inline-flex rounded-xl ${brand.bgColor} p-2.5 text-white mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{brand.name}</h3>
                <p className="text-xs text-muted-foreground">{brand.action}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
