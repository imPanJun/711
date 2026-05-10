import { BrandsHeader } from "@/components/openpoint/brands-header"
import { FeaturedBrands } from "@/components/openpoint/featured-brands"
import { MoreBrands } from "@/components/openpoint/more-brands"
import { BottomNav } from "@/components/openpoint/bottom-nav"

export default function BrandsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-background">
      <div className="relative min-h-screen overflow-hidden bg-muted/30 shadow-2xl">
        <BrandsHeader />
        
        <main className="px-4 pb-24 space-y-5">
          <FeaturedBrands />
          <MoreBrands />
        </main>

        <BottomNav activeTab="brands" />
      </div>
    </div>
  )
}
