import { CategoryCard } from "@/components/category-card/categoryCard";
import Discount from "@/components/discount/discount";
import Speaker from "@/components/jbl-speaker/speaker";
import ProductCard from "@/components/product-card/productCard";
import ProductShowcase from "@/components/products-show/productsShow";
import Swiperr from "@/components/swiper/swiper";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function HomePage() {
  return (
    <>
      <section className="flex justify-between p-5">
        <ul className="flex flex-col items-center">
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
          <li>Electronics</li>
        </ul>
        <div className="w-[80%] h-[400px]">
        <Swiperr/>
        </div>
      </section>

        <Discount/>
      <section className="mt-10">
      <ProductCard el={{
        "id": 14,
        "productName": "Iphone 15",
        "image": "3ecd72ab-79c1-47ce-b369-c2be92955950.jpg",
        "color": "black",
        "price": 1500,
        "hasDiscount": true,
        "discountPrice": 1200,
        "quantity": 0,
        "productInMyCart": false,
        "categoryId": 15,
        "categoryName": "Строительство и ремонт",
        "productInfoFromCart": null
      }}/>
      </section>
      <div className="flex justify-center items-center mt-10">
      <Link href={"/products"}><Button>View All Products</Button></Link>
      </div>


      <section>
        <CategoryCard el={
          { "id": 2, "categoryImage": "0bb806eb-c150-4e05-a032-d535e759fe64.jfif", "categoryName": "Бытовая техника" }
        }/>
      </section>
      <Speaker/>

      <ProductShowcase/>

    </>
  );
}
