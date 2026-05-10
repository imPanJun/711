"use client"

import { 
  Circle, 
  IceCreamCone, 
  Drumstick, 
  Croissant, 
  ShoppingBag, 
  Dumbbell, 
  Building2, 
  Fuel, 
  Trophy 
} from "lucide-react"

const moreBrands = [
  { id: "misterdonut", name: "Mister Donut", icon: Circle },
  { id: "coldstone", name: "酷聖石", icon: IceCreamCone },
  { id: "21plus", name: "21Plus 烤雞", icon: Drumstick },
  { id: "semeur", name: "聖娜多堡", icon: Croissant },
  { id: "iopenmall", name: "iOPEN Mall", icon: ShoppingBag },
  { id: "beingfit", name: "BEING fit", icon: Dumbbell },
  { id: "uniustyle", name: "統一時代百貨", icon: Building2 },
  { id: "smiles", name: "速邁樂加油", icon: Fuel },
  { id: "unilions", name: "統一獅", icon: Trophy },
]

export function MoreBrands() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground mb-3">美食與生活探索</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {moreBrands.map((brand) => {
          const Icon = brand.icon
          return (
            <button
              key={brand.id}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-3 transition-all hover:bg-muted active:scale-[0.97] cursor-pointer"
            >
              <div className="rounded-xl bg-muted p-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-[11px] text-foreground font-medium text-center leading-tight line-clamp-2">
                {brand.name}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
