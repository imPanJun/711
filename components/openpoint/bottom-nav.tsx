"use client"

import Link from "next/link"
import { Home, LayoutGrid, QrCode, Store, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "首頁", id: "home", href: "/" },
  { icon: LayoutGrid, label: "全部功能", id: "services", href: "/services" },
  { icon: QrCode, label: "掃碼結帳", id: "pay", isCenter: true, href: "#" },
  { icon: Store, label: "集團品牌", id: "brands", href: "/brands" },
  { icon: User, label: "會員中心", id: "profile", href: "/profile" },
]

interface BottomNavProps {
  activeTab?: string
  onPayClick?: () => void
}

export function BottomNav({ activeTab = "home", onPayClick }: BottomNavProps) {
  const active = activeTab

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[400px] -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={onPayClick}
                className="group relative -mt-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--op-orange)] to-[#e05a10] text-white shadow-lg transition-all hover:shadow-xl active:scale-95">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-1 block text-center text-[10px] font-medium text-muted-foreground">
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                isActive 
                  ? "text-[var(--op-orange)]" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`relative rounded-lg p-1.5 transition-all ${
                isActive ? "bg-[var(--op-orange)]/10" : "group-hover:bg-muted"
              }`}>
                <Icon className="h-5 w-5" />
                {isActive && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--op-orange)]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  )
}
