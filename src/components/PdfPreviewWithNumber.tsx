"use client";

import PdfPreview from "@/components/PdfPreview";

function PdfPreviewWithNumber({
  url,
  rotation,
  page = 1,
  position = "bottom-center",
}: {
  url: string;
  rotation: number;
  page?: number;
  position?: string;
}) {
  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-2 left-2";
      case "top-right":
        return "top-2 right-2";
      case "top-center":
        return "top-2 left-1/2 -translate-x-1/2";
      case "bottom-left":
        return "bottom-2 left-2";
      case "bottom-right":
        return "bottom-2 right-2";
      default:
        return "bottom-2 left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Original component (unchanged) */}
      <PdfPreview url={url} rotation={rotation} />

      {/* Overlay */}
      <div
        className={`absolute ${getPositionClass()} text-xs bg-black/60 text-white px-2 py-1 rounded pointer-events-none`}
      >
        {page}
      </div>
    </div>
  );
}

export default PdfPreviewWithNumber;
