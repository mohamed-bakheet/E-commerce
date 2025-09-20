import React from 'react'
import { getProduct } from '../action/product.action';
import ProductGrid from '@/components/product-comp/ProductGrid';

export default async function ProductsPage() {
    const response = await getProduct();

    if (!response || !response.data) {
        return <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
            <p>Error: Unable to fetch products.</p>
        </div>;
    }

    const { data: products, status, message } = response;

    if (status !== 200) {
        return <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
            <p>Error: {message}</p>
        </div>;
    }
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
        <ProductGrid products={products}/>
        </div>
  )
}
