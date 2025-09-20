import { getProductDetails } from '@/app/action/product.action';
import ProductDetailsComp from '@/components/product-comp/ProductDetailsComp';
import React from 'react'

export default async function ProductDetails({params}:{params:{id:string}}) {
    const{id} = await params;
    const response = await getProductDetails(id);

if (!response || !response.data) {
  return <div className="text-center my-10">Error: Unable to fetch product details.</div>;
}

const { data: ProductDetails } = response;
   
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
        <ProductDetailsComp productDetails={ProductDetails}/>
        </div>
  )
}
