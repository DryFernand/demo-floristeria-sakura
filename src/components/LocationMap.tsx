"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";

export const LocationMap: React.FC = () => {
  if (!siteConfig.features.showLocation) return null;
  const { location, phone, businessName } = siteConfig;

  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01}%2C${location.lat - 0.01}%2C${location.lng + 0.01}%2C${location.lat + 0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <section id="ubicacion" className="py-24 relative border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 resend-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Ubicación Física
              </span>

              <h2 className="text-2xl font-extrabold text-white tracking-tight mb-6">
                Visítanos o Solicita Atención
              </h2>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Dirección</span>
                    <p className="text-white text-xs font-medium mt-0.5">{location.address}</p>
                  </div>
                </div>

                {/* Schedule */}
                {location.schedule && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Horario de Atención</span>
                      <p className="text-white text-xs font-medium mt-0.5">{location.schedule}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Teléfono Directo</span>
                    <a
                      href={`tel:${phone}`}
                      className="text-white font-mono text-xs hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-2.5 mt-6">
              {location.wazeUrl && (
                <a
                  href={location.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 fill-black" />
                  Waze
                </a>
              )}

              {location.googleMapsUrl && (
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Google Maps
                </a>
              )}
            </div>
          </motion.div>

          {/* OpenStreetMap Frame (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 resend-card overflow-hidden min-h-[340px] relative group"
          >
            <iframe
              title={`Mapa de ${businessName}`}
              width="100%"
              height="100%"
              className="w-full h-full min-h-[340px] filter invert contrast-125 opacity-70 group-hover:opacity-90 transition-opacity"
              src={mapEmbedUrl}
            />
            <div className="absolute top-4 right-4 bg-black/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 pointer-events-none">
              📍 {businessName}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
