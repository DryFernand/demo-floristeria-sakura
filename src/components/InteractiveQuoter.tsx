"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { Calculator, Plus, Minus, Check, MessageCircle, RefreshCw, Send } from "lucide-react";

export const InteractiveQuoter: React.FC = () => {
  // State for quantities per service id
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    siteConfig.services.forEach((s) => {
      initial[s.id] = 0;
    });
    return initial;
  });

  const [customerNotes, setCustomerNotes] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const selectedServices = siteConfig.services.filter((s) => (quantities[s.id] || 0) > 0);

  const totalAmount = selectedServices.reduce(
    (sum, s) => sum + s.price * (quantities[s.id] || 0),
    0
  );

  const resetQuoter = () => {
    const resetState: Record<string, number> = {};
    siteConfig.services.forEach((s) => {
      resetState[s.id] = 0;
    });
    setQuantities(resetState);
    setCustomerNotes("");
  };

  const generateWhatsAppMessage = () => {
    if (selectedServices.length === 0) {
      return formatWhatsAppUrl(siteConfig.phone, siteConfig.whatsappMessage);
    }

    let msg = `📋 *SOLICITUD DE COTIZACIÓN - ${siteConfig.businessName.toUpperCase()}*\n\n`;
    msg += `*Detalle de Servicios Seleccionados:*\n`;

    selectedServices.forEach((s) => {
      const qty = quantities[s.id];
      const subtotal = s.price * qty;
      msg += `• *${s.name}* (x${qty}): ${formatCurrency(subtotal)}\n`;
    });

    msg += `\n💰 *PRESUPUESTO TOTAL ESTIMADO:* ${formatCurrency(totalAmount)}\n`;

    if (customerNotes.trim()) {
      msg += `\n📝 *Notas adicionales:* ${customerNotes.trim()}\n`;
    }

    msg += `\nQuedo a la espera de su confirmación para proceder. Gracias!`;

    return formatWhatsAppUrl(siteConfig.phone, msg);
  };

  return (
    <section id="cotizador" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Calculator className="w-3.5 h-3.5" />
            Cotizador Dinámico en Tiempo Real
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Arma tu Presupuesto Personalizado
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-400 text-base"
          >
            Selecciona las opciones que necesitas y obtén un estimado transparente al instante para enviar por WhatsApp.
          </motion.p>
        </div>

        {/* Quoter Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Selector List (8 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {siteConfig.services.map((service) => {
              const qty = quantities[service.id] || 0;
              const isSelected = qty > 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-xl transition-all border ${
                    isSelected
                      ? "bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-900/20"
                      : "glass-panel border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">{service.name}</h4>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Seleccionado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                      <div className="mt-2 text-sm font-semibold text-blue-400">
                        {formatCurrency(service.price)} {service.unit && <span className="text-xs text-gray-400">/ {service.unit}</span>}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        onClick={() => updateQuantity(service.id, -1)}
                        disabled={qty === 0}
                        className={`p-2 rounded-lg transition-colors ${
                          qty === 0
                            ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                            : "bg-gray-800 text-gray-200 hover:bg-gray-700 active:scale-95"
                        }`}
                        aria-label="Disminuir"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-8 text-center font-bold text-white text-base">
                        {qty}
                      </span>

                      <button
                        onClick={() => updateQuantity(service.id, 1)}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all active:scale-95 shadow-md shadow-blue-600/30"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quote Summary Box (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-400" />
                  Resumen de Cotización
                </h3>
                {selectedServices.length > 0 && (
                  <button
                    onClick={resetQuoter}
                    className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Limpiar
                  </button>
                )}
              </div>

              {/* Items Selected List */}
              <div className="py-6 space-y-3 max-h-60 overflow-y-auto pr-1">
                {selectedServices.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    <p className="text-gray-300 font-medium">Aún no has agregado ningún servicio.</p>
                    <p className="text-xs text-gray-500 mt-1">Haz clic en el botón (+) de los servicios para calcular tu subtotal.</p>
                  </div>
                ) : (
                  selectedServices.map((s) => {
                    const qty = quantities[s.id];
                    return (
                      <div key={s.id} className="flex justify-between items-center text-sm">
                        <div className="truncate pr-2">
                          <span className="text-white font-medium block truncate">{s.name}</span>
                          <span className="text-xs text-gray-400">
                            {qty} x {formatCurrency(s.price)}
                          </span>
                        </div>
                        <span className="font-bold text-gray-200 shrink-0">
                          {formatCurrency(s.price * qty)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Optional Notes Input */}
              <div className="pt-4 border-t border-gray-800">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  ¿Algún requerimiento especial u observación? (Opcional)
                </label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Ej: Necesito el servicio para este viernes por la mañana..."
                  className="w-full bg-gray-900/90 border border-gray-800 rounded-lg p-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none h-20"
                />
              </div>

              {/* Total Calculation */}
              <div className="pt-6 border-t border-gray-800 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Total Estimado</span>
                  <span className="text-3xl font-black text-white bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Respuesta Inmediata
                </span>
              </div>

              {/* Action Button */}
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Enviar Cotización a WhatsApp
                <Send className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
