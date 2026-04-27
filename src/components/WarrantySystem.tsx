import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Search, ShieldAlert, BarChart3, Clock, CheckCircle2, X, Calendar } from 'lucide-react';

interface WarrantyRegistration {
  id: string;
  model: string;
  dealer: string;
  date: string;
  status: 'Active' | 'In Repair' | 'Expired';
  type: 'Free Replacement' | 'Pro-rata' | 'Out of Warranty';
  expiryDate: string;
}

interface WarrantySystemProps {
  registrations: WarrantyRegistration[];
  onRegister: (reg: WarrantyRegistration) => void;
}

export default function WarrantySystem({ registrations, onRegister }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [newReg, setNewReg] = useState({ 
    id: '', 
    model: 'INV-150', 
    dealer: 'Direct Store',
    type: 'Free Replacement' as any
  });

  const calculateExpiry = (date: string, type: string) => {
    const d = new Date(date);
    if (type === 'Free Replacement') d.setFullYear(d.getFullYear() + 2);
    else if (type === 'Pro-rata') d.setFullYear(d.getFullYear() + 4);
    else return 'N/A';
    return d.toISOString().split('T')[0];
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    onRegister({
      id: newReg.id || `SN-${Math.floor(10000 + Math.random() * 90000)}`,
      model: newReg.model,
      dealer: newReg.dealer,
      date,
      status: 'Active',
      type: newReg.type,
      expiryDate: calculateExpiry(date, newReg.type)
    });
    setIsRegistering(false);
  };

  const filteredRegs = registrations.filter((r: any) => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dealer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">Warranty Management Portal</h2>
          <p className="text-gray-500">Track registrations, manage claims with logic-based replacement rules.</p>
        </div>
        <button 
           onClick={() => setIsRegistering(true)}
           className="bg-brand-electric text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg shadow-brand-electric/20 transition-all flex items-center gap-2"
        >
           <ShieldAlert className="w-4 h-4" />
           New Warranty Registration
        </button>
      </div>

      <AnimatePresence>
        {isRegistering && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
           >
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
               <div className="p-6 industrial-gradient text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Register Warranty</h3>
                 <button onClick={() => setIsRegistering(false)} className="text-white/60 hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleRegister} className="p-6 space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Serial Number</label>
                   <input 
                     value={newReg.id}
                     onChange={(e) => setNewReg({...newReg, id: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none text-sm font-mono"
                     placeholder="Auto-generated if empty"
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Model</label>
                      <select 
                        value={newReg.model}
                        onChange={(e) => setNewReg({...newReg, model: e.target.value})}
                        className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none text-sm"
                      >
                        <option>INV-150</option>
                        <option>AUTO-35</option>
                        <option>VRLA-100</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Warranty Type</label>
                      <select 
                        value={newReg.type}
                        onChange={(e) => setNewReg({...newReg, type: e.target.value as any})}
                        className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none text-sm"
                      >
                        <option>Free Replacement</option>
                        <option>Pro-rata</option>
                        <option>Out of Warranty</option>
                      </select>
                    </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Dealer Agency</label>
                   <input 
                     required
                     value={newReg.dealer}
                     onChange={(e) => setNewReg({...newReg, dealer: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none text-sm"
                   />
                 </div>
                 <button type="submit" className="w-full bg-brand-electric text-brand-navy font-bold py-3 rounded-lg hover:shadow-lg transition-all mt-4">
                   Activate Warranty
                 </button>
               </form>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-1 space-y-6">
            <div className="glass-card p-8 industrial-gradient text-white">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Search className="w-5 h-5 text-brand-electric" />
                 Instant Verify
               </h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-blue-100/60 uppercase tracking-widest mb-2 block">Serial Number / QR Code</label>
                    <div className="flex gap-2">
                       <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="e.g. SN-00921"
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg py-3 px-4 outline-none focus:border-brand-electric transition-all placeholder:text-blue-100/30 font-mono"
                       />
                       {searchTerm && (
                         <button onClick={() => setSearchTerm('')} className="bg-white/10 px-3 rounded-lg hover:bg-white/20 transition-all">
                           <X className="w-4 h-4 text-white" />
                         </button>
                       )}
                    </div>
                  </div>
                  <button className="w-full bg-brand-electric hover:bg-brand-electric-hover text-brand-navy font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    Verify Authenticity
                  </button>
               </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-bold text-brand-navy mb-4 uppercase text-[10px] tracking-widest">System Health</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                   <div className="flex items-center gap-2 text-xs text-gray-600">
                     <BarChart3 className="w-4 h-4 text-brand-steel" />
                     Total Active
                   </div>
                   <span className="font-bold text-brand-navy">{registrations.length}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-4 h-4 text-status-warning" />
                      Claims Under Logic
                    </div>
                    <span className="font-bold text-brand-navy">14</span>
                 </div>
              </div>
            </div>
         </div>

         <div className="md:col-span-2 glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Registration Digital Ledger</h3>
              <div className="text-[10px] font-bold text-brand-steel bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                SYNCED: {filteredRegs.length} RECORDS
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/80 uppercase text-[9px] font-bold tracking-[0.2em] text-gray-400">
                    <th className="px-6 py-4">Serial No</th>
                    <th className="px-6 py-4">Model & Type</th>
                    <th className="px-6 py-4">Dealer</th>
                    <th className="px-6 py-4">Validity</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredRegs.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                         <div className="font-mono text-xs font-bold text-brand-navy">{row.id}</div>
                         <div className="text-[9px] text-gray-400 mt-0.5">{row.date}</div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="text-xs font-medium text-gray-700">{row.model}</div>
                         <div className="text-[9px] font-bold text-indigo-500 uppercase">{row.type || 'Standard'}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">{row.dealer}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                            <Calendar className="w-3 h-3" />
                            Exp: {row.expiryDate || '2028-04-27'}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                          row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-status-warning/10 text-status-warning'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
      </div>
    </div>
  );
}
