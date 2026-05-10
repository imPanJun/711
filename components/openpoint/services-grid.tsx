"use client"

import { 
  Utensils, 
  MapPin, 
  Cloud, 
  BatteryCharging,
  Box,
  Package,
  ShoppingBag,
  Ticket,
  Zap,
  Gift,
  BadgePercent,
  Receipt,
  Heart,
  Users
} from "lucide-react"

interface ServiceItem {
  icon: typeof Utensils
  label: string
  color: string
}

interface ServiceSection {
  title: string
  items: ServiceItem[]
}

const serviceSections: ServiceSection[] = [
  {
    title: "校園與生活",
    items: [
      { icon: Utensils, label: "icash Pay 學餐付款", color: "bg-emerald-50 text-emerald-600" },
      { icon: MapPin, label: "i地圖 / i珍食", color: "bg-rose-50 text-rose-600" },
      { icon: Cloud, label: "雲端無感列印", color: "bg-blue-50 text-blue-600" },
      { icon: BatteryCharging, label: "行動電源借還", color: "bg-green-50 text-green-600" },
    ]
  },
  {
    title: "寄取與購物",
    items: [
      { icon: Box, label: "寄取包裹", color: "bg-amber-50 text-amber-600" },
      { icon: Package, label: "賣貨便", color: "bg-orange-50 text-orange-600" },
      { icon: ShoppingBag, label: "行動隨時取", color: "bg-purple-50 text-purple-600" },
      { icon: Ticket, label: "售票系統", color: "bg-pink-50 text-pink-600" },
    ]
  },
  {
    title: "特權與回饋",
    items: [
      { icon: Zap, label: "OP Fast-Pass 極速專用道", color: "bg-yellow-50 text-yellow-600" },
      { icon: Gift, label: "自選回饋機制", color: "bg-indigo-50 text-indigo-600" },
      { icon: BadgePercent, label: "兌換券 / 小7集點卡", color: "bg-teal-50 text-teal-600" },
    ]
  },
  {
    title: "發票與社群",
    items: [
      { icon: Receipt, label: "發票日誌", color: "bg-slate-100 text-slate-600" },
      { icon: Heart, label: "校友微捐款", color: "bg-red-50 text-red-600" },
      { icon: Users, label: "老拉新活動", color: "bg-cyan-50 text-cyan-600" },
    ]
  }
]

export function ServicesGrid() {
  return (
    <div className="px-4 py-2 space-y-5">
      {serviceSections.map((section, sectionIndex) => (
        <section key={sectionIndex}>
          {/* Section Title */}
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {section.title}
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-2">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon
              return (
                <button
                  key={itemIndex}
                  className="group flex flex-col items-center gap-2 rounded-xl bg-card p-3 transition-all hover:bg-muted hover:shadow-sm active:scale-95"
                >
                  <div className={`rounded-xl ${item.color} p-3 transition-transform group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-medium text-foreground leading-tight text-center line-clamp-2">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
