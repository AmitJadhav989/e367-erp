import { motion } from 'framer-motion';
import { Globe, Award, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const alumni = [
  { name: 'Sundar Pichai', batch: '1993', role: 'CEO, Google', avatar: 'SP', dept: 'Metallurgy' },
  { name: 'Satya Nadella', batch: '1990', role: 'CEO, Microsoft', avatar: 'SN', dept: 'CSE' },
  { name: 'N. R. Narayana Murthy', batch: '1967', role: 'Founder, Infosys', avatar: 'NM', dept: 'ECE' },
  { name: 'Kiran Mazumdar-Shaw', batch: '1974', role: 'Chairperson, Biocon', avatar: 'KM', dept: 'Biotech' },
];

export default function AlumniSection() {
  return (
    <section id="alumni" className="relative py-24 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-purple overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-brand-teal blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-brand-purple blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeInUp} className="text-brand-teal font-semibold text-sm uppercase tracking-[0.2em] mb-3">Alumni Network</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-white mb-4">Our Distinguished Alumni</motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
          <motion.p variants={fadeInUp} className="mt-6 text-white/60 max-w-2xl mx-auto">50,000+ alumni across the globe leading innovation in every field.</motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {alumni.map((a) => (
            <motion.div key={a.name} variants={fadeInUp}>
              <Card className="text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-teal to-brand-purple flex items-center justify-center text-white font-heading text-2xl font-bold mx-auto mb-4">
                  {a.avatar}
                </div>
                <h3 className="text-lg font-bold text-white">{a.name}</h3>
                <p className="text-brand-teal text-sm font-medium">{a.role}</p>
                <p className="text-white/40 text-xs mt-1">{a.dept} • Batch {a.batch}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {[
            { icon: Globe, value: '50K+', label: 'Alumni Worldwide' },
            { icon: Award, value: '200+', label: 'CXO Positions' },
            { icon: TrendingUp, value: '30+', label: 'Countries' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeInUp} className="text-center">
              <s.icon className="w-6 h-6 text-brand-teal mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
