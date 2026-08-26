"use client";

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../lib/AuthContext";

// Todas las rutas /admin/* viven bajo este layout — separa la sesión de
// admin del resto del sitio público (que no necesita saber nada de esto).
export default function AdminLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#05080F] text-white antialiased">
        <Outlet />
      </div>
    </AuthProvider>
  );
}
