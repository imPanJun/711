"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ServicesHeader() {
  return (
    <header className="sticky top-0 z-50 bg-card px-4 pt-4 pb-3">
      {/* Title */}
      <h1 className="text-lg font-semibold text-foreground text-center mb-3">
        全部功能
      </h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="搜尋服務、活動或優惠..."
          className="w-full pl-10 pr-4 h-10 bg-muted/50 border-0 rounded-xl text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[var(--op-orange)]"
        />
      </div>
    </header>
  )
}
