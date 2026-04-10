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
  {
    name: "Security",
    description: "Protect your documents",
    tools: [
      {
        id: "protect",
        name: "Protect PDF",
        description: "Add password protection",
        icon: Shield,
        path: "/protect",
        colorClass: "bg-pink-400",
      },
      {
        id: "unlock",
        name: "Unlock PDF",
        description: "Remove password from PDF",
        icon: Unlock,
        path: "/unlock",
        colorClass: "bg-yellow-400",
      },
    ],
  },
];

export const allTools = categories.flatMap((c) => c.tools);
