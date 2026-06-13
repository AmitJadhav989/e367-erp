import { motion } from 'framer-motion';
import { Bus, MapPin, Users, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const routes = [
  { name: 'Route 1 — City Center', driver: 'Rajesh Kumar', phone: '9876540001', stops: 8, students: 45, status: 'Active' },
  { name: 'Route 2 — Tech Park', driver: 'Suresh Singh', phone: '9876540002', stops: 6, students: 32, status: 'Active' },
  { name: 'Route 3 — North Campus', driver: 'Amit Verma', phone: '9876540003', stops: 10, students: 58, status: 'Active' },
  { name: 'Route 4 — East Colony', driver: 'Vijay Kumar', phone: '9876540004', stops: 7, students: 28, status: 'Inactive' },
  { name: 'Route 5 — South Valley', driver: 'Deepak Rai', phone: '9876540005', stops: 9, students: 41, status: 'Active' },
];

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transport Management</h2>
          <p className="text-gray-500 mt-1">Bus routes, GPS tracking, and student allocations</p>
        </div>
        <Button variant="primary" size="sm"><Bus className="w-4 h-4" /> Add Route</Button>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={staggerContainer} initial="hidden" animate="visible">
        {[
          { label: 'Total Routes', value: '5', icon: Bus, color: 'from-blue-500 to-blue-600' },
          { label: 'Active Buses', value: '4', icon: Bus, color: 'from-green-500 to-emerald-600' },
          { label: 'Students Enrolled', value: '204', icon: Users, color: 'from-purple-500 to-purple-600' },
          { label: 'Total Stops', value: '40', icon: MapPin, color: 'from-orange-500 to-orange-600' },
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

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Route</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Driver</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stops</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Students</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {routes.map((r) => (
                <tr key={r.name} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center"><Bus className="w-4 h-4 text-yellow-700" /></div>
                      <span className="text-sm font-medium text-gray-900">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{r.driver}</p>
                    <p className="text-xs text-gray-500">{r.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{r.stops}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{r.students}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-600">GPS</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
