import { PDFDocument } from "pdf-lib"

function downloadAsPdf(blob: Uint8Array, fileName: string) {
    const blobUrl = URL.createObjectURL(new Blob([blob as BlobPart], {type: "application/pdf"}))
    const link = document.createElement("a")
    link.href = blobUrl
    link.download = fileName
    link.click()
    URL.revokeObjectURL(blobUrl)
}

export async function mergePdf(files: File[]) {
    if (files.length === 0) return;

    const mergedDocument = await PDFDocument.create();

    for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const fileBytes = await PDFDocument.load(fileBuffer);

        const copiedPages = await mergedDocument.copyPages(fileBytes, fileBytes.getPageIndices());

        copiedPages.forEach((page) => {
            mergedDocument.addPage(page);
        })
    }

    const mergedBytes: Uint8Array = await mergedDocument.save();

    downloadAsPdf(mergedBytes, "Merged.pdf")
}