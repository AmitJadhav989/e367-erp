import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'Jan', present: 92, absent: 8 },
  { month: 'Feb', present: 88, absent: 12 },
  { month: 'Mar', present: 95, absent: 5 },
  { month: 'Apr', present: 78, absent: 22 },
  { month: 'May', present: 85, absent: 15 },
  { month: 'Jun', present: 90, absent: 10 },
];

const todayAttendance = [
  { name: 'Aarav Mehta', usn: 'E367CS001', status: 'Present' as const, time: '9:15 AM' },
  { name: 'Priya Sharma', usn: 'E367CS002', status: 'Present' as const, time: '8:45 AM' },
  { name: 'Rahul Verma', usn: 'E367EC001', status: 'Absent' as const, time: '-' },
  { name: 'Ananya Patel', usn: 'E367ME001', status: 'Present' as const, time: '9:00 AM' },
  { name: 'Vikram Singh', usn: 'E367CS003', status: 'Absent' as const, time: '-' },
  { name: 'Neha Gupta', usn: 'E367EC002', status: 'Present' as const, time: '8:50 AM' },
];

export default function AttendancePage() {
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');

  const filtered = todayAttendance.filter((s) => {
    if (filter === 'present') return s.status === 'Present';
    if (filter === 'absent') return s.status === 'Absent';
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance</h2>
          <p className="text-gray-500 mt-1">Mark and monitor student attendance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
            <Calendar className="w-4 h-4" />
            Select Date
          </Button>
          <Button variant="primary" size="sm">
            <CheckCircle2 className="w-4 h-4" />
            Mark All Present
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Bar dataKey="present" fill="#FF0000" radius={[4, 4, 0, 0]} name="Present %" />
                  <Bar dataKey="absent" fill="#1B263B" radius={[4, 4, 0, 0]} name="Absent %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Present</span>
                </div>
                <span className="text-xl font-bold text-green-600">42</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Absent</span>
                </div>
                <span className="text-xl font-bold text-red-600">6</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Total</span>
                </div>
                <span className="text-xl font-bold text-blue-600">48</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Today's Attendance List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
            <div className="flex gap-2">
              {(['all', 'present', 'absent'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    filter === f
                      ? 'bg-brand-red text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {filtered.map((student) => (
              <div
                key={student.usn}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    student.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{student.usn}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  student.status === 'Present'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {student.status}
                  {student.status === 'Present' && <span className="ml-1 text-gray-400">({student.time})</span>}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
