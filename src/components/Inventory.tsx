import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Warehouse, ArrowUp, ArrowDown, Package, AlertCircle, ShoppingCart, TrendingUp, Filter, Search, X, Plus, History } from 'lucide-react';
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
  };

  const totalValue = 42850; // Mock value for display

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">Inventory Ledger</h2>
          <p className="text-gray-500 italic text-sm">Real-time Raw Material Warehouse Tracking</p>
        </div>
        <div className="flex gap-2">
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
          <button 
            onClick={() => setIsGRNOpen(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
             <Package className="w-4 h-4" />
             Execute GRN
          </button>
        </div>
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
              <div className="p-6 industrial-gradient text-white flex justify-between items-center">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-brand-electric">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Stock Valuation</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">${totalValue.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-emerald-500 mb-1 flex items-center bg-emerald-50 px-1 rounded">
              <ArrowUp className="w-2.5 h-2.5" /> 4%
            </div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-status-danger">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Critical Shortage</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-status-danger">{suggestions.length} Items</div>
            <div className="text-[10px] font-bold text-status-danger mb-1 flex items-center bg-red-50 px-1 rounded animate-pulse">
              <AlertCircle className="w-2.5 h-2.5" /> ACTION
            </div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Batch Alerts</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">0 Active</div>
            <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">No Delay</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Avg Lead Time</div>
          <div className="flex items-end gap-2">
            <div className="stat-value text-2xl text-brand-navy">4.2 Days</div>
            <div className="text-[10px] font-bold text-brand-steel mb-1 flex items-center">
              <TrendingUp className="w-2.5 h-2.5" /> OPTIMAL
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
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
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-brand-navy text-sm">{item.material}</td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-gray-500">
                        {item.stock.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-xs text-brand-steel">
                        {item.reserved > 0 ? `(${item.reserved.toLocaleString()})` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm font-bold">
                        <span className={isLow ? 'text-status-danger' : 'text-emerald-700'}>
                          {(item.stock - item.reserved).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">{item.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-xs text-gray-400">
                        {item.minLevel.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${
                          isLow ? 'bg-status-danger/5 text-status-danger border-status-danger/20' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {isLow ? 'CRITICAL' : 'OPTIMAL'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-brand-navy text-white">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-brand-electric/20 rounded-lg">
                 <ShoppingCart className="w-5 h-5 text-brand-electric" />
               </div>
               <div>
                 <h3 className="font-bold text-sm">Purchase Suggestion Engine</h3>
                 <p className="text-[10px] text-blue-100/40">Auto-suggested based on min-stock logic</p>
               </div>
             </div>

             <div className="space-y-4">
               {suggestions.length > 0 ? suggestions.map((s, i) => (
                 <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                   <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-blue-100">{s.material}</span>
                     <span className="text-[10px] font-mono text-status-danger group-hover:animate-bounce">-{s.stock} / {s.minLevel}</span>
                   </div>
                   <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                      <span className="text-[9px] text-blue-100/30 uppercase tracking-widest">Recommended Order</span>
                      <span className="text-xs font-bold text-brand-electric font-mono">+{s.suggestedQty.toLocaleString()} {s.unit}</span>
                   </div>
                 </div>
               )) : (
                 <div className="py-8 text-center text-blue-100/30 italic text-xs">
                   No procurement required. Stock levels within healthy parameters.
                 </div>
               )}
             </div>

             {suggestions.length > 0 && (
               <button className="w-full mt-6 bg-brand-electric text-brand-navy font-bold py-3 rounded-lg text-xs hover:shadow-lg transition-all uppercase tracking-widest">
                 Generate Bulk Purchase Order
               </button>
             )}
          </div>

          <div className="glass-card p-6 border-dashed bg-gray-50/30">
             <h4 className="text-[10px] uppercase font-bold text-brand-steel tracking-widest mb-4">Logistics Summary</h4>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">GRN Pending:</span>
                  <span className="font-bold text-brand-navy">12 Batches</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">QC Rejected:</span>
                  <span className="font-bold text-status-danger">1.2%</span>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="glass-card overflow-hidden">
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
               {(grnSearchTerm || grnDateFilter) && (
                 <button 
                   onClick={() => { setGrnSearchTerm(''); setGrnDateFilter(''); }}
                   className="p-1.5 text-gray-400 hover:text-brand-navy"
                 >
                   <X className="w-4 h-4" />
                 </button>
               )}
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
        </div>
      </div>
    </div>
  );
}
