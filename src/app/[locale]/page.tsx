import { CategoryCard } from "@/components/shared/categoryCard";
import Discount from "@/components/shared/discount";
import FeaturesSection from "@/components/shared/features";
import ProductCard from "@/components/shared/productCard";
import ProductShowcase from "@/components/shared/productsShow";
import Speaker from "@/components/shared/speaker";
import Swiperr from "@/components/shared/swiper";
import { Button } from "@/components/ui/button";
import Categories from "@/widgets/categories";
import Products from "@/widgets/products";
import Link from "next/link";



export default async function HomePage() {

  return (
    <>
      <section className="flex justify-between p-5 mb-40">
        <ul className="flex flex-col items-center">
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
        </ul>
        <div className="w-[80%] h-[400px]">
          <Swiperr />
        </div>
      </section>

      <Discount />
     
    <Products/>

      <div className="flex justify-center items-center mt-10">
        <Link href={"/products"}><Button>View All Products</Button></Link>
      </div>


      <Categories />

      <Speaker />
      <ProductShowcase />
      <FeaturesSection />
    </>
  );
}
