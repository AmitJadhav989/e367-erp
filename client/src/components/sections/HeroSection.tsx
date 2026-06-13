import { motion } from 'framer-motion';
import { GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const letterReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.04, ease: 'easeOut' },
  }),
};

const headline = "Shape the Future of Engineering";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#FF0000] flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/[0.03] blur-2xl animate-float" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl mb-6">
            <GraduationCap className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-white/70 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-body"
        >
          Est. 2001 &bull; NAAC A+ Accredited
        </motion.p>

        {/* Animated Headline with letter reveal */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-white leading-tight mb-6"
          variants={stagger}
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterReveal}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Mission Statement */}
        <motion.p
          variants={fadeUp}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Empowering tomorrow's innovators with world-class education, cutting-edge research,
          and an unwavering commitment to excellence in engineering.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" className="bg-white text-brand-red hover:bg-white/90 shadow-xl">
            <Sparkles className="w-5 h-5" />
            Explore Programs
          </Button>
          <Button variant="outline" size="lg">
            Virtual Tour
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: 'Students', value: '10,000+' },
            { label: 'Faculty', value: '500+' },
            { label: 'Placements', value: '95%' },
            { label: 'Alumni', value: '50,000+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl py-4 px-3 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-white font-heading">
                {stat.value}
              </p>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 hero-gradient-overlay" />
    </section>
  );
}
