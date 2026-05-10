import { ServicesHeader } from "@/components/openpoint/services-header"
import { ServicesGrid } from "@/components/openpoint/services-grid"
import { BottomNav } from "@/components/openpoint/bottom-nav"

export default function ServicesPage() {
  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-background">
      {/* Phone Frame Simulation */}
      <div className="relative min-h-screen overflow-hidden bg-muted/30 shadow-2xl">
        <ServicesHeader />
        
        <main className="pb-24">
          <ServicesGrid />
        </main>

        <BottomNav activeTab="services" />
      </div>
    </div>
  )
}
