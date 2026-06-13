import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const faculty = [
  { name: 'Dr. Arun Kumar', dept: 'Computer Science & Engineering', designation: 'Professor', qualification: 'PhD, IIT Bombay', exp: '18 yrs', avatar: 'AK' },
  { name: 'Dr. Meena Rajan', dept: 'Computer Science & Engineering', designation: 'Professor & Head', qualification: 'PhD, IISc', exp: '20 yrs', avatar: 'MR' },
  { name: 'Dr. Vikram Joshi', dept: 'Electronics & Communication', designation: 'Professor', qualification: 'PhD, IIT Delhi', exp: '15 yrs', avatar: 'VJ' },
  { name: 'Dr. Sneha Patel', dept: 'Mechanical Engineering', designation: 'Associate Professor', qualification: 'PhD, IIT Madras', exp: '12 yrs', avatar: 'SP' },
  { name: 'Prof. Ravi Kumar', dept: 'Civil Engineering', designation: 'Assistant Professor', qualification: 'M.Tech, NIT Trichy', exp: '8 yrs', avatar: 'RK' },
  { name: 'Dr. Anjali Singh', dept: 'Information Technology', designation: 'Professor', qualification: 'PhD, IIT Kharagpur', exp: '14 yrs', avatar: 'AS' },
];

export default function FacultySection() {
  return (
    <section id="faculty" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Faculty
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Our Esteemed Faculty
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faculty.map((f) => (
            <motion.div key={f.name} variants={fadeInUp}>
              <Card glass={false} className="text-center h-full group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-red to-brand-purple flex items-center justify-center text-white font-heading text-2xl font-bold mx-auto mb-4">
                  {f.avatar}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.name}</h3>
                <p className="text-brand-red text-sm font-medium">{f.designation}</p>
                <p className="text-gray-500 text-xs mt-1">{f.dept}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><GraduationCap className="w-3 h-3" />{f.qualification}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Award className="w-3 h-3" />{f.exp}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
