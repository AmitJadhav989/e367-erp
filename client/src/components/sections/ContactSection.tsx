import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const contactCards = [
  { icon: Phone, title: 'Phone', value: '+91 1800 123 4567', sub: 'Mon–Sat, 9AM–6PM' },
  { icon: Mail, title: 'Email', value: 'info@e367.edu.in', sub: 'We reply within 24 hrs' },
  { icon: MapPin, title: 'Address', value: '123 Education Valley, Tech City, India', sub: 'Main Campus' },
  { icon: Clock, title: 'Office Hours', value: '9:00 AM – 6:00 PM', sub: 'Mon–Sat' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-brand-red font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Contact
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading text-gray-900 mb-4">
            Get In Touch
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-brand-red mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactCards.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <Card glass={false} className="text-center h-full">
                  <c.icon className="w-6 h-6 text-brand-red mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 text-sm">{c.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{c.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{c.sub}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card glass={false} className="h-full">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all resize-none"
                    placeholder="Write your message..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
