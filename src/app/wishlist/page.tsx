import React from 'react'
import { getUserWish } from '../action/wish.action'
import WishlistComp from '@/components/Wishlist-comp/WishlistComp'

export default async function whishlistPage() {
await getUserWish()
  return (
    <div className='container text-center mx-auto my-10 max-w-9/10 h-max'>
        <h2 className='text-4xl'> Wishlist</h2>
      <WishlistComp/>
    </div>
  )
}
