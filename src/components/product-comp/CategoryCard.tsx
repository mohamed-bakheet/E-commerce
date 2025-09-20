"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import Image from 'next/image'
import Link from 'next/link'

import { Categories } from '@/app/types/category.model'
import { getOneCategories } from '@/app/action/categories.action'

export default function CategoryCard({categories}:{categories:Categories[]}) {
  // selected category id, subcategories and loading/error state
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)
  const [subcategories, setSubcategories] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCategoryClick(categoryId:string){
    // toggle off if clicking the already open one
    if(openCategoryId === categoryId){
      setOpenCategoryId(null)
      setSubcategories(null)
      setError(null)
      return
    }

    setOpenCategoryId(categoryId)
    setLoading(true)
    setError(null)
    try {
      const response = await getOneCategories(categoryId)
      // adapt to API shape: response?.data?.data contains the subcategories per your console
      const subs = response?.data?.data ?? response?.data ?? response ?? []
      setSubcategories(subs)
    } catch (err:any) {
      console.error(err)
      setError(err?.message ?? "Failed to load subcategories")
      setSubcategories(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
       <div className='container text-center mx-auto my-10 max-w-9/10 h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {categories?.map((category) => (
          <Card
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className="relative overflow-hidden group cursor-pointer"
          >
            <CardContent className='px-0'>
              <div className="relative w-full h-[300px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  className='object-cover'
                />
              </div>
            </CardContent>

            <CardFooter className='flex flex-col gap-2 z-0'>
              <h2 className='text-lg font-bold my-3'>{category.name}</h2>
            </CardFooter>
          </Card>
          
        ))}
        </div>
         {/* Subcategories panel (simple overlay at bottom-right) */}
      {openCategoryId && (
        <div className="">
          <div className="flex items-center justify-between mb-2">

            <strong className='text-3xl font-bold'>Subcategories</strong>
            <button
              className="text-sm text-gray-600"
              onClick={() => { setOpenCategoryId(null); setSubcategories(null); setError(null) }}
            >
              Close
            </button>
          </div>

          
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && subcategories?.length === 0 && (
            <div className="text-sm text-gray-600">No subcategories found.</div>
          )}

          <div className="container text-center mx-auto my-10 max-w-9/10 h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories?.map((sub) => (

<Card
            key={sub._id}
           
            className="relative overflow-hidden group cursor-pointer"
          >
            <CardContent className='px-0'>
              <div className="relative w-full">
               <h1 className='text-2xl font-bold my-3'>{sub.name}</h1>
              </div>
            </CardContent>

           
          </Card>

              
            ))}
          </div>
        </div>
      )}
      </>

     
    
  )
}
