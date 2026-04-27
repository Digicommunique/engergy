import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BatteryModel, Unit } from '../constants';
import { Package, TrendingUp, Plus, X } from 'lucide-react';

interface BOMManagerProps {
  models: BatteryModel[];
  onAddMaterial: (parentId: string, name: string, unit: Unit, qty: number, wastage: number) => void;
}

export default function BOMManager({ models, onAddMaterial }: BOMManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(models[0].id);

  const [formData, setFormData] = useState({
    name: '',
    unit: Unit.KG,
    qty: 0,
    wastage: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMaterial(selectedModelId, formData.name, formData.unit, formData.qty, formData.wastage);
    setIsAdding(false);
    setFormData({ name: '', unit: Unit.KG, qty: 0, wastage: 0 });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-navy">BOM Master</h2>
          <p className="text-gray-500">Configure Bill of Materials, wastage, and material units for each model.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-steel transition-colors flex items-center gap-2"
        >
           <Plus className="w-4 h-4" />
           Add New Material
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 industrial-gradient text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">Add Material to BOM</h3>
                <button onClick={() => setIsAdding(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Target Model</label>
                  <select 
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none transition-all text-sm font-medium"
                  >
                    {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Material Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" 
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none transition-all text-sm"
                    placeholder="e.g. Lead Calcium Alloy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Unit</label>
                    <select 
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value as Unit})}
                      className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none transition-all text-sm"
                    >
                      <option value={Unit.KG}>Kg</option>
                      <option value={Unit.LTR}>Ltr</option>
                      <option value={Unit.PCS}>Pcs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Qty per Unit</label>
                    <input 
                      required
                      value={formData.qty}
                      onChange={(e) => setFormData({...formData, qty: parseFloat(e.target.value) || 0})}
                      type="number" 
                      step="0.01"
                      className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Wastage (%)</label>
                  <input 
                    required
                    value={formData.wastage}
                    onChange={(e) => setFormData({...formData, wastage: parseFloat(e.target.value) || 0})}
                    type="number" 
                    step="0.1"
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-brand-steel outline-none transition-all text-sm font-mono text-status-danger"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-navy text-white font-bold py-3 rounded-lg hover:bg-brand-steel transition-all mt-4">
                  Execute Addition
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-10">
        {models.map((model) => (
          <BOMTable key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}

function BOMTable({ model }: { model: BatteryModel, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-brand-navy">{model.name}</h3>
          <p className="text-sm text-gray-500">{model.type}</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-brand-steel uppercase tracking-wider mb-1">Total Materials</div>
          <div className="text-2xl font-bold text-brand-navy">{model.materials.length}</div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="table-header text-left" style={{ width: '40%' }}>Material Name</th>
              <th className="table-header text-center" style={{ width: '12%' }}>Unit</th>
              <th className="table-header text-right" style={{ width: '16%' }}>Qty/Unit</th>
              <th className="table-header text-right" style={{ width: '16%' }}>Wastage %</th>
              <th className="table-header text-right" style={{ width: '16%' }}>Effective Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {model.materials.map((item, idx) => {
              const effectiveQty = item.qtyPerUnit * (1 + item.wastagePercent / 100);
              return (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-700">{item.material}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.unit === Unit.KG ? 'bg-[#E0E7FF] text-[#4338CA]' :
                      'bg-[#E1F7E9] text-[#15803D]'
                    }`}>
                      {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-gray-600">
                    {item.qtyPerUnit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-red-600 font-medium">
                    {item.wastagePercent}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-brand-steel font-bold font-mono text-sm">
                      {effectiveQty.toFixed(3)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
