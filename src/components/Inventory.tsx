import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Warehouse, ArrowUp, ArrowDown, Package, AlertCircle, ShoppingCart, TrendingUp, Filter, Search, X, Plus, History, CheckCircle2 } from 'lucide-react';
import { Unit } from '../constants';

export interface InventoryItem {
  material: string;
  stock: number;
  reserved: number;
  unit: Unit;
  minLevel: number;
}

export interface GRNEntry {
  id: string;
  material: string;
  qty: number;
  date: string;
}

interface InventoryProps {
  items: InventoryItem[];
  setItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  grnHistory: GRNEntry[];
  setGrnHistory: React.Dispatch<React.SetStateAction<GRNEntry[]>>;
}

export default function Inventory({ items, setItems, grnHistory, setGrnHistory }: InventoryProps) {
  const [activeView, setActiveView] = useState<'ledger' | 'suggestions' | 'history'>('ledger');
  const [searchTerm, setSearchTerm] = useState('');
  const [grnSearchTerm, setGrnSearchTerm] = useState('');
  const [grnDateFilter, setGrnDateFilter] = useState('');
  const [isGRNOpen, setIsGRNOpen] = useState(false);
  const [grnData, setGrnData] = useState({ material: items[0]?.material || '', qty: 0 });

  // Logic: Identify items needing purchase suggestion
  const suggestions = items.filter(i => i.stock <= i.minLevel).map(i => ({
    ...i,
    suggestedQty: i.minLevel * 2 - i.stock // Suggest enough to double the threshold
  }));

  const filteredItems = items.filter(i => 
    i.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGRN = grnHistory.filter(entry => {
    const matchesMaterial = entry.material.toLowerCase().includes(grnSearchTerm.toLowerCase());
    const matchesDate = !grnDateFilter || entry.date === grnDateFilter;
    return matchesMaterial && matchesDate;
  });

  const handleGRN = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: GRNEntry = {
      id: `GRN-${Math.floor(1000 + Math.random() * 9000)}`,
      material: grnData.material,
      qty: grnData.qty,
      date: new Date().toISOString().split('T')[0]
    };

    setItems(prev => prev.map(item => {
      if (item.material === grnData.material) {
        return { ...item, stock: item.stock + grnData.qty };
      }
      return item;
    }));

    setGrnHistory(prev => [newEntry, ...prev]);

    setIsGRNOpen(false);
    setGrnData({ material: items[0]?.material || '', qty: 0 });
    alert(`GRN ${newEntry.id} processed successfully. Stock updated.`);
  };

  const totalValue = 42850; // Mock value for display

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">Inventory Management</h2>
          <p className="text-gray-500 italic text-sm">Centralized Raw Material Control & Procurement Engine</p>
        </div>
        <div className="flex gap-2">
          {activeView === 'ledger' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search Material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-gray-100 border-none rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel w-48 transition-all"
              />
            </div>
          )}
          <button 
            onClick={() => setIsGRNOpen(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
             <Package className="w-4 h-4" />
             Execute GRN
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-100">
        <button 
          onClick={() => setActiveView('ledger')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest relative transition-all ${activeView === 'ledger' ? 'text-brand-navy' : 'text-gray-400'}`}
        >
          Material Ledger
          {activeView === 'ledger' && <motion.div layoutId="inv-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy" />}
        </button>
        <button 
          onClick={() => setActiveView('suggestions')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest relative transition-all flex items-center gap-2 ${activeView === 'suggestions' ? 'text-brand-navy' : 'text-gray-400'}`}
        >
          Purchase Suggestions
          {suggestions.length > 0 && <span className="w-4 h-4 bg-status-danger text-white text-[8px] rounded-full flex items-center justify-center animate-pulse">{suggestions.length}</span>}
          {activeView === 'suggestions' && <motion.div layoutId="inv-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy" />}
        </button>
        <button 
          onClick={() => setActiveView('history')}
          className={`pb-4 text-xs font-bold uppercase tracking-widest relative transition-all ${activeView === 'history' ? 'text-brand-navy' : 'text-gray-400'}`}
        >
          GRN History
          {activeView === 'history' && <motion.div layoutId="inv-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-brand-electric">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Stock Valuation</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">₹{totalValue.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-emerald-500 mb-1 flex items-center bg-emerald-50 px-1 rounded">
              <ArrowUp className="w-2.5 h-2.5" /> 4%
            </div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-status-danger">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Shortage Alerts</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-status-danger">{suggestions.length} Items</div>
            <div className="text-[10px] font-bold text-status-danger mb-1 flex items-center bg-red-50 px-1 rounded">
              <AlertCircle className="w-2.5 h-2.5" /> ACTION
            </div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Pending GRNs</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">3 Batches</div>
            <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tighter">In Transit</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Lead Time</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">4.2 Days</div>
            <div className="text-[10px] font-bold text-emerald-500 mb-1 flex items-center">
              <TrendingUp className="w-2.5 h-2.5" /> OPTIMAL
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeView === 'ledger' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
             <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                 <Warehouse className="w-4 h-4 text-brand-steel" /> Current Physical Stock
               </h3>
               <span className="text-[10px] text-gray-400 font-mono">Sync: {new Date().toLocaleTimeString()}</span>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr>
                     <th className="table-header text-left">Material Identity</th>
                     <th className="table-header text-right">Physical (Total)</th>
                     <th className="table-header text-right text-brand-steel">Reserved</th>
                     <th className="table-header text-right font-bold text-brand-navy">Available</th>
                     <th className="table-header text-center">Unit</th>
                     <th className="table-header text-right">Min Threshold</th>
                     <th className="table-header text-right">Ledger Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {filteredItems.map((item, idx) => {
                     const isLow = item.stock <= item.minLevel;
                     return (
                       <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                         <td className="px-6 py-4 font-semibold text-brand-navy text-sm">{item.material}</td>
                         <td className="px-6 py-4 text-right font-mono text-sm text-gray-500">{item.stock.toLocaleString()}</td>
                         <td className="px-6 py-4 text-right font-mono text-xs text-brand-steel">{item.reserved > 0 ? `(${item.reserved.toLocaleString()})` : '-'}</td>
                         <td className="px-6 py-4 text-right font-mono text-sm font-bold">
                           <span className={isLow ? 'text-status-danger' : 'text-emerald-700'}>
                             {(item.stock - item.reserved).toLocaleString()}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-center">
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">{item.unit}</span>
                         </td>
                         <td className="px-6 py-4 text-right font-mono text-xs text-gray-400">{item.minLevel.toLocaleString()}</td>
                         <td className="px-6 py-4 text-right">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${isLow ? 'bg-status-danger/5 text-status-danger border-status-danger/20' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                             {isLow ? 'CRITICAL' : 'OPTIMAL'}
                           </span>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </motion.div>
        )}

        {activeView === 'suggestions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-brand-navy">Procurement Intelligence</h3>
                <p className="text-sm text-gray-500">Auto-generated purchase requirements based on inventory thresholds</p>
              </div>
              {suggestions.length > 0 && (
                <button 
                  onClick={() => alert(`Bulk Indent generated for ${suggestions.length} items. Sent to Purchase Manager for Approval.`)}
                  className="bg-brand-electric text-brand-navy font-bold px-6 py-2.5 rounded-lg text-xs hover:shadow-lg transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Raise Bulk Purchase Indent
                </button>
              )}
            </div>

            {suggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((s, i) => (
                  <div key={i} className="glass-card p-6 border-l-4 border-l-status-danger flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-brand-navy/5 rounded-lg text-brand-navy">
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-status-danger bg-red-50 px-2 py-1 rounded">PRIORITY: HIGH</span>
                      </div>
                      <h4 className="font-bold text-brand-navy text-lg mb-1">{s.material}</h4>
                      <p className="text-xs text-gray-500 mb-4">Stock critical: {s.stock} / {s.minLevel} {s.unit}</p>
                      
                      <div className="p-4 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                         <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                           <span>Recommended</span>
                           <span>Unit Gap</span>
                         </div>
                         <div className="flex justify-between items-end">
                           <span className="text-xl font-black text-brand-navy">+{s.suggestedQty}</span>
                           <span className="text-xs font-bold text-brand-steel">{s.unit}</span>
                         </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Purchase Request for ${s.suggestedQty} ${s.unit} of ${s.material} has been queued.`)}
                      className="w-full mt-6 py-3 border-2 border-brand-navy text-brand-navy font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all"
                    >
                      Process Individual Indent
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card py-20 text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">Optimal Stock Levels</h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm mt-2">The engine has cleared all materials. No procurement suggestions currently active.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeView === 'history' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-brand-steel" /> GRN Ledger History
              </h3>
              <div className="flex flex-wrap gap-2">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                   <input 
                     type="text" 
                     placeholder="Filter Material..." 
                     value={grnSearchTerm}
                     onChange={(e) => setGrnSearchTerm(e.target.value)}
                     className="pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-steel w-32"
                   />
                 </div>
                 <input 
                   type="date" 
                   value={grnDateFilter}
                   onChange={(e) => setGrnDateFilter(e.target.value)}
                   className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-steel"
                 />
              </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                     <th className="px-8 py-4">Ref ID</th>
                     <th className="px-8 py-4">Material</th>
                     <th className="px-8 py-4 text-right">Qty Received</th>
                     <th className="px-8 py-4 text-right">Process Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {filteredGRN.length > 0 ? filteredGRN.map((entry, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                       <td className="px-8 py-4 font-mono text-xs font-bold text-brand-navy">{entry.id}</td>
                       <td className="px-8 py-4 text-xs font-medium text-gray-600">{entry.material}</td>
                       <td className="px-8 py-4 text-right font-mono text-xs text-brand-electric">+{entry.qty.toLocaleString()}</td>
                       <td className="px-8 py-4 text-right text-xs text-gray-400 font-mono">{entry.date}</td>
                     </tr>
                   )) : (
                     <tr>
                       <td colSpan={4} className="px-8 py-12 text-center text-xs text-gray-400 italic">No matching GRN records found.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isGRNOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                <h3 className="font-bold">Goods Received Note (GRN)</h3>
                <button onClick={() => setIsGRNOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleGRN} className="p-8 space-y-6">
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Material Received</label>
                   <select 
                     value={grnData.material}
                     onChange={(e) => setGrnData({...grnData, material: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-brand-steel transition-all font-medium text-sm"
                   >
                     {items.map(m => <option key={m.material} value={m.material}>{m.material}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Quantity Added</label>
                   <input 
                     type="number"
                     required
                     min="1"
                     value={grnData.qty}
                     onChange={(e) => setGrnData({...grnData, qty: parseInt(e.target.value) || 0})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-brand-steel transition-all font-mono text-sm"
                   />
                 </div>
                 <button type="submit" className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all uppercase tracking-widest text-xs">
                   Stock In & Update Ledger
                 </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
