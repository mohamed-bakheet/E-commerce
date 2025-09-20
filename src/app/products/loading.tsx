import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='flex relative justify-center flex-col items-center h-screen'>
      <LoaderCircle className='animate-spin' size={200} />
      <p className='text-3xl absolute '>E-app</p>
    </div>
  )
}
