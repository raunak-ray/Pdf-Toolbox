import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 dot-pattern'>
        <div className='max-w-lg md:max-w-2xl lg:max-w-4xl px-4 py-3  mx-auto'>
          hello
        </div>
      </div>
    </main>
  )
}

export default page
