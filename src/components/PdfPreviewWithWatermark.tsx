"use client";

import PdfPreview from "@/components/PdfPreview";

function PdfPreviewWithNumber({
  url,
  text,
  opacity = 20,
}: {
  url: string;
  text: string;
  opacity: number;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* PDF */}
      <PdfPreview url={url} rotation={0} />

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          style={{ opacity: opacity / 100 }}
          className="text-slate-600 text-5xl font-bold -rotate-45 whitespace-nowrap"
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export default PdfPreviewWithNumber;
