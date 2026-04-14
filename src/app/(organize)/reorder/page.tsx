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
import { PDFDocument } from "pdf-lib";
import { reorderPdfPages } from "@/lib/pdfTools";

// dnd-kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "@/components/ReorderSortableItem";

const tool = {
  id: "reorder",
  name: "Reorder Pages",
  description: "Drag and drop page order",
};

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<{ file: File; url: string } | null>(null);
  const [pages, setPages] = useState<number[]>([]);

  // ✅ MOBILE FRIENDLY SENSOR
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // prevents accidental drag
      },
    }),
  );

  const findTotalPages = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    return pdf.getPageCount();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];

    if (file?.url) URL.revokeObjectURL(file.url);

    const total = await findTotalPages(selectedFile);

    setFile({
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    });

    // ✅ create page order
    setPages(Array.from({ length: total }, (_, i) => i + 1));
  };

  // ✅ DRAG LOGIC
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = pages.indexOf(active.id);
    const newIndex = pages.indexOf(over.id);

    setPages((items) => arrayMove(items, oldIndex, newIndex));
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
        <div className="mt-5">
          <h2 className="font-bold text-xl">{tool.name}</h2>
          <p className="text-sm text-gray-500">{tool.description}</p>
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

        {/* GRID */}
        {file && pages.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={pages} strategy={rectSortingStrategy}>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-grab">
                {pages.map((page) => (
                  <SortableItem key={page} id={page} url={file.url} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* BUTTON */}
        {file && (
          <motion.button
            className="mt-5 bg-purple-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg cursor-pointer w-full md:w-auto sticky bottom-4 left-2"
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 #111",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reorderPdfPages(file.file, pages)}
          >
            Reorder Pages
          </motion.button>
        )}
      </div>
    </div>
  );
}
