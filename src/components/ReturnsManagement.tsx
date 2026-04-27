import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Trash2, ShieldCheck, 
  Truck, Archive, FileText, Search,
  ChevronRight, ArrowDownLeft, Recycle, X
} from 'lucide-react';

export default function ReturnsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitiating, setIsInitiating] = useState(false);
  const [returns, setReturns] = useState([
    { id: 'RTN-551', dealer: 'Bright Battery', type: 'Warranty Return', item: 'INV-150', status: 'In Inspection', date: '2026-04-26' },
    { id: 'RTN-552', dealer: 'AutoPower Ltd', type: 'Dealer Stock Return', item: 'AUTO-35', status: 'Accepted', date: '2026-04-25' },
    { id: 'RTN-553', dealer: 'Scrap-It Solutions', type: 'Lead Scrap Dispatch', item: 'Raw Scrap', status: 'Processing', date: '2026-04-27' },
  ]);

  const [newReturn, setNewReturn] = useState({ dealer: '', type: 'Warranty Return', item: '' });

  const filteredReturns = useMemo(() => {
    return returns.filter(r => 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.dealer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [returns, searchTerm]);

  const handleInitiateReturn = (e: React.FormEvent) => {
    e.preventDefault();
    const rtn = {
      id: `RTN-${Math.floor(600 + Math.random() * 400)}`,
      dealer: newReturn.dealer,
      type: newReturn.type,
      item: newReturn.item,
      status: 'In Transit',
      date: new Date().toISOString().split('T')[0]
    };
    setReturns([rtn, ...returns]);
    setIsInitiating(false);
    setNewReturn({ dealer: '', type: 'Warranty Return', item: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Reverse Logistics & Returns</h2>
          <p className="text-gray-500 text-xs">Dealer Returns, Scrap Processing & Warranty Pull-backs</p>
        </div>
        <button 
          onClick={() => setIsInitiating(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
        >
           <Truck className="w-4 h-4" />
           Initiate Return Pickup
        </button>
      </div>

      <AnimatePresence>
        {isInitiating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 industrial-gradient text-white flex justify-between items-center">
                <h3 className="font-bold">Initiate Logistics Callback</h3>
                <button onClick={() => setIsInitiating(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleInitiateReturn} className="p-8 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Pick-up Source (Dealer)</label>
                  <input 
                    required value={newReturn.dealer} onChange={(e) => setNewReturn({...newReturn, dealer: e.target.value})}
                    placeholder="Search dealer name..."
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Return Category</label>
                  <select 
                    value={newReturn.type} onChange={(e) => setNewReturn({...newReturn, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                  >
                    <option>Warranty Return</option>
                    <option>Dealer Stock Return</option>
                    <option>Lead Scrap Dispatch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Items / Units</label>
                  <input 
                    required value={newReturn.item} onChange={(e) => setNewReturn({...newReturn, item: e.target.value})}
                    placeholder="e.g. 5x INV-150"
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-navy text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all mt-4">
                  Dispatch Logistics Partner
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-brand-electric flex items-center gap-6">
           <div className="w-12 h-12 rounded-full bg-brand-electric/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-brand-electric" />
           </div>
           <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5">Verified Warranty Returns</div>
              <div className="text-2xl font-bold text-brand-navy">458 Units</div>
           </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-status-warning flex items-center gap-6">
           <div className="w-12 h-12 rounded-full bg-status-warning/10 flex items-center justify-center">
              <Archive className="w-6 h-6 text-status-warning" />
           </div>
           <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5">Dealer Stock Exchange</div>
              <div className="text-2xl font-bold text-brand-navy">12 Batches</div>
           </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-indigo-500 flex items-center gap-6">
           <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Recycle className="w-6 h-6 text-indigo-600" />
           </div>
           <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5">Lead Scrap Accumulation</div>
              <div className="text-2xl font-bold text-brand-navy">8.2 Tons</div>
           </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
           <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Inbound Return Log</h3>
           <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-steel transition-all shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Return ID / Dealer..." 
                  className="pl-9 pr-4 py-2 text-xs outline-none w-64"
                />
              </div>
              <button 
                className="bg-brand-navy text-white px-4 text-[10px] font-bold uppercase hover:bg-brand-steel transition-colors border-l border-gray-100"
                onClick={() => console.log('Search triggered')}
              >
                Search
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                 <th className="px-8 py-4">Return ID / Date</th>
                 <th className="px-8 py-4">Dealer Source</th>
                 <th className="px-8 py-4">Return Category</th>
                 <th className="px-8 py-4">Associated Item</th>
                 <th className="px-8 py-4">Status</th>
                 <th className="px-8 py-4 text-right">Process</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {filteredReturns.map((r, idx) => (
                 <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                   <td className="px-8 py-5">
                      <div className="text-xs font-bold text-brand-navy">{r.id}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{r.date}</div>
                   </td>
                   <td className="px-8 py-5">
                      <div className="text-xs font-medium text-gray-800">{r.dealer}</div>
                   </td>
                   <td className="px-8 py-5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                        r.type.includes('Warranty') ? 'bg-red-100 text-red-600' : 
                        r.type.includes('Scrap') ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {r.type}
                      </span>
                   </td>
                   <td className="px-8 py-5 text-xs text-gray-600 font-mono">{r.item}</td>
                   <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'Accepted' ? 'bg-emerald-500' : 'bg-status-warning animate-pulse'}`} />
                         <span className="text-[10px] font-bold text-gray-600 uppercase">{r.status}</span>
                      </div>
                   </td>
                   <td className="px-8 py-5 text-right">
                      <button className="text-brand-steel hover:text-brand-navy p-2 hover:bg-gray-100 rounded-lg transition-all">
                         <ChevronRight className="w-4 h-4" />
                      </button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
