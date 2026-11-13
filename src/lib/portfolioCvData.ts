export interface ContactData {
  nombre: string;
  rolWeb: string;
  email: string;
  telefono: string;
  ubicacion: string;
  web: string;
  linkedin: string;
  badgeDisponibilidad: string;
}

export type SummaryVariantKey = "variante-a" | "variante-b" | "custom";

export interface SummaryVariants {
  activeVariant: SummaryVariantKey;
  varianteA: string;
  varianteB: string;
  custom: string;
}

export interface CvBullet {
  id: string;
  subtitulo: string;
  descripcion: string;
  visible: boolean;
}

export interface ExperienceItem {
  id: string;
  empresa: string;
  rol: string;
  ubicacion: string;
  periodo: string;
  visible: boolean;
  bullets: CvBullet[];
}

export interface EducationItem {
  id: string;
  institucion: string;
  titulo: string;
  estado: string;
  periodo: string;
  visible: boolean;
}

export interface SkillCategory {
  id: string;
  nombre: string;
  habilidades: string[];
  visible: boolean;
}

export interface CaseStudyArchitectureItem {
  label: string;
  text: string;
}

export interface CaseStudy {
  id: string;
  titulo: string;
  subtitulo: string;
  estado: string;
  estadoColor?: "emerald" | "blue" | "amber";
  mockupUrl: string;
  mockupLabel: string;
  problema: string;
  arquitectura: {
    intro: string;
    items: CaseStudyArchitectureItem[];
  };
  impacto: string;
  stack: string[];
  activo: boolean;
}

export interface MatrixColumn {
  id: string;
  titulo: string;
  icon: "database" | "boxes" | "bot";
  items: string[];
}

export interface MethodologyCard {
  id: string;
  titulo: string;
  icon: "layers" | "cpu";
  descripcion: string;
}

export interface PortfolioCvData {
  contacto: ContactData;
  resumen: SummaryVariants;
  experiencias: ExperienceItem[];
  educacion: EducationItem[];
  habilidades: SkillCategory[];
  casosEstudio: CaseStudy[];
  matriz: MatrixColumn[];
  metodologia: MethodologyCard[];
}

