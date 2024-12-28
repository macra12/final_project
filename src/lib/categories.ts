// src/lib/categories.ts
export interface Campaign {
    id: string;
    title: string;
    image: string;
    description: string;
    currentAmount: number;
    targetAmount: number;
    donorsCount: number;
    daysLeft: number;
  }
  
  export interface Category {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    activeCampaigns: number;
    totalRaised: number;
    donors: number;
    featuredCampaigns: Campaign[];
  }
  
  export const categories: Category[] = [
    {
      id: "medical",
      slug: "medical",
      name: "Medical",
      description: "Support healthcare initiatives and medical treatments",
      image: "/api/placeholder/800/400",
      activeCampaigns: 25,
      totalRaised: 500000,
      donors: 1200,
      featuredCampaigns: [
        {
          id: "1",
          title: "Children's Hospital Equipment",
          image: "/api/placeholder/400/300",
          description: "Help us provide essential medical equipment for children's care",
          currentAmount: 25000,
          targetAmount: 50000,
          donorsCount: 150,
          daysLeft: 30
        }
      ]
    },
    {
      id: "education",
      slug: "education",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/api/placeholder/800/400",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "2",
          title: "School Building Project",
          image: "/api/placeholder/400/300",
          description: "Support the construction of a new school for underprivileged children",
          currentAmount: 35000,
          targetAmount: 60000,
          donorsCount: 200,
          daysLeft: 45
        }
      ]
    }
    // Add more categories as needed
  ];
  
  export async function getCategories() {
    // In a real app, this would fetch from your API
    return categories;
  }
  
  export async function getCategory(slug: string) {
    // In a real app, this would fetch from your API
    const category = categories.find(cat => cat.slug === slug);
    if (!category) throw new Error(`Category not found: ${slug}`);
    return category;
  }
  
  export async function getCategoryContent(slug: string) {
    const category = await getCategory(slug);
    // In a real app, this would fetch additional content like campaigns
    return {
      category,
      campaigns: category.featuredCampaigns,
      relatedCategories: categories.filter(cat => cat.id !== category.id).slice(0, 3)
    };
  }