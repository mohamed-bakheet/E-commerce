import React from 'react'
import { getProduct } from '../action/product.action';
import ProductGrid from '@/components/product-comp/ProductGrid';

export default async function ProductsPage() {
  const{data : products} = await getProduct();
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
        <ProductGrid products={products}/>
        </div>
  )
}
