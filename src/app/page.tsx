"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { InteractiveQuoter } from "@/components/InteractiveQuoter";
import { CatalogDrawer } from "@/components/CatalogDrawer";
import { SocialProof } from "@/components/SocialProof";
import { LocationMap } from "@/components/LocationMap";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 selection:bg-blue-500 selection:text-white relative">
      {/* Header / Navbar */}
      <Navbar onOpenCatalog={() => setCatalogOpen(true)} />

      {/* Hero Section */}
      <main>
        <Hero onOpenCatalog={() => setCatalogOpen(true)} />

        {/* Services Section */}
        <ServicesGrid />

        {/* Interactive Quoter Section */}
        {siteConfig.features.showQuoter && <InteractiveQuoter />}

        {/* Social Proof Section */}
        <SocialProof />

        {/* Location & Map Section */}
        <LocationMap />
      </main>

      {/* Footer */}
      <Footer />

      {/* Catalog Drawer Panel */}
      {siteConfig.features.showCatalog && (
        <CatalogDrawer isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
      )}

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
