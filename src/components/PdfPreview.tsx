"use client";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PdfPreview({ url }: { url: string }) {
  return (
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
        width={240} // controls size
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  );
}

export default PdfPreview;
