"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Gift, ChevronRight } from "lucide-react"

const missions = [
  {
    id: "referral",
    title: "老拉新送泡麵",
    subtitle: "Referral Noodle Challenge",
    icon: Gift,
    color: "bg-[var(--op-orange)]",
    bgColor: "from-[var(--op-orange)]/5 to-[var(--op-orange)]/10",
    progress: 33,
    progressText: "1/3 Friends Invited",
    reward: "+1 Free Noodle Pack",
  },
]

export function MissionsRewards() {
  return (
    <section className="px-4 py-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-[var(--op-orange)]" />
        <h2 className="text-sm font-semibold text-foreground">校園任務與獎勵</h2>
      </div>

      {/* Mission Card */}
      <Card 
        className="border-0 bg-gradient-to-r from-[var(--op-orange)]/5 to-[var(--op-orange)]/10 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[var(--op-orange)] p-2.5 text-white shadow-md flex-shrink-0">
              <Gift className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-foreground text-sm">老拉新送泡麵</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Referral Noodle Challenge</p>
              
              {/* Progress */}
              <div className="space-y-1.5">
                <Progress value={33} className="h-1.5 bg-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">1/3 Friends Invited</span>
                  <Badge 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0 bg-[var(--op-orange)]/10 text-[var(--op-orange)]"
                  >
                    +1 Free Noodle Pack
                  </Badge>
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
