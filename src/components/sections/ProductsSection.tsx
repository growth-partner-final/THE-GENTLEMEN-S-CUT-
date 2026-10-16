import React, { useState } from 'react';
import { PRODUCTS } from '../../data/mockData';
import { productsShelf } from '../../assets/images';
import { ProductItem } from '../../types';
import { Sparkles, Info, X, ShieldCheck } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export const ProductsSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section id="products" className="py-24 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-[#D4A03A]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                  The Grooming Apothecary
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight">
                Curated Counter Formulations
              </h2>
            </div>
            <p className="text-sm text-[#B8B4AA] max-w-md font-light leading-relaxed">
              Formulated in small batches using cold-pressed botanical oils, volcanic clays, and organic plant extracts. Available for consultation at our front counter.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Split: Photography Shelf Showcase & Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left: Atmospheric Shelf Photo (5 cols on lg) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#222228] bg-[#121215] p-3 flex flex-col justify-between">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] mb-4">
                <img
                  src={productsShelf}
                  alt="Curated shelf of amber glass grooming apothecary products"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4A03A] block mb-1">
                    In-House Formulations
                  </span>
                  <span className="font-display font-semibold text-sm text-[#F6F6F6] block">
                    Soho Batch No. 04 · Pure Botanicals
                  </span>
                </div>
              </div>

              <div className="p-3 text-xs text-[#8F8B82] leading-relaxed">
                <p>
                  Our barbers formulate products that hold throughout Manhattan humidity without feeling greasy, heavy, or synthetic.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Products List (7 cols on lg) */}
          <StaggerContainer className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {PRODUCTS.map((prod: ProductItem) => (
              <StaggerItem key={prod.id}>
                <div className="rounded-xl border border-[#222228] bg-[#131317] hover:bg-[#18181E] hover:border-[#D4A03A]/40 transition-all duration-300 p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A03A]">
                        {prod.category}
                      </span>
                      <span className="font-mono text-base font-bold text-[#F6F6F6]">
                        ${prod.price}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-[#F6F6F6] mb-2">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-[#8F8B82] leading-relaxed mb-4 font-light">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1F1F24] flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#666]">
                      {prod.volume}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="inline-flex items-center gap-1 text-xs text-[#D4A03A] hover:underline cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>View Notes</span>
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Quiet Informational Disclaimer */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-[#222] bg-[#101014] p-4 text-xs text-[#888] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A03A] shrink-0" />
              <span>Retail Apothecary is available exclusively in-person at our Soho shop counter. No online e-commerce checkout.</span>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#D4A03A]">
              Ask Your Barber During Service
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#141418] border border-[#333] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-[#888] hover:text-[#F6F6F6]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider block mb-1">
              {selectedProduct.category} · {selectedProduct.volume}
            </span>
            <h3 className="font-display font-bold text-xl text-[#F6F6F6] mb-2">
              {selectedProduct.name}
            </h3>
            <div className="font-mono text-lg font-bold text-[#F6F6F6] mb-4">
              ${selectedProduct.price}
            </div>

            <p className="text-sm text-[#C5C1B6] leading-relaxed mb-6 font-light">
              {selectedProduct.description}
            </p>

            <div className="bg-[#1C1C22] p-4 rounded-xl border border-[#2E2E38] space-y-2 mb-6 text-xs text-[#999]">
              <div className="flex items-center gap-2 text-[#F6F6F6]">
                <ShieldCheck className="w-4 h-4 text-[#D4A03A]" />
                <span className="font-medium">Barber’s Application Method:</span>
              </div>
              <p>
                Warm a dime-sized amount between your palms. Apply through towel-dried hair from roots to ends for a natural matte hold that lasts all day without flaking.
              </p>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full py-2.5 text-xs font-semibold text-[#0B0B0D] bg-[#D4A03A] hover:bg-[#E5B14B] rounded transition-colors"
            >
              Close Product Information
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
