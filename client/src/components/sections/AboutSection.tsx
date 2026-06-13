import { motion } from 'framer-motion';
import { Award, BookOpen, Globe, Lightbulb } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const highlights = [
  {
    icon: Award,
    title: 'NAAC A+ Accredited',
    desc: 'Recognized for academic excellence and institutional quality.',
  },
  {
    icon: BookOpen,
    title: 'Industry-Aligned Curriculum',
    desc: 'Curriculum designed in collaboration with industry leaders.',
  },
  {
    icon: Globe,
    title: 'Global Partnerships',
    desc: 'Exchange programs with 30+ universities worldwide.',
  },
  {
    icon: Lightbulb,
    title: 'Research Driven',
    desc: '500+ research papers published annually.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            About Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Shaping Engineers Since 2001
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
          <motion.p variants={fadeInUp} className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            E367 College of Engineering stands as a beacon of technical education, fostering innovation,
            critical thinking, and leadership among 10,000+ students across 12 departments.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {highlights.map((h) => (
            <motion.div key={h.title} variants={fadeInUp}>
              <Card glass={false} className="text-center h-full group hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-red/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-red transition-colors">
                  <h.icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
