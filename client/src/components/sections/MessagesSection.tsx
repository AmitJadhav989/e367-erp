import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const messages = [
  {
    role: "Principal's Message",
    name: 'Dr. S. K. Menon',
    title: 'Principal, E367 College of Engineering',
    quote: 'At E367, we believe in nurturing not just engineers, but innovators and leaders who will shape the future of technology. Our commitment to academic excellence, research, and holistic development prepares students to tackle the challenges of tomorrow.',
    image: 'SM',
  },
  {
    role: "Chairman's Message",
    name: 'Mr. R. K. Agarwal',
    title: 'Chairman, E367 Group of Institutions',
    quote: 'Education is the most powerful weapon to change the world. Our vision at E367 is to create an ecosystem where every student has access to world-class education, modern infrastructure, and an environment that fosters creativity and innovation.',
    image: 'RA',
  },
];

export default function MessagesSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            From Our Leadership
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Messages
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {messages.map((msg) => (
            <motion.div key={msg.role} variants={fadeInUp}>
              <Card glass={false} className="h-full relative overflow-hidden group">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-brand-red/5" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red to-brand-purple flex items-center justify-center text-white font-heading text-xl font-bold">
                    {msg.image}
                  </div>
                  <div>
                    <p className="text-xs text-brand-red font-semibold uppercase tracking-wider">{msg.role}</p>
                    <p className="text-lg font-semibold text-gray-900">{msg.name}</p>
                    <p className="text-sm text-gray-500">{msg.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic relative z-10">"{msg.quote}"</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
