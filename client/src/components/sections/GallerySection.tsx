import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const images = [
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', label: 'Main Campus' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop', label: 'Library' },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop', label: 'Auditorium' },
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', label: 'Sports Complex' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop', label: 'Lab Facility' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', label: 'Campus Life' },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">Gallery</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">Campus in Pictures</motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {images.map((img, i) => (
            <motion.div key={i} variants={fadeInUp} className="cursor-pointer group" onClick={() => setSelected(i)}>
              <div className="relative overflow-hidden rounded-2xl aspect-[3/2]">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                  <p className="text-white font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setSelected(null)}>
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setSelected(selected > 0 ? selected - 1 : images.length - 1); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={selected} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={images[selected].src} alt={images[selected].label}
              className="max-w-full max-h-[85vh] rounded-2xl" onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setSelected(selected < images.length - 1 ? selected + 1 : 0); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 text-white/80 text-sm">{images[selected].label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
