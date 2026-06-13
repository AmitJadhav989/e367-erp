import { motion } from 'framer-motion';
import { Building2, Users, DoorOpen, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const hostels = [
  { name: 'Boys Hostel A', type: 'Boys', capacity: 400, occupied: 378, warden: 'Mr. Sharma', phone: '9876543210' },
  { name: 'Boys Hostel B', type: 'Boys', capacity: 350, occupied: 312, warden: 'Mr. Verma', phone: '9876543211' },
  { name: 'Girls Hostel A', type: 'Girls', capacity: 300, occupied: 289, warden: 'Mrs. Gupta', phone: '9876543212' },
  { name: 'Girls Hostel B', type: 'Girls', capacity: 250, occupied: 234, warden: 'Mrs. Singh', phone: '9876543213' },
];

const complaints = [
  { student: 'Rahul Verma', room: 'A-204', issue: 'Fan not working', status: 'Pending', date: '12 Jun' },
  { student: 'Priya Sharma', room: 'GA-105', issue: 'Water leakage', status: 'In Progress', date: '10 Jun' },
  { student: 'Aarav Mehta', room: 'A-112', issue: 'WiFi connectivity', status: 'Resolved', date: '8 Jun' },
];

export default function HostelPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hostel Management</h2>
          <p className="text-gray-500 mt-1">Room allocations, complaints, and occupancy</p>
        </div>
        <Button variant="primary" size="sm">
          <DoorOpen className="w-4 h-4" />
          Allocate Room
        </Button>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={staggerContainer} initial="hidden" animate="visible">
        {[
          { label: 'Total Capacity', value: '1,300', icon: Building2, color: 'from-blue-500 to-blue-600' },
          { label: 'Occupied', value: '1,213', icon: Users, color: 'from-green-500 to-emerald-600' },
          { label: 'Available', value: '87', icon: DoorOpen, color: 'from-purple-500 to-purple-600' },
          { label: 'Open Complaints', value: '4', icon: AlertCircle, color: 'from-orange-500 to-orange-600' },
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
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Details</h3>
          <div className="space-y-4">
            {hostels.map((h) => (
              <div key={h.name} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{h.name}</p>
                  <p className="text-xs text-gray-500">Warden: {h.warden} | {h.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{h.occupied}/{h.capacity}</p>
                  <div className="w-24 h-1.5 rounded-full bg-gray-200 mt-1 overflow-hidden">
                    <div className="h-full rounded-full bg-brand-red" style={{ width: `${(h.occupied / h.capacity) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Complaints</h3>
          <div className="space-y-3">
            {complaints.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.issue}</p>
                  <p className="text-xs text-gray-500">{c.student} • Room {c.room} • {c.date}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                  c.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
