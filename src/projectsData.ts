export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  animationType: "scroll" | "crossfade";
  images: string[];
}

/*
 * Fuente única de verdad para el showcase de proyectos del camino de nodos.
 * Agregar un proyecto nuevo es sumar un objeto acá — JourneyExperience.tsx
 * mapea este array para generar los nodos, las laptops y las ventanas de
 * scroll automáticamente (ver PROJ en JourneyExperience.tsx si hace falta
 * ajustar el timing de cámara para más de 3 proyectos).
 */
export const projectsData: Project[] = [
  {
    id: "argoot",
    title: "Argoot",
    subtitle: "Marketplace de servicios",
    problem:
      "Desconexión entre profesionales de la construcción y clientes que requerían contrataciones confiables.",
    solution:
      "Plataforma marketplace donde los profesionales exponen su trabajo y los clientes pueden descubrirlos, solicitar servicios y valorarlos.",
    animationType: "scroll",
    images: ["/Proyectos/Proyecto1Argoot.png"],
  },
  {
    id: "filomena",
    title: "Filomena",
    subtitle: "Catálogo Online",
    problem:
      "Carecían de un canal digital propio, lo que les impedía llegar a clientes acostumbrados a comprar por internet de forma rápida.",
    solution:
      "Catálogo digital 100% personalizado que permite a los clientes explorar productos y realizar pedidos al instante desde cualquier dispositivo.",
    animationType: "scroll",
    images: ["/Proyectos/Proyecto2Filomena.png"],
  },
  {
    id: "lenera",
    title: "La Leñera",
    subtitle: "Sistema de gestión y repartos",
    problem:
      "Registros manuales en papel que generaban confusión en los pedidos, pérdidas financieras y roces en la atención al cliente.",
    solution:
      "Sistema integral que centraliza finanzas, control de pedidos, stock, rutas de reparto, cuentas corrientes y punto de venta (POS).",
    animationType: "crossfade",
    images: [
      "/Proyectos/Proyecto3LeñeraChingolitosParte1.png",
      "/Proyectos/Proyecto3LeñeraChingolitosParte2.png",
    ],
  },
];
