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
import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PDFDocument } from "pdf-lib";
import LazyPage from "@/components/LazyPage";
import { extractPdfPages } from "@/lib/pdfTools";

const PdfPreview = dynamic(() => import("@/components/PdfPreview"), {
  ssr: false,
});

const tool = {
  id: "extract",
  name: "Extract Pages",
  description: "Pull out specific pages",
};

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<{ file: File; url: string } | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const findTotalPages = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    return pdf.getPageCount();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];

    if (file?.url) URL.revokeObjectURL(file.url);

    setFile({
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    });

    setSelectedPages([]);
  };

  useEffect(() => {
    if (!file) return;

    const loadPages = async () => {
      const pages = await findTotalPages(file.file);
      setTotalPages(pages);
    };

    loadPages();
  }, [file]);

  // keep pages sorted
  const togglePage = (page: number) => {
    setSelectedPages((prev) => {
      const updated = prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page];

      return updated.sort((a, b) => a - b); // important
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
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
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
                Drop PDF To Extract Pages
              </h2>
              <p className="text-[#2f373e] text-xs">or click to browse</p>
            </CardContent>
          </Card>
        </div>

        {/* Pages Grid */}
        {file && totalPages !== null && (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isSelected = selectedPages.includes(pageNumber);

              return (
                <motion.div
                  key={pageNumber}
                  onClick={() => togglePage(pageNumber)}
                  whileHover={{
                    x: -2,
                    y: -2,
                    boxShadow: "8px 8px 0 #111",
                  }}
                  whileTap={{
                    scale: 0.96,
                    boxShadow: "2px 2px 0 #111",
                  }}
                  transition={{ duration: 0.2 }}
                  className={`relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer
                  ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-[5px_5px_0_#111]"
                      : "border-black shadow-[5px_5px_0_#111]"
                  }`}
                >
                  {/* Preview */}
                  <div
                    className={`p-2 ${
                      isSelected ? "bg-emerald-100" : "bg-gray-100"
                    }`}
                  >
                    <LazyPage url={file.url} page={pageNumber} />
                  </div>

                  {/* Page number */}
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0_#111] rounded">
                    {pageNumber}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action Button */}
        {file && selectedPages.length > 0 && (
          <motion.button
            className="mt-5 bg-emerald-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg cursor-pointer w-full md:w-auto sticky bottom-4 left-2"
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 #111",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => extractPdfPages(file.file, selectedPages)}
          >
            Extract Selected Pages ({selectedPages.length})
          </motion.button>
        )}
      </div>
    </div>
  );
}
