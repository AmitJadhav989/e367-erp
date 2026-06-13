import { motion } from 'framer-motion';
import { Search, Plus, Filter, Download, MoreHorizontal } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const students = [
  { name: 'Aarav Mehta', usn: 'E367CS001', branch: 'CSE', semester: 6, attendance: 92, cgpa: 8.7, status: 'Active' },
  { name: 'Priya Sharma', usn: 'E367CS002', branch: 'CSE', semester: 6, attendance: 88, cgpa: 9.1, status: 'Active' },
  { name: 'Rahul Verma', usn: 'E367EC001', branch: 'ECE', semester: 4, attendance: 75, cgpa: 7.4, status: 'Active' },
  { name: 'Ananya Patel', usn: 'E367ME001', branch: 'ME', semester: 8, attendance: 95, cgpa: 8.9, status: 'Active' },
  { name: 'Vikram Singh', usn: 'E367CS003', branch: 'CSE', semester: 6, attendance: 65, cgpa: 6.2, status: 'Warning' },
  { name: 'Neha Gupta', usn: 'E367EC002', branch: 'ECE', semester: 4, attendance: 90, cgpa: 8.4, status: 'Active' },
  { name: 'Arjun Nair', usn: 'E367CS004', branch: 'CSE', semester: 2, attendance: 85, cgpa: 7.8, status: 'Active' },
  { name: 'Kavya Reddy', usn: 'E367BT001', branch: 'BT', semester: 6, attendance: 78, cgpa: 7.1, status: 'Active' },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Students</h2>
          <p className="text-gray-500 mt-1">Manage student records and profiles</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
            placeholder="Search by name, USN, or branch..."
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </motion.div>

      {/* Table */}
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
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">USN</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sem</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">CGPA</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, i) => (
                  <motion.tr
                    key={student.usn}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{student.usn}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">{student.branch}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.semester}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${student.attendance >= 85 ? 'bg-green-500' : student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${student.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.cgpa}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 8 of 10,248 students</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1.5 text-sm rounded-lg bg-brand-red text-white">1</button>
              <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
              <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
