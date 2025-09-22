import React from "react"
import { getBrands } from "../action/brands.action"
import BrandCard from "@/components/brand-comp/BrandCard"


export default async function BrandsPage() {
  // fetch brands from your action
  const { data: Brands } = await getBrands()

  return (
    <div className="container text-center mx-auto my-10 max-w-9/10 h-max">
      <BrandCard Brands={Brands} />
    </div>
  )
}
