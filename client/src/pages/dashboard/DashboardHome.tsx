import { motion } from 'framer-motion';
import {
  Users, ClipboardCheck, DollarSign, TrendingUp,
  BookOpen, Briefcase, ArrowUp, ArrowDown,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const statsCards = [
  { label: 'Total Students', value: '10,248', icon: Users, change: '+12%', trend: 'up', color: 'from-blue-500 to-blue-600' },
  { label: 'Attendance Today', value: '94.2%', icon: ClipboardCheck, change: '+2.1%', trend: 'up', color: 'from-green-500 to-emerald-600' },
  { label: 'Fees Collected', value: '₹2.4Cr', icon: DollarSign, change: '+8.5%', trend: 'up', color: 'from-purple-500 to-purple-600' },
  { label: 'Placements', value: '342', icon: Briefcase, change: '+18%', trend: 'up', color: 'from-orange-500 to-orange-600' },
];

const recentActivities = [
  { action: 'Attendance marked', detail: 'CSE 3rd Sem - 45/48 present', time: '5 min ago' },
  { action: 'Fee payment received', detail: 'Rahul Sharma - ₹85,000', time: '12 min ago' },
  { action: 'New placement drive', detail: 'Google - SDE Role - ₹45 LPA', time: '1 hr ago' },
  { action: 'Exam schedule updated', detail: 'Internal Assessment 2 dates published', time: '2 hrs ago' },
  { action: 'Library book issued', detail: 'Ananya Patel - "Data Structures"', time: '3 hrs ago' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {statsCards.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-brand-red shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Mark Attendance', icon: ClipboardCheck, color: 'bg-blue-100 text-blue-700' },
              { label: 'Add Student', icon: Users, color: 'bg-green-100 text-green-700' },
              { label: 'Create Exam', icon: BookOpen, color: 'bg-purple-100 text-purple-700' },
              { label: 'New Payment', icon: DollarSign, color: 'bg-orange-100 text-orange-700' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
