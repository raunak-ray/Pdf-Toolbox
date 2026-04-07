import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 bg-black'>
        Content
      </div>
    </main>
  )
}

export default page
