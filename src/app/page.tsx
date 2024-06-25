import AllBlogs from "@/components/shared/AllBlogs";
import FeaturedBlogs from "@/components/shared/FeaturedBlogs";
import HeroSection from "@/components/shared/HeroSection";

export const revalidate = 30;

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedBlogs />
      <AllBlogs />
    </div>
  );
}
