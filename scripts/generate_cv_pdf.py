"""
Generador de PDF ATS de 1 Columna para Mariano Young
Produce un archivo PDF 1.4 estándar con fuentes Helvetica Type 1 en WinAnsiEncoding.
Ajuste riguroso de métricas para evitar palabras encimadas o cortadas.
"""

from __future__ import annotations
import os
from typing import List

PAGE_WIDTH = 595.28
PAGE_HEIGHT = 841.89

MARGIN_LEFT = 36.0
MARGIN_RIGHT = 36.0
MARGIN_TOP = 34.0
MARGIN_BOTTOM = 32.0
USABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

# Métricas Adobe Helvetica Regular (1/1000 em)
HELVETICA_METRICS = {
    " ": 278, "!": 278, '"': 355, "#": 556, "$": 556, "%": 889, "&": 667, "'": 222,
    "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
    "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556,
    "8": 556, "9": 556, ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556,
    "@": 1015, "A": 667, "B": 667, "C": 722, "D": 722, "E": 667, "F": 611, "G": 778,
    "H": 722, "I": 278, "J": 500, "K": 667, "L": 556, "M": 833, "N": 722, "O": 778,
    "P": 667, "Q": 778, "R": 722, "S": 667, "T": 611, "U": 722, "V": 667, "W": 944,
    "X": 667, "Y": 667, "Z": 611, "[": 278, "\\": 278, "]": 278, "^": 469, "_": 556,
    "`": 222, "a": 556, "b": 556, "c": 500, "d": 556, "e": 556, "f": 278, "g": 556,
    "h": 556, "i": 222, "j": 222, "k": 500, "l": 222, "m": 833, "n": 556, "o": 556,
    "p": 556, "q": 556, "r": 333, "s": 500, "t": 278, "u": 556, "v": 500, "w": 722,
    "x": 500, "y": 500, "z": 500, "{": 334, "|": 260, "}": 334, "~": 584,
    "á": 556, "é": 556, "í": 222, "ó": 556, "ú": 556, "ñ": 556,
    "Á": 667, "É": 667, "Í": 278, "Ó": 778, "Ú": 722, "Ñ": 722,
    "°": 400, "–": 556, "—": 889, "•": 350
}

# Métricas Adobe Helvetica Bold (1/1000 em)
HELVETICA_BOLD_METRICS = {
    " ": 278, "!": 333, '"': 474, "#": 556, "$": 556, "%": 889, "&": 722, "'": 278,
    "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
    "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556,
    "8": 556, "9": 556, ":": 333, ";": 333, "<": 584, "=": 584, ">": 584, "?": 611,
    "@": 975, "A": 722, "B": 722, "C": 722, "D": 722, "E": 667, "F": 611, "G": 778,
    "H": 722, "I": 278, "J": 556, "K": 722, "L": 611, "M": 833, "N": 722, "O": 778,
    "P": 667, "Q": 778, "R": 722, "S": 667, "T": 611, "U": 722, "V": 667, "W": 944,
    "X": 667, "Y": 667, "Z": 611, "[": 333, "\\": 278, "]": 333, "^": 584, "_": 556,
    "`": 278, "a": 556, "b": 611, "c": 556, "d": 611, "e": 556, "f": 333, "g": 611,
    "h": 611, "i": 278, "j": 278, "k": 556, "l": 278, "m": 889, "n": 611, "o": 611,
    "p": 611, "q": 611, "r": 389, "s": 556, "t": 333, "u": 611, "v": 556, "w": 778,
    "x": 556, "y": 556, "z": 500, "{": 389, "|": 280, "}": 389, "~": 584,
    "á": 556, "é": 556, "í": 278, "ó": 611, "ú": 611, "ñ": 611,
    "Á": 722, "É": 667, "Í": 278, "Ó": 778, "Ú": 722, "Ñ": 722,
    "°": 400, "–": 556, "—": 889, "•": 350
}

