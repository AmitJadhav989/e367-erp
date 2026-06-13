import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const contacts = [
  { name: 'Dr. Arun Kumar', role: 'Professor, CSE', online: true, avatar: 'AK', lastMsg: 'Your assignment has been graded' },
  { name: 'Priya Sharma', role: 'Student, CSE', online: true, avatar: 'PS', lastMsg: 'When is the next class?' },
  { name: 'Rahul Verma', role: 'Student, ECE', online: false, avatar: 'RV', lastMsg: 'Thank you for the guidance' },
  { name: 'Dr. Meena Rajan', role: 'HOD, CSE', online: true, avatar: 'MR', lastMsg: 'Please submit the report by Friday' },
];

const initialMessages = [
  { text: 'Good morning! How can I help you?', sender: 'them', time: '9:00 AM' },
  { text: 'I had a question about the assignment deadline.', sender: 'me', time: '9:05 AM' },
  { text: 'Sure, the deadline has been extended to next Monday.', sender: 'them', time: '9:06 AM' },
  { text: 'Thank you for the update!', sender: 'me', time: '9:10 AM' },
];

export default function ChatPage() {
  const [selected, setSelected] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Contacts Sidebar */}
      <Card className="w-80 p-0 overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-brand-red/50 outline-none" placeholder="Search contacts..." />
          </div>
        </div>
        <div className="overflow-y-auto h-full">
          {contacts.map((contact, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50',
                selected === i && 'bg-brand-red/5',
              )}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
                  {contact.avatar}
                </div>
                {contact.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 p-0 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red font-bold text-sm">
            {contacts[selected].avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{contacts[selected].name}</p>
            <p className="text-xs text-gray-500">{contacts[selected].role}</p>
          </div>
          {contacts[selected].online && <span className="ml-auto text-xs text-green-600 font-medium">● Online</span>}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex', msg.sender === 'me' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn(
                'max-w-[70%] px-4 py-2.5 rounded-2xl',
                msg.sender === 'me'
                  ? 'bg-brand-red text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md',
              )}>
                <p className="text-sm">{msg.text}</p>
                <p className={cn('text-xs mt-1', msg.sender === 'me' ? 'text-white/60' : 'text-gray-400')}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-brand-red/50 outline-none text-sm"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="w-11 h-11 rounded-xl bg-brand-red flex items-center justify-center text-white hover:bg-red-700 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
