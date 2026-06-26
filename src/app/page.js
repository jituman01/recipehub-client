import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import PopularRecipe from "@/components/PopularRecipe";
import RecipeAboutSection from "@/components/RecipeAboutSection";
import TrendingRecipe from "@/components/TrendingRecipe";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <RecipeAboutSection/>
      <FeaturedSection />
      <PopularRecipe />
      <TrendingRecipe/>
    </div>
  );
}
