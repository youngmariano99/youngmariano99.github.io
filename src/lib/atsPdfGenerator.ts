/**
 * Generador Dinámico de CV en PDF ATS (Formato 1 Columna A4)
 * Genera un archivo PDF 1.4 binario válido directamente en el navegador (Client-Side)
 * con tipografía Helvetica estándar (Type 1), métricas de caracteres exactas de Adobe,
 * codificación WinAnsi (cp1252) y ajuste riguroso para evitar palabras cortadas o encimadas.
 */

import { PortfolioCvData, getActiveSummary } from "./portfolioCvData";

// Dimensiones A4 en puntos (72 pt / pulgada)
export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;

export const MARGIN_LEFT = 36.0;
export const MARGIN_RIGHT = 36.0;
export const MARGIN_TOP = 34.0;
export const MARGIN_BOTTOM = 32.0;
export const USABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

// Métricas oficiales de Adobe en milipuntos (1/1000 em) para Helvetica Regular
const HELVETICA_METRICS: Record<string, number> = {
  " ": 278, "!": 278, '"': 355, "#": 556, "$": 556, "%": 889, "&": 667, "'": 222,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556,
  "8": 556, "9": 556, ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556,
  "@": 1015, A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722,
  I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778,
  R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 278, "\\": 278, "]": 278, "^": 469, _: 556, "`": 222, a: 556, b: 556,
  c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500,
  l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278,
  u: 556, v: 500, w: 722, x: 500, y: 500, z: 500, "{": 334, "|": 260, "}": 334,
  "~": 584,
  // Caracteres españoles cp1252
  "á": 556, "é": 556, "í": 222, "ó": 556, "ú": 556, "ñ": 556,
  "Á": 667, "É": 667, "Í": 278, "Ó": 778, "Ú": 722, "Ñ": 722,
  "°": 400, "–": 556, "—": 889, "•": 350,
};

// Métricas oficiales de Adobe para Helvetica Bold
const HELVETICA_BOLD_METRICS: Record<string, number> = {
  " ": 278, "!": 333, '"': 474, "#": 556, "$": 556, "%": 889, "&": 722, "'": 278,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556,
  "8": 556, "9": 556, ":": 333, ";": 333, "<": 584, "=": 584, ">": 584, "?": 611,
  "@": 975, A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722,
  I: 278, J: 556, K: 722, L: 611, M: 833, N: 722, O: 778, P: 667, Q: 778,
  R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 333, "\\": 278, "]": 333, "^": 584, _: 556, "`": 278, a: 556, b: 611,
  c: 556, d: 611, e: 556, f: 333, g: 611, h: 611, i: 278, j: 278, k: 556,
  l: 278, m: 889, n: 611, o: 611, p: 611, q: 611, r: 389, s: 556, t: 333,
  u: 611, v: 556, w: 778, x: 556, y: 556, z: 500, "{": 389, "|": 280, "}": 389,
  "~": 584,
  "á": 556, "é": 556, "í": 278, "ó": 611, "ú": 611, "ñ": 611,
  "Á": 722, "É": 667, "Í": 278, "Ó": 778, "Ú": 722, "Ñ": 722,
  "°": 400, "–": 556, "—": 889, "•": 350,
};

export function getTextWidth(text: string, fontSize: number, isBold = false): number {
  const metrics = isBold ? HELVETICA_BOLD_METRICS : HELVETICA_METRICS;
  const fallback = isBold ? 560 : 520;
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    total += metrics[ch] ?? fallback;
  }
  return (total * fontSize) / 1000;
}

/**
 * Escapa y codifica texto para el stream PDF en WinAnsiEncoding (cp1252)
 */
