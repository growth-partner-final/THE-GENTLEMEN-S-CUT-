import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryInterior, bookChairCloseup, servicesBarberWorking, contactCloseup } from '../../assets/images';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  span: string;
}

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      image: galleryInterior,
      title: 'The Main Atelier & Antique Belmont Stations',
      subtitle: 'Exposed brick, vintage brass sconces, and dark walnut flooring in Soho',
      span: 'lg:col-span-8',
    },
    {
      id: 'gal-2',
      image: bookChairCloseup,
      title: 'Restored 1948 Belmont Barber Chair',
      subtitle: 'Hand-stitched leather upholstery with brushed brass armature',
      span: 'lg:col-span-4',
    },
    {
      id: 'gal-3',
      image: contactCloseup,
      title: 'Handcrafted Japanese Carbon Steel Tools',
      subtitle: 'Precision shears, horn combs, and antique stropping leathers',
      span: 'lg:col-span-5',
    },
    {
      id: 'gal-4',
      image: servicesBarberWorking,
      title: 'Traditional Straight Razor Detailing',
      subtitle: 'Essential oil hot towel conditioning and artisan blade work',
      span: 'lg:col-span-7',
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#0E0E11] border-t border-[#1C1C22] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with whileInView scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#D4A03A]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A03A]">
                The Atmosphere
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F6F6] tracking-tight">
              An Atelier Built for the Senses
            </h2>
          </div>
          <p className="text-sm text-[#B8B4AA] max-w-md font-light leading-relaxed">
            Step away from the Manhattan pace. A private speakeasy ambiance where time slows down, jazz plays on vinyl, and craftsmanship comes first.
          </p>
        </motion.div>

        {/* Asymmetric Gallery Grid with whileInView and viewport scroll reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {galleryItems.map((item: GalleryItem, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={item.span}
            >
              <div
                onClick={() => setActiveImage(item)}
                className="group relative rounded-2xl overflow-hidden border border-[#222228] bg-[#141418] aspect-[16/10] cursor-pointer shadow-lg w-full h-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B0B0D]/80 backdrop-blur-md border border-[#444] flex items-center justify-center text-[#D4A03A] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[#F6F6F6] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8B4AA] font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden bg-[#111] border border-[#333] shadow-2xl cursor-default"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-[#F6F6F6] hover:text-[#D4A03A] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] max-h-[75vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-[#141418] border-t border-[#26262C]">
                <h4 className="font-display font-bold text-lg text-[#F6F6F6] mb-1">
                  {activeImage.title}
                </h4>
                <p className="text-sm text-[#8F8B82]">
                  {activeImage.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
