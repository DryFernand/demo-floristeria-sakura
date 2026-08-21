"use client";

import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { Star, Quote, Award, ThumbsUp } from "lucide-react";

export const SocialProof: React.FC = () => {
  const { rating, reviewsCount, testimonials } = siteConfig.socialProof;

  return (
    <section id="testimonios" className="py-20 relative bg-gray-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Award className="w-3.5 h-3.5" />
            Confianza & Experiencia de Clientes
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Lo que dicen sobre nosotros
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xl font-bold text-white">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({reviewsCount} opiniones verificadas)</span>
          </motion.div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {item.avatar ? (
                    // eslint-disable-next-next/no-img-element
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <span className="text-xs text-gray-400 block">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