export const DEFAULT_PORTFOLIO_CV_DATA: PortfolioCvData = {
  contacto: {
    nombre: "Mariano Young",
    rolWeb: "Técnico en Programación (UTN) & Estudiante Avanzado de Lic. en Administración",
    email: "marianoyoung.dev@gmail.com",
    telefono: "+54 9 2923 511691",
    ubicacion: "Coronel Pringles, Buenos Aires, Argentina",
    web: "nodexalanding.vercel.app/portfolio",
    linkedin: "https://www.linkedin.com/in/mariano-young-016a0b23b",
    badgeDisponibilidad: "DISPONIBLE PARA OPORTUNIDADES LABORALES | REMOTO & PRESENCIAL (Coronel Pringles y la zona)",
  },
  resumen: {
    activeVariant: "variante-a",
    varianteA:
      "Técnico Universitario en Programación (UTN) y estudiante avanzado de Licenciatura en Administración de Empresas (Siglo 21). Especializado en el análisis de procesos comerciales, parametrización de sistemas y modelado relacional en SQL. Cuento con experiencia práctica en la implementación de soluciones de gestión modulares en producción, bases de datos y soporte técnico a usuarios, integrando lógica de negocio con resolución de incidentes (APIs, logs).",
    varianteB:
      "Auxiliar Administrativo y Técnico en Sistemas con doble formación en Programación (UTN) y Administración de Empresas (Siglo 21). Experiencia práctica en gestión de facturación, control de stock e inventarios, conciliación de cajas, hojas de cálculo y soporte operativo de sistemas comerciales. Busco aportar orden administrativo y resolución técnica en las operaciones diarias de la empresa.",
    custom:
      "Perfil híbrido técnico-administrativo enfocado en el \"detrás de escena\" de las organizaciones: lógica de negocio, bases de datos relacionales, sistemas de gestión (ERP) y optimización de procesos operativos. Combino la formación en desarrollo de software con la visión de costos, circuitos comerciales y control interno para construir e implementar herramientas que ahorran tiempo, ordenan la operación y transforman datos sueltos en información para tomar decisiones.",
  },
  experiencias: [
    {
      id: "exp-nodexa",
      empresa: "Nodexa Software",
      rol: "Desarrollador de Software e Implementador de Sistemas",
      ubicacion: "Coronel Pringles, Buenos Aires",
      periodo: "Jul 2026 – Presente",
      visible: true,
      bullets: [
        {
          id: "exp-nodexa-1",
          subtitulo: "Diseño e Implementación de Sistema de Gestión (Nodexa Core)",
          descripcion:
            "Desarrollé un sistema modular para comercios y gastronomía sobre PostgreSQL, estructurando el registro transaccional de entradas y salidas de caja (bajo lógica de partida doble) para asegurar la trazabilidad del 100% de las operaciones y evitar descuadres.",
          visible: true,
        },
        {
          id: "exp-nodexa-2",
          subtitulo: "Control de Inventario y Costos por Receta",
          descripcion:
            "Implementé el módulo de control de stock automatizado mediante desglose de recetas e insumos, descontando transaccionalmente las materias primas al despachar comandas desde tableros Kanban.",
          visible: true,
        },
        {
          id: "exp-nodexa-3",
          subtitulo: "Automatización e Integración con IA",
          descripcion:
            "Construí flujos de extracción de datos de productos mediante fotografías utilizando modelos de visión artificial e integración con APIs REST para agilizar la carga y actualización de listas de precios.",
          visible: true,
        },
        {
          id: "exp-nodexa-4",
          subtitulo: "Gestión Municipal (Patitas en Alerta)",
          descripcion:
            "Modelé la arquitectura relacional (SQL) para una plataforma de zoonosis, canalizando reportes geolocalizados hacia tableros analíticos y mapas de calor para optimizar la asignación de turnos y recursos públicos.",
          visible: true,
        },
      ],
    },
    {
      id: "exp-appy",
      empresa: "Appy Studios",
      rol: "Analista Técnico-Funcional & Soporte L2 (Freelance)",
      ubicacion: "Coronel Pringles, Buenos Aires",
      periodo: "Jul 2025 – Jul 2026",
      visible: true,
      bullets: [
        {
          id: "exp-appy-1",
          subtitulo: "Implementación de Sistemas POS",
          descripcion:
            "Parametricé y desplegué sistemas de Punto de Venta (POS) y control de stock para comercios locales (leñeras, jugueterías, pinturerías), asegurando la sincronización de inventarios y la conciliación diaria de cajas.",
          visible: true,
        },
        {
          id: "exp-appy-2",
          subtitulo: "Análisis y Documentación",
          descripcion:
            "Elaboré especificaciones funcionales y diagramas de flujo para estandarizar procesos de compras y cobranzas, centralizando la operativa física y digital de los clientes.",
          visible: true,
        },
        {
          id: "exp-appy-3",
          subtitulo: "Soporte Operativo",
          descripcion:
            "Brindé soporte de nivel 2 resolviendo incidencias, diagnosticando errores en bases de datos relacionales y aplicando correcciones sobre plataformas de e-commerce y catálogos web.",
          visible: true,
        },
      ],
    },
  ],
  educacion: [
    {
      id: "edu-siglo21",
      institucion: "Universidad Siglo 21",
      titulo: "Licenciatura en Administración de Empresas",
      estado: "Cursando último año (4to año)",
      periodo: "Mar 2023 – Presente",
      visible: true,
    },
    {
      id: "edu-utn",
      institucion: "Universidad Tecnológica Nacional (UTN)",
      titulo: "Técnico Universitario en Programación",
      estado: "Graduado",
      periodo: "2026",
      visible: true,
    },
    {
      id: "edu-tecnica1",
      institucion: "Escuela de Educación Secundaria Técnica N°1",
      titulo: "Técnico Electromecánico",
      estado: "Graduado",
      periodo: "2012 – 2018",
      visible: true,
    },
  ],
  habilidades: [
    {
      id: "hab-db",
      nombre: "Bases de Datos & Datos",
      habilidades: [
        "PostgreSQL",
        "SQL (Consultas SELECT, JOINs, Agregaciones, Vistas, Modelado Relacional DER)",
        "Hojas de Cálculo (Excel / Google Sheets)",
      ],
      visible: true,
    },
    {
      id: "hab-procesos",
      nombre: "Sistemas & Procesos de Negocio",
      habilidades: [
        "Relevamiento Funcional",
        "Sistemas POS y Gestión Comercial (ERP)",
        "Control de Stock y Recetas",
        "Conciliación de Caja",
        "Diagramación de Flujos",
        "Lógica Contable (Partida Doble)",
      ],
      visible: true,
    },
    {
      id: "hab-dev",
      nombre: "Desarrollo & Integraciones",
      habilidades: [
        "Lógica Backend",
        "Consumo de APIs REST (JSON)",
        "Integración de APIs de IA",
        "JavaScript / TypeScript",
        "Python (Básico / Scripting)",
        "Git",
      ],
      visible: true,
    },
  ],
  casosEstudio: [
    {
      id: "caso-nodexa-core",
      titulo: 'Nodexa Core (Implementación real: "May Delicias")',
      subtitulo: "Sistema Modular de Gestión Comercial, Stock por Recetas y Caja",
      estado: "En Producción | Caso Real Gastronómico",
      estadoColor: "emerald",
      mockupUrl: "/Proyectos/nodexa-core-maydelicias.jpg",
      mockupLabel: "maydelicias.nodexa.app",
      problema:
        "Los comercios gastronómicos y minoristas locales suelen operar con pedidos desordenados por WhatsApp y anotaciones en cuadernos de papel. Esto genera demoras en horas pico, desconocimiento del costo real por variación de precios de insumos y falta de datos históricos para predecir cuánta mercadería comprar para el fin de semana.",
      arquitectura: {
        intro: "Desarrollé un sistema web modular sobre una base de datos relacional en PostgreSQL.",
        items: [
          {
            label: "Captación sin fricción",
            text: "Catálogo digital que estructura el pedido del cliente y lo envía pre-formateado a un tablero Kanban de comandas en cocina/mostrador.",
          },
          {
            label: "Control de Stock y Recetas",
            text: "Descuento transaccional de insumos y materias primas a partir de las recetas de cada producto vendido.",
          },
          {
            label: "Registro Contable y Carga con IA",
            text: "Estructura de caja inspirada en principios de partida doble para evitar descuadres, sumado a una integración con API de IA para agilizar el alta de productos a partir de fotografías.",
          },
        ],
      },
      impacto:
        "Eliminación del papel en la toma de pedidos, centralización del control de caja e inventario en tiempo real y generación de una base de datos limpia que permite analizar qué productos dejan mayor margen y en qué días se concentra la demanda.",
      stack: [
        "PostgreSQL",
        "SQL Relacional",
        "Lógica de Partida Doble",
        "Explosión de Insumos/Recetas",
        "API REST + IA",
        "Next.js / TypeScript",
      ],
      activo: true,
    },
    {
      id: "caso-patitas",
      titulo: "Patitas en Alerta",
      subtitulo: "Plataforma Integral de Gestión de Turnos, Trazabilidad y Estadísticas para Zoonosis y Comunidad",
      estado: "Proyecto Integral | Gestión Pública y Comunitaria",
      estadoColor: "blue",
      mockupUrl: "/patitas-preview.png",
      mockupLabel: "patitas.nodexa.app",
      problema:
        "La gestión de animales perdidos en ciudades chicas depende de publicaciones sueltas en redes sociales sin trazabilidad, mientras que los turnos municipales de castración y las libretas sanitarias se manejan en papel, saturando de tareas administrativas a veterinarios, municipios y ONGs.",
      arquitectura: {
        intro:
          "Diseñé una plataforma centralizada que conecta a los distintos actores (Municipio/Zoonosis, Veterinarias, ONGs y Vecinos) sobre un mismo modelo de datos:",
        items: [
          {
            label: "Tablero de Datos y Mapa de Calor",
            text: "Captura estructurada de reportes geolocalizados que transforma reclamos aislados en estadísticas visuales y mapas de calor para que el área de Zoonosis tome decisiones basadas en datos.",
          },
          {
            label: "Turnero Digital y Libreta Sanitaria",
            text: "Sistema de reserva y administración de turnos para campañas de castración e historial clínico digital unificado.",
          },
          {
            label: "Algoritmo de Compatibilidad",
            text: "Cruce lógico por puntaje entre las condiciones del adoptante y las necesidades del animal para promover adopciones responsables.",
          },
        ],
      },
      impacto:
        "Estandarización de procesos que antes se hacían por teléfono o en planillas sueltas, reducción del desgaste administrativo de las ONGs y creación de una base estadística preparada para escalar hacia análisis predictivo.",
      stack: [
        "Modelado de Datos SQL",
        "Dashboard & Mapas de Calor",
        "Gestión de Turnos",
        "Lógica Algorítmica",
        "Relevamiento Funcional",
      ],
      activo: true,
    },
    {
      id: "caso-appy",
      titulo: "Experiencia Previa en Equipo (Appy Studios) & Sistemas Comerciales",
      subtitulo: "Sistemas POS, Control de Stock Minorista y Marketplace de Servicios",
      estado: "6 Meses en Equipo Freelance | Comercio Local",
      estadoColor: "amber",
      mockupUrl: "/Proyectos/Proyecto3LeñeraChingolitosParte2.png",
      mockupLabel: "pos.lenera.local",
      problema:
        "Comercios tradicionales de distintos rubros (leñera, pinturería, juguetería/librería) y prestadores de servicios locales necesitaban digitalizar sus catálogos, agilizar el cobro en mostrador y sincronizar su stock sin depender de sistemas corporativos complejos de usar.",
      arquitectura: {
        intro:
          "Trabajando en equipo con dos colegas desarrolladores, participamos en el relevamiento con los dueños de cada comercio, el diseño de las bases de datos y la implementación de:",
        items: [
          {
            label: "Sistema POS y Stock (Leñera)",
            text: "Control de entradas/salidas de mercadería, registro de ventas en mostrador y cierre de caja diario.",
          },
          {
            label: "Catálogos Web Transaccionales (Juguetería y Pinturería)",
            text: "Organización de cientos de artículos por categorías con pedidos directos a WhatsApp.",
          },
          {
            label: "Argoot (Marketplace de Servicios)",
            text: "Plataforma para conectar oferta y demanda de servicios locales.",
          },
        ],
      },
      impacto:
        "Experiencia real de trato con clientes comerciales, entendimiento de las limitaciones tecnológicas del usuario de mostrador (diseño de interfaces de pocos clics) y soporte post-implementación.",
      stack: [
        "Sistemas POS",
        "Control de Inventario",
        "Relevamiento con Clientes",
        "Soporte Operativo",
        "Trabajo en Equipo",
      ],
      activo: true,
    },
  ],
  matriz: [
    {
      id: "col-datos",
      titulo: "Datos & Lógica de Sistemas",
      icon: "database",
      items: [
        "Modelado de bases de datos relacionales (PostgreSQL / SQL).",
        "Consultas de diagnóstico y reportes (JOINs, GROUP BY, agregaciones, vistas).",
        "Estructura de datos pensada para trazabilidad histórica y análisis comercial.",
        "Testeo y consumo de APIs REST (JSON, Postman).",
      ],
    },
    {
      id: "col-procesos",
      titulo: "Gestión, Procesos & Visión ERP",
      icon: "boxes",
      items: [
        "Relevamiento funcional de circuitos operativos (Compras ➔ Stock ➔ Ventas ➔ Caja).",
        "Lógica contable de partida doble (Debe/Haber) y control de cuentas corrientes.",
        "Operatoria administrativa de PyMEs (facturación ARCA, remitos, conciliaciones y costos por receta/insumos).",
        "Traducción de problemas cotidianos de usuarios no técnicos a requerimientos de sistema.",
      ],
    },
    {
      id: "col-ia",
      titulo: "Automatización & IA Aplicada",
      icon: "bot",
      items: [
        "Integración de servicios de Inteligencia Artificial (API Vision / LLMs) para acelerar la carga operativa de datos.",
        "Desarrollo ágil asistido por IA enfocado en resolver cuellos de botella reales.",
        "Estructuración de tableros de control e indicadores clave (KPIs) en Excel y herramientas de BI.",
        "En aprendizaje continuo: Orquestación de flujos automatizados (n8n) y analítica predictiva aplicada a negocios.",
      ],
    },
  ],
  metodologia: [
    {
      id: "met-1",
      titulo: "1. Primero entender el problema, después tocar el sistema",
      icon: "layers",
      descripcion:
        "Mi regla principal —tanto al analizar un proceso administrativo como al desarrollar software— es no quedarme con el primer síntoma superficial. Antes de proponer una herramienta, audito cómo entra la información, qué fricciones tiene el usuario que carga los datos y qué necesita ver la gerencia o el dueño al final del día para tomar mejores decisiones.",
    },
    {
      id: "met-2",
      titulo: "2. Los datos como motor de decisiones (Presente y Futuro)",
      icon: "cpu",
      descripcion:
        "No veo a las bases de datos solo como un archivo para guardar comprobantes pasados, sino como una herramienta activa para anticiparse (por ejemplo, cruzar el historial de ventas con variables externas o estacionales para saber cuándo abastecerse o cuándo lanzar una acción comercial). Me encuentro en constante capacitación práctica en SQL, herramientas de automatización (n8n) y Business Intelligence para aportar ese valor analítico desde el primer día.",
    },
  ],
};

