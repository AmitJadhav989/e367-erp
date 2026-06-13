import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HomePage from '@/pages/public/HomePage';
import LoginPage from '@/pages/public/LoginPage';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import StudentsPage from '@/pages/dashboard/StudentsPage';
import AttendancePage from '@/pages/dashboard/AttendancePage';
import ExamsPage from '@/pages/dashboard/ExamsPage';
import FeesPage from '@/pages/dashboard/FeesPage';
import PlacementsPage from '@/pages/dashboard/PlacementsPage';
import LibraryPage from '@/pages/dashboard/LibraryPage';
import ChatPage from '@/pages/dashboard/ChatPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import HostelPage from '@/pages/dashboard/HostelPage';
import TransportPage from '@/pages/dashboard/TransportPage';
import PrivateRoute from '@/components/layout/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/students" element={<StudentsPage />} />
              <Route path="/dashboard/attendance" element={<AttendancePage />} />
              <Route path="/dashboard/exams" element={<ExamsPage />} />
              <Route path="/dashboard/fees" element={<FeesPage />} />
              <Route path="/dashboard/placements" element={<PlacementsPage />} />
              <Route path="/dashboard/library" element={<LibraryPage />} />
              <Route path="/dashboard/chat" element={<ChatPage />} />
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboard/hostel" element={<HostelPage />} />
              <Route path="/dashboard/transport" element={<TransportPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
