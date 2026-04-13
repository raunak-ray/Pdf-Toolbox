"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PdfPreview({ url, rotation = 0 }: { url: string; rotation: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(250);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.clientWidth);
  }, []);

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
          width={width} // controls size
          scale={1}
          rotate={rotation}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}

export default PdfPreview;
