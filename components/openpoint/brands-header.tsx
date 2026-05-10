"use client"

import { GraduationCap, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BrandsHeader() {
  return (
    <header className="sticky top-0 z-50 bg-card">
      {/* Title */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-lg font-semibold text-foreground text-center">
          集團品牌
        </h1>
      </div>

      {/* Student Exclusive Banner */}
      <div className="px-4 pb-4">
        <Card className="border-0 bg-gradient-to-r from-[var(--op-green)] to-emerald-600 text-white overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/20 p-2.5 flex-shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-sm">學生跨界特權</h2>
                  <Badge className="bg-white/20 text-white text-[10px] px-1.5 py-0 border-0">
                    <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                    Exclusive
                  </Badge>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Starbucks: 學生憑證享第二杯半價
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  )
}
