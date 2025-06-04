
let proyectosVisibles = true;
const botonOcultar = document.getElementById("mostrarProyectos") 
    
    

const proyectos = [
    {
        nombre : "Sistema de Gestión de Stock y Compras - Comercio Mayorista", 
        descripcion : "Este proyecto es una aplicación de consola en C++ desarrollada en Code::Blocks como parte del parcial de la materia Programación I en la Tecnicatura Universitaria en Programación de la UTN - Facultad Regional Trenque Lauquen, Extensión Aulica Coronel Pringles." ,
        imagen : "img/proyectoCgestionMayorista.png",
        lenguajes:  "C++",
        index : "0",
        link : "https://github.com/youngmariano99/sistema_gestion_mayorista.git"
    },
    {
        nombre : "Gestión de Empleados y Productos",
        descripcion : "Este sistema de escritorio permite la gestión de empleados y productos en un entorno de clínica, comercio u organización con roles diferenciados para administradores y trabajadores. Desarrollado en C# con Windows Forms y SQL Server como base de datos, sigue una arquitectura modular basada en bibliotecas de clases separadas para modelos, controladores, y acceso a datos.",
        imagen : "img/proyectoGestionEmpleados.png",
        lenguajes: "C#, WindowsForm, SqlServer",
        index : "1",
        link : "https://github.com/youngmariano99/gestion_empleados.git"
    },
    {
        nombre : "Sistema de Gestión de Almacén (CLI)",
        descripcion : "Este sistema CLI fue desarrollado como un proyecto personal con el propósito de aprender y practicar Python, bases de datos MySQL y el uso de Peewee como ORM. Es un trabajo en progreso, con algunas funcionalidades completas y otras en desarrollo.",
        imagen : "img/proyectoPythonGestionAlmacenCLI.png",
        lenguajes: "Python, MySQL, Peewee",
        index : "2",
        link : "https://github.com/youngmariano99/sistema_gestion_"
    }
];


// CICLO FOR  PARA AGREGAR LOS PROYECTOS //  

/*
const contenedor = document.getElementById ("proyectos");


    for (let i = 0; i < proyectos.length; i++) {
        //Creo la constante proyecto que es un <div>
        const proyecto = document.createElement("div");

        proyecto.className = "card m-2 shadow";
        

        proyecto.innerHTML = `
            <img src="${proyectos[i].imagen}" class="card-img-top" alt="Imagen del proyecto">
            <div class="card-body">
            <h5 class="card-title">${proyectos[i].nombre}</h5>
             <p class="card-text">${proyectos[i].descripcion}</p>
            <a href="${proyectos[i].link}" class="btn btn-primary" target="_blank">Ver más</a>
            </div>
             `;

        contenedor.appendChild(proyecto);
    }
*/

// FUNCIONES PARA AGREGAR PROYECTOS //

//Esta función para armar las secciones//
function generarHTMLproyecto(proyecto, index){ 
    return `
    <div class= "contenedor-proyectos">
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills" id="pills-tab-${index}" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab-${index}" data-bs-toggle="pill" href="#pills-home-${index}" role="tab">Descripción</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-profile-tab-${index}" data-bs-toggle="pill" href="#pills-profile-${index}" role="tab">Imagen del proyecto</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  href="${proyecto.link}" target= "_blank" >Repositorio Github</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="pills-tabContent-${index}">
              <div class="tab-pane fade show active" id="pills-home-${index}" role="tabpanel">
                <h5 class="card-title">${proyecto.nombre}</h5>
                <p class="card-text">${proyecto.descripcion}</p>
              </div>
              <div class="tab-pane fade" id="pills-profile-${index}" role="tabpanel">
                <img src ="${proyecto.imagen}" class="imagen-proyecto">
                <p class="card-text">${proyecto.lenguajes}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    `;
}

//Función para mostrar la sección//
function mostrarProyectos(listaProyectos){

    const contenedor = document.getElementById("proyectos")
    contenedor.innerHTML = ""
     listaProyectos.forEach(proyecto => {
    contenedor.innerHTML += generarHTMLproyecto(proyecto, proyecto.index);
  });
    
}

function ocultarProyectos(){
    const contenedor = document.getElementById("proyectos")
    
    contenedor.innerHTML = ""
}


//FUNCION PARA MOSTRAR PROYECTOS MEDIANTE EL DOM

const botonMostrar = document.getElementById("mostrarProyectos")

function mostrarProyectosEvento(){
    mostrarProyectos(proyectos) 
}

function ocultarProyectosEvento(){
    ocultarProyectos()
}



botonMostrar.addEventListener("click", function(){
    if (proyectosVisibles){
        mostrarProyectosEvento();
        proyectosVisibles = false;
        botonOcultar.innerText = "Ocultar proyectos"
    }
    else {
        ocultarProyectosEvento();
        proyectosVisibles = true;
        botonOcultar.innerText = "Mostrar proyectos"
        
    }


});
