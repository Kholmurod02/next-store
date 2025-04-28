import { CategoryCard } from "@/components/shared/categoryCard";
import Discount from "@/components/shared/discount";
import FeaturesSection from "@/components/shared/features";
import ProductCard from "@/components/shared/productCard";
import ProductShowcase from "@/components/shared/productsShow";
import Speaker from "@/components/shared/speaker";
import Swiperr from "@/components/shared/swiper";
import { Button } from "@/components/ui/button";
import Categories, { UlCategories } from "@/widgets/categories";
import Products, { ProductsInSwiper } from "@/widgets/products";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main>
      {/* Hero Section with Categories and Slider */}
      <section className="flex flex-col md:flex-row justify-around p-5 mb-40 gap-4 md:gap-0">
        <div className="w-full md:w-auto">
          <UlCategories />
        </div>
        <div className="w-full md:w-[80%] h-[400px] md:h-[550px] rounded">
          <Swiperr />
        </div>
      </section>

      {/* Discount Banner */}
      <Discount />

      {/* Featured Products */}
      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <ProductsInSwiper />
        
        <div className="flex justify-center items-center mt-10">
          <Link href="/products">
            <Button variant="outline" className="px-8 py-4 text-lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Categories */}
      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <Categories />
      </section>

      {/* Speaker Promotion */}
      <Speaker />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Features Section */}
      <FeaturesSection />
    </main>
  );
}