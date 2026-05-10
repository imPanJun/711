import { ProfileHeader } from "@/components/openpoint/profile-header"
import { ProfileAssets } from "@/components/openpoint/profile-assets"
import { ProfileFeatures } from "@/components/openpoint/profile-features"
import { BottomNav } from "@/components/openpoint/bottom-nav"

export default function ProfilePage() {
  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-background">
      <div className="relative min-h-screen overflow-hidden bg-muted/30 shadow-2xl">
        <ProfileHeader />
        
        <main className="px-4 pb-24">
          <ProfileAssets />
          <ProfileFeatures />
        </main>

        <BottomNav activeTab="profile" />
      </div>
    </div>
  )
}
