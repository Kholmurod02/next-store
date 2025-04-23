import { CategoryCard } from "@/components/shared/categoryCard";
import Discount from "@/components/shared/discount";
import FeaturesSection from "@/components/shared/features";
import ProductCard from "@/components/shared/productCard";
import ProductShowcase from "@/components/shared/productsShow";
import Speaker from "@/components/shared/speaker";
import Swiperr from "@/components/shared/swiper";
import { Button } from "@/components/ui/button";
import Categories, { UlCategories } from "@/widgets/categories";
import Products from "@/widgets/products";
import Link from "next/link";



export default async function HomePage() {

  return (
    <>
      <section className="flex flex-col md:flex-row justify-around p-5 mb-40 gap-4 md:gap-0">
        <div className="w-full md:w-auto">
          <UlCategories />
        </div>
        <div className="w-full md:w-[80%] h-[400px] md:h-[550px] rounded">
          <Swiperr />
        </div>
      </section>

      <Discount />

      <div className=" w-[95%] flex overflow-auto justify-between gap-5  m-auto mt-20">
        <Products />
      </div>

      <div className="flex justify-center items-center my-15">
        <Link href={"/products"}><Button>View All Products</Button></Link>
      </div>



      <Categories />


      <Speaker />

      <ProductShowcase />

      <FeaturesSection />
    </>
  );
}
