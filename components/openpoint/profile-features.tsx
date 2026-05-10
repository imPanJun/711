"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Wand2, 
  Gift, 
  Receipt, 
  CreditCard, 
  ArrowRightLeft, 
  Ticket, 
  HelpCircle, 
  Settings,
  ChevronRight
} from "lucide-react"

const featureGroups = [
  {
    title: "校園專屬特權",
    items: [
      { 
        icon: Wand2, 
        label: "校園許願池", 
        tagline: "許願校內門市進貨商品",
        color: "text-purple-500",
        bgColor: "bg-purple-50"
      },
      { 
        icon: Gift, 
        label: "學生優惠懶人包", 
        tagline: null,
        color: "text-[var(--op-orange)]",
        bgColor: "bg-[var(--op-orange)]/10"
      },
    ],
  },
  {
    title: "錢包與交易",
    items: [
      { 
        icon: Receipt, 
        label: "交易紀錄", 
        tagline: null,
        color: "text-gray-600",
        bgColor: "bg-gray-100"
      },
      { 
        icon: CreditCard, 
        label: "icash 管理", 
        tagline: null,
        color: "text-[var(--op-green)]",
        bgColor: "bg-[var(--op-green)]/10"
      },
      { 
        icon: ArrowRightLeft, 
        label: "點數轉贈", 
        tagline: null,
        color: "text-blue-500",
        bgColor: "bg-blue-50"
      },
    ],
  },
  {
    title: "服務與設定",
    items: [
      { 
        icon: Ticket, 
        label: "序號兌換", 
        tagline: null,
        color: "text-amber-500",
        bgColor: "bg-amber-50"
      },
      { 
        icon: HelpCircle, 
        label: "FAQ 常見問題", 
        tagline: null,
        color: "text-cyan-500",
        bgColor: "bg-cyan-50"
      },
      { 
        icon: Settings, 
        label: "系統設定", 
        tagline: null,
        color: "text-gray-500",
        bgColor: "bg-gray-100"
      },
    ],
  },
]

export function ProfileFeatures() {
  const handleClick = (label: string) => {
    alert(`已點擊: ${label}`)
  }

  return (
    <div className="mt-4 space-y-4">
      {featureGroups.map((group) => (
        <Card key={group.title} className="border-0 shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold text-foreground">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item.label)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors active:bg-muted"
                  >
                    <div className={`rounded-lg ${item.bgColor} p-2`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      {item.tagline && (
                        <p className="text-xs text-muted-foreground truncate">{item.tagline}</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
