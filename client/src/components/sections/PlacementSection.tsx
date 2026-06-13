import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Award } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const stats = [
  { icon: TrendingUp, value: '95%', label: 'Placement Rate' },
  { icon: DollarSign, value: '₹45 LPA', label: 'Highest Package' },
  { icon: Users, value: '250+', label: 'Recruiters' },
  { icon: Award, value: '₹12 LPA', label: 'Average Package' },
];

const recruiters = [
  'Google', 'Microsoft', 'Amazon', 'Tesla', 'Apple', 'Meta',
  'Intel', 'Infosys', 'TCS', 'Wipro', 'Goldman Sachs', 'Adobe',
];

export default function PlacementSection() {
  return (
    <section id="placements" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Placements
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Building Careers of Tomorrow
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
          <motion.p variants={fadeInUp} className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Our dedicated placement cell ensures every student finds their dream career.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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

        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-6">
            Our Top Recruiters
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {recruiters.map((name) => (
              <span
                key={name}
                className="px-5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
