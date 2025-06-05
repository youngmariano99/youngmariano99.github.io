const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// Efecto al hacer scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("bg-opacity-80", "backdrop-blur-md", "py-2");
        navbar.classList.remove("py-4");
    } else {
        navbar.classList.add("py-4");
        navbar.classList.remove("bg-opacity-80", "backdrop-blur-md", "py-2");
    }
});

// Menú hamburguesa en móviles
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});