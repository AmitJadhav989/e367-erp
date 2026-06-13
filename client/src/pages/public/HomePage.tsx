import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import MessagesSection from '@/components/sections/MessagesSection';
import DepartmentSection from '@/components/sections/DepartmentSection';
import FacultySection from '@/components/sections/FacultySection';
import PlacementSection from '@/components/sections/PlacementSection';
import GallerySection from '@/components/sections/GallerySection';
import ResearchSection from '@/components/sections/ResearchSection';
import AlumniSection from '@/components/sections/AlumniSection';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import EventsSection from '@/components/sections/EventsSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <MessagesSection />
      <DepartmentSection />
      <FacultySection />
      <PlacementSection />
      <GallerySection />
      <ResearchSection />
      <AlumniSection />
      <FacilitiesSection />
      <EventsSection />
      <TestimonialSection />
      <ContactSection />
    </motion.div>
  );
}
