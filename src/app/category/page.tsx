
import React from 'react'
import { getCategories } from '../action/categories.action';
import CategoryGrid from '@/components/product-comp/CategoryGrid';


export default async function CategoryPage() {
   const{data :categories} = await getCategories();
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
        <CategoryGrid categories={categories}/>
        </div>
  )
}
 
