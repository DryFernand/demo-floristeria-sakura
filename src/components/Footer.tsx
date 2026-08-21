"use client";

import React from "react";
import { siteConfig } from "@/lib/config";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-black pt-16 pb-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
                {siteConfig.businessName.charAt(0)}
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white">
                {siteConfig.businessName}
              </span>
            </div>
            <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
              {siteConfig.tagline}
            </p>
            <span className="text-[11px] font-mono text-neutral-500 block">
              Moneda base: <strong className="text-neutral-300">{siteConfig.currency}</strong>
            </span>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white text-xs mb-3 font-mono uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              {siteConfig.features.showQuoter && (
                <li>
                  <a href="#cotizador" className="hover:text-white transition-colors">
                    Cotizador Interactivo
                  </a>
                </li>
              )}
              {siteConfig.features.showTestimonials && (
                <li>
                  <a href="#testimonios" className="hover:text-white transition-colors">
                    Reseñas
                  </a>
                </li>
              )}
              {siteConfig.features.showLocation && (
                <li>
                  <a href="#ubicacion" className="hover:text-white transition-colors">
                    Ubicación
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-xs mb-3 font-mono uppercase tracking-wider">Contacto</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-2">
              {siteConfig.location.address}
            </p>
            <p className="text-xs font-mono font-bold text-white mb-1">
              Tel: {siteConfig.phone}
            </p>
            {siteConfig.location.schedule && (
              <p className="text-[11px] font-mono text-neutral-500">{siteConfig.location.schedule}</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {currentYear} {siteConfig.businessName}. Todos los derechos reservados.</p>
          <p>Plantilla MVP estilo Vercel/Resend</p>
        </div>
      </div>
    </footer>
  );
};
