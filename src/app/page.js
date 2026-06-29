import Banner from "@/components/Banner";
import CommunityTestimonial from "@/components/CommunityTestimonial";
import FeaturedSection from "@/components/FeaturedSection";
import MarqueeSection from "@/components/MarqueeSection";
import PopularRecipe from "@/components/PopularRecipe";
import RecipeAboutSection from "@/components/RecipeAboutSection";
import TrendingRecipe from "@/components/TrendingRecipe";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <MarqueeSection/>
      <RecipeAboutSection/>
      <FeaturedSection />
      <PopularRecipe />
      <TrendingRecipe />
      <CommunityTestimonial/>
    </div>
  );
}
