import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import PopularRecipe from "@/components/PopularRecipe";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <PopularRecipe/>
    </div>
  );
}
