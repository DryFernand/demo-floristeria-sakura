"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const msgToSend = customMsg.trim() || siteConfig.whatsappMessage;
    const url = formatWhatsAppUrl(siteConfig.phone, msgToSend);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="mb-3 w-80 bg-black border border-white/10 rounded-xl p-4 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{siteConfig.businessName}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 block">Respuesta rápida</span>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Bubble */}
            <div className="py-3">
              <div className="bg-neutral-900 border border-white/10 rounded-lg p-2.5 text-xs text-neutral-300 font-mono">
                👋 Hola, ¿en qué podemos ayudarte?
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSendCustom} className="space-y-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-white/30"
              />

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-all"
              >
                Abrir WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowPopup(!showPopup)}
        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform border border-white/20"
        aria-label="Abrir WhatsApp Chat"
      >
        {showPopup ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5 stroke-[2.2]" />}
      </button>
    </div>
  );
};
