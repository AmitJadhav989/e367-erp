import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Departments', href: '#departments' },
  { label: 'Courses', href: '#courses' },
  { label: 'Placements', href: '#placements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg'
          : isHome
            ? 'bg-transparent'
            : 'bg-white/80 backdrop-blur-xl shadow-lg',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
              isScrolled ? 'bg-brand-red' : 'bg-white/20',
            )}>
              <GraduationCap className={cn(
                'w-6 h-6',
                isScrolled ? 'text-white' : 'text-white',
              )} />
            </div>
            <span className={cn(
              'text-xl font-heading font-bold transition-colors',
              isScrolled ? 'text-gray-900' : 'text-white',
            )}>
              E367<span className="text-brand-red">.</span>EDU
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-red',
                  isScrolled ? 'text-gray-700' : 'text-white/80',
                )}
              >
                {link.label}
              </a>
            ))}
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-gray-900' : 'text-white',
            )}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-700 font-medium hover:text-brand-red transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
