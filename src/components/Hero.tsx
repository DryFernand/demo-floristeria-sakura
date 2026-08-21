"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { ArrowRight, Calculator, ShoppingBag, Star, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCatalog }) => {
  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.phone,
    siteConfig.whatsappMessage
  );

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Resend Top Spotlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Monospace Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 text-neutral-300 text-xs font-mono mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>{siteConfig.industry}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400 font-semibold">Respuesta Inmediata</span>
        </motion.div>

        {/* Headline with Vercel Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
        >
          {siteConfig.businessName}
          <span className="block mt-2 bg-gradient-to-b from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-transparent font-normal text-3xl sm:text-5xl md:text-6xl">
            {siteConfig.tagline}
          </span>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {siteConfig.features.showQuoter && (
            <a
              href="#cotizador"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-md active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              Cotizar en Tiempo Real ({siteConfig.currency})
            </a>
          )}

          {siteConfig.features.showCatalog && onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-medium text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-400" />
              Explorar Catálogo
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 font-medium text-sm flex items-center justify-center gap-2 border border-white/10 transition-all"
          >
            Contacto WhatsApp
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </a>
        </motion.div>

        {/* Stats Row (Minimalist Monochrome) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg mx-auto text-center"
        >
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="block mt-1.5 font-mono font-bold text-white text-base">
              {siteConfig.socialProof.rating.toFixed(1)} / 5.0
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">Valoración de Clientes</span>
          </div>

          <div>
            <span className="block font-mono font-bold text-white text-base">
              +{siteConfig.socialProof.reviewsCount}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">Opiniones Verificadas</span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-1.5 text-neutral-300 font-mono text-sm font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía</span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">Transparencia Total</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
