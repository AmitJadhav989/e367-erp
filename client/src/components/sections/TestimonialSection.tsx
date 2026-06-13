import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'CSE Graduate, Batch 2024',
    quote: 'E367 gave me the platform to grow both technically and personally. The faculty mentorship and placement training were exceptional.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'ECE Graduate, Batch 2023',
    quote: 'The research labs and industry collaborations set E367 apart. I published two papers before graduating.',
    avatar: 'RV',
  },
  {
    name: 'Ananya Patel',
    role: 'ME Graduate, Batch 2024',
    quote: 'From robotics club to placement at Tesla — E367 shaped my engineering journey in every possible way.',
    avatar: 'AP',
  },
  {
    name: 'Arjun Nair',
    role: 'Parent of CSE Student',
    quote: 'The transparency in academics and regular parent updates gives us complete peace of mind about our ward\'s education.',
    avatar: 'AN',
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            What People Say
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <Card glass={false} className="relative h-full">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-red/10" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{t.quote}"</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
