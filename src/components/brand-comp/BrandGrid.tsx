
import React from 'react'

import { Brands } from '@/app/types/Brand.model';
import BrandCard from './BrandCard';

export default function CategoryGrid({Brands}:{Brands: Brands[]}) {
    console.log(Brands, "product grid");
  return (
    <div className="">
        <h2 className="text-center text-4xl tracking-tighter font-extrabold my-5">All Brands</h2>
     
<BrandCard Brands={Brands}/>
      
    </div>
  )
}
