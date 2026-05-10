"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coins, Wallet, FileText } from "lucide-react"

const assets = [
  {
    id: "points",
    icon: Coins,
    label: "OP 點數",
    value: "1,250",
    subtext: "50點將於月底到期",
    color: "text-[var(--op-orange)]",
    bgColor: "bg-[var(--op-orange)]/10",
  },
  {
    id: "icash",
    icon: Wallet,
    label: "icash 餘額",
    value: "$840",
    subtext: null,
    color: "text-[var(--op-green)]",
    bgColor: "bg-[var(--op-green)]/10",
  },
  {
    id: "invoice",
    icon: FileText,
    label: "發票日誌",
    value: "42張",
    subtext: "本期未開獎",
    color: "text-[var(--op-blue)]",
    bgColor: "bg-[var(--op-blue)]/10",
  },
]

export function ProfileAssets() {
  return (
    <div className="grid grid-cols-3 gap-2 -mt-4 relative z-10">
      {assets.map((asset) => {
        const Icon = asset.icon
        return (
          <Card 
            key={asset.id} 
            className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-3 flex flex-col items-center text-center">
              <div className={`rounded-full ${asset.bgColor} p-2 mb-2`}>
                <Icon className={`h-4 w-4 ${asset.color}`} />
              </div>
              <span className="text-[10px] text-muted-foreground mb-1">{asset.label}</span>
              <span className={`text-lg font-bold ${asset.color}`}>{asset.value}</span>
              {asset.subtext && (
                <span className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{asset.subtext}</span>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
