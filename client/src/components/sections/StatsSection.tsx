import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Building2, Trophy } from 'lucide-react';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Students Enrolled' },
  { icon: GraduationCap, value: 500, suffix: '+', label: 'Expert Faculty' },
  { icon: Building2, value: 30, suffix: '+', label: 'Departments' },
  { icon: Trophy, value: 95, suffix: '%', label: 'Placement Rate' },
];

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-white">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-purple overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-teal blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-purple blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center mx-auto mb-4 border border-white/20">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