const STORAGE_KEY = "nodexa_portfolio_cv_data_v1";
const SYNC_EVENT = "nodexa_portfolio_cv_sync";

import { supabase, isSupabaseConfigured } from "./supabase";

export function getActiveSummary(resumen: SummaryVariants): string {
  if (resumen.activeVariant === "variante-a") return resumen.varianteA;
  if (resumen.activeVariant === "variante-b") return resumen.varianteB;
  return resumen.custom || resumen.varianteA;
}

export function mergeWithDefaults(parsed: any): PortfolioCvData {
  if (!parsed || typeof parsed !== "object") return DEFAULT_PORTFOLIO_CV_DATA;
  return {
    ...DEFAULT_PORTFOLIO_CV_DATA,
    ...parsed,
    contacto: { ...DEFAULT_PORTFOLIO_CV_DATA.contacto, ...(parsed.contacto || {}) },
    resumen: { ...DEFAULT_PORTFOLIO_CV_DATA.resumen, ...(parsed.resumen || {}) },
    experiencias: parsed.experiencias?.length ? parsed.experiencias : DEFAULT_PORTFOLIO_CV_DATA.experiencias,
    educacion: parsed.educacion?.length ? parsed.educacion : DEFAULT_PORTFOLIO_CV_DATA.educacion,
    habilidades: parsed.habilidades?.length ? parsed.habilidades : DEFAULT_PORTFOLIO_CV_DATA.habilidades,
    casosEstudio: parsed.casosEstudio?.length ? parsed.casosEstudio : DEFAULT_PORTFOLIO_CV_DATA.casosEstudio,
    matriz: parsed.matriz?.length ? parsed.matriz : DEFAULT_PORTFOLIO_CV_DATA.matriz,
    metodologia: parsed.metodologia?.length ? parsed.metodologia : DEFAULT_PORTFOLIO_CV_DATA.metodologia,
  };
}

