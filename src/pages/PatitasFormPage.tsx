"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";

import { Link, useNavigate } from "react-router-dom";

const ROLES = [
  { id: "ciudadano", label: "Ciudadano" },
  { id: "ong", label: "ONG / Rescatista" },
  { id: "veterinario", label: "Veterinario" },
  { id: "comercio", label: "Comercio" },
  { id: "municipio", label: "Municipio" },
  { id: "dev", label: "Desarrollador / Diseñador" },
];

const getSpecificQuestion = (role: string) => {
  switch (role) {
    case "ong":
      return "¿Cuál es la tarea que más tiempo o dolor de cabeza te roba hoy en día?";
    case "veterinario":
      return "¿Qué sistema usás hoy para llevar las fichas clínicas?";
    case "dev":
      return "¿Qué idea, arquitectura o stack recomendarías para el proyecto?";
    case "comercio":
    case "municipio":
      return "¿De qué localidad sos y cómo te gustaría involucrarte?";
    default:
      return null;
  }
};

export default function PatitasFormPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = Seleccionar Rol
  const [role, setRole] = useState("");
  const [nombre, setNombre] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [preguntaEspecifica, setPreguntaEspecifica] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [redes, setRedes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email && !whatsapp && !redes) {
      setError("Por favor, dejanos al menos una forma de contactarte.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const { error: sbError } = await supabase.from("patitas_leads").insert({
      rol: role,
      nombre,
      experiencia_general: experiencia,
      pregunta_especifica: preguntaEspecifica || null,
      contacto_email: email || null,
      contacto_whatsapp: whatsapp || null,
      contacto_redes: redes || null,
    });

    setIsSubmitting(false);

    if (sbError) {
      setError("Hubo un error al guardar tus datos. Intentá de nuevo.");
      console.error(sbError);
    } else {
      setStep(4); // Success step
    }
  };

  const handleClose = () => {
    navigate("/patitas-en-alerta");
  };

  const specificQ = getSpecificQuestion(role);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <Link to="/patitas-en-alerta" className="mb-8 flex items-center gap-3 group">
        <img src="/logopatitas.png" alt="Patitas" className="h-10 w-auto group-hover:scale-105 transition-transform" />
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">¿Cómo te gustaría sumarte?</h3>
              <p className="text-slate-600 text-sm">Contanos quién sos para adaptar la experiencia.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      role === r.id
                        ? "bg-blue-50 border-blue-600 text-blue-600"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-medium">{r.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Conociendo tu perspectiva</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Tu Nombre o Organización *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600"
                    placeholder="Ej: Juan Pérez / ONG Rescate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Contanos tu experiencia general con el bienestar animal en la zona *
                  </label>
                  <textarea
                    value={experiencia}
                    onChange={(e) => setExperiencia(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600 min-h-[100px]"
                    placeholder="Tus observaciones, problemas que ves, etc."
                  />
                </div>

                {specificQ && (
                  <div>
                    <label className="block text-sm font-medium text-blue-600 mb-1">
                      {specificQ}
                    </label>
                    <textarea
                      value={preguntaEspecifica}
                      onChange={(e) => setPreguntaEspecifica(e.target.value)}
                      className="w-full bg-blue-600/5 border border-blue-600/20 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600 min-h-[80px]"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-600 px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!nombre || !experiencia}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">¿Cómo te contactamos?</h3>
              <p className="text-slate-600 text-sm">Dejanos al menos una forma de comunicarnos con vos cuando lancemos o para sumar tu aporte al muro de comunidad.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Red Social (Instagram / LinkedIn)</label>
                  <input
                    type="text"
                    value={redes}
                    onChange={(e) => setRedes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-600 px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Finalizar y Sumarme"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 space-y-4">
              <div className="flex justify-center text-blue-600 mb-6">
                <CheckCircle2 size={64} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">¡Gracias por sumarte!</h3>
              <p className="text-slate-600 max-w-sm mx-auto">
                Tus datos fueron guardados. Te vamos a contactar muy pronto para que seas de los primeros en probar la red de Patitas en Alerta.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 bg-blue-50 text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors"
              >
                Volver al sitio
              </button>
            </div>
          )}

      </motion.div>
    </div>
  );
}

