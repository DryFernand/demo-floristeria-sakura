"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { ShoppingBag, Calculator, MessageCircle, Menu, X, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenCatalog?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCatalog }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.phone,
    siteConfig.whatsappMessage
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-panel py-3 shadow-2xl" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            {siteConfig.businessName.charAt(0)}
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
              {siteConfig.businessName}
            </span>
            <span className="block text-xs text-gray-400 font-medium truncate max-w-[180px] sm:max-w-xs">
              {siteConfig.industry}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#inicio" className="hover:text-blue-400 transition-colors">
            Inicio
          </a>
          <a href="#servicios" className="hover:text-blue-400 transition-colors">
            Servicios
          </a>
          {siteConfig.features.showQuoter && (
            <a href="#cotizador" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-400" />
              Cotizador
            </a>
          )}
          <a href="#testimonios" className="hover:text-blue-400 transition-colors">
            Opiniones
          </a>
          <a href="#ubicacion" className="hover:text-blue-400 transition-colors">
            Ubicación
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {siteConfig.features.showCatalog && onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-sm font-semibold flex items-center gap-2 border border-gray-700/60 transition-all hover:border-gray-500"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Catálogo
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {siteConfig.features.showCatalog && onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="p-2 rounded-lg bg-gray-800 text-gray-200"
              aria-label="Abrir Catálogo"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-panel border-b border-gray-800 px-6 py-5 mt-2 space-y-4 shadow-xl"
        >
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium hover:text-blue-400"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium hover:text-blue-400"
          >
            Servicios
          </a>
          {siteConfig.features.showQuoter && (
            <a
              href="#cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-200 font-medium hover:text-blue-400 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              Cotizador Interactivo
            </a>
          )}
          <a
            href="#testimonios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium hover:text-blue-400"
          >
            Opiniones
          </a>
          <a
            href="#ubicacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium hover:text-blue-400"
          >
            Ubicación
          </a>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full py-2.5 rounded-lg bg-gray-800 text-center font-semibold text-sm text-gray-200 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              Llamar ({siteConfig.phone})
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-center font-semibold text-sm text-white flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Contactar por WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
