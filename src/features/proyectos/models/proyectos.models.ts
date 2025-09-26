interface Proyecto {
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    lenguajes: Array<string>,
    link: string
  }


const Proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "Sistema de Gestión de Stock y Compras - Comercio Mayorista",
    descripcion:
      "Este proyecto es una aplicación de consola en C++ desarrollada en Code::Blocks como parte del parcial de la materia Programación I en la Tecnicatura Universitaria en Programación de la UTN - Facultad Regional Trenque Lauquen, Extensión Aulica Coronel Pringles.",
    imagen: "public/proyectoCgestionMayorista.png",
    lenguajes: ["C++"],
    link: "https://github.com/youngmariano99/sistema_gestion_mayorista.git",
  },
  {
    id: 2,
    nombre: "Gestión de Empleados y Productos",
    descripcion:
      "Este sistema de escritorio permite la gestión de empleados y productos en un entorno de clínica, comercio u organización con roles diferenciados para administradores y trabajadores. Desarrollado en C# con Windows Forms y SQL Server como base de datos, sigue una arquitectura modular basada en bibliotecas de clases separadas para modelos, controladores, y acceso a datos.",
    imagen: "public/proyectoGestionEmpleados.png",
    lenguajes: ["C#", "WindowsForm", "SqlServer"],
    link: "https://github.com/youngmariano99/gestion_empleados.git",
  },
  {
    id: 3,
    nombre: "Sistema de Gestión de Almacén (CLI)",
    descripcion:
      "Este sistema CLI fue desarrollado como un proyecto personal con el propósito de aprender y practicar Python, bases de datos MySQL y el uso de Peewee como ORM. Es un trabajo en progreso, con algunas funcionalidades completas y otras en desarrollo.",
    imagen: "public/proyectoPythonGestionAlmacenCLI.png",
    lenguajes: ["Python", "MySQL", "Peewee"],
    link: "https://github.com/youngmariano99/sistema_gestion_",
  },
   {
    id: 4,
    nombre: "Sistema de gestión empleados y productos",
    descripcion:
      "Este proyecto fue realizado durante la carrera de tecnicatura en programación, para aprender conceptos tanto de backend con POO y conexión a base de datos y front con HTML y Tailwinds.",
    imagen: "public/sistemaGestionWebForm.png",
    lenguajes: ["C#", "SQLServer", "HTML", "Tailwinds"],
    link: "https://github.com/youngmariano99/SistemaGestionWebForm.git",
  },
  

];

export default Proyectos