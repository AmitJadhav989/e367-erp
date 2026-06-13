import { motion } from 'framer-motion';
import { FileText, Microscope, Users, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const research = [
  { title: 'AI-Powered Healthcare Diagnostics', dept: 'CSE', grant: '₹2.5Cr', lead: 'Dr. Arun Kumar', year: '2025' },
  { title: 'Next-Gen Solar Cell Materials', dept: 'ECE', grant: '₹1.8Cr', lead: 'Dr. Vikram Joshi', year: '2024' },
  { title: 'Smart Water Management Systems', dept: 'CE', grant: '₹1.2Cr', lead: 'Prof. Ravi Kumar', year: '2025' },
  { title: 'Microbial Fuel Cells for Clean Energy', dept: 'BT', grant: '₹0.9Cr', lead: 'Dr. Anjali Singh', year: '2024' },
];

const stats = [
  { icon: FileText, value: '500+', label: 'Research Papers' },
  { icon: Microscope, value: '15', label: 'Research Labs' },
  { icon: Users, value: '120+', label: 'PhD Scholars' },
  { icon: BookOpen, value: '₹15Cr', label: 'Research Grants' },
];

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">Research & Innovation</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">Pushing the Boundaries of Knowledge</motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeInUp}>
              <Card className="text-center">
                <s.icon className="w-8 h-8 text-brand-red mx-auto mb-3" />
                <p className="text-3xl font-heading font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {research.map((r) => (
            <motion.div key={r.title} variants={fadeInUp}>
              <Card glass={false} className="border-l-4 border-l-brand-red">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{r.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{r.dept} • Lead: {r.lead}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-red">{r.grant}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Grant Awarded • {r.year}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