export function escapePdfString(text: string): string {
  const replacements: Record<string, string> = {
    "“": '"',
    "”": '"',
    "‘": "'",
    "’": "'",
    "…": "...",
  };

  let sanitized = text;
  for (const [k, v] of Object.entries(replacements)) {
    sanitized = sanitized.split(k).join(v);
  }

  // Mapeo octal cp1252 para caracteres no ASCII
  const octalMap: Record<string, string> = {
    "á": "\\341", "é": "\\351", "í": "\\355", "ó": "\\363", "ú": "\\372", "ñ": "\\361",
    "Á": "\\301", "É": "\\311", "Í": "\\315", "Ó": "\\323", "Ú": "\\332", "Ñ": "\\321",
    "°": "\\260", "–": "\\226", "—": "\\227", "•": "\\225",
  };

  let out = "";
  for (let i = 0; i < sanitized.length; i++) {
    const ch = sanitized[i];
    if (ch === "\\") out += "\\\\";
    else if (ch === "(") out += "\\(";
    else if (ch === ")") out += "\\)";
    else if (octalMap[ch]) out += octalMap[ch];
    else {
      const code = ch.charCodeAt(0);
      if (code >= 32 && code <= 126) {
        out += ch;
      } else {
        // Octal genérico si está en rango cp1252
        out += `\\${code.toString(8).padStart(3, "0")}`;
      }
    }
  }
  return out;
}

/**
 * Divide un texto en líneas asegurando que ninguna palabra se corte
 * y que el ancho total nunca exceda maxWidthPt.
 */
export function wrapWords(text: string, maxWidthPt: number, fontSize: number, isBold = false): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let currentWords: string[] = [];
  let currentWidth = 0;
  const spaceWidth = getTextWidth(" ", fontSize, isBold);

  for (const word of words) {
    const wordWidth = getTextWidth(word, fontSize, isBold);
    if (currentWords.length === 0) {
      currentWords.push(word);
      currentWidth = wordWidth;
    } else {
      if (currentWidth + spaceWidth + wordWidth <= maxWidthPt) {
        currentWords.push(word);
        currentWidth += spaceWidth + wordWidth;
      } else {
        lines.push(currentWords.join(" "));
        currentWords = [word];
        currentWidth = wordWidth;
      }
    }
  }

  if (currentWords.length > 0) {
    lines.push(currentWords.join(" "));
  }

  return lines;
}

/**
 * Genera el documento binario PDF 1.4 con los datos dinámicos actuales.
 */
