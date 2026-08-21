"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { ArrowRight, Calculator, ShoppingBag, Star, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onOpenCatalog?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCatalog }) => {
  const whatsappUrl = formatWhatsAppUrl(
    siteConfig.phone,
    siteConfig.whatsappMessage
  );

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4 fill-blue-400" />
            <span>Atención Inmediata & Transparencia en Precios</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            {siteConfig.businessName}
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              {siteConfig.industry}
            </span>
          </motion.h1>

          {/* Tagline / Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-300 font-normal leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {siteConfig.features.showQuoter && (
              <a
                href="#cotizador"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Calculator className="w-5 h-5" />
                Cotizar Ahora ({siteConfig.currency})
              </a>
            )}

            {siteConfig.features.showCatalog && onOpenCatalog && (
              <button
                onClick={onOpenCatalog}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-800/90 hover:bg-gray-700/90 text-gray-100 font-bold text-base flex items-center justify-center gap-2 border border-gray-700/80 hover:border-cyan-500/50 shadow-lg transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                Ver Catálogo
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all"
            >
              Consulta WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Social Proof Mini Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-800/60 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl mx-auto text-center"
          >
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="block mt-1 font-bold text-white text-lg">
                {siteConfig.socialProof.rating.toFixed(1)} / 5.0
              </span>
              <span className="text-xs text-gray-400">Valoración Clientes</span>
            </div>

            <div>
              <span className="block font-bold text-white text-lg">
                +{siteConfig.socialProof.reviewsCount} Reseñas
              </span>
              <span className="text-xs text-gray-400">Verificadas</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Garantía</span>
              </div>
              <span className="text-xs text-gray-400">Servicios Asegurados</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
