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
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

// dnd-kit imports
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
import SortableItem from "@/components/SortableItem";

const tool = {
  id: "merge",
  name: "Merge PDF",
  description: "Combine multiple PDFs into one",
  colorClass: "bg-purple-600",
};

// helper to generate stable id
const getFileId = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);

  // Sensors (smooth dragging)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // prevents accidental drag
      },
    }),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => getFileId(f.file) === id);
      if (removed) URL.revokeObjectURL(removed.url);

      return prev.filter((f) => getFileId(f.file) !== id);
    });
  };

  // Drag End Logic
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = files.findIndex((f) => getFileId(f.file) === active.id);

    const newIndex = files.findIndex((f) => getFileId(f.file) === over.id);

    setFiles((items) => arrayMove(items, oldIndex, newIndex));
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
              <BreadcrumbPage>Merge Pdf</BreadcrumbPage>
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
            multiple
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
                Drop PDF To Merge
              </h2>
              <p className="text-[#2f373e] text-xs">or click to browse</p>
            </CardContent>
          </Card>
        </div>

        {/* Drag + Grid */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((f) => getFileId(f.file))}
            strategy={rectSortingStrategy}
          >
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((item) => (
                <SortableItem
                  key={getFileId(item.file)}
                  item={item}
                  removeFile={removeFile}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Merge Button */}
        {files.length > 0 && (
          <button
            className="mt-5 bg-purple-500 font-bold text-white shadow-[5px_5px_0_#111] border-2 border-black px-4 py-2 rounded-lg w-full md:w-auto"
            onClick={() => mergePdf(files.map((item) => item.file))}
          >
            Merge Pdf
          </button>
        )}
      </div>
    </div>
  );
}
