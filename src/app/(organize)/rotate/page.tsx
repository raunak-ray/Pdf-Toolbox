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
import { rotatePdf } from "@/lib/pdfTools";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PdfPreview = dynamic(() => import("@/components/PdfPreview"), {
  ssr: false,
  loading: () => (
    <div className="h-35 flex items-center justify-center text-sm text-gray-500">
      Loading...
    </div>
  ),
});

const tool = {
  id: "rotate",
  name: "Rotate Pages",
  description: "Rotate pages in any direction",
};

const possibleRotate = [
  { name: "0°", value: 0 },
  { name: "90°", value: 90 },
  { name: "180°", value: 180 },
  { name: "270°", value: 270 },
];

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ single file instead of array
  const [file, setFile] = useState<{ file: File; url: string } | null>(null);

  const [selectedRotation, setSelectedRotation] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selectedFile = e.target.files[0];

    // cleanup old URL
    if (file?.url) URL.revokeObjectURL(file.url);

    setFile({
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    });
  };

  return (
    <div className="flex-1 dot-pattern">
      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl px-4 py-6 mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Rotate Pdf</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
            {tool.name}
          </h2>
          <p className="text-[#8a8585] text-xs md:text-sm lg:text-md">
            {tool.description}
          </p>
        </div>

        {/* Upload */}
        <div className="mt-5">
          <input
            type="file"
            multiple={false}
            accept="application/pdf"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Card
            className="cursor-pointer max-w-2xl mx-auto border-2 border-dashed border-[#32363a] shadow-[5px_5px_0_#1e1e1e]"
            onClick={() => inputRef.current?.click()}
          >
            <CardContent className="flex flex-col gap-2 items-center justify-center p-4">
              <div className="bg-purple-300/20 p-4 rounded-full">
                <Upload className="text-purple-400 w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#112636]">
                Drop PDF To Rotate
              </h2>
              <p className="text-[#2f373e] text-xs">or click to browse</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls + Preview */}
        {file && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="grid grid-cols-4 gap-4">
              {possibleRotate.map((item) => (
                <motion.button
                  key={item.name}
                  value={item.value}
                  onClick={() => setSelectedRotation(item.value)}
                  whileHover={{
                    boxShadow: "8px 8px 0 #111",
                    x: -2,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: "2px 2px 0 #111",
                  }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    selectedRotation === item.value
                      ? "bg-purple-500 text-white hover:bg-purple-500"
                      : "bg-white/50 text-black hover:bg-yellow-500"
                  } text-lg font-bold rounded-full h-12 w-full shadow-[4px_4px_0_#111] border-2 border-black cursor-pointer`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Preview */}
            <div className="h-75 overflow-hidden rounded-md">
              {file && (
                <PdfPreview url={file.url} rotation={selectedRotation} />
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {file && (
          <motion.button
            className="mt-5 bg-purple-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg w-full md:w-auto cursor-pointer"
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 #111",
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{ duration: 0.2 }}
            onClick={() => rotatePdf(file.file, selectedRotation)}
          >
            Rotate Pdf
          </motion.button>
        )}
      </div>
    </div>
  );
}
