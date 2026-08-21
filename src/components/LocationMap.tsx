"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";

export const LocationMap: React.FC = () => {
  const { location, phone, businessName } = siteConfig;

  // OpenStreetMap embed iframe URL based on lat & lng
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01}%2C${location.lat - 0.01}%2C${location.lng + 0.01}%2C${location.lat + 0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <section id="ubicacion" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-gray-800"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3.5 h-3.5" />
                Ubicación & Atención
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-6">
                Visítanos o Solicita Atención en Sitio
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">Dirección Principal</span>
                    <p className="text-white font-semibold text-sm mt-0.5">{location.address}</p>
                  </div>
                </div>

                {/* Schedule */}
                {location.schedule && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium block">Horario de Servicio</span>
                      <p className="text-white font-semibold text-sm mt-0.5">{location.schedule}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">Teléfono Directo</span>
                    <a
                      href={`tel:${phone}`}
                      className="text-white font-semibold text-sm mt-0.5 hover:text-blue-400 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row gap-3 mt-8">
              {location.wazeUrl && (
                <a
                  href={location.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-gray-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4 fill-gray-950" />
                  Navegar con Waze
                </a>
              )}

              {location.googleMapsUrl && (
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-gray-700 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Maps
                </a>
              )}
            </div>
          </motion.div>

          {/* Interactive Map Frame (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden min-h-[350px] border border-gray-800 relative group"
          >
            <iframe
              title={`Mapa de ${businessName}`}
              width="100%"
              height="100%"
              className="w-full h-full min-h-[380px] grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              src={mapEmbedUrl}
            />
            <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-800 text-xs text-gray-300 font-medium pointer-events-none">
              📍 {businessName}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