export function loadPortfolioCvData(): PortfolioCvData {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO_CV_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_CV_DATA;
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch (e) {
    console.error("Error al leer portfolioCvData de localStorage:", e);
    return DEFAULT_PORTFOLIO_CV_DATA;
  }
}

export function savePortfolioCvData(data: PortfolioCvData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: data }));

    if (isSupabaseConfigured) {
      supabase
        .from("portfolio_cv_config")
        .upsert({ id: 1, data, updated_at: new Date().toISOString() })
        .then(({ error }) => {
          if (error && error.code !== "PGRST205") {
            // Silencioso si la tabla todavía no fue creada por migración
          }
        });
    }
  } catch (e) {
    console.error("Error al guardar portfolioCvData en localStorage:", e);
  }
}

export function resetPortfolioCvData(): PortfolioCvData {
  savePortfolioCvData(DEFAULT_PORTFOLIO_CV_DATA);
  return DEFAULT_PORTFOLIO_CV_DATA;
}

/**
 * Genera el currículum estructurado bajo el estándar oficial global "JSON Resume"
 * (https://jsonresume.org/schema / Schema v1.0.0).
 * Este es el formato universal utilizado por parsers ATS modernos, sistemas de
 * reclutamiento automatizado, herramientas de IA y plataformas como OpenResume / Reactive Resume.
 */
