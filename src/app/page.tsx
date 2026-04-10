"use client";

import Navbar from '@/components/Navbar'
import { File, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

function page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 dot-pattern">
        <div className="max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 md:py-10 relative">

          {/* left circle */}
          <motion.div className='hidden md:block bg-emerald-400 rounded-full absolute left-5 top-20 w-8 h-8 shadow-[2px_2px_0px_#111] border-2 border-[#111] opacity-60'
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 0.6, y: 0}}
          transition={{duration: 0.8}}/>

          {/* right circle */}
          <motion.div className='hidden md:block bg-yellow-400 rounded-full absolute right-5 w-15 h-15 shadow-[3px_3px_0px_#111] border-2 border-[#111] opacity-90'
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 0.6, y: 0}}
          transition={{duration: 0.8}}/>

          {/* rhombus */}
          <motion.div className='hidden md:block bg-pink-400 rotate-45 absolute right-1 w-6 h-6 top-1/3 shadow-[1px_1px_0px_#111] opacity-60 border-2 border-[#111]'
          initial={{opacity: 0, y: -20, rotate: 45}}
          animate={{opacity: 0.6, y: 0, rotate: 0}}
          transition={{duration: 0.8}}/>

          <div className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-12 mt-8 md:mt-12 relative">

            {/* Badge */}
            <motion.div className="flex items-center gap-2 px-4 py-2 bg-yellow-600/90 text-white rounded-full border-2 border-black shadow-pop"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base font-bold">
                100% Secure & Free
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center font-bold text-[#202538] leading-tight"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}>
              Your All-in-One
              <span className="block text-[#975ff1]">
                PDF Toolbox
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p className="text-sm sm:text-base md:text-lg text-center text-gray-500 max-w-md md:max-w-2xl"
            initial={{opacity: 0, y: 20, }}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}>
              All the tools you need to work with PDFs — right in your browser.
              Nothing uploaded, nothing stored.
            </motion.p>

          </div>

          <motion.svg className="hidden md:block mx-auto mt-6 w-48 h-6" viewBox="0 0 200 24" fill="none">
            <motion.path 
              d="M5 12 Q 25 2 45 12 Q 65 22 85 12 Q 105 2 125 12 Q 145 22 165 12 Q 185 2 195 12" 
              stroke="#ad5ff1" 
              strokeWidth="3" 
              strokeLinecap="round" 
              fill="none" 
              initial={{pathLength: 0, opacity: 0}}
              animate={{pathLength: 1, opacity: 1}}
              transition={{duration: 1.5, ease: "easeInOut"}}
            />
          </motion.svg>

        </div>

        <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 md:py-10 relative'>
        {['hell', 'hello', 'hellop'].map((item) => (
          <Link href={"/"} key={item}>
            <motion.div
            variants={{
              hidden: {opacity: 0, y: 40},
              show: {opacity: 1, y: 0}
            }}
            whileHover={{
              rotate: -3,
              boxShadow: "8px 8px 0 #111"
            }}
            whileTap={{
              scale: 0.9
            }}
            transition={{type: "spring", stiffness: 100, damping: 10}}
            className='rounded-xl'
            >
                <Card className='border-black border-2 shadow-[5px_5px_0_#111]'>
                <CardHeader>
                  <div className='bg-pink-400 w-fit p-2 rounded-lg shadow-[3px_3px_0_#111] border-2 border-black'>
                    <File className='text-white h-5 w-5' strokeWidth={2.5} />
                  </div>
                </CardHeader>
                <CardContent>
                  <h1 className='text-black font-bold text-lg'>Merge Pdf</h1>
                  <p className='text-gray-600 text-sm font-normal '>Merge your pdf</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
        </motion.div>

        
      </div>


    </main>
  )
}

export default page;