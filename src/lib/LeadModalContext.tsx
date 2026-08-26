"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import LeadFormModal from "../components/LeadFormModal";

interface LeadModalContextValue {
  openLeadModal: (source: string) => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal debe usarse dentro de <LeadModalProvider>");
  return ctx;
}

// Vive una sola vez en el shell de la app (NodexaLanding.tsx) — cualquier
// componente de cualquier página abre el mismo modal con openLeadModal(),
// sin prop-drilling (antes Contact.tsx recibía onOpenModal desde Home.tsx).
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");

  const openLeadModal = useCallback((newSource: string) => {
    setSource(newSource);
    setOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider value={{ openLeadModal }}>
      {children}
      <LeadFormModal open={open} source={source} onClose={closeLeadModal} />
    </LeadModalContext.Provider>
  );
}
