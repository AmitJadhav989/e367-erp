import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollReveal';

const feeChartData = [
  { month: 'Jan', collected: 85, pending: 15 },
  { month: 'Feb', collected: 92, pending: 8 },
  { month: 'Mar', collected: 78, pending: 22 },
  { month: 'Apr', collected: 88, pending: 12 },
  { month: 'May', collected: 95, pending: 5 },
  { month: 'Jun', collected: 82, pending: 18 },
];

const recentTransactions = [
  { name: 'Aarav Mehta', usn: 'E367CS001', amount: '₹85,000', status: 'Paid', date: '12 Jun 2025' },
  { name: 'Priya Sharma', usn: 'E367CS002', amount: '₹85,000', status: 'Paid', date: '11 Jun 2025' },
  { name: 'Rahul Verma', usn: 'E367EC001', amount: '₹42,500', status: 'Partial', date: '10 Jun 2025' },
  { name: 'Vikram Singh', usn: 'E367CS003', amount: '₹85,000', status: 'Pending', date: '-' },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
          <p className="text-gray-500 mt-1">Track collections, payments, and pending dues</p>
        </div>
        <Button variant="primary" size="sm">
          <DollarSign className="w-4 h-4" />
          Create Invoice
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Total Collected', value: '₹2.4Cr', icon: TrendingUp, change: '+12%', color: 'from-green-500 to-emerald-600' },
          { label: 'Pending Dues', value: '₹48L', icon: AlertCircle, change: '-8%', color: 'from-red-500 to-red-600' },
          { label: 'Total Transactions', value: '1,247', icon: DollarSign, change: '+18%', color: 'from-blue-500 to-blue-600' },
          { label: 'Paid Students', value: '8,942', icon: CheckCircle2, change: '+5%', color: 'from-purple-500 to-purple-600' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Collection</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Bar dataKey="collected" fill="#FF0000" radius={[4, 4, 0, 0]} name="Collected (L)" />
                <Bar dataKey="pending" fill="#1B263B" radius={[4, 4, 0, 0]} name="Pending (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.usn}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{t.amount}</p>
                  <span className={`text-xs font-medium ${
                    t.status === 'Paid' ? 'text-green-600' :
                    t.status === 'Partial' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