export function generateJsonResume(data: PortfolioCvData) {
  const activeSummary = getActiveSummary(data.resumen);

  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: data.contacto.nombre,
      label: data.contacto.rolWeb,
      email: data.contacto.email,
      phone: data.contacto.telefono,
      url: data.contacto.web.startsWith("http") ? data.contacto.web : `https://${data.contacto.web}`,
      summary: activeSummary,
      location: {
        address: "",
        postalCode: "B7530",
        city: "Coronel Pringles",
        countryCode: "AR",
        region: "Buenos Aires",
      },
      profiles: [
        {
          network: "LinkedIn",
          username: "mariano-young-016a0b23b",
          url: data.contacto.linkedin,
        },
        {
          network: "Web",
          username: "Nodexa Portfolio",
          url: data.contacto.web.startsWith("http") ? data.contacto.web : `https://${data.contacto.web}`,
        },
      ],
    },
    work: data.experiencias
      .filter((exp) => exp.visible)
      .map((exp) => {
        const bullets = exp.bullets.filter((b) => b.visible);
        return {
          name: exp.empresa,
          position: exp.rol,
          location: exp.ubicacion,
          startDate: exp.periodo.split("–")[0]?.trim() || exp.periodo,
          endDate: exp.periodo.split("–")[1]?.trim() || "Presente",
          summary: `${exp.rol} en ${exp.empresa} (${exp.ubicacion}).`,
          highlights: bullets.map((b) => `${b.subtitulo}: ${b.descripcion}`),
        };
      }),
    education: data.educacion
      .filter((edu) => edu.visible)
      .map((edu) => ({
        institution: edu.institucion,
        area: edu.titulo,
        studyType: edu.titulo.includes("Licenciatura")
          ? "Licenciatura Universitaria"
          : edu.titulo.includes("Técnico Universitario")
          ? "Tecnicatura Universitaria"
          : "Educación Técnica Secundaria",
        startDate: edu.periodo.includes("–") ? edu.periodo.split("–")[0]?.trim() : "",
        endDate: edu.periodo.includes("–") ? edu.periodo.split("–")[1]?.trim() : edu.periodo,
        score: edu.estado,
        courses: [],
      })),
    skills: data.habilidades
      .filter((sk) => sk.visible)
      .map((sk) => ({
        name: sk.nombre,
        level: "Avanzado / Profesional",
        keywords: sk.habilidades,
      })),
    projects: data.casosEstudio
      .filter((c) => c.activo)
      .map((c) => ({
        name: c.titulo,
        description: c.subtitulo,
        highlights: [
          `Problema: ${c.problema}`,
          `Arquitectura: ${c.arquitectura.intro}`,
          ...c.arquitectura.items.map((i) => `${i.label}: ${i.text}`),
          `Impacto: ${c.impacto}`,
        ],
        keywords: c.stack,
        roles: ["Desarrollador / Arquitecto Técnico"],
        entity: "Nodexa Software",
        type: "application",
      })),
    meta: {
      canonical: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
      version: "v1.0.0",
      lastModified: new Date().toISOString(),
      generator: "Nodexa ATS Engine",
    },
  };
}

