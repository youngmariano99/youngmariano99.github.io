const habilidades = [
    {
        titulo: "Lenguajes",
        logos: ["img/icons8-python.svg", "img/icons8-c++.svg", "img/icons8-sql-server.svg", "img/icons8-mysql.svg","img/icons8-c.svg"]
    },
    {
        titulo: "Frameworks",
        logos: ["img/icons8-django.svg"]
    },
    {
        titulo: "Herramientas",
        logos: ["img/icons8-git.svg", "img/icons8-github.svg"]
    }
];

let index = 0;
function cambiarHabilidad() {
    const habilidadContainer = document.getElementById("habilidades");
    habilidadContainer.innerHTML = `
        <h3 class="font-semibold mb-4">${habilidades[index].titulo}</h3>
        ${habilidades[index].logos.map(src => `<img src="${src}" class="w-16 h-16 inline-block">`).join('')}
    `;
    index = (index + 1) % habilidades.length; // Cambia al siguiente en la lista
}

setInterval(cambiarHabilidad, 3000); // Cambia cada 3 segundos