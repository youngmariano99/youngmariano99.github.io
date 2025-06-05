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


const proyectos = [
    {
        nombre : "Sistema de Gestión de Stock y Compras - Comercio Mayorista",
        descripcion : "Este proyecto es una aplicación de consola en C++...",
        imagen : "img/proyectoCgestionMayorista.png",
        lenguajes: "C++",
        link : "https://github.com/youngmariano99/sistema_gestion_mayorista.git"
    },
    {
        nombre : "Gestión de Empleados y Productos",
        descripcion : "Este sistema de escritorio permite la gestión de empleados...",
        imagen : "img/proyectoGestionEmpleados.png",
        lenguajes: "C#, WindowsForm, SqlServer",
        link : "https://github.com/youngmariano99/gestion_empleados.git"
    },
    {
        nombre : "Sistema de Gestión de Almacén (CLI)",
        descripcion : "Este sistema CLI fue desarrollado con el propósito de aprender Python...",
        imagen : "img/proyectoPythonGestionAlmacenCLI.png",
        lenguajes: "Python, MySQL, Peewee",
        link : "https://github.com/youngmariano99/sistema_gestion_"
    }
];

const contenedorProyectos = document.getElementById("contenedor-proyectos");
const botonMostrar = document.getElementById("mostrarProyectos");
let proyectosVisibles = false;

// Función para mostrar proyectos
function mostrarProyectos() {
    contenedorProyectos.innerHTML = proyectos.map(proyecto => `
        <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 class="text-2xl font-semibold mb-2">${proyecto.nombre}</h3>
            <p class="text-lg mb-4">${proyecto.descripcion}</p>

            <!-- Pestañas -->
            <div class="flex gap-4 mb-4">
                <button class="tab-btn bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="mostrarDescripcion('${proyecto.descripcion}')">Descripción</button>
                <button class="tab-btn bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="mostrarImagen('${proyecto.imagen}', event)">Imagen</button>
                <a href="${proyecto.link}" target="_blank" class="bg-green-600 text-white px-4 py-2 rounded-lg">Repositorio</a>
            </div>

            <div class="tab-content text-center text-lg font-semibold"></div>
        </div>
    `).join("");

    contenedorProyectos.classList.remove("hidden");
}


// Función para ocultar proyectos
function ocultarProyectos() {
    contenedorProyectos.classList.remove("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-8");
    contenedorProyectos.classList.add("hidden");
}


// Cambio de estado del botón
botonMostrar.addEventListener("click", function(){
    if (proyectosVisibles) {
        ocultarProyectos();
        botonMostrar.innerText = "Mostrar Proyectos";
        proyectosVisibles = false;
    } else {
        mostrarProyectos();
        botonMostrar.innerText = "Ocultar Proyectos";
        proyectosVisibles = true;
    }
});

// Función para mostrar descripción
function mostrarDescripcion(descripcion) {
    document.querySelector(".tab-content").innerHTML = `<p>${descripcion}</p>`;
}

// Función para mostrar imagen
function mostrarImagen(imagen, event) {
    const tarjeta = event.target.closest(".bg-gray-800"); // Encuentra la tarjeta del proyecto
    const tabContent = tarjeta.querySelector(".tab-content"); // Busca el contenedor correcto dentro de esa tarjeta
    tabContent.innerHTML = `<img src="${imagen}" class="w-full rounded-lg shadow-md">`;
}






