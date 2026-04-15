import {
  Merge,
  Scissors,
  RotateCw,
  Hash,
  Trash2,
  FileOutput,
  Droplets,
  Shield,
  Unlock,
  FileText,
  Image,
  ArrowDownUp,
} from "lucide-react";

export interface PDFTool {
  id: string;
  name: string;
  description: string;
  icon: typeof Merge;
  path: string;
  colorClass: string; // accent color class for icon bg
}

export interface ToolCategory {
  name: string;
  description: string;
  tools: PDFTool[];
}

export const categories: ToolCategory[] = [
  {
    name: "Organize",
    description: "Rearrange and manage your PDF pages",
    tools: [
      {
        id: "merge",
        name: "Merge PDF",
        description: "Combine multiple PDFs into one",
        icon: Merge,
        path: "/merge",
        colorClass: "bg-purple-400",
      },
      {
        id: "split",
        name: "Split PDF",
        description: "Split a PDF into separate files",
        icon: Scissors,
        path: "/split",
        colorClass: "bg-pink-400",
      },
      {
        id: "rotate",
        name: "Rotate Pages",
        description: "Rotate pages in any direction",
        icon: RotateCw,
        path: "/rotate",
        colorClass: "bg-yellow-400",
      },
      {
        id: "delete",
        name: "Delete Pages",
        description: "Remove unwanted pages",
        icon: Trash2,
        path: "/delete-pages",
        colorClass: "bg-red-400",
      },
      {
        id: "extract",
        name: "Extract Pages",
        description: "Pull out specific pages",
        icon: FileOutput,
        path: "/extract",
        colorClass: "bg-emerald-400",
      },
      {
        id: "reorder",
        name: "Reorder Pages",
        description: "Drag and drop page order",
        icon: ArrowDownUp,
        path: "/reorder",
        colorClass: "bg-purple-400",
      },
    ],
  },
  {
    name: "Edit",
    description: "Modify and enhance your PDFs",
    tools: [
      {
        id: "page-numbers",
        name: "Add Page Numbers",
        description: "Number your PDF pages",
        icon: Hash,
        path: "/page-numbers",
        colorClass: "bg-pink-400",
      },
      {
        id: "watermark",
        name: "Add Watermark",
        description: "Stamp text on every page",
        icon: Droplets,
        path: "/watermark",
        colorClass: "bg-yellow-400",
      },
    ],
  },
  {
    name: "Convert",
    description: "Transform between formats",
    tools: [
      {
        id: "pdf-to-text",
        name: "PDF to Text",
        description: "Extract text content",
        icon: FileText,
        path: "/pdf-to-text",
        colorClass: "bg-emerald-400",
      },
      {
        id: "images-to-pdf",
        name: "Images to PDF",
        description: "Convert images into a PDF",
        icon: Image,
        path: "/images-to-pdf",
        colorClass: "bg-purple-400",
      },
    ],
  },
];

export const allTools = categories.flatMap((c) => c.tools);

export const faqData = [
  {
    question: "Are my PDFs ever uploaded to a server?",
    answer: "Never. pdfuse is 100% client-side — your files are processed entirely within your browser using JavaScript. No data is ever sent to a server, stored in a database, or accessible by anyone. Your documents exist only on your own device."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account, no email, no sign-up of any kind. Open pdfuse and start using any tool instantly. We don't ask for personal information and we don't collect it."
  },
  {
    question: "Is pdfuse really free — with no catch?",
    answer: "Yes, genuinely. There are no premium plans, no \"free tier\" limits, no trial periods, and no paywalls anywhere on the site. Every tool is free to use as often as you need, forever."
  },
  {
    question: "How is this different from tools like ILovePDF or Smallpdf?",
    answer: "Most online PDF tools upload your file to their servers to process it — which means your documents pass through someone else's infrastructure. pdfuse processes everything locally in your browser, so your files stay on your device at all times. No upload, no risk."
  },
  {
    question: "Is there a file size limit?",
    answer: "Since processing happens in your browser, performance depends on your device's memory. Most PDFs up to a few hundred MB work fine. Very large files may be slower on older or low-memory devices."
  },
  {
    question: "Which browsers does pdfuse support?",
    answer: "pdfuse works on all modern browsers — Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
  },
  {
    question: "Can I use pdfuse on my phone or tablet?",
    answer: "Yes — pdfuse is fully responsive and works on mobile browsers. Some heavy operations are faster on desktop, but all tools are accessible on any device."
  },
  {
    question: "Do you store or share my files?",
    answer: "We have no ability to store or share your files because they never reach our servers. The entire PDF processing pipeline runs inside your browser tab. When you close the tab, your file data is gone from memory."
  }
];
