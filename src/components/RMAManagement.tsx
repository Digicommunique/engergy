import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Plus, Search, Filter, MessageSquare, Truck, CheckCircle2, History, X } from 'lucide-react';

interface RMAComplaint {
  id: string;
  serialNumber: string;
  customerName: string;
  issue: string;
  status: 'Open' | 'Inspection' | 'Repairing' | 'Replacement' | 'Closed';
  date: string;
}

interface RMAManagementProps {
  complaints: RMAComplaint[];
  setComplaints: React.Dispatch<React.SetStateAction<RMAComplaint[]>>;
}

const STAGES: RMAComplaint['status'][] = ['Open', 'Inspection', 'Repairing', 'Replacement', 'Closed'];

export default function RMAManagement({ complaints, setComplaints }: RMAManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [newTicket, setNewTicket] = useState({ serial: '', customer: '', issue: '' });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket: RMAComplaint = {
      id: `TKT-${Math.floor(9000 + Math.random() * 1000)}`,
      serialNumber: newTicket.serial,
      customerName: newTicket.customer,
      issue: newTicket.issue,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    setComplaints([ticket, ...complaints]);
    setIsBooking(false);
  };

  const handleNextStage = (id: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const currentIndex = STAGES.indexOf(c.status);
        const nextStatus = STAGES[Math.min(currentIndex + 1, STAGES.length - 1)];
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const filteredComplaints = complaints.filter(c => 
    c.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">Service & RMA Management</h2>
          <p className="text-gray-500 italic text-sm">Complaint lifecycle: Booking → Inspection → Decision → Fulfillment.</p>
        </div>
        <button 
           onClick={() => setIsBooking(true)}
           className="bg-status-danger text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg"
        >
           <ShieldAlert className="w-4 h-4" />
           Raise New Complaint
        </button>
      </div>

      <AnimatePresence>
        {isBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
               <div className="p-6 bg-status-danger text-white flex justify-between items-center">
                 <h3 className="font-bold">Complaint Registration</h3>
                 <button onClick={() => setIsBooking(false)} className="text-white/60 hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleBook} className="p-8 space-y-4">
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Battery Serial Number</label>
                   <input 
                     required
                     value={newTicket.serial}
                     onChange={(e) => setNewTicket({...newTicket, serial: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-status-danger/20 transition-all font-mono text-sm"
                     placeholder="e.g. SN-00921-A"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Name</label>
                   <input 
                     required
                     value={newTicket.customer}
                     onChange={(e) => setNewTicket({...newTicket, customer: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-status-danger/20 transition-all text-sm"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Issue</label>
                   <textarea 
                     required
                     value={newTicket.issue}
                     onChange={(e) => setNewTicket({...newTicket, issue: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-status-danger/20 transition-all text-sm h-24 resize-none"
                     placeholder="Describe the failure..."
                   />
                 </div>
                 <button type="submit" className="w-full bg-status-danger text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all uppercase tracking-widest text-xs mt-4">
                   Generate Service Ticket
                 </button>
               </form>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-6 bg-status-danger/5 border-l-4 border-l-status-danger">
            <div className="text-[10px] font-bold text-status-danger uppercase tracking-widest mb-1">Critical Tickets</div>
            <div className="text-3xl font-bold text-brand-navy">12</div>
          </div>
          <div className="glass-card p-6 bg-brand-electric/5 border-l-4 border-l-brand-electric">
            <div className="text-[10px] font-bold text-brand-electric uppercase tracking-widest mb-1">Avg Resolution</div>
            <div className="text-3xl font-bold text-brand-navy">3.5d</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Customer CSAT</div>
            <div className="text-3xl font-bold text-emerald-500">4.8/5</div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
              <h3 className="font-bold text-brand-navy text-sm">Complaint Registry</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search serial / ticket..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-steel w-64"
                  />
                </div>
                <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 text-brand-steel" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                    <th className="px-6 py-4">Ticket ID</th>
                    <th className="px-6 py-4">Serial No</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredComplaints.map((c, i) => {
                    const currentIdx = STAGES.indexOf(c.status);
                    return (
                      <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="text-sm font-bold text-brand-navy">{c.id}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{c.date}</div>
                        </td>
                        <td className="px-6 py-5 text-sm font-mono text-gray-600 font-semibold">{c.serialNumber}</td>
                        <td className="px-6 py-5 text-sm text-gray-600">{c.customerName}</td>
                        <td className="px-6 py-5">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                             c.status === 'Open' ? 'bg-red-100 text-red-600 animate-pulse' :
                             c.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-status-warning/10 text-status-warning'
                           }`}>
                             {c.status}
                           </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col items-end gap-3">
                             <div className="flex items-center gap-1">
                               {STAGES.map((s, idx) => (
                                 <React.Fragment key={s}>
                                   <div 
                                     className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                                       idx < currentIdx ? 'bg-emerald-500 text-white' : 
                                       idx === currentIdx ? 'bg-brand-electric text-white ring-4 ring-brand-electric/20 pulse' : 
                                       'bg-gray-200 text-gray-400'
                                     }`}
                                     title={s}
                                   >
                                     {idx < currentIdx ? '✓' : idx + 1}
                                   </div>
                                   {idx < STAGES.length - 1 && (
                                     <div className={`w-4 h-0.5 rounded-full ${idx < currentIdx ? 'bg-emerald-500' : 'bg-gray-100'}`} />
                                   )}
                                 </React.Fragment>
                               ))}
                             </div>
                             
                             <div className="flex items-center gap-2">
                               {c.status !== 'Closed' ? (
                                 <button 
                                   onClick={() => handleNextStage(c.id)}
                                   className="bg-brand-navy hover:bg-brand-steel text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all shadow-md flex items-center gap-1.5 group"
                                 >
                                   <span>Move to {STAGES[currentIdx + 1]}</span>
                                   <Truck className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                 </button>
                               ) : (
                                 <div className="flex items-center gap-1 text-emerald-600 text-[9px] font-bold uppercase">
                                   <CheckCircle2 className="w-3 h-3" />
                                   Resolved
                                 </div>
                               )}
                             </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
