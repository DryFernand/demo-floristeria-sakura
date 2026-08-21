"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { MessageCircle, X, Send, PhoneCall } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const defaultUrl = formatWhatsAppUrl(
    siteConfig.phone,
    siteConfig.whatsappMessage
  );

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const msgToSend = customMsg.trim() || siteConfig.whatsappMessage;
    const url = formatWhatsAppUrl(siteConfig.phone, msgToSend);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Popup Box */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-80 glass-panel rounded-2xl p-5 border border-emerald-500/40 shadow-2xl overflow-hidden"
          >
            {/* Popup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <span className="w-3 h-3 bg-emerald-400 border-2 border-gray-950 rounded-full absolute bottom-0 right-0 animate-ping" />
                  <span className="w-3 h-3 bg-emerald-400 border-2 border-gray-950 rounded-full absolute bottom-0 right-0" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{siteConfig.businessName}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold block">En línea • Respuesta rápida</span>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="py-4">
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3 text-xs text-gray-200 leading-relaxed">
                👋 ¡Hola! ¿En qué podemos ayudarte hoy? Escríbenos directamente a WhatsApp.
              </div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleSendCustom} className="space-y-3">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                Iniciar Chat en WhatsApp
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 hover:from-emerald-500 hover:to-teal-300 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 pulse-glow hover:scale-110 active:scale-95 transition-all"
          aria-label="Abrir WhatsApp Chat"
        >
          {showPopup ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7 fill-white" />}
        </button>

        {/* Badge counter or tooltip */}
        {!showPopup && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-gray-950 shadow-md animate-bounce">
            1
          </span>
        )}
      </div>
    </div>
  );
};
