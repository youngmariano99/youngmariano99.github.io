"use client";

import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/AuthContext";

// Supabase devuelve el mismo "Invalid login credentials" tanto para
// contraseña incorrecta como para email inexistente (por seguridad, no
// distingue). Para el resto de los casos sí conviene traducir el mensaje
// real, porque apunta directo al problema.
function mapAuthError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "Email o contraseña incorrectos — o el usuario no existe con ese email en este proyecto.";
  }
  if (message.includes("Email not confirmed")) {
    return "Tu email todavía no está confirmado. Andá a Supabase → Authentication → Users, abrí tu usuario y confirmalo manualmente.";
  }
  return message;
}

export default function AdminLogin() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setSubmitting(false);
    if (signInError) {
      // Mostramos el mensaje real de Supabase (no uno genérico inventado)
      // para poder diagnosticar el problema real en vez de adivinar.
      console.error("Error de login Supabase:", signInError);
      setError(mapAuthError(signInError.message));
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] border border-white/10 bg-black/40 p-8"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-[#10B981]">
          NODEXA Admin
        </span>
        <h1 className="mt-2 text-[22px] font-bold tracking-tight text-white">Iniciar sesión</h1>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-white/70">Contraseña</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-[#05080F] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#10B981] focus:outline-none"
            />
          </div>

          {error && <p className="text-[13px] text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-[#10B981] px-4 py-3 text-sm font-semibold text-[#090B0B] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </form>
    </div>
  );
}
