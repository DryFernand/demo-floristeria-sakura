"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { ServiceItem } from "@/types/config";
import { Network, ShieldCheck, Cpu, Wrench, CheckCircle2, ArrowUpRight } from "lucide-react";

interface ServicesGridProps {
  onSelectService?: (service: ServiceItem) => void;
}

const renderServiceIcon = (iconName?: string) => {
  switch (iconName) {
    case "Network":
      return <Network className="w-5 h-5 text-neutral-300" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-5 h-5 text-neutral-300" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-neutral-300" />;
    case "Wrench":
      return <Wrench className="w-5 h-5 text-neutral-300" />;
    default:
      return <CheckCircle2 className="w-5 h-5 text-neutral-300" />;
  }
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  return (
    <section id="servicios" className="py-24 relative border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2"
          >
            Servicios Específicos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Soluciones & Tarifas Claras
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.services.map((service, index) => {
            const whatsappMsg = `Hola ${siteConfig.businessName}, me interesa solicitar el servicio: *${service.name}* (${formatCurrency(service.price)}).`;
            const whatsappUrl = formatWhatsAppUrl(siteConfig.phone, whatsappMsg);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="resend-card p-6 sm:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar: Icon + Monospace Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                      {renderServiceIcon(service.icon)}
                    </div>

                    {service.tag && (
                      <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer Price & Actions */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Precio Base</span>
                    <span className="text-xl font-bold font-mono text-white">
                      {formatCurrency(service.price)}
                    </span>
                    {service.unit && (
                      <span className="text-[11px] text-neutral-500 font-mono ml-1">/ {service.unit}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {siteConfig.features.showQuoter && (
                      <a
                        href="#cotizador"
                        onClick={() => onSelectService?.(service)}
                        className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs border border-white/10 transition-all"
                      >
                        Cotizar
                      </a>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white hover:bg-neutral-200 text-black transition-all"
                      title="Solicitar por WhatsApp"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
