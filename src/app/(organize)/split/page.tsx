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
import { splitPdf } from "@/lib/pdfTools";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PdfPreviewSplit = dynamic(() => import("@/components/PdfPreviewSplit"), {
  ssr: false,
});

const tool = {
  name: "Split PDF",
  description: "Split a PDF into separate files",
};

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<{ file: File; url: string } | null>(null);

  const [mode, setMode] = useState<"all" | "range">("all");
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const f = e.target.files[0];

    setFile({
      file: f,
      url: URL.createObjectURL(f),
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
              <BreadcrumbPage>Split PDF</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <div className="mt-5">
          <h2 className="text-black font-bold text-xl">{tool.name}</h2>
          <p className="text-[#8a8585] text-sm">{tool.description}</p>
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
            <CardContent className="flex flex-col items-center p-4">
              <div className="bg-pink-300/20 p-4 rounded-full">
                <Upload className="text-pink-400 w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">Drop PDF To Split</h2>
              <p className="text-xs text-gray-500">or click to browse</p>
            </CardContent>
          </Card>
        </div>

        {/* Modes */}
        {file && (
          <div className="mt-6 flex gap-4 justify-start">
            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: "6px 6px 0 #111",
              }}
              transition={{ duration: 0.2 }}
              onClick={() => setMode("all")}
              className={`px-4 py-2 border-2 border-black rounded-full shadow-[4px_4px_0_#111] cursor-pointer ${
                mode === "all"
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:bg-pink-500 hover:text-white"
              }`}
            >
              Split Every Page
            </motion.button>

            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: "6px 6px 0 #111",
              }}
              transition={{ duration: 0.2 }}
              onClick={() => setMode("range")}
              className={`px-4 py-2 border-2 border-black rounded-full shadow-[4px_4px_0_#111] cursor-pointer ${
                mode === "range"
                  ? "bg-purple-500 text-white"
                  : "bg-white hover:bg-pink-500 hover:text-white"
              }`}
            >
              Custom Range
            </motion.button>
          </div>
        )}

        {/* Range Controls */}
        {/* Range Controls */}
        {file && mode === "range" && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* LEFT: Controls */}
            <div className="flex flex-col gap-4 border-2 border-black p-4 rounded-md shadow-[5px_5px_0_#111] bg-white">
              <h3 className="font-bold text-md">Select Range</h3>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs">Start Page</label>
                  <input
                    type="number"
                    value={startPage}
                    min={1}
                    onChange={(e) => setStartPage(Number(e.target.value))}
                    className="w-24 border-2 border-black px-2 py-1 shadow-[3px_3px_0_#111]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs">End Page</label>
                  <input
                    type="number"
                    value={endPage}
                    min={1}
                    onChange={(e) => setEndPage(Number(e.target.value))}
                    className="w-24 border-2 border-black px-2 py-1 shadow-[3px_3px_0_#111]"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Choose a range to split pages from your PDF
              </p>
            </div>

            {/* RIGHT: Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black rounded-md p-2 shadow-[4px_4px_0_#111] bg-white">
                <p className="text-xs mb-2 text-center font-semibold">
                  Start Page ({startPage})
                </p>
                <PdfPreviewSplit url={file.url} pageNumber={startPage} />
              </div>

              <div className="border-2 border-black rounded-md p-2 shadow-[4px_4px_0_#111] bg-white">
                <p className="text-xs mb-2 text-center font-semibold">
                  End Page ({endPage})
                </p>
                <PdfPreviewSplit url={file.url} pageNumber={endPage} />
              </div>
            </div>
          </div>
        )}

        {/* Action */}
        {file && (
          <motion.button
            className="mt-6 bg-purple-500 cursor-pointer text-white px-4 py-2 border-2 border-black shadow-[5px_5px_0_#111] rounded-lg"
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "3px 3px 0 #111",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              splitPdf(file.file, {
                mode,
                start: startPage,
                end: endPage,
              })
            }
          >
            Split PDF
          </motion.button>
        )}
      </div>
    </div>
  );
}
