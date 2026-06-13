import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const drives = [
  { company: 'Google', role: 'Software Engineer', package: '₹45 LPA', deadline: '30 Sep 2025', applicants: 124, status: 'Open' },
  { company: 'Microsoft', role: 'SDE Intern', package: '₹30 LPA', deadline: '15 Oct 2025', applicants: 89, status: 'Open' },
  { company: 'Amazon', role: 'Cloud Engineer', package: '₹38 LPA', deadline: '20 Nov 2025', applicants: 156, status: 'Open' },
  { company: 'Tesla', role: 'Embedded Systems', package: '₹42 LPA', deadline: '5 Dec 2025', applicants: 67, status: 'Upcoming' },
  { company: 'Goldman Sachs', role: 'Analyst', package: '₹35 LPA', deadline: '10 Jan 2026', applicants: 0, status: 'Draft' },
];

export default function PlacementsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Placements</h2>
          <p className="text-gray-500 mt-1">Manage placement drives and applications</p>
        </div>
        <Button variant="primary" size="sm">
          <Building2 className="w-4 h-4" />
          New Drive
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Active Drives', value: '8', icon: Briefcase, change: '+3', color: 'from-blue-500 to-blue-600' },
          { label: 'Total Placed', value: '342', icon: Users, change: '+18%', color: 'from-green-500 to-emerald-600' },
          { label: 'Highest Package', value: '₹45 LPA', icon: DollarSign, change: '', color: 'from-purple-500 to-purple-600' },
          { label: 'Avg Package', value: '₹12.5 LPA', icon: TrendingUp, change: '+8%', color: 'from-orange-500 to-orange-600' },
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Package</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Deadline</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Applicants</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {drives.map((drive, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">{drive.company[0]}</div>
                        <span className="text-sm font-medium text-gray-900">{drive.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{drive.role}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{drive.package}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{drive.deadline}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{drive.applicants}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        drive.status === 'Open' ? 'bg-green-100 text-green-700' :
                        drive.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                      }`}>{drive.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="border-gray-200 text-gray-600">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
