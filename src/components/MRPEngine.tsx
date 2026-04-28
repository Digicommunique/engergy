import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BatteryModel } from '../constants';
import { Calculator, Play, CheckCircle2, AlertTriangle, Lock, Unlock, XCircle, Info } from 'lucide-react';
import { InventoryItem } from './Inventory';

interface MRPEngineProps {
  models: BatteryModel[];
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

interface Requirement {
  material: string;
  needed: number;
  available: number;
  shortage: number;
  status: 'Full' | 'Partial' | 'None';
}

export default function MRPEngine({ models, inventory, setInventory }: MRPEngineProps) {
  const [selectedModel, setSelectedModel] = useState<BatteryModel>(models[0]);
  const [quantity, setQuantity] = useState<number>(100);
  const [calculation, setCalculation] = useState<Requirement[] | null>(null);
  const [allocationMode, setAllocationMode] = useState<'Soft' | 'Hard'>('Soft');
  const [isAllocated, setIsAllocated] = useState(false);
  const [allocationLog, setAllocationLog] = useState<{msg: string, type: 'success' | 'warn'} | null>(null);

  const handleCalculate = () => {
    setAllocationLog(null);
    const reqs: Requirement[] = selectedModel.materials.map(mat => {
      const needed = (mat.qtyPerUnit * quantity) * (1 + mat.wastagePercent / 100);
      const stockItem = inventory.find(i => i.material === mat.material);
      const available = stockItem ? stockItem.stock - stockItem.reserved : 0;
      const shortage = Math.max(0, needed - available);
      
      let status: 'Full' | 'Partial' | 'None' = 'Full';
      if (available <= 0) status = 'None';
      else if (available < needed) status = 'Partial';

      return {
        material: mat.material,
        needed,
        available,
        shortage,
        status
      };
    });
    setCalculation(reqs);
    setIsAllocated(false);
  };

  const handleAllocate = () => {
    if (!calculation) return;

    // Validation: Block production if any critical item has "None" status
    const hasAbsoluteZero = calculation.some(r => r.status === 'None');
    if (hasAbsoluteZero) {
      alert("PRODUCTION BLOCKED: Critical materials missing. Please procure required items.");
      return;
    }

    if (allocationMode === 'Hard') {
      setInventory(prev => prev.map(invItem => {
        const req = calculation.find(r => r.material === invItem.material);
        if (req) {
          return { ...invItem, stock: Math.max(0, invItem.stock - req.needed) };
        }
        return invItem;
      }));
      setAllocationLog({ 
        msg: `INVENTORY DEDUCTED: Material stock physically reduced for Batch of ${quantity} units. Ready for Production Release.`, 
        type: 'success' 
      });
    } else {
      setInventory(prev => prev.map(invItem => {
        const req = calculation.find(r => r.material === invItem.material);
        if (req) {
          return { ...invItem, reserved: invItem.reserved + req.needed };
        }
        return invItem;
      }));
      setAllocationLog({ 
        msg: `MATERIALS RESERVED: ${quantity} units committed in virtual ledger. Physical stock remains at rest.`, 
        type: 'success' 
      });
    }

    setIsAllocated(true);
  };

  const handleReleaseToProduction = () => {
    alert(`PRODUCTION ORDER ISSUED: Batch ${Math.floor(100000 + Math.random() * 900000)} created. Moving to Production Management module for Line Assignment.`);
  };

  const totalStatus = calculation 
    ? calculation.every(r => r.status === 'Full') ? 'Ready' 
    : calculation.some(r => r.status === 'None') ? 'Blocked' : 'Warning'
    : 'Pending';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">MRP Engine</h2>
          <p className="text-gray-500 italic text-sm">Automated Raw Material Calculation & Production Allocation</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg self-start">
          <button 
            onClick={() => { setAllocationMode('Soft'); setIsAllocated(false); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              allocationMode === 'Soft' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Unlock className="w-3 h-3" /> Soft Allocation
          </button>
          <button 
            onClick={() => { setAllocationMode('Hard'); setIsAllocated(false); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              allocationMode === 'Hard' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock className="w-3 h-3" /> Hard Allocation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="glass-card p-8 h-fit">
          <h3 className="font-bold text-brand-navy mb-6 uppercase tracking-widest text-[10px]">Production Planning</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Target Model</label>
              <select 
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-brand-steel transition-all text-sm font-medium"
                value={selectedModel.id}
                onChange={(e) => {
                  setSelectedModel(models.find(m => m.id === e.target.value) || models[0]);
                  setCalculation(null);
                }}
              >
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Batch Quantity (Units)</label>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value) || 0);
                  setCalculation(null);
                }}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-brand-steel transition-all font-mono text-sm"
              />
            </div>
            <button 
              onClick={handleCalculate}
              className="w-full industrial-gradient text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all"
            >
              <Calculator className="w-5 h-5" />
              Generate RM Specs
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-brand-navy/5 rounded-lg border border-dashed border-brand-navy/20">
             <h4 className="text-xs font-bold text-brand-navy uppercase mb-2 flex items-center gap-2">
               <Info className="w-3 h-3" /> Allocation Logic
             </h4>
             <ul className="text-[10px] text-gray-500 space-y-2">
               <li>• <strong>Soft:</strong> Reserves stock, updates "Available" view but keeps physical ledger unchanged.</li>
               <li>• <strong>Hard:</strong> Physical stock deduction happens immediately upon execution.</li>
             </ul>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!calculation ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass-card border-dashed border-2 bg-gray-50/50"
              >
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                  <Play className="w-8 h-8 text-brand-steel transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Awaiting Batch Input</h3>
                <p className="text-gray-500 max-w-xs text-sm">Select model and quantity to execute the RM availability and allocation engine.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-6 industrial-gradient text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-bold flex items-center gap-2">
                      RM Allocation Brief
                    </h3>
                    <p className="text-xs text-blue-100/60 uppercase tracking-widest leading-none mt-1">Batch Size: {quantity} Units / Model: {selectedModel.name}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 shadow-inner border border-white/10 ${
                    totalStatus === 'Ready' ? 'bg-emerald-500 text-white' :
                    totalStatus === 'Blocked' ? 'bg-red-500 text-white' : 'bg-status-warning text-brand-navy'
                  }`}>
                    {totalStatus === 'Ready' && <CheckCircle2 className="w-4 h-4" />}
                    {totalStatus === 'Blocked' && <XCircle className="w-4 h-4" />}
                    {totalStatus === 'Warning' && <AlertTriangle className="w-4 h-4" />}
                    {totalStatus}
                  </div>
                </div>

                {allocationLog && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`px-6 py-4 border-t border-b ${allocationLog.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'} text-xs font-bold transition-all`}
                  >
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="w-4 h-4" />
                       {allocationLog.msg}
                    </div>
                  </motion.div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="table-header text-left">Material</th>
                        <th className="table-header text-right">Required</th>
                        <th className="table-header text-right">Available</th>
                        <th className="table-header text-right">Shortage</th>
                        <th className="table-header text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {calculation.map((req, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-700">{req.material}</td>
                          <td className="px-6 py-4 text-right font-mono text-xs">{req.needed.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right font-mono text-xs">{req.available.toFixed(2)}</td>
                          <td className={`px-6 py-4 text-right font-mono text-xs font-bold ${req.shortage > 0 ? 'text-status-danger' : 'text-emerald-600'}`}>
                            {req.shortage > 0 ? `-${req.shortage.toFixed(2)}` : 'MATCHED'}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                               req.status === 'Full' ? 'bg-emerald-100 text-emerald-700' :
                               req.status === 'None' ? 'bg-red-100 text-red-700' : 'bg-status-warning/10 text-status-warning'
                             }`}>
                               {req.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between border-t border-gray-100 gap-4">
                   <div className="flex items-center gap-2 text-xs text-brand-steel">
                     <Lock className={`w-4 h-4 ${allocationMode === 'Hard' ? 'text-status-danger' : ''}`} />
                     {allocationMode === 'Soft' ? 'Soft Reservation: Inventory Ledger remains physically untouched.' : 'Hard Deduction: Assets will be permanently removed from inventory on execution.'}
                   </div>
                   <div className="flex gap-3">
                    {isAllocated && allocationMode === 'Hard' && (
                      <button 
                        onClick={handleReleaseToProduction}
                        className="px-6 py-3 bg-brand-electric text-brand-navy rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Release to Production
                      </button>
                    )}
                    <button 
                      disabled={isAllocated || totalStatus === 'Blocked'}
                      onClick={handleAllocate}
                      className={`px-10 py-3 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${
                        isAllocated 
                          ? 'bg-emerald-500 text-white cursor-default' 
                          : totalStatus === 'Blocked' 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-brand-navy text-white hover:bg-brand-steel'
                      }`}
                    >
                      {isAllocated ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Allocation Confirmed
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Execute {allocationMode} Allocation
                        </>
                      )}
                    </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
