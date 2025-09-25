interface Tecnologia {
    id: number,
    nombre: string,
    logos: string[]

}


const Tecnologias : Tecnologia[] =  [
    {
        id: 1,
        nombre: "Lenguajes",
        logos: ["public/icons8-python.svg", "public/icons8-c++.svg","public/icons8-c.svg" , "public/icons8-sql-server.svg", "public/icons8-mysql.svg"]
    },
    // {
    //     id: 2,
    //     nombre: "Frameworks",
    //     logos: ["public/icons8-django.svg"]
    // },
    {
        id: 3,
        nombre: "Herramientas",
        logos: ["public/icons8-git.svg", "public/icons8-github.svg"]
    }
];

export {Tecnologias};