def get_text_width(text: str, font_size: float, is_bold: bool = False) -> float:
    table = HELVETICA_BOLD_METRICS if is_bold else HELVETICA_METRICS
    fallback = 560 if is_bold else 520
    total = sum(table.get(ch, fallback) for ch in text)
    return (total * font_size) / 1000.0

def escape_pdf_string(text: str) -> str:
    replacements = {
        "“": '"', "”": '"', "‘": "'", "’": "'", "…": "...",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    octal_map = {
        "á": "\\341", "é": "\\351", "í": "\\355", "ó": "\\363", "ú": "\\372", "ñ": "\\361",
        "Á": "\\301", "É": "\\311", "Í": "\\315", "Ó": "\\323", "Ú": "\\332", "Ñ": "\\321",
        "°": "\\260", "–": "\\226", "—": "\\227", "•": "\\225",
    }
    res = []
    for ch in text:
        if ch == "\\":
            res.append("\\\\")
        elif ch == "(":
            res.append("\\(")
        elif ch == ")":
            res.append("\\)")
        elif ch in octal_map:
            res.append(octal_map[ch])
        else:
            code = ord(ch)
            if 32 <= code <= 126:
                res.append(ch)
            else:
                res.append(f"\\{code:03o}")
    return "".join(res)

def wrap_words(text: str, max_width_pt: float, font_size: float, is_bold: bool = False) -> list[str]:
    words = [w for w in text.strip().split() if w]
    if not words:
        return []
    lines = []
    cur_words = []
    cur_w = 0.0
    sp_w = get_text_width(" ", font_size, is_bold)

    for w in words:
        w_w = get_text_width(w, font_size, is_bold)
        if not cur_words:
            cur_words.append(w)
            cur_w = w_w
        else:
            if cur_w + sp_w + w_w <= max_width_pt:
                cur_words.append(w)
                cur_w += sp_w + w_w
            else:
                lines.append(" ".join(cur_words))
                cur_words = [w]
                cur_w = w_w
    if cur_words:
        lines.append(" ".join(cur_words))
    return lines

def generate_pdf() -> bytes:
    cmds = []
    y = PAGE_HEIGHT - MARGIN_TOP

    def draw_line(y_pos: float, width_pt: float = 0.5, gray: float = 0.7):
        cmds.append(f"{width_pt:.2f} w")
        cmds.append(f"{gray:.2f} {gray:.2f} {gray:.2f} RG")
        cmds.append(f"{MARGIN_LEFT:.2f} {y_pos:.2f} m {(PAGE_WIDTH - MARGIN_RIGHT):.2f} {y_pos:.2f} l S")

    def draw_text(x: float, y_pos: float, text: str, font_id: str, font_size: float, r=0.08, g=0.08, b=0.08):
        escaped = escape_pdf_string(text)
        cmds.append("BT")
        cmds.append(f"/{font_id} {font_size:.2f} Tf")
        cmds.append(f"{r:.2f} {g:.2f} {b:.2f} rg")
        cmds.append(f"1 0 0 1 {x:.2f} {y_pos:.2f} Tm")
        cmds.append(f"({escaped}) Tj")
        cmds.append("ET")

    def section_header(title: str):
        nonlocal y
        y -= 5
        draw_text(MARGIN_LEFT, y, title.upper(), "F2", 9.5, 0.03, 0.03, 0.03)
        y -= 2.5
        draw_line(y, 0.75, 0.15)
        y -= 8.5

    # 1. ENCABEZADO
    draw_text(MARGIN_LEFT, y, "MARIANO YOUNG", "F2", 17.5, 0.02, 0.02, 0.02)
    y -= 13
    draw_text(MARGIN_LEFT, y, "Técnico en Programación (UTN) & Estudiante Avanzado de Lic. en Administración", "F1", 9.0, 0.2, 0.2, 0.2)
    y -= 11.5

    contact_line = "marianoyoung.dev@gmail.com   |   +54 9 2923 511691   |   Coronel Pringles, Buenos Aires   |   nodexalanding.vercel.app/portfolio   |   linkedin.com/in/mariano-young-016a0b23b"
    draw_text(MARGIN_LEFT, y, contact_line, "F1", 7.8, 0.35, 0.35, 0.35)
    y -= 4
    draw_line(y, 0.5, 0.8)
    y -= 4

    # 2. RESUMEN EJECUTIVO
    section_header("Resumen Ejecutivo")
    resumen = (
        "Técnico Universitario en Programación (UTN) y estudiante avanzado de Licenciatura en Administración de Empresas (Siglo 21). "
        "Especializado en el análisis de procesos comerciales, parametrización de sistemas y modelado relacional en SQL. Cuento con "
        "experiencia práctica en la implementación de soluciones de gestión modulares en producción, bases de datos y soporte técnico a usuarios, "
        "integrando lógica de negocio con resolución de incidentes (APIs, logs)."
    )
    for line in wrap_words(resumen, USABLE_WIDTH, 8.5, False):
        draw_text(MARGIN_LEFT, y, line, "F1", 8.5, 0.15, 0.15, 0.15)
        y -= 10.8
    y -= 1

    # 3. EXPERIENCIA PROFESIONAL
    section_header("Experiencia Profesional")

    exps = [
        {
            "empresa": "Nodexa Software",
            "rol": "Desarrollador de Software e Implementador de Sistemas",
            "right": "Coronel Pringles, Bs. As. • Jul 2026 – Presente",
            "bullets": [
                ("Diseño e Implementación de Sistema de Gestión (Nodexa Core)",
                 "Desarrollé un sistema modular para comercios y gastronomía sobre PostgreSQL, estructurando el registro transaccional de entradas y salidas de caja (bajo lógica de partida doble) para asegurar la trazabilidad del 100% de las operaciones y evitar descuadres."),
                ("Control de Inventario y Costos por Receta",
                 "Implementé el módulo de control de stock automatizado mediante desglose de recetas e insumos, descontando transaccionalmente las materias primas al despachar comandas desde tableros Kanban."),
                ("Automatización e Integración con IA",
                 "Construí flujos de extracción de datos de productos mediante fotografías utilizando modelos de visión artificial e integración con APIs REST para agilizar la carga y actualización de listas de precios."),
                ("Gestión Municipal (Patitas en Alerta)",
                 "Modelé la arquitectura relacional (SQL) para una plataforma de zoonosis, canalizando reportes geolocalizados hacia tableros analíticos y mapas de calor para optimizar la asignación de turnos y recursos públicos.")
            ]
        },
        {
            "empresa": "Appy Studios",
            "rol": "Analista Técnico-Funcional & Soporte L2 (Freelance)",
            "right": "Coronel Pringles, Bs. As. • Jul 2025 – Jul 2026",
            "bullets": [
                ("Implementación de Sistemas POS",
                 "Parametricé y desplegué sistemas de Punto de Venta (POS) y control de stock para comercios locales (leñeras, jugueterías, pinturerías), asegurando la sincronización de inventarios y la conciliación diaria de cajas."),
                ("Análisis y Documentación",
                 "Elaboré especificaciones funcionales y diagramas de flujo para estandarizar procesos de compras y cobranzas, centralizando la operativa física y digital de los clientes."),
                ("Soporte Operativo",
                 "Brindé soporte de nivel 2 resolviendo incidencias, diagnosticando errores en bases de datos relacionales y aplicando correcciones sobre plataformas de e-commerce y catálogos web.")
            ]
        }
    ]

    bullet_indent = 12.0
    text_width = USABLE_WIDTH - bullet_indent

    for exp in exps:
        right_w = get_text_width(exp["right"], 8.0, False)
        right_x = PAGE_WIDTH - MARGIN_RIGHT - right_w

        comp_text = exp["empresa"]
        role_text = f" |  {exp['rol']}"
        comp_w = get_text_width(comp_text, 9.5, True)
        role_w = get_text_width(role_text, 8.8, False)

        draw_text(MARGIN_LEFT, y, comp_text, "F2", 9.5, 0.02, 0.02, 0.02)
        max_role_w = right_x - (MARGIN_LEFT + comp_w + 4) - 8
        if role_w <= max_role_w:
            draw_text(MARGIN_LEFT + comp_w + 4, y, role_text, "F3", 8.8, 0.2, 0.2, 0.2)
        else:
            draw_text(MARGIN_LEFT + comp_w + 4, y, role_text[:45] + "...", "F3", 8.8, 0.2, 0.2, 0.2)
        draw_text(right_x, y, exp["right"], "F1", 8.0, 0.35, 0.35, 0.35)
        y -= 11.5

        for sub, desc in exp["bullets"]:
            sub_prefix = f"{sub}: "
            sub_w = get_text_width(sub_prefix, 8.2, True)
            sp_w = get_text_width(" ", 8.2, False)

            desc_words = [w for w in desc.split() if w]
            remaining_w_line1 = text_width - sub_w

            line1_words = []
            cur_w = 0.0
            w_idx = 0

            while w_idx < len(desc_words):
                w = desc_words[w_idx]
                w_w = get_text_width(w, 8.2, False)
                needed = w_w if not line1_words else sp_w + w_w
                if cur_w + needed <= remaining_w_line1:
                    line1_words.append(w)
                    cur_w += needed
                    w_idx += 1
                else:
                    break

            # Dibujar viñeta y línea 1
            draw_text(MARGIN_LEFT, y, "•", "F1", 8.2, 0.3, 0.3, 0.3)
            draw_text(MARGIN_LEFT + bullet_indent, y, sub_prefix, "F2", 8.2, 0.05, 0.05, 0.05)
            if line1_words:
                draw_text(MARGIN_LEFT + bullet_indent + sub_w, y, " ".join(line1_words), "F1", 8.2, 0.15, 0.15, 0.15)
            y -= 10.2

            # Líneas restantes de la viñeta
            if w_idx < len(desc_words):
                rest_text = " ".join(desc_words[w_idx:])
                for r_line in wrap_words(rest_text, text_width, 8.2, False):
                    draw_text(MARGIN_LEFT + bullet_indent, y, r_line, "F1", 8.2, 0.15, 0.15, 0.15)
                    y -= 10.2
            y -= 1.5
        y -= 3.0

    # 4. EDUCACIÓN
    section_header("Educación")
    edus = [
        ("Universidad Siglo 21", "Licenciatura en Administración de Empresas", "(Cursando último año - 4to año)", "Mar 2023 – Presente"),
        ("Universidad Tecnológica Nacional (UTN)", "Técnico Universitario en Programación", "(Graduado)", "2026"),
        ("Escuela de Educación Secundaria Técnica N°1", "Técnico Electromecánico", "(Graduado)", "2012 – 2018"),
    ]

    for inst, tit, est, per in edus:
        right_w = get_text_width(per, 8.0, False)
        right_x = PAGE_WIDTH - MARGIN_RIGHT - right_w

        inst_w = get_text_width(inst, 8.5, True)
        tit_str = f"|  {tit}"
        est_str = f"•  {est}"
        tit_w = get_text_width(tit_str, 8.5, False)
        est_w = get_text_width(est_str, 8.0, False)

        draw_text(MARGIN_LEFT, y, inst, "F2", 8.5, 0.05, 0.05, 0.05)
        avail_w = right_x - (MARGIN_LEFT + inst_w + 4) - 8
        if tit_w + 6 + est_w <= avail_w:
            draw_text(MARGIN_LEFT + inst_w + 4, y, tit_str, "F3", 8.5, 0.15, 0.15, 0.15)
            draw_text(MARGIN_LEFT + inst_w + tit_w + 8, y, est_str, "F1", 8.0, 0.4, 0.4, 0.4)
        else:
            draw_text(MARGIN_LEFT + inst_w + 4, y, tit_str, "F3", 8.5, 0.15, 0.15, 0.15)

        draw_text(right_x, y, per, "F1", 8.0, 0.3, 0.3, 0.3)
        y -= 11.2
    y -= 1.0

    # 5. HABILIDADES TÉCNICAS Y OPERATIVAS
    section_header("Habilidades Técnicas y Operativas")
    skills = [
        ("Bases de Datos & Datos", "PostgreSQL, SQL (Consultas SELECT, JOINs, Agregaciones, Vistas, Modelado Relacional DER), Hojas de Cálculo (Excel / Google Sheets)"),
        ("Sistemas & Procesos de Negocio", "Relevamiento Funcional, Sistemas POS y Gestión Comercial (ERP), Control de Stock y Recetas, Conciliación de Caja, Diagramación de Flujos, Lógica Contable (Partida Doble)"),
        ("Desarrollo & Integraciones", "Lógica Backend, Consumo de APIs REST (JSON), Integración de APIs de IA, JavaScript / TypeScript, Python (Básico / Scripting), Git"),
    ]

    for cat_name, items_str in skills:
        prefix = f"• {cat_name}: "
        pref_w = get_text_width(prefix, 8.2, True)
        sp_w = get_text_width(" ", 8.2, False)
        words = items_str.split()

        line1_max = USABLE_WIDTH - pref_w
        line1_words = []
        cur_w = 0.0
        w_idx = 0

        while w_idx < len(words):
            w = words[w_idx]
            w_w = get_text_width(w, 8.2, False)
            needed = w_w if not line1_words else sp_w + w_w
            if cur_w + needed <= line1_max:
                line1_words.append(w)
                cur_w += needed
                w_idx += 1
            else:
                break

        draw_text(MARGIN_LEFT, y, prefix, "F2", 8.2, 0.05, 0.05, 0.05)
        if line1_words:
            draw_text(MARGIN_LEFT + pref_w, y, " ".join(line1_words), "F1", 8.2, 0.15, 0.15, 0.15)
        y -= 10.2

        if w_idx < len(words):
            rest_lines = wrap_words(" ".join(words[w_idx:]), USABLE_WIDTH - 14.0, 8.2, False)
            for r_l in rest_lines:
                draw_text(MARGIN_LEFT + 14.0, y, r_l, "F1", 8.2, 0.15, 0.15, 0.15)
                y -= 10.2
        y -= 1.5

    # Ensamblado PDF 1.4
    content_stream = "\n".join(cmds).encode("latin-1")
    stream_len = len(content_stream)

    objects = [
        b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
        b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
        f"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH:.2f} {PAGE_HEIGHT:.2f}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>\nendobj\n".encode("ascii"),
        b"4 0 obj\n<< /Length " + str(stream_len).encode("ascii") + b" >>\nstream\n" + content_stream + b"\nendstream\nendobj\n",
        b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
        b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n",
        b"7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj\n",
    ]

    header = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
    offsets = []
    pdf = bytearray(header)

    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)

    xref_pos = len(pdf)
    xref_str = f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"
    for off in offsets:
        xref_str += f"{off:010d} 00000 n \n"
    xref_str += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n"
    pdf.extend(xref_str.encode("ascii"))

    print(f"Final y position: {y:.2f} pt (Margin bottom: {MARGIN_BOTTOM} pt). Remaining space: {y - MARGIN_BOTTOM:.2f} pt")
    return bytes(pdf)

if __name__ == "__main__":
    pdf_bytes = generate_pdf()
    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "cv-mariano-young.pdf")
    with open(output_path, "wb") as f:
        f.write(pdf_bytes)
    print(f"Generated {output_path} ({len(pdf_bytes)} bytes)")
