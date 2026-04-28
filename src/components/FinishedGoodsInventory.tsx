import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, Search, Filter, QrCode, 
  Warehouse, History, ArrowUpRight, 
  Plus, MoreVertical, ShieldCheck, 
  Tag, Download, X, ArrowRightLeft,
  Barcode
} from 'lucide-react';

export default function FinishedGoodsInventory() {
  const [activeTab, setActiveTab] = useState<'batch' | 'serial' | 'aging'>('serial');
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  
  const [stocks, setStocks] = useState([
    { id: 'FG-9901', model: 'INV-150', serial: 'SN-00921-A', batch: 'B4-APR', aged: '2 Days', bin: 'BIN-12', status: 'Ready' },
    { id: 'FG-9902', model: 'AUTO-35', serial: 'SN-00922-A', batch: 'B4-APR', aged: '1 Day', bin: 'BIN-08', status: 'Blocked QC' },
    { id: 'FG-9903', model: 'INV-150', serial: 'SN-00924-A', batch: 'B3-APR', aged: '5 Days', bin: 'BIN-14', status: 'Booked' },
    { id: 'FG-9904', model: 'VRLA-100', serial: 'SN-01001-B', batch: 'B1-MAR', aged: '32 Days', bin: 'BIN-15', status: 'Ready' },
  ]);

  const [transferData, setTransferData] = useState({ serial: '', from: 'Warehouse A', to: 'Warehouse B' });

  const filteredStocks = useMemo(() => {
    return stocks.filter(item => {
      const matchesSearch = item.serial.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.batch.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === 'aging') {
        const parts = item.aged.split(' ');
        const days = parts.length > 0 ? parseInt(parts[0]) : 0;
        return matchesSearch && (isNaN(days) ? false : days > 30);
      }
      
      return matchesSearch;
    });
  }, [stocks, searchTerm, activeTab]);

  const batchSummary = useMemo(() => {
    const batches: Record<string, { count: number, models: Set<string>, status: string }> = {};
    stocks.forEach(s => {
      if (!batches[s.batch]) {
        batches[s.batch] = { count: 0, models: new Set(), status: 'Active' };
      }
      batches[s.batch].count++;
      batches[s.batch].models.add(s.model);
    });
    return batches;
  }, [stocks]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setIsTransferring(false);
    setTransferData({ serial: '', from: 'Warehouse A', to: 'Warehouse B' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Finished Goods Warehouse</h2>
          <p className="text-gray-500 text-xs">Serial Number Tracking, Batch Integrity & Aging Analytics</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsScanning(true)}
            className="bg-white border border-gray-200 text-brand-navy px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-gray-50 flex items-center gap-2"
          >
             <QrCode className="w-4 h-4" />
             Scan Label
          </button>
          <button 
            onClick={() => setIsTransferring(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
             <Plus className="w-4 h-4" />
             Add Transfer
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 bg-brand-steel text-white flex justify-between items-center">
                <h3 className="font-bold">Inventory Scanner</h3>
                <button onClick={() => setIsScanning(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8 text-center space-y-4">
                <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50">
                  <Barcode className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-sm text-gray-500">Align QR code or Barcode within the frame to scan</p>
                <div className="pt-4">
                  <input 
                    type="text" 
                    placeholder="Or enter serial manually..." 
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-brand-steel outline-none"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isTransferring && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-6 industrial-gradient text-white flex justify-between items-center">
                <h3 className="font-bold">Inter-Warehouse Transfer</h3>
                <button onClick={() => setIsTransferring(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleTransfer} className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Serial Number</label>
                  <input 
                    required value={transferData.serial} onChange={(e) => setTransferData({...transferData, serial: e.target.value})}
                    placeholder="Enter serial to transfer"
                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-mono"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">From Location</label>
                    <input readOnly value={transferData.from} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs" />
                  </div>
                  <ArrowRightLeft className="w-5 h-5 text-brand-steel mt-4" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">To Location</label>
                    <select className="w-full border border-gray-200 rounded-lg py-2 px-3 text-xs">
                      <option>Warehouse B</option>
                      <option>Distributor Store</option>
                      <option>Main Yard</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-brand-navy text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                  Process Transfer
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 bg-brand-navy border-none text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <Warehouse className="w-12 h-12" />
          </div>
          <div className="relative z-10">
            <h3 className="text-[12px] font-black uppercase text-brand-electric tracking-[0.2em] mb-3 border-b border-white/10 pb-2">Primary Warehouse</h3>
            <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Total Inventory</div>
            <div className="text-3xl font-bold">1,250</div>
            <p className="text-[10px] text-brand-electric mt-2 font-bold uppercase tracking-tighter shadow-brand-electric/20">+45 Units Today</p>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-brand-electric">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Ready for Dispatch</div>
          <div className="text-2xl font-bold text-brand-navy">842 Units</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-status-warning">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Aging (&gt; 30 Days)</div>
          <div className="text-2xl font-bold text-brand-navy">12 Units</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-indigo-500">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Warehouse Occupancy</div>
          <div className="text-2xl font-bold text-brand-navy">68%</div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between px-6">
           <div className="flex gap-6">
             {['serial', 'batch', 'aging'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-all pb-1 border-b-2 ${
                    activeTab === tab ? 'text-brand-navy border-brand-electric' : 'text-gray-400 border-transparent hover:text-brand-navy'
                  }`}
                >
                  {tab} Ledger
                </button>
             ))}
           </div>
           <div className="flex gap-2">
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-steel transition-all shadow-sm">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input 
                     type="text" 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     placeholder="Search Serial..." 
                     className="pl-9 pr-4 py-2 text-xs outline-none w-48"
                   />
                </div>
                <button 
                  className="bg-brand-navy text-white px-3 text-[10px] font-bold uppercase hover:bg-brand-steel transition-colors"
                  onClick={() => console.log('Search triggered')}
                >
                  Find
                </button>
              </div>
              <button 
                onClick={() => setSearchTerm('')}
                className={`p-2 border rounded-lg transition-all ${searchTerm ? 'border-brand-electric text-brand-electric hover:bg-brand-electric/5' : 'border-gray-200 text-gray-400 hover:bg-gray-100'}`}
              >
                 <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          {activeTab === 'batch' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 uppercase text-[9px] font-bold tracking-widest text-gray-500">
                  <th className="px-8 py-4">Batch Identity</th>
                  <th className="px-8 py-4">Associated Models</th>
                  <th className="px-8 py-4">Quantity</th>
                  <th className="px-8 py-4">Production Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.entries(batchSummary).map(([batchId, batchData], idx) => {
                  const data = batchData as { count: number, models: Set<string>, status: string };
                  return (
                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <Box className="w-4 h-4 text-brand-electric" />
                            <div className="text-xs font-bold text-brand-navy font-mono uppercase">{batchId}</div>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex gap-1 flex-wrap">
                            {Array.from(data.models).map((m, i) => (
                              <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold uppercase">{m}</span>
                            ))}
                         </div>
                      </td>
                      <td className="px-8 py-5 text-xs text-brand-navy font-bold">{data.count} Units</td>
                      <td className="px-8 py-5 text-xs text-gray-500">Apr 20, 2026</td>
                      <td className="px-8 py-5">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700">
                            {data.status}
                          </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                          <button className="text-brand-steel hover:text-brand-navy transition-all p-2 bg-gray-100 rounded-lg">
                             <Download className="w-3 h-3" />
                          </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 uppercase text-[9px] font-bold tracking-widest text-gray-500">
                  <th className="px-8 py-4">Serial Identity</th>
                  <th className="px-8 py-4">Model Class</th>
                  <th className="px-8 py-4">Batch ID</th>
                  <th className="px-8 py-4">Location (Bin)</th>
                  <th className="px-8 py-4">Aging</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Process</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStocks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                          <Tag className="w-4 h-4 text-brand-electric" />
                          <div>
                             <div className="text-xs font-bold text-brand-navy font-mono">{item.serial}</div>
                             <div className="text-[10px] text-gray-400 uppercase font-bold">{item.id}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-gray-700 font-medium">{item.model}</td>
                    <td className="px-8 py-5 text-xs text-gray-500 font-bold tracking-widest">{item.batch}</td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2 text-xs font-bold text-brand-steel bg-brand-navy/5 px-2 py-1 rounded w-fit">
                          <Warehouse className="w-3 h-3" />
                          {item.bin}
                       </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-gray-500">{item.aged}</td>
                    <td className="px-8 py-5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                          item.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'Booked' ? 'bg-brand-navy/10 text-brand-navy' : 'bg-status-warning/10 text-status-warning'
                        }`}>
                          {item.status}
                        </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                        <button className="text-brand-steel hover:text-brand-navy transition-all p-1">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
