"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { ArrowRight, Calculator, ShoppingBag, Flower2, Heart, Gift, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCatalog }) => {
  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.phone,
    siteConfig.whatsappMessage
  );

  return (
    <section id="inicio" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-grid-pattern border-b border-emerald-500/10 text-center">
      {/* Emerald Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Monospace Floral Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-8"
        >
          <Flower2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Floristería Boutique & Envíos a Domicilio en Gascue</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
        >
          {siteConfig.businessName}
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent font-normal text-3xl sm:text-5xl md:text-6xl">
            Rosas Frescas & Arreglos de Lujo
          </span>
        </motion.h1>

        {/* Quick Occasions Filter Bar (Unique to Florist) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block w-full mb-1">
            Búsqueda Rápida por Ocasión:
          </span>
          {["Románticos", "Cumpleaños", "Detalles Especiales", "Lujo", "Condolencias"].map((occ) => (
            <button
              key={occ}
              onClick={onOpenCatalog}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-emerald-950 hover:border-emerald-500/40 text-neutral-300 text-xs font-mono border border-white/10 transition-all"
            >
              🌸 {occ}
            </button>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Explorar Catálogo por Ocasión
            </button>
          )}

          <a
            href="#cotizador"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-all"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            Cotizar Arreglo a Medida
          </a>
        </motion.div>
      </div>
    </section>
  );
};
