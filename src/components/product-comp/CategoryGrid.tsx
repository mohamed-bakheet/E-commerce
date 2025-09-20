
import React from 'react'

import { Categories } from '@/app/types/category.model';
import CategoryCard from './CategoryCard';

export default function CategoryGrid({categories}:{categories: Categories[]}) {
    console.log(categories, "product grid");
  return (
    <div className="">
        <h2 className="text-center text-4xl tracking-tighter font-extrabold my-5">New Arrival</h2>
     
<CategoryCard categories={categories}/>
      
    </div>
  )
}
