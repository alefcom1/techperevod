import mammoth from "mammoth";
import * as XLSX from "xlsx";

// pdf-parse v1's index.js has a debug-mode branch keyed off `!module.parent`
// that misfires under webpack bundling (tries to read its own test fixture at
// import time) — importing the internal lib directly skips that branch.
const pdfParse = require("pdf-parse/lib/pdf-parse.js") as (buf: Buffer) => Promise<{ text: string }>;

export type FileKind = "docx" | "pdf" | "xlsx" | "txt" | "drawing" | "other";

export interface ParsedDocument {
  kind: FileKind;
  text: string;
  /** Честная оговорка — заполняется, когда автоматический разбор невозможен (чертежи). */
  note?: string;
}

function kindFromName(fileName: string): FileKind {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  if (ext === "docx" || ext === "doc") return "docx";
  if (ext === "pdf") return "pdf";
  if (["xlsx", "xls", "csv"].includes(ext)) return "xlsx";
  if (["txt", "md"].includes(ext)) return "txt";
  if (["dwg", "dxf"].includes(ext)) return "drawing";
  return "other";
}

/**
 * Извлекает текст из загруженного файла для расчёта мгновенной оценки.
 * DWG/DXF (чертежи) — честно не парсим геометрию CAD, только грубая оценка
 * по размеру файла, помеченная как таковая (см. docs/product-features-plan.md, п.1).
 */
export async function parseDocument(buffer: Buffer, fileName: string): Promise<ParsedDocument> {
  const kind = kindFromName(fileName);

  switch (kind) {
    case "docx": {
      const { value } = await mammoth.extractRawText({ buffer });
      return { kind, text: value };
    }
    case "pdf": {
      const { text } = await pdfParse(buffer);
      return { kind, text };
    }
    case "xlsx": {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const parts: string[] = [];
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, raw: false });
        for (const row of rows) {
          for (const cell of row) {
            if (cell != null && String(cell).trim()) parts.push(String(cell));
          }
        }
      }
      return { kind, text: parts.join(" ") };
    }
    case "txt": {
      return { kind, text: buffer.toString("utf-8") };
    }
    case "drawing": {
      // ~1 условное "слово" на каждые 3 КБ чертежа — грубая эвристика по размеру,
      // не подсчёт реального текста. Честно помечаем в note, цифра не выдаётся за точную.
      const roughWords = Math.max(50, Math.round(buffer.length / 3000));
      return {
        kind,
        text: Array(roughWords).fill("x").join(" "),
        note: "Чертежи (DWG/DXF) не разбираются автоматически — показана грубая оценка по размеру файла. Точная оценка — после проверки инженером.",
      };
    }
    default:
      throw new Error(`Формат файла не поддерживается для автоматической оценки: .${fileName.split(".").pop()}`);
  }
}
