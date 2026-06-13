import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const events = [
  { title: 'Annual Tech Fest 2025', date: '15-17 Aug 2025', time: '9:00 AM', location: 'Main Auditorium', type: 'Technical' },
  { title: 'Industry Conclave', date: '5 Sep 2025', time: '10:00 AM', location: 'Seminar Hall', type: 'Industry' },
  { title: 'Research Symposium', date: '20 Sep 2025', time: '9:30 AM', location: 'Research Block', type: 'Academic' },
  { title: 'Alumni Meet 2025', date: '12 Oct 2025', time: '11:00 AM', location: 'Campus Grounds', type: 'Social' },
  { title: 'Hackathon 2025', date: '1-2 Nov 2025', time: '8:00 AM', location: 'Innovation Lab', type: 'Technical' },
  { title: 'Sports Day', date: '15 Dec 2025', time: '7:00 AM', location: 'Sports Complex', type: 'Sports' },
];

export default function EventsSection() {
  return (
    <section id="events" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Events
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Upcoming Events
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div key={event.title} variants={fadeInUp}>
              <Card glass={false} className="h-full group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    event.type === 'Technical' ? 'bg-blue-100 text-blue-700' :
                    event.type === 'Industry' ? 'bg-purple-100 text-purple-700' :
                    event.type === 'Academic' ? 'bg-green-100 text-green-700' :
                    event.type === 'Social' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>{event.type}</span>
                  <Calendar className="w-4 h-4 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{event.date}</p>
                  <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{event.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{event.location}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
