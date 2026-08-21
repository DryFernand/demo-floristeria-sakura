"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { X, Search, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowUpRight } from "lucide-react";

interface CatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogDrawer: React.FC<CatalogDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const [cart, setCart] = useState<Record<string, number>>({});

  const categories = ["Todos", ...Array.from(new Set(siteConfig.products.map((p) => p.category)))];

  const filteredProducts = siteConfig.products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return { ...prev, [productId]: next };
    });
  };

  const cartItems = siteConfig.products.filter((p) => (cart[p.id] || 0) > 0);
  const totalCartPrice = cartItems.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const totalCartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  const generateWhatsAppOrder = () => {
    if (cartItems.length === 0) return "#";

    let msg = `🛍️ *PEDIDO DE CATÁLOGO - ${siteConfig.businessName.toUpperCase()}*\n\n`;
    msg += `*Ítems seleccionados:*\n`;

    cartItems.forEach((item) => {
      const qty = cart[item.id];
      const subtotal = item.price * qty;
      msg += `• *${item.name}* (x${qty}): ${formatCurrency(subtotal)}\n`;
    });

    msg += `\n💵 *TOTAL:* ${formatCurrency(totalCartPrice)}\n\n`;
    msg += `Solicito confirmación de disponibilidad para completar el pedido. Gracias!`;

    return formatWhatsAppUrl(siteConfig.phone, msg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Resend Dark Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[#050505] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Catálogo de Productos</h3>
                  <p className="text-[11px] font-mono text-neutral-500">Pedidos directos a WhatsApp</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Controls: Search & Category Badges */}
            <div className="p-5 border-b border-white/10 space-y-3 bg-neutral-950/60">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-black font-bold shadow-sm"
                        : "bg-neutral-900 text-neutral-400 border border-white/10 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Scroll List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 text-neutral-600 text-xs font-mono">
                  // No se encontraron productos.
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const qtyInCart = cart[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-white/20 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {product.badge && (
                            <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />
                              {product.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-neutral-500">{product.category}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{product.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
                        <span className="text-sm font-mono font-bold text-white block mt-2">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      {/* Add Action */}
                      <div className="shrink-0 self-end sm:self-center">
                        {qtyInCart > 0 ? (
                          <div className="flex items-center gap-2 bg-black border border-white/20 rounded-lg p-1">
                            <button
                              onClick={() => updateCartQuantity(product.id, -1)}
                              className="p-1 rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-mono font-bold text-white">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(product.id, 1)}
                              className="p-1 rounded bg-white text-black font-bold hover:bg-neutral-200"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-white hover:text-black text-white font-medium text-xs border border-white/10 transition-all flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Checkout Bar */}
            {totalCartCount > 0 && (
              <div className="p-5 border-t border-white/10 bg-black">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Subtotal ({totalCartCount} ítems)</span>
                    <span className="text-xl font-mono font-bold text-white">{formatCurrency(totalCartPrice)}</span>
                  </div>

                  <button
                    onClick={() => setCart({})}
                    className="text-[11px] font-mono text-neutral-500 hover:text-rose-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Vaciar
                  </button>
                </div>

                <a
                  href={generateWhatsAppOrder()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-95 shadow-sm"
                >
                  Pedir por WhatsApp ({formatCurrency(totalCartPrice)})
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
