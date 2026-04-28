import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Battery, Play, BarChart3, QrCode, ClipboardCheck, ArrowRight, Settings2, History, CheckCircle2, AlertOctagon, X, Search } from 'lucide-react';
import { BATTERY_MODELS } from '../constants';

interface ProductionPlan {
  id: string;
  model: string;
  quantity: number;
  status: 'Draft' | 'Planned' | 'In Progress' | 'QC' | 'Completed';
  startDate: string;
  serialsGenerated?: boolean;
  serials?: string[];
}

export default function ProductionManagement() {
  const [plans, setPlans] = useState<ProductionPlan[]>([
    { 
      id: 'PP-44021', 
      model: 'INV-150', 
      quantity: 5, 
      status: 'Completed', 
      startDate: '2026-04-20', 
      serialsGenerated: true,
      serials: ['PW-INV-2026-001', 'PW-INV-2026-002', 'PW-INV-2026-003', 'PW-INV-2026-004', 'PW-INV-2026-005']
    },
    { id: 'PP-44022', model: 'AUTO-35', quantity: 150, status: 'In Progress', startDate: '2026-04-26', serialsGenerated: false },
  ]);

  const [lineStatuses, setLineStatuses] = useState([
    { id: 'Line A', status: 'Online', yield: 98.2, temp: 42 },
    { id: 'Line B', status: 'Maintenance', yield: 0, temp: 24 }
  ]);

  const [isPlanning, setIsPlanning] = useState(false);
  const [activeQC, setActiveQC] = useState<ProductionPlan | null>(null);
  const [viewingBatch, setViewingBatch] = useState<ProductionPlan | null>(null);
  const [newPlan, setNewPlan] = useState({ model: 'BAT-INV-150', quantity: 100 });
  const [generatingSerials, setGeneratingSerials] = useState<string | null>(null);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const plan: ProductionPlan = {
      id: `PP-${Math.floor(44000 + Math.random() * 1000)}`,
      model: newPlan.model,
      quantity: newPlan.quantity,
      status: 'Planned',
      startDate: new Date().toISOString().split('T')[0],
      serialsGenerated: false
    };
    setPlans([plan, ...plans]);
    setIsPlanning(false);
  };

  const handleGenerateSerials = (id: string) => {
    setGeneratingSerials(id);
    setTimeout(() => {
      setPlans(prev => prev.map(p => {
        if (p.id === id) {
          const suffix = p.model.split('-').pop();
          const generatedSerials = Array.from({ length: Math.min(p.quantity, 100) }, (_, i) => 
            `PW-${suffix}-2026-${Math.floor(1000 + Math.random() * 9000)}-${i + 1}`
          );
          return { ...p, serialsGenerated: true, status: 'In Progress', serials: generatedSerials };
        }
        return p;
      }));
      setGeneratingSerials(null);
      alert('Serial Numbers generated and synced with Laser Engraving Station.');
    }, 1500);
  };

  const toggleLineStatus = (id: string) => {
    setLineStatuses(prev => prev.map(l => {
      if (l.id === id) {
        const nextStatus = l.status === 'Online' ? 'Stopped' : 'Online';
        return { ...l, status: nextStatus, yield: nextStatus === 'Online' ? 95 : 0 };
      }
      return l;
    }));
  };

  const handleQCAction = (status: 'Completed' | 'In Progress') => {
    if (activeQC) {
      setPlans(prev => prev.map(p => p.id === activeQC.id ? { ...p, status } : p));
      setActiveQC(null);
      if (status === 'Completed') {
        alert(`Batch ${activeQC.id} approved. Move to Finished Goods Inventory confirmed.`);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">Production Management</h2>
          <p className="text-gray-500 italic text-sm">Orchestrate batch planning, QR generation, and QC workflows.</p>
        </div>
        <button 
           onClick={() => setIsPlanning(true)}
           className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
        >
           <Play className="w-4 h-4 fill-current" />
           Start Production Batch
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isPlanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-md overflow-hidden">
               <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                 <h3 className="font-bold">New Batch Planning</h3>
                 <button onClick={() => setIsPlanning(false)} className="text-white/60 hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleCreatePlan} className="p-8 space-y-5">
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Battery Model</label>
                   <select 
                     value={newPlan.model}
                     onChange={(e) => setNewPlan({...newPlan, model: e.target.value})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-brand-steel transition-all font-medium text-sm"
                   >
                     {BATTERY_MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Quantity to Produce</label>
                   <input 
                     type="number"
                     required
                     min="1"
                     value={newPlan.quantity}
                     onChange={(e) => setNewPlan({...newPlan, quantity: parseInt(e.target.value) || 0})}
                     className="w-full border border-gray-200 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-brand-steel transition-all font-mono text-sm"
                   />
                 </div>
                 <button type="submit" className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all uppercase tracking-widest text-xs">
                   Confirm & Lock Plan
                 </button>
               </form>
            </div>
          </motion.div>
        )}

        {viewingBatch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
               <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                 <div>
                   <h3 className="font-bold">Batch Record: {viewingBatch.id}</h3>
                   <p className="text-[10px] text-white/50 uppercase tracking-widest">Master Production Registry</p>
                 </div>
                 <button onClick={() => setViewingBatch(null)}><X className="w-5 h-5" /></button>
               </div>
               <div className="p-8">
                  <div className="flex gap-8 mb-8">
                     <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex-shrink-0">
                        <QrCode className="w-32 h-32 text-brand-navy" strokeWidth={1.5} />
                        <p className="text-center text-[9px] font-black text-gray-400 mt-2 uppercase">Batch ID Global Sync</p>
                     </div>
                     <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model Specification</p>
                          <p className="text-sm font-bold text-brand-navy">{viewingBatch.model}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manufacturing Date</p>
                          <p className="text-sm font-bold text-brand-navy">{viewingBatch.startDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completion Status</p>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{viewingBatch.status}</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Serial Number Registry ({viewingBatch.serials?.length || 0} Units)</p>
                    <div className="max-h-48 overflow-y-auto border border-gray-100 rounded-xl divide-y divide-gray-50 font-mono text-[10px]">
                       {viewingBatch.serials?.map((s, idx) => (
                         <div key={idx} className="p-2.5 flex justify-between items-center bg-white hover:bg-gray-50">
                            <span className="text-brand-navy font-bold">{s}</span>
                            <span className="text-emerald-500 font-bold uppercase">Ready</span>
                         </div>
                       )) || (
                         <div className="p-8 text-center text-gray-400 italic">No serials generated yet for this batch.</div>
                       )}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                        const blob = new Blob([JSON.stringify(viewingBatch, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Batch-${viewingBatch.id}.json`;
                        a.click();
                    }}
                    className="w-full mt-6 py-3 bg-gray-50 text-brand-navy text-[10px] font-bold uppercase tracking-widest rounded-xl border border-gray-200 hover:bg-gray-100"
                  >
                    Export Batch Manifest (JSON)
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {activeQC && (

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
           >
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="p-6 bg-brand-steel text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Quality Control Workflow</h3>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest">{activeQC.id} - {activeQC.model}</p>
                  </div>
                  <button onClick={() => setActiveQC(null)} className="text-white/60 hover:text-white">
                    <History className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-4">
                      {[
                        { label: 'Voltage Check (12.6V - 12.8V)', value: 'Passed' },
                        { label: 'Air Leak / Seal Integrity', value: 'Passed' },
                        { label: 'Terminal Conductivity', value: 'Passed' },
                        { label: 'QR Mapping Verification', value: 'Passed' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <span className="text-xs font-medium text-gray-600">{item.label}</span>
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      ))}
                   </div>
                   
                   <div className="bg-amber-50 p-4 border border-amber-100 rounded-lg flex gap-3 text-amber-700">
                      <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                      <p className="text-[10px] leading-relaxed">System has flagged 2 units for re-inspection due to minor electrolyte spillage. Batch approval requires supervisor override.</p>
                   </div>

                   <div className="flex gap-4">
                      <button 
                        onClick={() => handleQCAction('In Progress')}
                        className="flex-1 border border-gray-200 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50"
                      >
                         Reject & Re-work
                      </button>
                      <button 
                        onClick={() => handleQCAction('Completed')}
                        className="flex-1 bg-emerald-500 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
                      >
                         Approve Batch
                      </button>
                   </div>
                </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lineStatuses.map(line => (
          <div key={line.id} className="glass-card p-6 border-l-4 border-l-brand-navy">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-bold text-brand-navy">{line.id}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Assembly & Packing Node</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${line.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-status-danger'}`} />
                <span className="text-[10px] font-bold text-brand-navy uppercase">{line.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-xl">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Throughput</p>
                 <p className="text-lg font-bold text-brand-navy">{line.yield}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Temp</p>
                 <p className="text-lg font-bold text-brand-navy">{line.temp}°C</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Optime</p>
                 <p className="text-lg font-bold text-brand-navy">08:42h</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => toggleLineStatus(line.id)}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  line.status === 'Online' ? 'bg-status-danger/10 text-status-danger hover:bg-status-danger/20' : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {line.status === 'Online' ? 'Emergency Stop' : 'Start Line'}
              </button>
              <button 
                onClick={() => alert(`Opening technical calibration panel for ${line.id}...`)}
                className="px-4 py-2 bg-white border border-gray-200 text-brand-navy text-[10px] font-bold uppercase rounded-lg hover:bg-gray-50"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-brand-electric">
            <div className="p-3 bg-brand-electric/10 rounded-xl">
              <BarChart3 className="w-6 h-6 text-brand-electric" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Yield Efficiency</div>
              <div className="text-xl font-bold text-brand-navy">98.4%</div>
            </div>
         </div>
         <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-status-warning">
            <div className="p-3 bg-status-warning/10 rounded-xl">
              <ClipboardCheck className="w-6 h-6 text-status-warning" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">QC Pending</div>
              <div className="text-xl font-bold text-brand-navy">1,240 Units</div>
            </div>
         </div>
         <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Battery className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Daily Output</div>
              <div className="text-xl font-bold text-brand-navy">450 Units</div>
            </div>
         </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-bold text-brand-navy text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-brand-steel" /> Batch Execution Log
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                <th className="px-8 py-4">Batch ID</th>
                <th className="px-8 py-4">Model</th>
                <th className="px-8 py-4 text-right">Qty</th>
                <th className="px-8 py-4">Start Date</th>
                <th className="px-8 py-4">Phase</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plans.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5 font-mono text-sm font-bold text-brand-navy">{p.id}</td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-600">{p.model}</td>
                  <td className="px-8 py-5 text-right font-mono text-sm">{p.quantity}</td>
                  <td className="px-8 py-5 text-sm text-gray-400 font-mono">{p.startDate}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                      p.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      p.status === 'In Progress' ? 'bg-brand-electric/10 text-brand-electric' : 
                      p.status === 'QC' ? 'bg-status-warning/10 text-status-warning' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right flex justify-end gap-2">
                    {!p.serialsGenerated ? (
                       <button 
                         onClick={() => handleGenerateSerials(p.id)}
                         disabled={generatingSerials === p.id}
                         className="flex items-center gap-2 bg-brand-navy text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-brand-steel disabled:opacity-50"
                       >
                         {generatingSerials === p.id ? 'Generating...' : 'Generate Serials'}
                       </button>
                    ) : p.status !== 'Completed' ? (
                       <button 
                         onClick={() => setActiveQC(p)}
                         className="flex items-center gap-2 bg-brand-electric text-brand-navy px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-brand-electric-hover"
                       >
                         <ClipboardCheck className="w-3 h-3" />
                         QC Check
                       </button>
                    ) : (
                       <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready
                       </div>
                    )}
                    <button 
                      onClick={() => setViewingBatch(p)}
                      className="p-2 text-brand-steel hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <QrCode className="w-4 h-4" />
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
