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
    draw_text(MARGIN_LEFT, y, "MARIANO YOUNG", "F2", 17.0, 0.02, 0.02, 0.02)
    y -= 13.5

    role_text = "Analista de Datos Comerciales, Control de Gestión Técnico & Soporte de Aplicaciones (SQL / Python / ERP) | Técnico en Programación (UTN) & Lic. en Administración (Último año)"
    role_lines = wrap_words(role_text, USABLE_WIDTH, 8.8, False)
    for r_line in role_lines:
        draw_text(MARGIN_LEFT, y, r_line, "F1", 8.8, 0.2, 0.2, 0.2)
        y -= 10.5
    y -= 1.5

    contact_line1 = "marianoyoung.dev@gmail.com   |   +54 9 2923 511691   |   Coronel Pringles, Buenos Aires, Argentina"
    contact_line2 = "nodexalanding.vercel.app/portfolio   |   linkedin.com/in/mariano-young-016a0b23b"
    draw_text(MARGIN_LEFT, y, contact_line1, "F1", 7.8, 0.35, 0.35, 0.35)
    y -= 9.5
    draw_text(MARGIN_LEFT, y, contact_line2, "F1", 7.8, 0.35, 0.35, 0.35)
    y -= 2.0
    draw_line(y, 0.5, 0.8)
    y -= 5.0

    # 2. RESUMEN EJECUTIVO
    section_header("Resumen Ejecutivo")
    resumen = (
        "Técnico Universitario en Programación (UTN - Analista Programador) y estudiante del último año de la Licenciatura en Administración de "
        "Empresas (Siglo 21 - Control de Gestión / Ing. Comercial). Especializado en el análisis de datos comerciales, control de gestión técnico, "
        "soporte de aplicaciones L2 e implementación de sistemas ERP. Cuento con experiencia práctica en modelado y auditoría de bases de "
        "datos relacionales (PostgreSQL/SQL), cuadraturas contables y de stock, limpieza e importación masiva de datos (Excel Power Query, "
        "Python/Pandas y tablas de Staging) y diagnóstico de integraciones vía APIs REST (Postman, n8n)."
    )
    for line in wrap_words(resumen, USABLE_WIDTH, 8.4, False):
        draw_text(MARGIN_LEFT, y, line, "F1", 8.4, 0.15, 0.15, 0.15)
        y -= 10.4
    y -= 2.0

    # 3. EXPERIENCIA PROFESIONAL
    section_header("Experiencia Profesional")

    exps = [
        {
            "empresa": "Nodexa Software",
            "rol": "Implementador de Sistemas de Gestión & Procesos Comerciales",
            "right": "Coronel Pringles, Buenos Aires (Remoto / Local) • Ene 2026 – Presente",
            "bullets": [
                ("Arquitectura Transaccional y Motor Contable de Partida Doble (Nodexa Core)",
                 "Diseñé e implementé un sistema ERP modular sobre PostgreSQL para el sector comercial y gastronómico, estructurando un libro mayor inmutable (append-only ledger) bajo reglas de partida doble (Debe/Haber) y ajustes por contra-asiento para garantizar el 100% de trazabilidad en auditorías y cierres de caja sin descuadres."),
                ("Control de Gestión, Costeo por Receta (Escandallo/BOM) y Cuadraturas de Stock",
                 "Desarrollé el módulo de explosión de insumos y subrecetas mediante consultas SQL avanzadas (CTEs y JOINs controlados), automatizando el descuento transaccional de inventario y ejecutando cuadraturas entre el stock teórico, el inventario físico y el costo de reposición para proteger los márgenes operativos frente a la inflación."),
                ("Migración de Datos (Staging Tables), Limpieza en Python/Excel y Automatización con IA",
                 "Construí tuberías de actualización masiva de listas de precios y comprobantes utilizando tablas temporales de retención (Staging en VARCHAR), scripts en Python (Pandas / Pydantic) y flujos en n8n con APIs de visión artificial, aplicando validaciones matemáticas deterministas previas a la inserción en base de datos."),
                ("Modelado Relacional y Analítica Operativa (Patitas en Alerta)",
                 "Estructuré la base de datos SQL y la lógica de negocio para una plataforma de gestión sanitaria y turnos municipales, transformando reportes geolocalizados en tableros de indicadores (KPIs) y mapas de calor para optimizar la asignación de recursos operativos.")
            ]
        },
        {
            "empresa": "Appy Studios",
            "rol": "Analista Técnico-Funcional, Migración de Datos & Soporte de Aplicaciones L2",
            "right": "Coronel Pringles, Buenos Aires • Jun 2025 – Dic 2025",
            "bullets": [
                ("Implementación de Sistemas POS y Migración de Catálogos Comerciales",
                 "Parametricé y desplegué sistemas de Punto de Venta (POS) y gestión de inventario para comercios minoristas (leñeras, pinturerías, jugueterías), ejecutando la limpieza, normalización e importación masiva de padrones de artículos, variantes y listas de precios mediante Excel avanzado y SQL."),
                ("Soporte de Aplicaciones Nivel 2 (L2) y Diagnóstico en Base de Datos",
                 "Resolví incidencias operativas en producción auditando registros mediante consultas SQL (detección de transacciones incompletas con LEFT JOIN y saneamiento seguro bajo transacciones BEGIN/ROLLBACK), análisis de logs de servidor y validación de endpoints REST con Postman."),
                ("Relevamiento Funcional y Estandarización de Circuitos (P2P / OTC)",
                 "Relevé requerimientos con dueños de comercios y redacté especificaciones funcionales, diagramas de flujo (BPMN) y criterios de aceptación para alinear los circuitos de compras, remitos, facturación y conciliación de tesorería entre tiendas físicas y catálogos web.")
            ]
        }
    ]

    bullet_indent = 12.0
    text_width = USABLE_WIDTH - bullet_indent

    for exp in exps:
        right_w = get_text_width(exp["right"], 7.8, False)
        right_x = PAGE_WIDTH - MARGIN_RIGHT - right_w

        comp_text = exp["empresa"]
        role_text = exp["rol"]
        comp_w = get_text_width(comp_text, 9.2, True)
        role_w = get_text_width(f" |  {role_text}", 8.6, False)
        max_role_w = right_x - (MARGIN_LEFT + comp_w + 4) - 10

        if role_w <= max_role_w:
            draw_text(MARGIN_LEFT, y, comp_text, "F2", 9.2, 0.02, 0.02, 0.02)
            draw_text(MARGIN_LEFT + comp_w + 4, y, f" |  {role_text}", "F3", 8.6, 0.2, 0.2, 0.2)
            draw_text(right_x, y, exp["right"], "F1", 7.8, 0.35, 0.35, 0.35)
            y -= 11.2
        else:
            # 2 Líneas: NUNCA truncar con "..."
            draw_text(MARGIN_LEFT, y, comp_text, "F2", 9.2, 0.02, 0.02, 0.02)
            draw_text(right_x, y, exp["right"], "F1", 7.8, 0.35, 0.35, 0.35)
            y -= 10.6

            for r_line in wrap_words(role_text, USABLE_WIDTH, 8.6, False):
                draw_text(MARGIN_LEFT, y, r_line, "F3", 8.6, 0.2, 0.2, 0.2)
                y -= 10.2

        for sub, desc in exp["bullets"]:
            sub_prefix = f"{sub}: "
            sub_w = get_text_width(sub_prefix, 8.0, True)
            sp_w = get_text_width(" ", 8.0, False)

            desc_words = [w for w in desc.split() if w]
            remaining_w_line1 = text_width - sub_w

            line1_words = []
            cur_w = 0.0
            w_idx = 0

            while w_idx < len(desc_words):
                w = desc_words[w_idx]
                w_w = get_text_width(w, 8.0, False)
                needed = w_w if not line1_words else sp_w + w_w
                if cur_w + needed <= remaining_w_line1:
                    line1_words.append(w)
                    cur_w += needed
                    w_idx += 1
                else:
                    break

            # Dibujar viñeta y línea 1
            draw_text(MARGIN_LEFT, y, "•", "F1", 8.0, 0.3, 0.3, 0.3)
            draw_text(MARGIN_LEFT + bullet_indent, y, sub_prefix, "F2", 8.0, 0.05, 0.05, 0.05)
            if line1_words:
                draw_text(MARGIN_LEFT + bullet_indent + sub_w, y, " ".join(line1_words), "F1", 8.0, 0.15, 0.15, 0.15)
            y -= 9.8

            # Líneas restantes de la viñeta
            if w_idx < len(desc_words):
                rest_text = " ".join(desc_words[w_idx:])
                for r_line in wrap_words(rest_text, text_width, 8.0, False):
                    draw_text(MARGIN_LEFT + bullet_indent, y, r_line, "F1", 8.0, 0.15, 0.15, 0.15)
                    y -= 9.8
            y -= 1.2
        y -= 3.0

    # 4. EDUCACIÓN
    section_header("Educación")
    edus = [
        ("Universidad Siglo 21", "Licenciatura en Administración de Empresas (Equiv. Regional: Ingeniería Comercial / Control de Gestión / Grado ADE)", "", "Mar 2023 – Presente"),
        ("Universidad Tecnológica Nacional (UTN)", "Técnico Universitario en Programación (Equiv. Regional: Analista Programador / Tecnólogo en Sistemas / DAM)", "", "2026"),
        ("Escuela de Educación Secundaria Técnica N°1", "Técnico Electromecánico", "(Graduado)", "2012 – 2018"),
    ]

    for inst, tit, est, per in edus:
        right_w = get_text_width(per, 7.8, False)
        right_x = PAGE_WIDTH - MARGIN_RIGHT - right_w

        inst_w = get_text_width(inst, 8.6, True)
        deg_str = " |  " + " • ".join([tit, est]).strip(" • ") if est else f" |  {tit}"
        deg_w = get_text_width(deg_str, 8.2, False)
        avail_w = right_x - (MARGIN_LEFT + inst_w + 4) - 10

        if deg_w <= avail_w:
            draw_text(MARGIN_LEFT, y, inst, "F2", 8.6, 0.05, 0.05, 0.05)
            draw_text(MARGIN_LEFT + inst_w + 4, y, deg_str, "F3", 8.2, 0.15, 0.15, 0.15)
            draw_text(right_x, y, per, "F1", 7.8, 0.3, 0.3, 0.3)
            y -= 11.0
        else:
            # 2 Líneas: Institución y fecha arriba, Título abajo (NUNCA superponer sobre fecha)
            draw_text(MARGIN_LEFT, y, inst, "F2", 8.6, 0.05, 0.05, 0.05)
            draw_text(right_x, y, per, "F1", 7.8, 0.3, 0.3, 0.3)
            y -= 10.6

            full_tit = " • ".join([tit, est]).strip(" • ") if est else tit
            for d_line in wrap_words(full_tit, USABLE_WIDTH, 8.2, False):
                draw_text(MARGIN_LEFT, y, d_line, "F3", 8.2, 0.15, 0.15, 0.15)
                y -= 9.8
    y -= 3.0

    # 5. HABILIDADES TÉCNICAS Y OPERATIVAS
    section_header("Habilidades Técnicas y Operativas")
    skills = [
        ("Bases de Datos, BI & Análisis de Datos", "SQL Avanzado (PostgreSQL / MS SQL Server: JOINs, GROUP BY, HAVING, CTEs, Window Functions, Vistas), Excel Avanzado para Gestión (Power Query, BUSCARX / XLOOKUP, SUMAR.SI.CONJUNTO, Tablas Dinámicas), Python para Datos (Pandas, NumPy, Limpieza de CSV/Excel, Cruces y Automatización de Reportes), Business Intelligence & Visualización (Power BI, Modelado Estrella, Streamlit), Migración y Gobernanza de Datos (Tablas de Staging en VARCHAR, External IDs, Cuadraturas)"),
        ("Control de Gestión, ERP & Circuitos de Negocio", "Circuitos Comerciales Integrales (Procure-to-Pay / Compras-Stock-Pagos y Order-to-Cash / Ventas-Cobranzas), Contabilidad Transaccional (Partida Doble Debe/Haber, Conciliación de Cajas, Bancos, Mercado Pago y eCheqs), Costos y Rentabilidad (Escandallo / Recetas BOM, Costo de Reposición, Margen de Contribución, Mermas y Variaciones), Normativa y Sistemas ERP (Facturación Electrónica ARCA CAE/CAI, IVA, Retenciones/Percepciones, Odoo, Tango Gestión), Análisis Funcional (Relevamiento de Procesos BPMN, Historias de Usuario, Criterios de Aceptación, Soporte L2)"),
        ("Automatización, Integraciones & Herramientas IT", "Orquestación de Procesos y RPA (n8n, Webhooks, Automatización de Flujos Operativos), Diagnóstico e Integración de APIs REST (Postman, Payloads JSON, Manejo de Errores HTTP y Logs), Desarrollo Backend & Internal Tools (Python, FastAPI, Validación Determinista con Pydantic, TypeScript), IA Aplicada a Operaciones (Extracción Estructurada de Documentos/Facturas con Validación Matemática), Prácticas de Ingeniería y Seguridad (Git / GitHub Pull Requests, Transacciones ACID BEGIN/ROLLBACK, Variables .env, Docker básico)"),
    ]

    for cat_name, items_str in skills:
        prefix = f"• {cat_name}: "
        pref_w = get_text_width(prefix, 8.0, True)
        sp_w = get_text_width(" ", 8.0, False)
        words = items_str.split()

        line1_max = USABLE_WIDTH - pref_w
        line1_words = []
        cur_w = 0.0
        w_idx = 0

        while w_idx < len(words):
            w = words[w_idx]
            w_w = get_text_width(w, 8.0, False)
            needed = w_w if not line1_words else sp_w + w_w
            if cur_w + needed <= line1_max:
                line1_words.append(w)
                cur_w += needed
                w_idx += 1
            else:
                break

        draw_text(MARGIN_LEFT, y, prefix, "F2", 8.0, 0.05, 0.05, 0.05)
        if line1_words:
            draw_text(MARGIN_LEFT + pref_w, y, " ".join(line1_words), "F1", 8.0, 0.15, 0.15, 0.15)
        y -= 9.8

        if w_idx < len(words):
            rest_lines = wrap_words(" ".join(words[w_idx:]), USABLE_WIDTH - 12.0, 8.0, False)
            for r_l in rest_lines:
                draw_text(MARGIN_LEFT + 12.0, y, r_l, "F1", 8.0, 0.15, 0.15, 0.15)
                y -= 9.8
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
