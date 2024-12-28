import { Suspense } from "react";
import Image from "next/image";
import { Heart, Home, Users, PackageOpen } from "lucide-react";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CampaignGrid } from "@/components/category/CampaignGrid";
import { getDisasterReliefData } from "@/lib/data/categories";

export default async function DisasterReliefPage() {
  const data = await getDisasterReliefData();

  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero 
        title="Disaster Relief Campaigns"
        description="Provide immediate support to communities affected by natural disasters. Your help can make a crucial difference in times of crisis."
        imageUrl="/images/disaster-relief-hero.jpg"
        theme="red"
        stats={[
          { label: "People Helped", value: "50K+" },
          { label: "Active Projects", value: "15+" },
          { label: "Funds Raised", value: "$5M+" }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-lg bg-red-50">
            <Home className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <div className="text-gray-600">Families Sheltered</div>
          </div>
          {/* Add more impact stats */}
        </div>
      </section>

      <Suspense fallback={<div>Loading campaigns...</div>}>
        <CampaignGrid campaigns={data.campaigns} theme="red" />
      </Suspense>
    </main>
  );
}