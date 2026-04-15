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
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { imagesToPdf } from "@/lib/pdfTools";

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

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const tool = {
  id: "images-to-pdf",
  name: "Images to PDF",
  description: "Convert images into a single PDF",
};

// Sortable Image Item
function SortableImage({ item }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative bg-white border-2 border-black rounded-xl overflow-hidden shadow-[5px_5px_0_#111] cursor-grab"
    >
      {/* Image */}
      <div className="relative w-full h-75">
        <Image src={item.url} alt="preview" fill className="object-contain" />
      </div>

      {/* Index */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black shadow rounded">
        {item.index + 1}
      </div>
    </div>
  );
}

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<
    { id: string; file: File; url: string }[]
  >([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    const mapped = selected.map((file, i) => ({
      id: `${file.name}-${Date.now()}-${i}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  // drag logic
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);

    setImages((items) => arrayMove(items, oldIndex, newIndex));
  };

  // remove image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((i) => i.id !== id);
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
        <div className="mt-5">
          <h2 className="font-bold text-xl">{tool.name}</h2>
          <p className="text-sm text-gray-500">{tool.description}</p>
        </div>

        {/* Upload */}
        <div className="mt-5">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Card
            className="cursor-pointer max-w-2xl mx-auto border-2 border-dashed border-[#32363a] shadow-[5px_5px_0_#1e1e1e]"
            onClick={() => inputRef.current?.click()}
          >
            <CardContent className="flex flex-col gap-2 items-center justify-center p-4">
              <div className="bg-emerald-300/20 p-4 rounded-full">
                <Upload className="text-emerald-400 w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#112636]">
                Upload Images
              </h2>
              <p className="text-[#2f373e] text-xs">
                Drag to reorder after upload
              </p>
            </CardContent>
          </Card>
        </div>

        {/* GRID */}
        {images.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((item, index) => (
                  <div key={item.id} className="relative">
                    <SortableImage item={{ ...item, index }} />

                    {/* remove btn */}
                    <button
                      onClick={() => removeImage(item.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 border-2 border-black shadow rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* ACTION */}
        {images.length > 0 && (
          <motion.button
            className="mt-5 bg-emerald-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg w-full md:w-auto sticky bottom-4 left-2"
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: "2px 2px 0 #111",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => imagesToPdf(images.map((i) => i.file))}
          >
            Convert to PDF ({images.length})
          </motion.button>
        )}
      </div>
    </div>
  );
}
