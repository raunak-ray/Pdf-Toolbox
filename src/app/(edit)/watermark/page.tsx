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
import { addWatermark } from "@/lib/pdfTools";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

const PdfPreviewWithWatermark = dynamic(
  () => import("@/components/PdfPreviewWithWatermark"),
  {
    ssr: false,
    loading: () => (
      <div className="h-35 flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    ),
  },
);

const tool = {
  id: "watermark",
  name: "Add Watermark",
  description: "Stamp text on every page",
};

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // single file instead of array
  const [file, setFile] = useState<{ file: File; url: string } | null>(null);

  const [watermarkText, setWatermarkText] = useState<string>("Confidential");

  const [opacity, setOpacity] = useState<number>(20);

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
              <BreadcrumbPage>Watermark</BreadcrumbPage>
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
                Drop PDF To Add Watermark
              </h2>
              <p className="text-[#2f373e] text-xs">or click to browse</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls + Preview */}
        {file && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="grid grid-rows-2 gap-4">
              <div className="">
                <label
                  htmlFor="text"
                  className="text-md md:text-lg font-bold text-[#112636]"
                >
                  Watermark Text:
                </label>
                <Input
                  type="text"
                  id="text"
                  name="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target?.value)}
                  className="bg-white mt-2"
                />
              </div>
              <div>
                <label
                  htmlFor="opacity"
                  className="text-[#112636] font-bold text-md md:text-lg"
                >
                  Opacity: {opacity}
                </label>
                <Input
                  type="range"
                  id="opacity"
                  min={0}
                  max={100}
                  step={5}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="p-0 bg-transparent accent-purple-500"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="h-75 overflow-hidden rounded-md">
              {file && (
                <PdfPreviewWithWatermark
                  url={file.url}
                  text={watermarkText}
                  opacity={opacity}
                />
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
            onClick={() => addWatermark(file.file, watermarkText, opacity)}
          >
            Add Watermark & Download Pdf
          </motion.button>
        )}
      </div>
    </div>
  );
}
