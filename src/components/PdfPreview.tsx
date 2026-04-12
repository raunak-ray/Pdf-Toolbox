"use client";

import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PdfPreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <Document
        file={url}
        loading={
          <div className="h-35 flex items-center justify-center text-sm text-gray-500">
            Loading...
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={containerRef.current?.clientWidth ?? 250} // controls size
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}

export default PdfPreview;
