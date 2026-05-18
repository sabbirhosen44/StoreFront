import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
