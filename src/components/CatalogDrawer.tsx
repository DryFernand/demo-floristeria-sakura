"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, formatCurrency, formatWhatsAppUrl } from "@/lib/config";
import { ProductItem } from "@/types/config";
import { X, Search, ShoppingBag, Plus, Minus, Trash2, Send, Tag, Check } from "lucide-react";

interface CatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogDrawer: React.FC<CatalogDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Cart state: Record<product_id, quantity>
  const [cart, setCart] = useState<Record<string, number>>({});

  // Categories list derived from products
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

    let msg = `🛍️ *NUEVO PEDIDO DE CATÁLOGO - ${siteConfig.businessName.toUpperCase()}*\n\n`;
    msg += `*Productos seleccionados:*\n`;

    cartItems.forEach((item) => {
      const qty = cart[item.id];
      const subtotal = item.price * qty;
      msg += `• *${item.name}* (x${qty}): ${formatCurrency(subtotal)}\n`;
    });

    msg += `\n💵 *TOTAL DEL PEDIDO:* ${formatCurrency(totalCartPrice)}\n\n`;
    msg += `Me gustaría conocer la disponibilidad y métodos de pago para completar la compra. Gracias!`;

    return formatWhatsAppUrl(siteConfig.phone, msg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-gray-950 border-l border-gray-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-white">Catálogo de Productos</h3>
                  <p className="text-xs text-gray-400">Explora nuestro inventario y ordena vía WhatsApp</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Controls: Search & Category Filters */}
            <div className="p-6 border-b border-gray-800 space-y-4 bg-gray-900/30">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Category Badges */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-gray-950 shadow-md"
                        : "bg-gray-800/80 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products List Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 text-gray-500 text-sm">
                  No se encontraron productos coincidentes.
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const qtyInCart = cart[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="glass-card rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border border-gray-800/80 hover:border-cyan-500/30 transition-all"
                    >
                      {/* Product details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {product.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {product.badge}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500 font-medium">{product.category}</span>
                        </div>
                        <h4 className="font-bold text-white text-base">{product.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                        <span className="text-lg font-black text-cyan-400 block mt-2">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      {/* Add to Cart Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        {qtyInCart > 0 ? (
                          <div className="flex items-center gap-2 bg-gray-900 border border-cyan-500/50 rounded-lg p-1">
                            <button
                              onClick={() => updateCartQuantity(product.id, -1)}
                              className="p-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(product.id, 1)}
                              className="p-1 rounded bg-cyan-500 text-gray-950 font-bold hover:bg-cyan-400"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-cyan-500 hover:text-gray-950 text-cyan-400 font-bold text-xs flex items-center gap-1.5 border border-gray-700 transition-all"
                          >
                            <Plus className="w-4 h-4" />
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
              <div className="p-6 border-t border-gray-800 bg-gray-900/90 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-gray-400 block">Total en Carrito ({totalCartCount} ítems)</span>
                    <span className="text-2xl font-black text-white">{formatCurrency(totalCartPrice)}</span>
                  </div>

                  <button
                    onClick={() => setCart({})}
                    className="text-xs text-gray-500 hover:text-rose-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar
                  </button>
                </div>

                <a
                  href={generateWhatsAppOrder()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Pedir por WhatsApp ({formatCurrency(totalCartPrice)})
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
