"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { ShoppingBag, Calculator, MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

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
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/[0.08] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white text-black font-black text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            {siteConfig.businessName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              {siteConfig.businessName}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono tracking-tight truncate max-w-[160px] sm:max-w-xs">
              {siteConfig.industry}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <a href="#inicio" className="hover:text-white transition-colors">
            Inicio
          </a>
          <a href="#servicios" className="hover:text-white transition-colors">
            Servicios
          </a>
          {siteConfig.features.showQuoter && (
            <a href="#cotizador" className="hover:text-white transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-neutral-400" />
              Cotizador
            </a>
          )}
          {siteConfig.features.showTestimonials && (
            <a href="#testimonios" className="hover:text-white transition-colors">
              Reseñas
            </a>
          )}
          {siteConfig.features.showLocation && (
            <a href="#ubicacion" className="hover:text-white transition-colors">
              Ubicación
            </a>
          )}
        </nav>

        {/* Action Buttons (Vercel Style: High Contrast Primary CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          {siteConfig.features.showCatalog && onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium flex items-center gap-1.5 border border-white/10 hover:border-white/20 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
              Catálogo
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {siteConfig.features.showCatalog && onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300"
              aria-label="Abrir Catálogo"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-400" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-neutral-950 border-b border-white/10 px-6 py-5 mt-2 space-y-4 shadow-2xl"
        >
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 text-sm font-medium hover:text-white"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 text-sm font-medium hover:text-white"
          >
            Servicios
          </a>
          {siteConfig.features.showQuoter && (
            <a
              href="#cotizador"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 text-sm font-medium hover:text-white flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-neutral-400" />
              Cotizador Interactivo
            </a>
          )}
          {siteConfig.features.showTestimonials && (
            <a
              href="#testimonios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 text-sm font-medium hover:text-white"
            >
              Reseñas
            </a>
          )}
          {siteConfig.features.showLocation && (
            <a
              href="#ubicacion"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 text-sm font-medium hover:text-white"
            >
              Ubicación
            </a>
          )}

          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-white text-black font-semibold text-xs text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Directo
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
