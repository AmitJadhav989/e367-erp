import { motion } from 'framer-motion';
import { Plus, FileText, Download, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const exams = [
  { name: 'Internal Assessment 1', course: 'Data Structures', sem: 6, date: '15 Mar 2025', type: 'Internal', status: 'Completed' },
  { name: 'Internal Assessment 2', course: 'Algorithms', sem: 6, date: '20 Apr 2025', type: 'Internal', status: 'Upcoming' },
  { name: 'Midterm Exam', course: 'Database Systems', sem: 4, date: '10 May 2025', type: 'Midterm', status: 'Upcoming' },
  { name: 'End Semester Exam', course: 'Thermodynamics', sem: 8, date: '25 Jun 2025', type: 'End Sem', status: 'Scheduled' },
  { name: 'Practical Exam', course: 'Digital Electronics', sem: 4, date: '5 Jun 2025', type: 'Practical', status: 'Scheduled' },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Examinations</h2>
          <p className="text-gray-500 mt-1">Manage exams, hall tickets, and results</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
            <Download className="w-4 h-4" />
            Export Results
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Schedule Exam
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none" placeholder="Search exams..." />
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
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Exam</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Course</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Sem</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exams.map((exam, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{exam.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.course}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.sem}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.date}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{exam.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        exam.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        exam.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{exam.status}</span>
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
