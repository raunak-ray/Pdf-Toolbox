import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

function downloadAsPdf(blob: Uint8Array, fileName: string) {
  const blobUrl = URL.createObjectURL(
    new Blob([blob as BlobPart], { type: "application/pdf" }),
  );
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(blobUrl);
}

export async function mergePdf(files: File[]) {
  if (files.length === 0) return;

  const mergedDocument = await PDFDocument.create();

  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = await PDFDocument.load(fileBuffer, {
      ignoreEncryption: true,
    });

    const copiedPages = await mergedDocument.copyPages(
      fileBytes,
      fileBytes.getPageIndices(),
    );

    copiedPages.forEach((page) => {
      mergedDocument.addPage(page);
    });
  }

  const mergedBytes: Uint8Array = await mergedDocument.save();

  downloadAsPdf(mergedBytes, "Merged.pdf");
}

export async function rotatePdf(file: File, rotation: number) {
  const pdfBuffer = await file.arrayBuffer();
  const pdfBytes = await PDFDocument.load(pdfBuffer);

  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(
    pdfBytes,
    pdfBytes.getPageIndices(),
  );

  copiedPages.forEach((page) => {
    page.setRotation(degrees(rotation));
    newPdf.addPage(page);
  });

  const newPdfByte: Uint8Array = await newPdf.save();

  downloadAsPdf(newPdfByte, `${file.name.split(".")[0]}_rotated.pdf`);
}

export async function addPageNumbers(file: File, position: string) {
  const pdfBuffer = await file.arrayBuffer();
  const pdfBytes = await PDFDocument.load(pdfBuffer);

  const newPdf = await PDFDocument.create();
  const font = await newPdf.embedFont(StandardFonts.Helvetica);

  const copiedPages = await newPdf.copyPages(
    pdfBytes,
    pdfBytes.getPageIndices(),
  );

  copiedPages.forEach((page, index) => {
    const { width, height } = page.getSize();

    const text = `${index + 1}`;

    const fontSize = 12;

    let x = 0,
      y = 0;

    switch (position) {
      case "top-left":
        x = 20;
        y = height - 20;
        break;
      case "top-center":
        x = width / 2;
        y = height - 20;
        break;
      case "top-right":
        x = width - 40;
        y = height - 20;
        break;
      case "bottom-left":
        x = 20;
        y = 20;
        break;
      case "bottom-center":
        x = width / 2;
        y = 20;
        break;
      case "bottom-right":
        x = width - 40;
        y = 20;
        break;
      default:
        x = width / 2;
        y = 20;
    }

    page.drawText(text, {
      font,
      x,
      y,
      color: rgb(0, 0, 0),
      size: fontSize,
    });
    newPdf.addPage(page);
  });

  const newPdfBuffer: Uint8Array = await newPdf.save();

  downloadAsPdf(newPdfBuffer, `${file.name.split(".")[0]}.pdf`);
}

export async function addWatermark(
  file: File,
  text = "Confidential",
  opacity = 20,
) {
  const pdfBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const newPdf = await PDFDocument.create();
  const font = await newPdf.embedFont(StandardFonts.Helvetica);

  const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

  pages.forEach((page) => {
    const { width, height } = page.getSize();

    // ✅ Better responsive font size
    const fontSize = Math.min(width, height) * 0.12;

    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    // ✅ TRUE center (anchor fix for rotation)
    const centerX = width / 2;
    const centerY = height / 2;

    const x = centerX - textWidth / 2;
    const y = centerY - textHeight / 2;

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.65, 0.65, 0.65),
      rotate: degrees(45), // best visual balance
      opacity: opacity / 100,
    });

    newPdf.addPage(page);
  });

  const pdfBytes = await newPdf.save();

  downloadAsPdf(pdfBytes, `${file.name.split(".")[0]}_watermarked.pdf`);
}

export async function splitPdf(
  file: File,
  options: { mode: "all" | "range"; start?: number; end?: number },
) {
  const pdfBuffer = await file.arrayBuffer();
  const pdfBytes = await PDFDocument.load(pdfBuffer);

  const totalPages = pdfBytes.getPageCount();

  if (options.mode === "all") {
    for (let i = 0; i <= totalPages; i++) {
      const newPdf = await PDFDocument.create();

      const [page] = await newPdf.copyPages(pdfBytes, [i]);
      newPdf.addPage(page);

      const bytes: Uint8Array = await newPdf.save();

      downloadAsPdf(bytes, `${file.name.split(".")[0]}_page_${i + 1}.pdf`);
    }

    return;
  }

  if (options.mode === "range") {
    let start = options.start || 1;
    let end = options.end || 1;

    if (start > end) {
      [start, end] = [end, start];
    }

    if (start < 1) start = 1;
    if (end > totalPages) end = totalPages;

    const newPdf = await PDFDocument.create();

    const pageIndices = [];

    for (let i = start - 1; i < end; i++) pageIndices.push(i);

    const pages = await newPdf.copyPages(pdfBytes, pageIndices);

    pages.forEach((page) => newPdf.addPage(page));

    const bytes: Uint8Array = await newPdf.save();

    downloadAsPdf(
      bytes,
      `${file.name.split(".")[0]}_page_${start}_to_${end}.pdf`,
    );
  }
}

export async function deletePdfPages(file: File, pagesToDelete: number[]) {
  const pdfBuffer = await file.arrayBuffer();
  const pdfBytes = await PDFDocument.load(pdfBuffer);

  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(pdfBytes, pdfBytes.getPageIndices());

  pages.forEach((page, index) => {
    if (!pagesToDelete.includes(index + 1)) {
      newPdf.addPage(page);
    }
  });

  const bytes: Uint8Array = await newPdf.save();

  downloadAsPdf(bytes, `${file.name.split(".")[0]}_deleted.pdf`);
}
