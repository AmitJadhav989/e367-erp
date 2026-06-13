import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Departments', href: '#departments' },
  { label: 'Courses', href: '#courses' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Placements', href: '#placements' },
  { label: 'Contact', href: '#contact' },
];

const resources = [
  { label: 'Student Portal', href: '/dashboard' },
  { label: 'Library', href: '#library' },
  { label: 'E-Learning', href: '#' },
  { label: 'Events', href: '#events' },
  { label: 'Careers', href: '#' },
  { label: 'Alumni', href: '#alumni' },
];

const contactInfo = [
  { icon: MapPin, text: '123 Education Valley, Tech City, India' },
  { icon: Phone, text: '+91 1800 123 4567' },
  { icon: Mail, text: 'info@e367.edu.in' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">
                E367<span className="text-brand-red">.</span>EDU
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of engineers with world-class education,
              innovation, and industry-ready skills since 2001.
            </p>
            <div className="flex gap-3">
              {['FB', 'TW', 'IG', 'LN'].map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-brand-red hover:text-white transition-all cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-red transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-red transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-gray-400">
                  <item.icon className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E367 College of Engineering. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-red transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
