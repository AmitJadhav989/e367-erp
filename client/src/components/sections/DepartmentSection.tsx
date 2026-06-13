import { motion } from 'framer-motion';
import {
  Cpu, Code2, Beaker, Radio, Building2, Microscope,
  Settings, Wrench, Ruler, Flame, Truck, HardHat,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const departments = [
  { name: 'Computer Science & Engineering', icon: Cpu, code: 'CSE' },
  { name: 'Information Technology', icon: Code2, code: 'IT' },
  { name: 'Electronics & Communication', icon: Radio, code: 'ECE' },
  { name: 'Electrical & Electronics', icon: Beaker, code: 'EEE' },
  { name: 'Mechanical Engineering', icon: Settings, code: 'ME' },
  { name: 'Civil Engineering', icon: Building2, code: 'CE' },
  { name: 'Aerospace Engineering', icon: Microscope, code: 'AE' },
  { name: 'Biotechnology', icon: Wrench, code: 'BT' },
  { name: 'Chemical Engineering', icon: Flame, code: 'CHE' },
  { name: 'Automobile Engineering', icon: Truck, code: 'AU' },
  { name: 'Mining Engineering', icon: HardHat, code: 'MN' },
  { name: 'Robotics & Automation', icon: Cpu, code: 'RA' },
];

export default function DepartmentSection() {
  return (
    <section id="departments" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Departments
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Explore Our Departments
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
          <motion.p variants={fadeInUp} className="mt-6 text-gray-600 max-w-2xl mx-auto">
            12 specialized departments equipped with modern labs and experienced faculty.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {departments.map((dept) => (
            <motion.div key={dept.code} variants={fadeInUp}>
              <Card glass={false} className="group cursor-pointer h-full">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors">
                    <dept.icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-red font-semibold uppercase">{dept.code}</p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{dept.name}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
