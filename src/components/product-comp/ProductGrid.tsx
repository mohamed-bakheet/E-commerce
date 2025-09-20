import { Products } from '@/app/types/product.module'
import React from 'react'
import ProductCard from './ProductCard';

export default function ProductGrid({products}:{products: Products[]}) {
    console.log(products, "product grid");
  return (
    <div className="">
        <h2 className="text-center text-4xl tracking-tighter font-extrabold my-10">New Arrival</h2>
      <div className='grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-10'>
{products?.map((product)=><ProductCard key={product._id} product={product}/> )}
      </div>
    </div>
  )
}
