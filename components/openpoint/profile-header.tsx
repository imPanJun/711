"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function ProfileHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--op-orange)] via-amber-400 to-yellow-300" />
      
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-white/10" />
      
      {/* Content */}
      <div className="relative px-4 pt-8 pb-6">
        <div className="flex items-start justify-between">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-3 border-white shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=boen" alt="周伯恩" />
              <AvatarFallback className="bg-white text-[var(--op-orange)] text-xl font-bold">周</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-white">周伯恩</h1>
              <p className="text-sm text-white/80">國立臺灣科技大學</p>
              <p className="text-xs text-white/70">B11333030</p>
            </div>
          </div>
          
          {/* Member Barcode Button */}
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
          >
            <QrCode className="h-4 w-4 mr-1.5" />
            會員條碼
          </Button>
        </div>
      </div>
    </header>
  )
}