/**
 * Dispara la descarga directa de un archivo .json con el currículum estandarizado para ATS / IA.
 */
export function downloadJsonResume(data: PortfolioCvData, filename = "CV-Mariano-Young-ATS.json"): void {
  if (typeof window === "undefined") return;
  const jsonContent = JSON.stringify(generateJsonResume(data), null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Dispara la descarga directa del objeto de configuración nativo del Portfolio & CV
 * en formato JSON con indentación limpia.
 */
export function downloadRawJson(data: any, filename = "portfolio-cv-data.json"): void {
  if (typeof window === "undefined") return;
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Valida y normaliza un JSON (string u objeto) para importarlo en el estado de PortfolioCvData.
 * Acepta tanto el formato nativo completo como adaptaciones de JSON Resume.
 */
export function validateAndCleanPortfolioCvData(raw: unknown): {
  success: boolean;
  data?: PortfolioCvData;
  error?: string;
} {
  try {
    let parsed: any = raw;
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (!trimmed) {
        return { success: false, error: "El texto ingresado está vacío." };
      }
      // Limpiar posibles bloques markdown si el usuario pegó ```json ... ```
      const cleaned = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
      parsed = JSON.parse(cleaned);
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        success: false,
        error: "El formato debe ser un objeto JSON válido con llaves principales { ... }.",
      };
    }

    // Adaptador de respaldo: Si viene en formato JSON Resume con "basics"
    if (parsed.basics && !parsed.contacto) {
      const b = parsed.basics;
      const linkedinProfile = Array.isArray(b.profiles)
        ? b.profiles.find((p: any) => p.network?.toLowerCase().includes("linkedin"))?.url || ""
        : "";

      parsed = {
        contacto: {
          nombre: b.name || DEFAULT_PORTFOLIO_CV_DATA.contacto.nombre,
          rolWeb: b.label || DEFAULT_PORTFOLIO_CV_DATA.contacto.rolWeb,
          email: b.email || DEFAULT_PORTFOLIO_CV_DATA.contacto.email,
          telefono: b.phone || DEFAULT_PORTFOLIO_CV_DATA.contacto.telefono,
          ubicacion: b.location ? `${b.location.city || ""}, ${b.location.region || ""}`.trim().replace(/^,|,$/g, "") : DEFAULT_PORTFOLIO_CV_DATA.contacto.ubicacion,
          web: b.url || DEFAULT_PORTFOLIO_CV_DATA.contacto.web,
          linkedin: linkedinProfile || DEFAULT_PORTFOLIO_CV_DATA.contacto.linkedin,
          badgeDisponibilidad: DEFAULT_PORTFOLIO_CV_DATA.contacto.badgeDisponibilidad,
        },
        resumen: {
          activeVariant: "variante-a",
          varianteA: b.summary || DEFAULT_PORTFOLIO_CV_DATA.resumen.varianteA,
          varianteB: DEFAULT_PORTFOLIO_CV_DATA.resumen.varianteB,
          custom: b.summary || DEFAULT_PORTFOLIO_CV_DATA.resumen.custom,
        },
        experiencias: Array.isArray(parsed.work)
          ? parsed.work.map((w: any, idx: number) => ({
              id: `exp-imported-${idx + 1}`,
              empresa: w.name || "Empresa",
              rol: w.position || "Puesto",
              ubicacion: w.location || "Remoto",
              periodo: `${w.startDate || ""} – ${w.endDate || "Presente"}`.trim(),
              visible: true,
              bullets: Array.isArray(w.highlights)
                ? w.highlights.map((h: string, bIdx: number) => {
                    const parts = h.split(":");
                    return {
                      id: `exp-${idx + 1}-b${bIdx + 1}`,
                      subtitulo: parts.length > 1 ? parts[0].trim() : "Logro",
                      descripcion: parts.length > 1 ? parts.slice(1).join(":").trim() : h.trim(),
                      visible: true,
                    };
                  })
                : [],
            }))
          : DEFAULT_PORTFOLIO_CV_DATA.experiencias,
        educacion: Array.isArray(parsed.education)
          ? parsed.education.map((ed: any, idx: number) => ({
              id: `edu-imported-${idx + 1}`,
              institucion: ed.institution || "Institución",
              titulo: ed.area || ed.studyType || "Título",
              estado: ed.score || "Graduado",
              periodo: `${ed.startDate || ""} ${ed.endDate || ""}`.trim() || "Periodo",
              visible: true,
            }))
          : DEFAULT_PORTFOLIO_CV_DATA.educacion,
        habilidades: Array.isArray(parsed.skills)
          ? parsed.skills.map((sk: any, idx: number) => ({
              id: `hab-imported-${idx + 1}`,
              nombre: sk.name || `Categoría ${idx + 1}`,
              habilidades: Array.isArray(sk.keywords) ? sk.keywords : [],
              visible: true,
            }))
          : DEFAULT_PORTFOLIO_CV_DATA.habilidades,
        casosEstudio: DEFAULT_PORTFOLIO_CV_DATA.casosEstudio,
        matriz: DEFAULT_PORTFOLIO_CV_DATA.matriz,
        metodologia: DEFAULT_PORTFOLIO_CV_DATA.metodologia,
      };
    }

    const cleaned = mergeWithDefaults(parsed);
    return { success: true, data: cleaned };
  } catch (err: any) {
    return {
      success: false,
      error: `Error de sintaxis JSON: ${err.message || "Estructura inválida"}`,
    };
  }
}

/**
 * Plantilla documentada con comentarios y estructura oficial para suministrar a modelos de IA.
 */
export const AI_PORTFOLIO_CV_TEMPLATE: PortfolioCvData = {
  contacto: {
    nombre: "Mariano Young",
    rolWeb: "Técnico en Programación (UTN) & Estudiante Avanzado de Lic. en Administración",
    email: "marianoyoung.dev@gmail.com",
    telefono: "+54 9 2923 511691",
    ubicacion: "Coronel Pringles, Buenos Aires, Argentina",
    web: "nodexalanding.vercel.app/portfolio",
    linkedin: "https://www.linkedin.com/in/mariano-young-016a0b23b",
    badgeDisponibilidad: "DISPONIBLE PARA OPORTUNIDADES LABORALES | REMOTO & PRESENCIAL (Coronel Pringles y la zona)",
  },
  resumen: {
    activeVariant: "variante-a", // Opciones permitidas: "variante-a" | "variante-b" | "custom"
    varianteA: "Resumen enfocado en ERP, bases de datos relacionales SQL, lógica de backend y soporte L2.",
    varianteB: "Resumen enfocado en administración tecnológica, circuitos comerciales y control de stock.",
    custom: "Resumen personalizado con visión híbrida tecnología-negocios.",
  },
  experiencias: [
    {
      id: "exp-1",
      empresa: "Nombre de la Empresa",
      rol: "Cargo o Puesto Técnico / Funcional",
      ubicacion: "Ciudad, Provincia / Remoto",
      periodo: "Mes Año – Mes Año (o Presente)",
      visible: true,
      bullets: [
        {
          id: "exp-1-b1",
          subtitulo: "Título corto del logro (se mostrará en negrita en el CV)",
          descripcion: "Descripción técnica orientada a procesos, arquitectura, base de datos e impacto operativo medible.",
          visible: true,
        },
      ],
    },
  ],
  educacion: [
    {
      id: "edu-1",
      institucion: "Nombre de la Universidad o Instituto",
      titulo: "Título Oficial de Grado o Tecnicatura",
      estado: "Graduado / Cursando último año / etc.",
      periodo: "Año Inicio – Año Fin (o Año Egreso)",
      visible: true,
    },
  ],
  habilidades: [
    {
      id: "hab-1",
      nombre: "Nombre de la Categoría Técnica (ej. Bases de Datos & Backend)",
      habilidades: ["Tecnología 1", "Tecnología 2", "Concepto 3"],
      visible: true,
    },
  ],
  casosEstudio: [
    {
      id: "caso-1",
      titulo: 'Título del Caso (ej. Sistema Nodexa Core)',
      subtitulo: "Subtítulo descriptivo de la solución en producción.",
      estado: "PRODUCCIÓN ACTIVA",
      estadoColor: "emerald", // "emerald" | "blue" | "amber"
      mockupUrl: "/Proyectos/nodexa-core-maydelicias.jpg",
      mockupLabel: "Dashboard Operativo",
      problema: "Qué problema de negocio u operativo existía antes del sistema.",
      arquitectura: {
        intro: "Resumen de la arquitectura técnica (ej. Modelo relacional en PostgreSQL).",
        items: [
          { label: "Punto Clave 1", text: "Explicación de cómo se resolvieron los datos o procesos." },
        ],
      },
      impacto: "Resultados cuantificables en ahorro de tiempo, reducción de errores o control.",
      stack: ["PostgreSQL", "Next.js", "Tailwind CSS", "TypeScript"],
      activo: true,
    },
  ],
  matriz: [
    {
      id: "matriz-1",
      titulo: "Base de Datos & Lógica Backend",
      icon: "database", // "database" | "boxes" | "bot"
      items: ["Capacidad 1", "Capacidad 2"],
    },
  ],
  metodologia: [
    {
      id: "met-1",
      titulo: "Arquitectura Guiada por el Negocio",
      icon: "layers", // "layers" | "cpu"
      descripcion: "Cómo se estructuran los proyectos uniendo administración y programación.",
    },
  ],
};

/**
 * Genera el prompt maestro estructurado para entregar a una IA (ChatGPT, Claude, Gemini, DeepSeek).
 * Incluye instrucciones sobre el formato ATS, reglas semánticas y la estructura JSON a respetar.
 */
export function getAiMasterPrompt(currentData?: PortfolioCvData): string {
  const dataToInclude = currentData || AI_PORTFOLIO_CV_TEMPLATE;

  return `Actúa como un Senior Technical Resume Architect y Experto en UX para Reclutamiento IT y Consultoras ERP.

Tu tarea es optimizar, completar o reescribir los datos de mi Portfolio web técnico y mi CV imprimible en formato ATS de 1 carilla A4.
Mi sistema utiliza un configurador automático que se alimenta directamente de una estructura JSON. Para que yo pueda importar tu respuesta en mi panel de administración en un solo clic, DEBES devolver ÚNICAMENTE un bloque de código JSON válido.

### REGLAS ESTRICTAS DE CONTENIDO Y REDACCIÓN:
1. PERFIL PROFESIONAL: Híbrido entre programación técnica (UTN) y administración de empresas (Siglo 21). Prioriza el "detrás de escena" de las operaciones: bases de datos SQL relacionales, circuitos comerciales, control de stock, conciliaciones, sistemas de gestión (ERP) y resolución de incidentes técnicos.
2. EXPERIENCIA LABORAL (BULLETS ATS):
   - Cada viñeta debe tener un "subtitulo" conciso y directo (se imprime en negrita en el CV ATS).
   - La "descripcion" debe explicar el qué y el cómo con métricas e impacto operativo real. Cero frases de relleno o clichés ("apasionado por...", "proactivo").
   - El CV debe caber cómodamente en 1 página A4: mantén un máximo de 2 a 3 empresas y entre 3 y 4 bullets por empresa.
3. HABILIDADES: Agrupa las tecnologías en categorías claras (Bases de datos, Procesos/ERP, Backend/Integraciones).
4. CASOS DE ESTUDIO: Deben contener Ficha Técnica con Problema, Arquitectura (intro + items con label y text), Impacto cuantificable y Stack en etiquetas.

### FORMATO DE RESPUESTA:
- Devuelve EXACTAMENTE un bloque de código con sintaxis: \`\`\`json { ... } \`\`\`
- NO agregues introducciones, conclusiones, ni texto fuera del bloque JSON.

### ESTRUCTURA JSON A RESPETAR:
${JSON.stringify(dataToInclude, null, 2)}
`;
}
