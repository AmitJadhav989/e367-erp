import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Briefcase, GraduationCap } from 'lucide-react';
import Card from '@/components/ui/Card';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const studentGrowth = [
  { year: '2021', students: 8200 },
  { year: '2022', students: 8900 },
  { year: '2023', students: 9500 },
  { year: '2024', students: 10248 },
  { year: '2025', students: 11000 },
];

const branchDistribution = [
  { name: 'CSE', value: 2800, color: '#FF0000' },
  { name: 'ECE', value: 2100, color: '#00B4D8' },
  { name: 'ME', value: 1800, color: '#1B263B' },
  { name: 'CE', value: 1200, color: '#7209B7' },
  { name: 'IT', value: 1500, color: '#FF6B6B' },
  { name: 'EEE', value: 848, color: '#4ECDC4' },
];

const placementTrend = [
  { year: '2021', placed: 680, avgPackage: 8.5 },
  { year: '2022', placed: 750, avgPackage: 9.8 },
  { year: '2023', placed: 820, avgPackage: 10.5 },
  { year: '2024', placed: 920, avgPackage: 12.5 },
  { year: '2025', placed: 1050, avgPackage: 14.2 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-500 mt-1">Institution-wide metrics and trends</p>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={staggerContainer} initial="hidden" animate="visible">
        {[
          { label: 'Total Students', value: '10,248', icon: Users, change: '+8%', color: 'from-blue-500 to-blue-600' },
          { label: 'Avg Attendance', value: '89.5%', icon: TrendingUp, change: '+2.1%', color: 'from-green-500 to-emerald-600' },
          { label: 'Placement Rate', value: '94%', icon: Briefcase, change: '+6%', color: 'from-purple-500 to-purple-600' },
          { label: 'Fee Collection', value: '₹2.4Cr', icon: DollarSign, change: '+12%', color: 'from-orange-500 to-orange-600' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card className="p-5">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-red" /> Student Growth
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#FF0000" strokeWidth={3} dot={{ fill: '#FF0000', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Branch Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={branchDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {branchDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Placement Trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-red" /> Placement Trends
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="placed" fill="#FF0000" radius={[4, 4, 0, 0]} name="Placed Students" />
                <Bar yAxisId="right" dataKey="avgPackage" fill="#00B4D8" radius={[4, 4, 0, 0]} name="Avg Package (LPA)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
