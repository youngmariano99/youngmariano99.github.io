"""
Generador de PDF ATS de 1 Columna para Mariano Young
Produce un archivo PDF 1.4 estándar, 100% compliant con parsers ATS y lectores de PDF,
con texto seleccionable, fuentes Helvetica Type 1 en WinAnsiEncoding, y ajuste estricto a 1 página A4.
"""

import os
import re

# Ancho y alto de A4 en puntos (72 puntos por pulgada)
PAGE_WIDTH = 595.28
PAGE_HEIGHT = 841.89

# Márgenes
MARGIN_LEFT = 36.0
MARGIN_RIGHT = 36.0
MARGIN_TOP = 36.0
MARGIN_BOTTOM = 36.0
USABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

# Anchos aproximados de caracteres para Helvetica y Helvetica-Bold (fracción de em)
AVG_CHAR_WIDTH_REGULAR = 0.52
AVG_CHAR_WIDTH_BOLD = 0.56

def escape_pdf_text(text: str) -> str:
    """Escapa caracteres especiales para cadenas literales PDF en WinAnsi (cp1252)."""
    # Reemplazos de caracteres no soportados o especiales
    replacements = {
        '–': '-',
        '—': '-',
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        '…': '...',
        '•': '*',
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    # Convertir a bytes cp1252 y escapar para PDF
    res = []
    for char in text:
        try:
            b = char.encode('cp1252')
            byte_val = b[0]
            if char in ('\\', '(', ')'):
                res.append('\\' + char)
            elif 32 <= byte_val <= 126:
                res.append(char)
            else:
                res.append(f'\\{byte_val:03o}')
        except UnicodeEncodeError:
            res.append('?')
    return "".join(res)

def wrap_text(text: str, max_width_pt: float, font_size_pt: float, is_bold: bool = False) -> list[str]:
    """Envuelve texto en múltiples líneas según el ancho disponible."""
    char_width = (AVG_CHAR_WIDTH_BOLD if is_bold else AVG_CHAR_WIDTH_REGULAR) * font_size_pt
    words = text.split(" ")
    lines = []
    current_line = []
    current_width = 0.0

    for word in words:
        word_width = len(word) * char_width
        space_width = char_width
        if not current_line:
            current_line.append(word)
            current_width = word_width
        else:
            if current_width + space_width + word_width <= max_width_pt:
                current_line.append(word)
                current_width += space_width + word_width
            else:
                lines.append(" ".join(current_line))
                current_line = [word]
                current_width = word_width

    if current_line:
        lines.append(" ".join(current_line))
    return lines

def generate_pdf() -> bytes:
    # Buffer de comandos del contenido gráfico / texto
    stream_cmds = []

    # Estado actual del cursor Y (empezando arriba)
    y = PAGE_HEIGHT - MARGIN_TOP

    def draw_line(y_pos: float, width_pt: float = 0.5, gray: float = 0.7):
        stream_cmds.append(f"{width_pt:.2f} w")
        stream_cmds.append(f"{gray:.2f} {gray:.2f} {gray:.2f} RG")
        stream_cmds.append(f"{MARGIN_LEFT:.2f} {y_pos:.2f} m {PAGE_WIDTH - MARGIN_RIGHT:.2f} {y_pos:.2f} l S")

    def draw_text(x: float, y_pos: float, text: str, font_id: str, font_size: float, r=0.08, g=0.08, b=0.08):
        escaped = escape_pdf_text(text)
        stream_cmds.append("BT")
        stream_cmds.append(f"/{font_id} {font_size:.2f} Tf")
        stream_cmds.append(f"{r:.2f} {g:.2f} {b:.2f} rg")
        stream_cmds.append(f"1 0 0 1 {x:.2f} {y_pos:.2f} Tm")
        stream_cmds.append(f"({escaped}) Tj")
        stream_cmds.append("ET")

    def draw_text_right(y_pos: float, text: str, font_id: str, font_size: float, is_bold=False, r=0.25, g=0.25, b=0.25):
        escaped = escape_pdf_text(text)
        char_w = (AVG_CHAR_WIDTH_BOLD if is_bold else AVG_CHAR_WIDTH_REGULAR) * font_size
        text_w = len(text) * char_w
        x = (PAGE_WIDTH - MARGIN_RIGHT) - text_w
        stream_cmds.append("BT")
        stream_cmds.append(f"/{font_id} {font_size:.2f} Tf")
        stream_cmds.append(f"{r:.2f} {g:.2f} {b:.2f} rg")
        stream_cmds.append(f"1 0 0 1 {x:.2f} {y_pos:.2f} Tm")
        stream_cmds.append(f"({escaped}) Tj")
        stream_cmds.append("ET")

    def section_header(title: str):
        nonlocal y
        y -= 7
        draw_text(MARGIN_LEFT, y, title.upper(), "F2", 9.5, r=0.05, g=0.05, b=0.05)
        y -= 3
        draw_line(y, width_pt=0.75, gray=0.15)
        y -= 9

    # =========================================================================
    # 1. ENCABEZADO
    # =========================================================================
    # Nombre
    draw_text(MARGIN_LEFT, y, "MARIANO YOUNG", "F2", 18.0, r=0.02, g=0.02, b=0.02)
    y -= 13

    # Rol
    draw_text(MARGIN_LEFT, y, "Técnico Universitario en Programación (UTN) & Estudiante Avanzado Lic. en Administración (Siglo 21)", "F1", 9.0, r=0.2, g=0.2, b=0.2)
    y -= 12

    # Contacto
    contact_line = "marianoyoung.dev@gmail.com   |   +54 9 2923 511691   |   Coronel Pringles, Buenos Aires   |   nodexalanding.vercel.app/portfolio   |   linkedin.com/in/mariano-young-016a0b23b"
    draw_text(MARGIN_LEFT, y, contact_line, "F1", 7.8, r=0.35, g=0.35, b=0.35)
    y -= 4
    draw_line(y, width_pt=0.5, gray=0.8)
    y -= 4

    # =========================================================================
    # 2. RESUMEN EJECUTIVO
    # =========================================================================
    section_header("Resumen Ejecutivo")
    resumen_text = (
        "Técnico Universitario en Programación (UTN) y estudiante avanzado de Licenciatura en Administración "
        "de Empresas (Siglo 21). Especializado en el análisis de procesos comerciales, parametrización de "
        "sistemas y modelado relacional en SQL. Cuento con experiencia práctica en la implementación de "
        "soluciones de gestión modulares en producción, bases de datos y soporte técnico a usuarios, "
        "integrando lógica de negocio con resolución de incidentes (APIs, logs)."
    )
    for line in wrap_text(resumen_text, USABLE_WIDTH, 8.5):
        draw_text(MARGIN_LEFT, y, line, "F1", 8.5, r=0.15, g=0.15, b=0.15)
        y -= 11.0

    # =========================================================================
    # 3. EXPERIENCIA PROFESIONAL
    # =========================================================================
    section_header("Experiencia Profesional")

    # --- Puesto 1: Nodexa Software ---
    draw_text(MARGIN_LEFT, y, "Nodexa Software", "F2", 9.5, r=0.02, g=0.02, b=0.02)
    # Calculamos desplazamiento para el rol
    w_empresa = len("Nodexa Software") * (AVG_CHAR_WIDTH_BOLD * 9.5)
    draw_text(MARGIN_LEFT + w_empresa + 5, y, "|  Desarrollador de Software e Implementador de Sistemas", "F3", 9.0, r=0.2, g=0.2, b=0.2)
    draw_text_right(y, "Coronel Pringles, Bs. As. • Jul 2026 – Presente", "F1", 8.0, r=0.35, g=0.35, b=0.35)
    y -= 12.0

    nodexa_bullets = [
        ("Diseño e Implementación de Sistema de Gestión (Nodexa Core)",
         "Desarrollé un sistema modular para comercios y gastronomía sobre PostgreSQL, estructurando el registro transaccional de entradas y salidas de caja (bajo lógica de partida doble) para asegurar la trazabilidad del 100% de las operaciones y evitar descuadres."),
        ("Control de Inventario y Costos por Receta",
         "Implementé el módulo de control de stock automatizado mediante desglose de recetas e insumos, descontando transaccionalmente las materias primas al despachar comandas desde tableros Kanban."),
        ("Automatización e Integración con IA",
         "Construí flujos de extracción de datos de productos mediante fotografías utilizando modelos de visión artificial e integración con APIs REST para agilizar la carga y actualización de listas de precios."),
        ("Gestión Municipal (Patitas en Alerta)",
         "Modelé la arquitectura relacional (SQL) para una plataforma de zoonosis, canalizando reportes geolocalizados hacia tableros analíticos y mapas de calor para optimizar la asignación de turnos y recursos públicos.")
    ]

    bullet_indent = 12.0
    text_width = USABLE_WIDTH - bullet_indent

    for subtitulo, desc in nodexa_bullets:
        full_text = f"{subtitulo}: {desc}"
        lines = wrap_text(full_text, text_width, 8.2)
        for i, line in enumerate(lines):
            if i == 0:
                draw_text(MARGIN_LEFT, y, "*", "F2", 8.5, r=0.2, g=0.2, b=0.2)
                # Separar subtítulo y descripción si entra
                if line.startswith(subtitulo + ":"):
                    rest = line[len(subtitulo) + 1:]
                    draw_text(MARGIN_LEFT + bullet_indent, y, subtitulo + ":", "F2", 8.2, r=0.05, g=0.05, b=0.05)
                    w_sub = (len(subtitulo) + 1) * (AVG_CHAR_WIDTH_BOLD * 8.2)
                    draw_text(MARGIN_LEFT + bullet_indent + w_sub + 3, y, rest, "F1", 8.2, r=0.15, g=0.15, b=0.15)
                else:
                    draw_text(MARGIN_LEFT + bullet_indent, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            else:
                draw_text(MARGIN_LEFT + bullet_indent, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            y -= 10.2
        y -= 2.0

    y -= 4.0

    # --- Puesto 2: Appy Studios ---
    draw_text(MARGIN_LEFT, y, "Appy Studios", "F2", 9.5, r=0.02, g=0.02, b=0.02)
    w_empresa = len("Appy Studios") * (AVG_CHAR_WIDTH_BOLD * 9.5)
    draw_text(MARGIN_LEFT + w_empresa + 5, y, "|  Analista Técnico-Funcional & Soporte L2 (Freelance)", "F3", 9.0, r=0.2, g=0.2, b=0.2)
    draw_text_right(y, "Coronel Pringles, Bs. As. • Jul 2025 – Jul 2026", "F1", 8.0, r=0.35, g=0.35, b=0.35)
    y -= 12.0

    appy_bullets = [
        ("Implementación de Sistemas POS",
         "Parametricé y desplegué sistemas de Punto de Venta (POS) y control de stock para comercios locales (leñeras, jugueterías, pinturerías), asegurando la sincronización de inventarios y la conciliación diaria de cajas."),
        ("Análisis y Documentación",
         "Elaboré especificaciones funcionales y diagramas de flujo para estandarizar procesos de compras y cobranzas, centralizando la operativa física y digital de los clientes."),
        ("Soporte Operativo",
         "Brindé soporte de nivel 2 resolviendo incidencias, diagnosticando errores en bases de datos relacionales y aplicando correcciones sobre plataformas de e-commerce y catálogos web.")
    ]

    for subtitulo, desc in appy_bullets:
        full_text = f"{subtitulo}: {desc}"
        lines = wrap_text(full_text, text_width, 8.2)
        for i, line in enumerate(lines):
            if i == 0:
                draw_text(MARGIN_LEFT, y, "*", "F2", 8.5, r=0.2, g=0.2, b=0.2)
                if line.startswith(subtitulo + ":"):
                    rest = line[len(subtitulo) + 1:]
                    draw_text(MARGIN_LEFT + bullet_indent, y, subtitulo + ":", "F2", 8.2, r=0.05, g=0.05, b=0.05)
                    w_sub = (len(subtitulo) + 1) * (AVG_CHAR_WIDTH_BOLD * 8.2)
                    draw_text(MARGIN_LEFT + bullet_indent + w_sub + 3, y, rest, "F1", 8.2, r=0.15, g=0.15, b=0.15)
                else:
                    draw_text(MARGIN_LEFT + bullet_indent, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            else:
                draw_text(MARGIN_LEFT + bullet_indent, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            y -= 10.2
        y -= 2.0

    # =========================================================================
    # 4. EDUCACIÓN
    # =========================================================================
    section_header("Educación")
    educacion_items = [
        ("Universidad Siglo 21", "Licenciatura en Administración de Empresas", "(Cursando último año - 4to año)", "Mar 2023 – Presente"),
        ("Universidad Tecnológica Nacional (UTN)", "Técnico Universitario en Programación", "(Graduado)", "2026"),
        ("Escuela de Educación Secundaria Técnica N°1", "Técnico Electromecánico", "(Graduado)", "2012 – 2018"),
    ]

    for inst, titulo, estado, periodo in educacion_items:
        draw_text(MARGIN_LEFT, y, inst, "F2", 8.5, r=0.05, g=0.05, b=0.05)
        w_inst = len(inst) * (AVG_CHAR_WIDTH_BOLD * 8.5)
        draw_text(MARGIN_LEFT + w_inst + 4, y, f"|  {titulo}", "F3", 8.5, r=0.15, g=0.15, b=0.15)
        w_tit = (len(titulo) + 3) * (AVG_CHAR_WIDTH_REGULAR * 8.5)
        draw_text(MARGIN_LEFT + w_inst + w_tit + 8, y, f"•  {estado}", "F1", 8.0, r=0.4, g=0.4, b=0.4)
        draw_text_right(y, periodo, "F1", 8.0, r=0.3, g=0.3, b=0.3)
        y -= 11.5

    # =========================================================================
    # 5. HABILIDADES TÉCNICAS Y OPERATIVAS
    # =========================================================================
    section_header("Habilidades Técnicas y Operativas")
    habilidades_items = [
        ("Bases de Datos & Datos", "PostgreSQL, SQL (Consultas SELECT, JOINs, Agregaciones, Vistas, Modelado Relacional DER), Hojas de Cálculo (Excel / Google Sheets)"),
        ("Sistemas & Procesos de Negocio", "Relevamiento Funcional, Sistemas POS y Gestión Comercial (ERP), Control de Stock y Recetas, Conciliación de Caja, Diagramación de Flujos, Lógica Contable (Partida Doble)"),
        ("Desarrollo & Integraciones", "Lógica Backend, Consumo de APIs REST (JSON), Integración de APIs de IA, JavaScript / TypeScript, Python (Básico / Scripting), Git"),
    ]

    for cat_name, items_str in habilidades_items:
        prefix = f"* {cat_name}: "
        draw_text(MARGIN_LEFT, y, prefix, "F2", 8.2, r=0.05, g=0.05, b=0.05)
        w_pref = len(prefix) * (AVG_CHAR_WIDTH_BOLD * 8.2)
        wrapped_items = wrap_text(items_str, USABLE_WIDTH - w_pref, 8.2)
        for j, line in enumerate(wrapped_items):
            if j == 0:
                draw_text(MARGIN_LEFT + w_pref, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            else:
                draw_text(MARGIN_LEFT + 15.0, y, line, "F1", 8.2, r=0.15, g=0.15, b=0.15)
            y -= 10.2
        y -= 1.5

    # Ensamblado del archivo PDF-1.4
    content_stream = "\n".join(stream_cmds).encode("latin-1")
    stream_len = len(content_stream)

    objects = []
    # Obj 1: Catalog
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj")
    # Obj 2: Pages
    objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj")
    # Obj 3: Page
    objects.append(
        f"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH:.2f} {PAGE_HEIGHT:.2f}] "
        f"/Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>\nendobj".encode("ascii")
    )
    # Obj 4: Content Stream
    stream_header = f"4 0 obj\n<< /Length {stream_len} >>\nstream\n".encode("ascii")
    stream_footer = b"\nendstream\nendobj"
    objects.append(stream_header + content_stream + stream_footer)
    # Obj 5: Font F1 (Helvetica Regular)
    objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj")
    # Obj 6: Font F2 (Helvetica Bold)
    objects.append(b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj")
    # Obj 7: Font F3 (Helvetica Oblique)
    objects.append(b"7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>\nendobj")

    # Armado final con tabla xref y trailer
    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")

    offsets = []
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)
        pdf.extend(b"\n")

    xref_pos = len(pdf)
    pdf.extend(b"xref\n")
    pdf.extend(f"0 {len(objects) + 1}\n".encode("ascii"))
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets:
        pdf.extend(f"{off:010d} 00000 n \n".encode("ascii"))

    trailer = (
        f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
        f"startxref\n{xref_pos}\n%%EOF\n"
    ).encode("ascii")
    pdf.extend(trailer)

    print(f"Final y position: {y:.2f} pt (Margin bottom: {MARGIN_BOTTOM} pt). Remaining space: {y - MARGIN_BOTTOM:.2f} pt")
    return bytes(pdf)

if __name__ == "__main__":
    pdf_bytes = generate_pdf()
    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "cv-mariano-young.pdf")
    with open(output_path, "wb") as f:
        f.write(pdf_bytes)
    print(f"Generated {output_path} ({len(pdf_bytes)} bytes)")
