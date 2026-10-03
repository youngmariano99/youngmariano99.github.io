"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLeadModal } from "../lib/LeadModalContext";
import { navItems } from "../data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openLeadModal } = useLeadModal();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname === "/" || pathname === "/patitas-en-alerta") {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/${href}`);
      }
    }
  };

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (pathname === "/patitas-en-alerta" && href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  const isPatitas = pathname === "/patitas-en-alerta";

  const patitasNavItems = [
    { label: "Volver a Nodexa", href: "/" },
    { label: "El Proyecto", href: "#top" },
    { label: "Red de Colaboradores", href: "#actores" },
  ];

  const currentNavItems = isPatitas ? patitasNavItems : navItems;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isPatitas 
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm"
            : "bg-[#090B0B]/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="flex flex-col">
            <span className={`text-[18px] font-bold tracking-[0.15em] leading-none ${isPatitas ? "text-slate-900" : "text-[#F3F5F4]"}`}>
              NODEX<span className={isPatitas ? "text-blue-600" : "text-[#16D39A]"}>Λ</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {currentNavItems.map((link) => (
            <a
              key={link.label}
              href={resolveHref(link.href)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[14px] font-medium transition-colors ${
                isPatitas ? "text-slate-600 hover:text-blue-600" : "text-[#A6AEAA] hover:text-[#16D39A]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        {!isPatitas && (
          <div className="hidden lg:block">
            <button
              onClick={() => openLeadModal("header")}
              className="inline-flex items-center justify-center h-[44px] px-6 rounded-[4px] bg-[#16D39A] text-[#090B0B] text-[14px] font-semibold transition-all hover:bg-[#12b382] focus:ring-2 focus:ring-[#16D39A] focus:ring-offset-2 focus:ring-offset-[#090B0B]"
            >
              Contame tu problema →
            </button>
          </div>
        )}

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden z-50 p-2 focus:outline-none ${isPatitas ? "text-slate-900" : "text-[#F3F5F4]"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div
          className={`fixed inset-0 z-40 flex flex-col pt-24 px-6 transition-transform duration-300 lg:hidden ${
            isPatitas ? "bg-white/95 backdrop-blur-md" : "bg-[#090B0B]/95 backdrop-blur-md"
          } ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <nav className="flex flex-col gap-6">
            {currentNavItems.map((link) => (
              <a
                key={link.label}
                href={resolveHref(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[18px] font-medium transition-colors ${
                  isPatitas ? "text-slate-900 hover:text-blue-600" : "text-[#F3F5F4] hover:text-[#16D39A]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {!isPatitas && (
            <div className="mt-10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLeadModal("header_mobile");
                }}
                className="w-full flex items-center justify-center h-[52px] rounded-[4px] bg-[#16D39A] text-[#090B0B] text-[16px] font-semibold transition-all hover:bg-[#12b382]"
              >
                Contame tu problema →
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
