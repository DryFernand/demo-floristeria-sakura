"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { Calculator, Plus, Minus, Check, MessageCircle, RefreshCw, ArrowUpRight } from "lucide-react";

export const InteractiveQuoter: React.FC = () => {
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
    msg += `*Detalle de Selección:*\n`;

    selectedServices.forEach((s) => {
      const qty = quantities[s.id];
      const subtotal = s.price * qty;
      msg += `• *${s.name}* (x${qty}): ${formatCurrency(subtotal)}\n`;
    });

    msg += `\n💰 *PRESUPUESTO TOTAL ESTIMADO:* ${formatCurrency(totalAmount)}\n`;

    if (customerNotes.trim()) {
      msg += `\n📝 *Notas:* ${customerNotes.trim()}\n`;
    }

    msg += `\nSolicito confirmación para proceder con el servicio. Gracias!`;

    return formatWhatsAppUrl(siteConfig.phone, msg);
  };

  return (
    <section id="cotizador" className="py-24 relative border-t border-white/[0.08] bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2"
          >
            Calculadora Interactiva
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Presupuesto Transparente
          </motion.h2>
        </div>

        {/* Quoter Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Selector List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {siteConfig.services.map((service) => {
              const qty = quantities[service.id] || 0;
              const isSelected = qty > 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-xl transition-all border ${
                    isSelected
                      ? "bg-neutral-900 border-white/30"
                      : "bg-black/60 border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{service.name}</h4>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] flex items-center gap-1">
                            <Check className="w-3 h-3" /> Seleccionado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">{service.description}</p>
                      <div className="mt-2 text-xs font-mono text-neutral-300 font-bold">
                        {formatCurrency(service.price)} {service.unit && <span className="text-neutral-500">/ {service.unit}</span>}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <button
                        onClick={() => updateQuantity(service.id, -1)}
                        disabled={qty === 0}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          qty === 0
                            ? "bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed"
                            : "bg-neutral-900 border-white/10 text-white hover:border-white/30"
                        }`}
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-7 text-center font-mono font-bold text-white text-sm">
                        {qty}
                      </span>

                      <button
                        onClick={() => updateQuantity(service.id, 1)}
                        className="p-1.5 rounded-lg bg-white text-black font-bold hover:bg-neutral-200 transition-all active:scale-95"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quote Code-Style Summary Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black border border-white/10 rounded-xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-neutral-400 ml-2">summary.json</span>
                </div>

                {selectedServices.length > 0 && (
                  <button
                    onClick={resetQuoter}
                    className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Limpiar
                  </button>
                )}
              </div>

              {/* Items Selected */}
              <div className="py-5 space-y-2.5 font-mono text-xs max-h-56 overflow-y-auto">
                {selectedServices.length === 0 ? (
                  <div className="text-center py-6 text-neutral-600">
                    // Ningún ítem seleccionado. Usa los botones (+) para simular tu presupuesto.
                  </div>
                ) : (
                  selectedServices.map((s) => {
                    const qty = quantities[s.id];
                    return (
                      <div key={s.id} className="flex justify-between items-center text-xs">
                        <span className="text-neutral-300 truncate pr-2">• {s.name} (x{qty})</span>
                        <span className="text-white font-bold shrink-0">
                          {formatCurrency(s.price * qty)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Customer Notes */}
              <div className="pt-3 border-t border-white/10">
                <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">
                  // Requerimientos específicos:
                </label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Detalles sobre tu proyecto..."
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-white/30 resize-none h-16"
                />
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block uppercase">Total Estimado</span>
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Respuesta &lt; 2h
                </span>
              </div>

              {/* WhatsApp Action */}
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-95 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar Cotización a WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
