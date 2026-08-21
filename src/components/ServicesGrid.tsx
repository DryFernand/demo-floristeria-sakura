"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { ServiceItem } from "@/types/config";
import { Network, ShieldCheck, Cpu, Wrench, CheckCircle2, ArrowUpRight, Star } from "lucide-react";

interface ServicesGridProps {
  onSelectService?: (service: ServiceItem) => void;
}

// Icon mapper helper
const renderServiceIcon = (iconName?: string) => {
  switch (iconName) {
    case "Network":
      return <Network className="w-6 h-6 text-blue-400" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    case "Cpu":
      return <Cpu className="w-6 h-6 text-purple-400" />;
    case "Wrench":
      return <Wrench className="w-6 h-6 text-amber-400" />;
    default:
      return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
  }
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  return (
    <section id="servicios" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-extrabold uppercase tracking-widest text-blue-400"
          >
            Nuestra Oferta Especializada
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Servicios Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-400 text-base"
          >
            Soluciones profesionales adaptadas a tus necesidades con tarifas transparentes y soporte continuo.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {siteConfig.services.map((service, index) => {
            const whatsappMsg = `Hola ${siteConfig.businessName}, me interesa solicitar el servicio: *${service.name}* (${formatCurrency(service.price)}).`;
            const whatsappUrl = formatWhatsAppUrl(siteConfig.phone, whatsappMsg);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-gray-950" />
                    Popular
                  </div>
                )}

                <div>
                  {/* Icon & Name */}
                  <div className="w-14 h-14 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {renderServiceIcon(service.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer Price & Action */}
                <div className="pt-6 border-t border-gray-800/80 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block">Desde</span>
                    <span className="text-2xl font-black text-white">
                      {formatCurrency(service.price)}
                    </span>
                    {service.unit && (
                      <span className="text-xs text-gray-400 ml-1">/ {service.unit}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {siteConfig.features.showQuoter && (
                      <a
                        href="#cotizador"
                        onClick={() => onSelectService?.(service)}
                        className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white font-semibold text-xs transition-all border border-blue-500/30"
                      >
                        Cotizar
                      </a>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all border border-emerald-500/30"
                      title="Solicitar por WhatsApp"
                    >
                      <ArrowUpRight className="w-5 h-5" />
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
