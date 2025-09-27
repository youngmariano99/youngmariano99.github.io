interface Usuarios {
    id: number,
    nombre: string,
    email: string,
    contraseña: string,
    isAdmin: boolean,
};

 const usuarioAdmin: Usuarios = {
    id: 1,
    nombre: "Mariano Young",
    email: "youngmariano99@gmail.com",
    contraseña: "123456789",
    isAdmin: true
};


export default usuarioAdmin;