import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const PdfPreview = dynamic(() => import("@/components/PdfPreview"), {
  ssr: false,
  loading: () => (
    <div className="h-35 flex items-center justify-center text-sm text-gray-500">
      Loading...
    </div>
  ),
});

// helper to generate stable id
const getFileId = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

export default function SortableItem({
  item,
  removeFile,
}: {
  item: { file: File; url: string };
  removeFile: (id: string) => void;
}) {
  const id = getFileId(item.file);

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
      className={`border-2 border-black rounded-lg shadow-[4px_4px_0_#111] bg-white p-2 relative touch-none ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
      {/* PDF Preview */}
      <div className="overflow-hidden w-full rounded-md cursor-grab active:cursor-grabbing">
        <PdfPreview url={item.url} rotation={0} />
      </div>

      {/* Remove Button */}
      <div
        className="absolute top-2 right-2 bg-purple-500 p-1 rounded-lg cursor-pointer border-2 border-black shadow-[2px_2px_0_#111]"
        onClick={(e) => {
          e.stopPropagation(); // prevents drag conflict
          removeFile(id);
        }}
      >
        <X className="text-white w-4 h-4" />
      </div>

      {/* File Name */}
      <p className="mt-2 text-xs font-medium text-gray-700 truncate">
        {item.file.name}
      </p>
    </div>
  );
}
