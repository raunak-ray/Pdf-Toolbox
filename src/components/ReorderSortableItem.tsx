"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LazyPage from "@/components/LazyPage";

export default function SortableItem({ id, url }: { id: number; url: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
      className={`border-2 border-black rounded-lg shadow-[4px_4px_0_#111] bg-white p-2 relative touch-none
      ${isDragging ? "opacity-50 scale-95" : ""}`}
    >
      {/* Preview */}
      <div className="overflow-hidden rounded-md">
        <LazyPage url={url} page={id} />
      </div>

      {/* Page number */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0_#111] rounded">
        {id}
      </div>
    </div>
  );
}
