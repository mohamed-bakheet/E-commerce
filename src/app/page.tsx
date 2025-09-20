
import MainSliders from "@/components/sliders-comp/Main-sliders";
import Image from "next/image";
import { getCategories } from "./action/categories.action";
import CatSliderComp from "@/components/sliders-comp/CatSliderComp";
import { getProduct } from "./action/product.action";
import ProductGrid from "@/components/product-comp/ProductGrid";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {

const session = await getServerSession(options);
console.log(session , "session in home page");
//if (!session) {
//return <div className="text-center my-10">Please login to see the products</div>
//}

  const response = await getCategories();

  const data = response?.data;
  const{data : products} = await getProduct();
  
  return (
    <>
    
    <MainSliders/>
     <div className='my-5'>
      <CatSliderComp categories={data}/>
    </div>
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
    <ProductGrid products={products}/>
    </div>
    </>
  );
}
