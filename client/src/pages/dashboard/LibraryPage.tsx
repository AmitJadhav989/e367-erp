import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Plus, QrCode } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const books = [
  { title: 'Introduction to Algorithms', author: 'CLRS', isbn: '9780262033848', category: 'CS', copies: 10, available: 7 },
  { title: 'Database Systems', author: 'Elmasri & Navathe', isbn: '9780133970777', category: 'CS', copies: 8, available: 5 },
  { title: 'Digital Design', author: 'M. Morris Mano', isbn: '9780134549897', category: 'EC', copies: 6, available: 3 },
  { title: 'Engineering Thermodynamics', author: 'P.K. Nag', isbn: '9780070260627', category: 'ME', copies: 5, available: 2 },
  { title: 'Computer Networks', author: 'Tanenbaum', isbn: '9780132126953', category: 'CS', copies: 7, available: 4 },
  { title: 'Signals & Systems', author: 'Oppenheim', isbn: '9780138147570', category: 'EC', copies: 4, available: 1 },
];

export default function LibraryPage() {
  const [search, setSearch] = useState('');

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search),
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Library</h2>
          <p className="text-gray-500 mt-1">Browse books, issue/return with QR</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700"><QrCode className="w-4 h-4" />Scan QR</Button>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Add Book</Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none" placeholder="Search by title, author, or ISBN..." />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Author</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ISBN</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Copies</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Available</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((book, i) => (
                  <tr key={book.isbn} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-orange-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{book.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{book.isbn}</td>
                    <td className="px-6 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{book.category}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{book.copies}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${book.available > 0 ? 'text-green-600' : 'text-red-600'}`}>{book.available}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="border-gray-200 text-gray-600" disabled={book.available === 0}>Issue</Button>
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
