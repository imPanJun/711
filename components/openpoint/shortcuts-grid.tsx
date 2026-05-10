"use client"

import { 
  Cloud, 
  Zap, 
  BatteryCharging, 
  ShoppingBag, 
  Box, 
  Utensils, 
  Ticket, 
  MoreHorizontal,
  Settings,
  Search
} from "lucide-react"

const shortcuts = [
  { icon: Cloud, label: "雲端列印", color: "bg-blue-50 text-blue-600" },
  { icon: Zap, label: "OP Fast-Pass", color: "bg-amber-50 text-amber-500", special: true },
  { icon: BatteryCharging, label: "行動電源", color: "bg-green-50 text-green-600" },
  { icon: ShoppingBag, label: "行動隨時取", color: "bg-purple-50 text-purple-600" },
  { icon: Box, label: "寄取包裹", color: "bg-rose-50 text-rose-600" },
  { icon: Utensils, label: "學餐支付", color: "bg-emerald-50 text-emerald-600" },
  { icon: Ticket, label: "兌換券", color: "bg-amber-50 text-amber-600" },
  { icon: MoreHorizontal, label: "更多", color: "bg-gray-100 text-gray-600" },
]

export function ShortcutsGrid() {
  return (
    <section className="px-4 py-3">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">我的常用功能</h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="h-3.5 w-3.5" />
          <span>/</span>
          <Search className="h-3.5 w-3.5" />
          <span>設定</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2">
        {shortcuts.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className="group flex flex-col items-center gap-1.5 rounded-xl bg-card p-2.5 transition-all hover:bg-muted hover:shadow-sm active:scale-95"
            >
              <div className={`rounded-xl ${item.color} p-2.5 transition-transform group-hover:scale-110`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-foreground leading-tight text-center">{item.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
