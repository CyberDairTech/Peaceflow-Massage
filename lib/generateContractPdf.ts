import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { contractTitle, cancellationNoShowPolicy, contractAcknowledgement } from "@/lib/contract";

export type ContractPdfInput = {
  serviceName: string;
  sessionDate: string;
  receiptLine: string;
  clientName: string;
  initials: string;
  signatureType: "typed" | "drawn";
  signatureText?: string;
  signatureImageBase64?: string;
  signedAt: string;
};

const MARGIN = 56;
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const INK = rgb(0.29, 0.18, 0.12);
const MUTED = rgb(0.36, 0.27, 0.19);

function wrapText(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function generateContractPdf(input: ContractPdfInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const maxWidth = PAGE_WIDTH - MARGIN * 2;
  let y = PAGE_HEIGHT - MARGIN;

  const drawText = (text: string, options: { size?: number; f?: typeof font; color?: typeof INK; gap?: number } = {}) => {
    const size = options.size ?? 11;
    const f = options.f ?? font;
    const color = options.color ?? INK;
    for (const line of wrapText(text, f, size, maxWidth)) {
      page.drawText(line, { x: MARGIN, y, size, font: f, color });
      y -= size * 1.4;
    }
    y -= options.gap ?? 6;
  };

  drawText(contractTitle, { size: 18, f: bold, gap: 14 });
  drawText(`Session: ${input.serviceName}`, { size: 11 });
  drawText(`Date: ${input.sessionDate}`, { size: 11 });
  drawText(input.receiptLine, { size: 11, gap: 18 });

  // ---- Cancellation & no-show policy box ----
  const boxTop = y;
  drawText("Cancellation & No-Show Policy", { size: 12, f: bold, gap: 8 });
  for (const clause of cancellationNoShowPolicy) {
    drawText(clause, { size: 10, color: MUTED, gap: 8 });
  }
  const boxBottom = y + 2;
  page.drawRectangle({
    x: MARGIN - 10,
    y: boxBottom,
    width: maxWidth + 20,
    height: boxTop - boxBottom + 6,
    borderColor: rgb(0.78, 0.7, 0.58),
    borderWidth: 1,
  });
  // Initials badge, bottom-right of the policy box
  const initialsLabel = `Initialed: ${input.initials}`;
  const initialsWidth = italic.widthOfTextAtSize(initialsLabel, 12);
  page.drawText(initialsLabel, {
    x: MARGIN + maxWidth - 10 - initialsWidth,
    y: boxBottom + 8,
    size: 12,
    font: italic,
    color: INK,
  });
  y = boxBottom - 24;

  drawText(contractAcknowledgement, { size: 10, color: MUTED, gap: 30 });

  // ---- Signature block ----
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: MARGIN + 220, y },
    thickness: 1,
    color: rgb(0.78, 0.7, 0.58),
  });
  y -= 4;

  if (input.signatureType === "drawn" && input.signatureImageBase64) {
    const base64 = input.signatureImageBase64.replace(/^data:image\/png;base64,/, "");
    const pngBytes = Uint8Array.from(Buffer.from(base64, "base64"));
    const pngImage = await pdfDoc.embedPng(pngBytes);
    const dims = pngImage.scaleToFit(200, 70);
    page.drawImage(pngImage, { x: MARGIN, y: y - dims.height, width: dims.width, height: dims.height });
    y -= dims.height + 8;
  } else {
    page.drawText(input.signatureText || input.clientName, {
      x: MARGIN,
      y: y - 24,
      size: 20,
      font: italic,
      color: INK,
    });
    y -= 34;
  }

  drawText(`${input.clientName}`, { size: 10, color: MUTED, gap: 2 });
  drawText(`Signed ${input.signedAt}`, { size: 10, color: MUTED });

  return pdfDoc.save();
}