export function generateAtsPdf(data: PortfolioCvData): Uint8Array {
  const cmds: string[] = [];
  let y = PAGE_HEIGHT - MARGIN_TOP;

  const drawLine = (yPos: number, strokeWidth = 0.5, gray = 0.7) => {
    cmds.push(`${strokeWidth.toFixed(2)} w`);
    cmds.push(`${gray.toFixed(2)} ${gray.toFixed(2)} ${gray.toFixed(2)} RG`);
    cmds.push(`${MARGIN_LEFT.toFixed(2)} ${yPos.toFixed(2)} m ${(PAGE_WIDTH - MARGIN_RIGHT).toFixed(2)} ${yPos.toFixed(2)} l S`);
  };

  const drawText = (
    x: number,
    yPos: number,
    rawText: string,
    fontKey: "F1" | "F2" | "F3",
    fontSize: number,
    r = 0.08,
    g = 0.08,
    b = 0.08
  ) => {
    const escaped = escapePdfString(rawText);
    cmds.push("BT");
    cmds.push(`/${fontKey} ${fontSize.toFixed(2)} Tf`);
    cmds.push(`${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg`);
    cmds.push(`1 0 0 1 ${x.toFixed(2)} ${yPos.toFixed(2)} Tm`);
    cmds.push(`(${escaped}) Tj`);
    cmds.push("ET");
  };

  const drawTextRight = (
    yPos: number,
    rawText: string,
    fontKey: "F1" | "F2" | "F3",
    fontSize: number,
    isBold = false,
    r = 0.35,
    g = 0.35,
    b = 0.35
  ) => {
    const textW = getTextWidth(rawText, fontSize, isBold);
    const x = PAGE_WIDTH - MARGIN_RIGHT - textW;
    drawText(x, yPos, rawText, fontKey, fontSize, r, g, b);
  };

  const drawSectionHeader = (title: string) => {
    y -= 5;
    drawText(MARGIN_LEFT, y, title.toUpperCase(), "F2", 9.5, 0.03, 0.03, 0.03);
    y -= 2.5;
    drawLine(y, 0.75, 0.15);
    y -= 8.5;
  };

  // =========================================================================
  // 1. ENCABEZADO
  // =========================================================================
  // Nombre
  const nameUpper = (data.contacto.nombre || "MARIANO YOUNG").toUpperCase();
  drawText(MARGIN_LEFT, y, nameUpper, "F2", 17.5, 0.02, 0.02, 0.02);
  y -= 13;

  // Rol
  const roleText = data.contacto.rolWeb || "Técnico en Programación & Gestión";
  drawText(MARGIN_LEFT, y, roleText, "F1", 9.0, 0.2, 0.2, 0.2);
  y -= 11.5;

  // Contacto simplificado
  const cleanWeb = (data.contacto.web || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const cleanLinkedin = (data.contacto.linkedin || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const contactParts = [
    data.contacto.email,
    data.contacto.telefono,
    data.contacto.ubicacion,
    cleanWeb,
    cleanLinkedin,
  ].filter(Boolean);

  const contactLine = contactParts.join("   |   ");
  drawText(MARGIN_LEFT, y, contactLine, "F1", 7.8, 0.35, 0.35, 0.35);
  y -= 4;
  drawLine(y, 0.5, 0.8);
  y -= 4;

  // =========================================================================
  // 2. RESUMEN EJECUTIVO
  // =========================================================================
  drawSectionHeader("Resumen Ejecutivo");
  const summary = getActiveSummary(data.resumen);
  const summaryLines = wrapWords(summary, USABLE_WIDTH, 8.5, false);
  for (const line of summaryLines) {
    drawText(MARGIN_LEFT, y, line, "F1", 8.5, 0.15, 0.15, 0.15);
    y -= 10.8;
  }
  y -= 1;

  // =========================================================================
  // 3. EXPERIENCIA PROFESIONAL
  // =========================================================================
  drawSectionHeader("Experiencia Profesional");
  const activeExps = (data.experiencias || []).filter((e) => e.visible);

  for (let expIdx = 0; expIdx < activeExps.length; expIdx++) {
    const exp = activeExps[expIdx];
    const rightSide = `${exp.ubicacion || ""} • ${exp.periodo || ""}`.trim().replace(/^•|•$/g, "").trim();
    const rightSideWidth = getTextWidth(rightSide, 8.0, false);
    const rightSideX = PAGE_WIDTH - MARGIN_RIGHT - rightSideWidth;

    // Título de la empresa y rol
    const companyText = exp.empresa || "Empresa";
    const roleTextLeft = exp.rol ? ` |  ${exp.rol}` : "";
    const compW = getTextWidth(companyText, 9.5, true);
    const roleW = getTextWidth(roleTextLeft, 8.8, false);

    drawText(MARGIN_LEFT, y, companyText, "F2", 9.5, 0.02, 0.02, 0.02);

    // Evitar colisión entre rol y fecha derecha
    const maxAvailableRoleW = rightSideX - (MARGIN_LEFT + compW + 4) - 8;
    if (roleW <= maxAvailableRoleW) {
      drawText(MARGIN_LEFT + compW + 4, y, roleTextLeft, "F3", 8.8, 0.2, 0.2, 0.2);
    } else {
      // Si el rol es muy largo, se acorta limpiamente
      const words = roleTextLeft.split(" ");
      let shortRole = "";
      for (const w of words) {
        if (getTextWidth(shortRole + " " + w + "...", 8.8, false) <= maxAvailableRoleW) {
          shortRole += (shortRole ? " " : "") + w;
        } else break;
      }
      drawText(MARGIN_LEFT + compW + 4, y, shortRole + "...", "F3", 8.8, 0.2, 0.2, 0.2);
    }

    drawText(rightSideX, y, rightSide, "F1", 8.0, 0.35, 0.35, 0.35);
    y -= 11.5;

    // Viñetas
    const activeBullets = (exp.bullets || []).filter((b) => b.visible);
    const bulletIndent = 12.0;
    const textWidth = USABLE_WIDTH - bulletIndent;

    for (const bullet of activeBullets) {
      const sub = (bullet.subtitulo || "").trim();
      const desc = (bullet.descripcion || "").trim();
      const subPrefix = sub ? `${sub}: ` : "";
      const subWidth = sub ? getTextWidth(subPrefix, 8.2, true) : 0;
      const spaceW = getTextWidth(" ", 8.2, false);

      // Calculamos qué palabras de la descripción caben en la línea 1 después del subtítulo
      const descWords = desc.split(/\s+/).filter(Boolean);
      const remainingWidthLine1 = textWidth - subWidth;

      let line1DescWords: string[] = [];
      let currentW = 0;
      let wordIdx = 0;

      while (wordIdx < descWords.length) {
        const w = descWords[wordIdx];
        const wWidth = getTextWidth(w, 8.2, false);
        const needed = line1DescWords.length === 0 ? wWidth : spaceW + wWidth;

        if (currentW + needed <= remainingWidthLine1) {
          line1DescWords.push(w);
          currentW += needed;
          wordIdx++;
        } else {
          break;
        }
      }

      // Dibujar viñeta y Línea 1
      drawText(MARGIN_LEFT, y, "•", "F1", 8.2, 0.3, 0.3, 0.3);

      if (sub) {
        drawText(MARGIN_LEFT + bulletIndent, y, subPrefix, "F2", 8.2, 0.05, 0.05, 0.05);
      }

      if (line1DescWords.length > 0) {
        const line1DescText = line1DescWords.join(" ");
        drawText(MARGIN_LEFT + bulletIndent + subWidth, y, line1DescText, "F1", 8.2, 0.15, 0.15, 0.15);
      }
      y -= 10.2;

      // Líneas restantes de la viñeta (ocupan el ancho completo)
      if (wordIdx < descWords.length) {
        const remainingText = descWords.slice(wordIdx).join(" ");
        const remainingLines = wrapWords(remainingText, textWidth, 8.2, false);
        for (const remLine of remainingLines) {
          drawText(MARGIN_LEFT + bulletIndent, y, remLine, "F1", 8.2, 0.15, 0.15, 0.15);
          y -= 10.2;
        }
      }

      y -= 1.5;
    }

    y -= 3;
  }

  // =========================================================================
  // 4. EDUCACIÓN
  // =========================================================================
  drawSectionHeader("Educación");
  const activeEdu = (data.educacion || []).filter((e) => e.visible);

  for (const edu of activeEdu) {
    const periodoText = edu.periodo || "";
    const rightW = getTextWidth(periodoText, 8.0, false);
    const rightX = PAGE_WIDTH - MARGIN_RIGHT - rightW;

    const inst = edu.institucion || "";
    const tit = edu.titulo ? `|  ${edu.titulo}` : "";
    const est = edu.estado ? `•  (${edu.estado})` : "";

    const instW = getTextWidth(inst, 8.5, true);
    const titW = getTextWidth(tit, 8.5, false);
    const estW = getTextWidth(est, 8.0, false);

    drawText(MARGIN_LEFT, y, inst, "F2", 8.5, 0.05, 0.05, 0.05);

    // Ajuste dinámico de espaciado sin cortes
    const availableForTitleAndState = rightX - (MARGIN_LEFT + instW + 4) - 8;
    if (titW + 6 + estW <= availableForTitleAndState) {
      drawText(MARGIN_LEFT + instW + 4, y, tit, "F3", 8.5, 0.15, 0.15, 0.15);
      drawText(MARGIN_LEFT + instW + titW + 8, y, est, "F1", 8.0, 0.4, 0.4, 0.4);
    } else {
      drawText(MARGIN_LEFT + instW + 4, y, tit, "F3", 8.5, 0.15, 0.15, 0.15);
    }

    drawText(rightX, y, periodoText, "F1", 8.0, 0.3, 0.3, 0.3);
    y -= 11.2;
  }
  y -= 1;

  // =========================================================================
  // 5. HABILIDADES TÉCNICAS Y OPERATIVAS
  // =========================================================================
  drawSectionHeader("Habilidades Técnicas y Operativas");
  const activeSkills = (data.habilidades || []).filter((s) => s.visible);

  for (const skillCat of activeSkills) {
    const prefix = `• ${skillCat.nombre || "Categoría"}: `;
    const prefW = getTextWidth(prefix, 8.2, true);
    const itemsText = (skillCat.habilidades || []).join(", ");
    const itemsWords = itemsText.split(/\s+/).filter(Boolean);

    // Palabras que caben en la línea 1 después de la categoría
    const line1MaxW = USABLE_WIDTH - prefW;
    const line1Words: string[] = [];
    let curW = 0;
    let wIdx = 0;
    const spW = getTextWidth(" ", 8.2, false);

    while (wIdx < itemsWords.length) {
      const w = itemsWords[wIdx];
      const wWidth = getTextWidth(w, 8.2, false);
      const needed = line1Words.length === 0 ? wWidth : spW + wWidth;
      if (curW + needed <= line1MaxW) {
        line1Words.push(w);
        curW += needed;
        wIdx++;
      } else {
        break;
      }
    }

    // Dibujar línea 1
    drawText(MARGIN_LEFT, y, prefix, "F2", 8.2, 0.05, 0.05, 0.05);
    if (line1Words.length > 0) {
      drawText(MARGIN_LEFT + prefW, y, line1Words.join(" "), "F1", 8.2, 0.15, 0.15, 0.15);
    }
    y -= 10.2;

    // Líneas subsiguientes con indentación limpia
    if (wIdx < itemsWords.length) {
      const restText = itemsWords.slice(wIdx).join(" ");
      const indent = 14.0;
      const restLines = wrapWords(restText, USABLE_WIDTH - indent, 8.2, false);
      for (const line of restLines) {
        drawText(MARGIN_LEFT + indent, y, line, "F1", 8.2, 0.15, 0.15, 0.15);
        y -= 10.2;
      }
    }

    y -= 1.5;
  }

  // =========================================================================
  // ENSAMBLADO DEL ARCHIVO PDF-1.4
  // =========================================================================
  const contentStreamStr = cmds.join("\n");
  const encoder = new TextEncoder();
  const contentStreamBytes = encoder.encode(contentStreamStr);
  const streamLen = contentStreamBytes.length;

  const objects: Uint8Array[] = [
    // 1: Catalog
    encoder.encode("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
    // 2: Pages
    encoder.encode("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
    // 3: Page (A4)
    encoder.encode(
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] ` +
      `/Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>\nendobj\n`
    ),
    // 4: Content Stream
    concatUint8([
      encoder.encode(`4 0 obj\n<< /Length ${streamLen} >>\nstream\n`),
      contentStreamBytes,
      encoder.encode("\nendstream\nendobj\n"),
    ]),
    // 5: F1 Helvetica
    encoder.encode("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n"),
    // 6: F2 Helvetica-Bold
    encoder.encode("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n"),
    // 7: F3 Helvetica-Oblique
    encoder.encode("7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj\n"),
  ];

  const header = encoder.encode("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const offsets: number[] = [];
  let currentOffset = header.length;

  for (const obj of objects) {
    offsets.push(currentOffset);
    currentOffset += obj.length;
  }

  const xrefPos = currentOffset;
  let xrefStr = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xrefStr += `${off.toString().padStart(10, "0")} 00000 n \n`;
  }
  xrefStr += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  const xrefBytes = encoder.encode(xrefStr);

  return concatUint8([header, ...objects, xrefBytes]);
}

/**
 * Concatena varios Uint8Array en uno solo
 */
function concatUint8(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, curr) => acc + curr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/**
 * Dispara la descarga inmediata del PDF ATS generado con los datos actuales en el navegador.
 */
export function downloadAtsPdf(data: PortfolioCvData, filename = "CV-Mariano-Young-ATS.pdf"): void {
  if (typeof window === "undefined") return;
  const pdfBytes = generateAtsPdf(data);
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
