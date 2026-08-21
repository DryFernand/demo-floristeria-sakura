"use client";

import React from "react";
import { siteConfig } from "@/lib/config";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/80 bg-gray-950/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {siteConfig.businessName.charAt(0)}
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {siteConfig.businessName}
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <span className="text-xs text-gray-500 block">
              Moneda base: <strong className="text-gray-300">{siteConfig.currency}</strong>
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navegación Rápida</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#inicio" className="hover:text-blue-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-blue-400 transition-colors">
                  Servicios
                </a>
              </li>
              {siteConfig.features.showQuoter && (
                <li>
                  <a href="#cotizador" className="hover:text-blue-400 transition-colors">
                    Cotizador Interactivo
                  </a>
                </li>
              )}
              <li>
                <a href="#testimonios" className="hover:text-blue-400 transition-colors">
                  Opiniones
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-blue-400 transition-colors">
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location info */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contacto</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              {siteConfig.location.address}
            </p>
            <p className="text-sm font-semibold text-blue-400 mb-1">
              Tel: {siteConfig.phone}
            </p>
            {siteConfig.location.schedule && (
              <p className="text-xs text-gray-500">{siteConfig.location.schedule}</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} {siteConfig.businessName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Plantilla Base MVP desarrollada con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
