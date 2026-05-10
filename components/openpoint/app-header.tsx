"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, GraduationCap } from "lucide-react"

interface AppHeaderProps {
  onOPPointsClick?: () => void
  onSevenPointsClick?: () => void
  onMobilePickupClick?: () => void
}

export function AppHeader({ onOPPointsClick, onSevenPointsClick, onMobilePickupClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card px-4 pt-3 pb-0">
      {/* Top Row: Avatar and Notification */}
      <div className="flex items-center justify-between mb-3">
        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-11 w-11 border-2 border-[var(--op-orange)]">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" alt="Student" />
              <AvatarFallback className="bg-[var(--op-orange)] text-white">S</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-[var(--op-green)] p-0.5">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Hi, 披薩!</p>
            <Badge variant="secondary" className="bg-[var(--op-green)]/10 text-[var(--op-green)] text-xs font-medium">
              <GraduationCap className="mr-1 h-3 w-3" />
              台科大 Verified
            </Badge>
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--op-orange)]" />
        </button>
      </div>

      {/* Asset Dashboard Card */}
      <div className="bg-card rounded-2xl shadow-md border border-border -mx-1 px-1">
        <div className="grid grid-cols-3 divide-x divide-border">
          {/* OPENPOINT */}
          <button 
            onClick={onOPPointsClick}
            className="flex flex-col items-center py-4 hover:bg-muted/50 transition-colors rounded-l-2xl"
          >
            <span className="text-xs text-muted-foreground mb-1">OPENPOINT</span>
            <span className="text-2xl font-bold text-[var(--op-orange)]">1,250</span>
          </button>
          {/* 7-11 Points */}
          <button 
            onClick={onSevenPointsClick}
            className="flex flex-col items-center py-4 hover:bg-muted/50 transition-colors"
          >
            <span className="text-xs text-muted-foreground mb-1">小7集點卡</span>
            <span className="text-2xl font-bold text-[var(--op-green)]">5</span>
          </button>
          {/* Vouchers */}
          <button 
            onClick={onMobilePickupClick}
            className="flex flex-col items-center py-4 hover:bg-muted/50 transition-colors rounded-r-2xl"
          >
            <span className="text-xs text-muted-foreground mb-1">行動隨時取</span>
            <span className="text-2xl font-bold text-[var(--op-blue)]">12</span>
          </button>
        </div>
      </div>
    </header>
  )
}
