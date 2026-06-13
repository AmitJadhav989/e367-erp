import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, ClipboardCheck, FileText, DollarSign,
  Calendar, Briefcase, BookOpen, Building2, Bus, MessageSquare,
  BarChart3, LogOut, ChevronLeft, GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { useUIStore } from '@/store/ui';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'PRINCIPAL', 'HOD', 'FACULTY', 'STUDENT', 'PARENT', 'ACCOUNTANT', 'EXAM_CELL', 'PLACEMENT_OFFICER', 'LIBRARIAN'] },
  { label: 'Students', icon: Users, href: '/dashboard/students', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'HOD', 'FACULTY'] },
  { label: 'Attendance', icon: ClipboardCheck, href: '/dashboard/attendance', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'HOD', 'FACULTY', 'STUDENT', 'PARENT'] },
  { label: 'Examinations', icon: FileText, href: '/dashboard/exams', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'EXAM_CELL', 'FACULTY', 'STUDENT'] },
  { label: 'Fees', icon: DollarSign, href: '/dashboard/fees', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'ACCOUNTANT', 'STUDENT', 'PARENT'] },
  { label: 'Timetable', icon: Calendar, href: '/dashboard/timetable', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'HOD', 'FACULTY', 'STUDENT'] },
  { label: 'Placements', icon: Briefcase, href: '/dashboard/placements', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'PLACEMENT_OFFICER', 'STUDENT'] },
  { label: 'Library', icon: BookOpen, href: '/dashboard/library', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'LIBRARIAN', 'STUDENT', 'FACULTY'] },
  { label: 'Hostel', icon: Building2, href: '/dashboard/hostel', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'STUDENT'] },
  { label: 'Transport', icon: Bus, href: '/dashboard/transport', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'STUDENT'] },
  { label: 'Messages', icon: MessageSquare, href: '/dashboard/chat', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'FACULTY', 'STUDENT', 'PARENT'] },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics', roles: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'PRINCIPAL', 'HOD'] },
];

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  const filteredNav = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full bg-surface-dark text-white transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20',
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold">E367 ERP</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
          >
            <ChevronLeft className={cn('w-5 h-5 transition-transform', sidebarOpen ? '' : 'rotate-180')} />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                  isActive
                    ? 'bg-brand-red text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white',
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              {filteredNav.find((n) => n.href === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.profile ? 'firstName' in user.profile ? (user.profile as any).firstName : user.email : user?.email}</p>
                <p className="text-xs text-gray-500">{user?.role.replace('_', ' ')}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
