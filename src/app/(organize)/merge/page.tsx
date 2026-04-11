"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {motion} from "framer-motion";
import { Merge, Upload } from "lucide-react";
import { useRef } from "react";

const tool = {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one",
    colorClass: "bg-purple-600",
}

function page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className='flex-1 dot-pattern'>
      <div className='max-w-lg md:max-w-2xl lg:max-w-5xl px-4 py-6 mx-auto'>
        <motion.div
        initial={{opacity: 0, x:-20}}
        animate={{opacity: 1, x:0}}
        transition={{duration: 0.5}}
        >
            <Breadcrumb>
                <BreadcrumbList className="">
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Merge Pdf</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>

        <motion.div
        className="mt-5 flex flex-col gap-2 items-start justify-center">
            
                <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl">{tool.name}</h2>
                <p className="text-[#8a8585] text-xs md:text-sm lg:text-md">{tool.description}</p>
            
        </motion.div>

        <motion.div
        whileTap={{
            scale: 0.95
        }}
        transition={{duration: 0.5}}
        className="mt-5">
            <input type="file" name="file" id="file" multiple accept="application/pdf" ref={inputRef} className="hidden"/>
            <Card className="cursor-pointer max-w-2xl mx-auto border-2 border-dashed border-[#32363a] shadow-[5px_5px_0_#1e1e1e]">
                <CardContent className="flex flex-col gap-2 items-center justify-center"
                onClick={() => inputRef.current?.click()}>
                    <div className="bg-purple-300/20 p-4 rounded-full">
                        <Upload className="text-purple-400 w-5 h-5" strokeWidth={2.5}/>
                    </div>
                    <h2 className="text-lg md:text-xl lg:text-xl font-bold text-[#112636]">Drop PDF To Merge</h2>
                    <p className="text-[#2f373e] text-xs md:text-sm lg:text-md">or click to browse</p>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default page
