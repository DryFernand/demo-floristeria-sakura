"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { Star, Quote, Award } from "lucide-react";

export const SocialProof: React.FC = () => {
  if (!siteConfig.features.showTestimonials) return null;
  const { rating, reviewsCount, testimonials } = siteConfig.socialProof;

  return (
    <section id="testimonios" className="py-24 relative border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2"
          >
            Confianza Verificada
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Opiniones de Clientes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-400"
          >
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">{rating.toFixed(1)}</span>
            <span>({reviewsCount} reseñas verificadas)</span>
          </motion.div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="resend-card p-6 flex flex-col justify-between relative"
            >
              <Quote className="w-6 h-6 text-white/10 absolute top-5 right-5 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-mono font-bold text-white text-xs shrink-0 overflow-hidden">
                  {item.avatar ? (
                    // eslint-disable-next-next/no-img-element
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs">{item.name}</h4>
                  <span className="text-[10px] font-mono text-neutral-500 block">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
