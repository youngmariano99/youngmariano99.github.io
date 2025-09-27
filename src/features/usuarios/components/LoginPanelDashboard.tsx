import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router";
import Boton from "../../../components/boton";
import usuarioAdmin from "../models/usuarios.models";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPanelDashboard () {
    const navigate = useNavigate();
    const { register, 
        handleSubmit,
        formState: {errors}
     } = useForm<FormType>({
        resolver: yupResolver(reglasDeValidacion)
    });
    const onSubmit: SubmitHandler<FormType> = (data) => {

        if (data.email == usuarioAdmin.email && data.contraseña == usuarioAdmin.contraseña){
            console.log("Credenciales correctas");
            navigate("/admin");
        } 
        else {
            console.log("Credenciales incorrectas")
            
            
            
        }
    };

    return (
        <main className="flex justify-center items-center px-4 py-10 min-h-[calc(100vh-128px)] bg-gray-50">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 border border-gray-200"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            autoComplete="off" 
                            {...register('email')} 
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input 
                            type="password" 
                            autoComplete="off" 
                            {...register('contraseña')} 
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.contraseña && <p className="error">{errors.contraseña.message}</p>}
                    </div>

                    
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                    <Boton type="submit" className="w-full sm:w-auto">Iniciar Sesión</Boton>
                    <NavLink to="/" className="text-sm text-gray-600 hover:text-gray-900">Cancelar</NavLink>
                </div>
            </form>
        </main>
    );
}


interface FormType {
    email: string;
    contraseña: string;
}

const reglasDeValidacion = yup.object({
    email: yup.string().required('El email es obligatorio'),
    contraseña: yup.string().required('La contraseña es obligatoria')
})
