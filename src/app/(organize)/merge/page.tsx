"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { mergePdf } from "@/lib/pdfTools";
import { motion, Reorder } from "framer-motion";
import { ClosedCaption, Cross, Merge, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const tool = {
  id: "merge",
  name: "Merge PDF",
  description: "Combine multiple PDFs into one",
  colorClass: "bg-purple-600",
};

function page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Store object URLs instead of raw File objects
const [files, setFiles] = useState<{ file: File; url: string }[]>([]);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const newFiles = Array.from(e.target.files).map((file) => ({
    file,
    url: URL.createObjectURL(file), // stable, won't get detached
  }));
  setFiles((prev) => [...prev, ...newFiles]);
};

const removeFile = (key: string) => {
  setFiles((prev) => {
    const removed = prev.find(
      ({ file }) => `${file.name}-${file.size}-${file.lastModified}` === key
    );
    if (removed) URL.revokeObjectURL(removed.url);
    return prev.filter(({ file }) => `${file.name}-${file.size}-${file.lastModified}` !== key);
  });
};
console.log(files)
  return (
    <div className="flex-1 dot-pattern">
      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl px-4 py-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb>
            <BreadcrumbList className="">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Merge Pdf</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <motion.div className="mt-5 flex flex-col gap-2 items-start justify-center">
          <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
            {tool.name}
          </h2>
          <p className="text-[#8a8585] text-xs md:text-sm lg:text-md">
            {tool.description}
          </p>
        </motion.div>

        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          transition={{ duration: 0.5 }}
          className="mt-5"
        >
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="application/pdf"
            ref={inputRef}
            className="hidden"
            onChange={(e) => handleFileChange(e)}
          />
          <Card className="cursor-pointer max-w-2xl mx-auto border-2 border-dashed border-[#32363a] shadow-[5px_5px_0_#1e1e1e]">
            <CardContent
              className="flex flex-col gap-2 items-center justify-center p-4"
              onClick={() => inputRef.current?.click()}
            >
              <div className="bg-purple-300/20 p-4 rounded-full">
                <Upload className="text-purple-400 w-5 h-5" strokeWidth={2.5} />
              </div>
              <h2 className="text-lg md:text-xl lg:text-xl font-bold text-[#112636]">
                Drop PDF To Merge
              </h2>
              <p className="text-[#2f373e] text-xs md:text-sm lg:text-md">
                or click to browse
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Reorder.Group
          values={files}
          axis="x"
          onReorder={setFiles}
          className="mt-8 flex flex-wrap gap-4"
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
        >
          {files.map((item) => {
            const fileKey = `${item.file.name}-${item.file.size}-${item.file.lastModified}`
            
            return(
            <Reorder.Item
              value={item}
              key={fileKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                rotate: -2,
                boxShadow: "6px 6px 0 #111",
              }}
              transition={{ duration: 0.3 }}
              className="border-2 border-black rounded-lg shadow-[4px_4px_0_#111] bg-white p-2 relative"
            >
              {/* PDF Preview */}
              <div className="overflow-hidden rounded-md">
                <Document
                  file={item.url}
                  loading={
                    <div className="h-35 flex items-center justify-center text-sm text-gray-500">
                      Loading...
                    </div>
                  }
                >
                  <Page
                    pageNumber={1}
                    width={240} // controls size
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>

              <div className="absolute top-2 right-5 bg-purple-500 p-1 rounded-lg cursor-pointer border-2 border-black shadow-[2px_2px_0_#111]" onClick={() => removeFile(fileKey)}>
                <X className="text-white w-4 h-4" strokeWidth={2}/>
              </div>

              {/* File Name */}
              <p className="mt-2 text-xs font-medium text-gray-700 truncate">
                {item.file.name}
              </p>
            </Reorder.Item>
          )})}
        </Reorder.Group>

        {files.length > 0 && (
          <motion.button 
          className="mt-5 bg-purple-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg
          text-sm md:text-md lg:text-lg w-full md:w-auto cursor-pointer"
          whileTap={{
            scale: 0.95
          }}
          whileHover={{
            boxShadow: "6px 6px 0 #111",
            scale: 1.01,
            y: -5
          }}
          transition={{duration: 0.2}}
          onClick={() => mergePdf(files.flatMap((item) => item.file))}>
            Merge Pdf
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default page;
