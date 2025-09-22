"use client"
import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import Image from "next/image"
import { Brands } from "@/app/types/Brand.model"

export default function BrandCard({ Brands }: { Brands: Brands[] }) {
  return (
    <div className="container text-center mx-auto my-10 max-w-9/10 h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Brands?.map((brand) => (
        <Card
          key={brand._id}
          className="relative overflow-hidden group cursor-pointer"
        >
          <CardContent className="px-0">
            <div className="relative w-full h-[300px]">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 z-0">
            <h2 className="text-lg font-bold my-3">{brand.name}</h2>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
