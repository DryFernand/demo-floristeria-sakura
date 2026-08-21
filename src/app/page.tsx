"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { InteractiveQuoter } from "@/components/InteractiveQuoter";
import { CatalogDrawer } from "@/components/CatalogDrawer";
import { SocialProof } from "@/components/SocialProof";
import { LocationMap } from "@/components/LocationMap";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";
import { Flower2, ArrowRight } from "lucide-react";

export default function Home() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020604] text-neutral-100 selection:bg-emerald-500 selection:text-black relative">
      <Navbar onOpenCatalog={() => setCatalogOpen(true)} />

      <main>
        {/* 1. HERO - Centered Spotlight con Filtro por Ocasión */}
        <Hero onOpenCatalog={() => setCatalogOpen(true)} />

        {/* 2. GALERÍA DE ARREGLOS POR OCASIÓN (Primero en Floristería) */}
        <section className="py-20 bg-black border-b border-emerald-500/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                  Catálogo Destacado
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Arreglos Florales & Rosas de Exportación
                </h2>
              </div>
              <button
                onClick={() => setCatalogOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start md:self-auto"
              >
                <Flower2 className="w-4 h-4" />
                Ver Todo el Inventario
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.products.map((item) => (
                <div
                  key={item.id}
                  className="resend-card p-4 border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-full h-52 rounded-lg overflow-hidden mb-4 relative border border-white/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">{item.category}</span>
                    <h3 className="font-bold text-white text-sm mt-0.5">{item.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-white">RD$ {item.price.toLocaleString()}</span>
                    <button
                      onClick={() => setCatalogOpen(true)}
                      className="px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-500 hover:text-black text-emerald-300 font-mono text-xs border border-emerald-500/30 transition-all"
                    >
                      Encargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. COTIZADOR DE ARREGLOS */}
        <InteractiveQuoter />

        {/* 4. SERVICIOS FLORALES */}
        <ServicesGrid />

        {/* 5. UBICACIÓN & MAPA (Crucial para envíos en Gascue) */}
        <LocationMap />

        {/* 6. RESEÑAS */}
        <SocialProof />
      </main>

      <Footer />

      <CatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
