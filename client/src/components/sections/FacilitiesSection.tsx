import { motion } from 'framer-motion';
import { Wifi, Library, Dumbbell, FlaskConical, Utensils, Heart } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const facilities = [
  { icon: Library, title: 'Central Library', desc: '50,000+ books, 200+ journals, digital resources with 24/7 access' },
  { icon: FlaskConical, title: 'Advanced Labs', desc: 'State-of-the-art labs for each department with industry-grade equipment' },
  { icon: Wifi, title: 'Campus WiFi', desc: '1 Gbps fiber connection across 50-acre campus with seamless roaming' },
  { icon: Dumbbell, title: 'Sports Complex', desc: 'Olympic-size pool, indoor stadium, gym, and outdoor fields' },
  { icon: Utensils, title: 'Multi-Cuisine Cafeteria', desc: 'Hygienic, affordable meals with diverse cuisine options' },
  { icon: Heart, title: 'Health Center', desc: '24/7 medical facility with ambulance service and wellness programs' },
];

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">Campus Facilities</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">World-Class Infrastructure</motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
          <motion.p variants={fadeInUp} className="mt-6 text-gray-600 max-w-2xl mx-auto">Everything you need for an exceptional learning experience.</motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {facilities.map((f) => (
            <motion.div key={f.title} variants={fadeInUp}>
              <Card glass={false} className="h-full group cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red transition-colors">
                  <f.icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
