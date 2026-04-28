import React, { useState } from 'react';
import { 
  Wrench, Settings, UserCheck, PackageOpen, 
  History, Clock, AlertTriangle, CheckCircle2,
  Stethoscope, Thermometer, Zap
} from 'lucide-react';

export default function RepairManagement() {
  const [isIndentOpen, setIsIndentOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'qc' | 'completed'>('pending');

  const [repairJobs, setRepairJobs] = useState([
    { id: 'JOB-7701', serial: 'SN-00923-A', tech: 'Imran Khan', stage: 'Deep Discharge Recovery', priority: 'High', days: 2, status: 'pending' },
    { id: 'JOB-7702', serial: 'SN-00811-B', tech: 'Sarah Jones', stage: 'Terminal Replacement', priority: 'Medium', days: 1, status: 'pending' },
    { id: 'JOB-7703', serial: 'SN-00925-C', tech: 'Imran Khan', stage: 'Cell Balancing', priority: 'High', days: 1, status: 'qc' },
    { id: 'JOB-7704', serial: 'SN-00926-D', tech: 'Sarah Jones', stage: 'Final Testing', priority: 'Low', days: 3, status: 'completed' },
  ]);

  const filteredJobs = repairJobs.filter(job => job.status === activeTab);

  const handleUpdateStatus = (id: string, currentStatus: string) => {
    let nextStatus: string = currentStatus;
    if (currentStatus === 'pending') nextStatus = 'qc';
    else if (currentStatus === 'qc') nextStatus = 'completed';

    setRepairJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: nextStatus as any, stage: nextStatus === 'qc' ? 'QC Verification' : 'Testing Passed' } : job
    ));
  };

  const handleIndent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsIndentOpen(false);
    alert('Spare parts requisition sent to Inventory Warehouse.');
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAssignOpen(false);
    alert('Repair Job Assigned successfuly to the selected technician.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Repair Lab Operations</h2>
          <p className="text-gray-500 text-xs">Technician Assignment & Component Level Service</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsIndentOpen(true)}
            className="bg-white border border-gray-200 text-brand-navy px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
          >
             <PackageOpen className="w-4 h-4" />
             Indent Parts
          </button>
          <button 
            onClick={() => setIsAssignOpen(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
             <Wrench className="w-4 h-4" />
             Assign Job
          </button>
        </div>
      </div>

      {/* Indent Modal */}
      {isIndentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
              <h3 className="font-bold">Spare Parts Indent</h3>
              <button onClick={() => setIsIndentOpen(false)} className="text-white/60 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleIndent} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Part Category</label>
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel">
                  <option>Connectors & Terminals</option>
                  <option>Circuit Components</option>
                  <option>Casing & Hardware</option>
                  <option>Chemical Agents</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Quantity</label>
                  <input type="number" defaultValue="1" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Job Priority</label>
                  <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel">
                    <option>Standard</option>
                    <option>Urgent</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-steel transition-all">Generate Requisition</button>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {isAssignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
              <h3 className="font-bold">Assign New Repair Job</h3>
              <button onClick={() => setIsAssignOpen(false)} className="text-white/60 hover:text-white">
                <Wrench className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAssign} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Battery Serial Number</label>
                <input type="text" placeholder="SN-XXXXX-X" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Assign Technician</label>
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel">
                  <option>Imran Khan (4 active)</option>
                  <option>Sarah Jones (2 active)</option>
                  <option>David Miller (0 active)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 capitalize mb-1">Initial Diagnosis</label>
                <textarea rows={3} placeholder="Describe the reported fault..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-steel transition-all">Submit Assignment</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 bg-indigo-50/30 border-t-2 border-indigo-500">
          <div className="flex justify-between items-start mb-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded font-bold uppercase">Average TAT</span>
          </div>
          <div className="text-2xl font-bold text-brand-navy">3.2 Days</div>
          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Target: 48 Hours</p>
        </div>
        <div className="glass-card p-5 bg-emerald-50/30 border-t-2 border-emerald-500">
           <div className="flex justify-between items-start mb-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold uppercase">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-brand-navy">94.8%</div>
          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">MTD Calibration</p>
        </div>
        <div className="glass-card p-5 bg-amber-50/30 border-t-2 border-amber-500">
          <div className="flex justify-between items-start mb-2">
            <Thermometer className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold uppercase">Load Test Pass</span>
          </div>
          <div className="text-2xl font-bold text-brand-navy">12/14</div>
          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Current Batch</p>
        </div>
        <div className="glass-card p-5 bg-red-50/30 border-t-2 border-red-500">
          <div className="flex justify-between items-start mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold uppercase">Critical Spares</span>
          </div>
          <div className="text-2xl font-bold text-brand-navy">Low Stock</div>
          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Poly-Connectors</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-6">
           {['pending', 'qc', 'completed'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`text-[11px] font-bold uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'text-brand-navy border-b-2 border-brand-electric pb-1' : 'text-gray-400 hover:text-brand-navy'
               }`}
             >
               {tab} Jobs
             </button>
           ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 uppercase text-[9px] font-bold tracking-[0.2em] text-gray-400">
                 <th className="px-8 py-4">Job ID / Serial</th>
                 <th className="px-8 py-4">Technician</th>
                 <th className="px-8 py-4">Status / Stage</th>
                 <th className="px-8 py-4">Spare Consumption</th>
                 <th className="px-8 py-4 text-right">Ageing</th>
                 <th className="px-8 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {filteredJobs.map((job, idx) => (
                 <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                   <td className="px-8 py-5">
                      <div className="text-xs font-bold text-brand-navy">{job.id}</div>
                      <div className="text-[10px] font-mono text-brand-electric font-bold">{job.serial}</div>
                   </td>
                   <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded bg-brand-navy/10 flex items-center justify-center">
                            <UserCheck className="w-3 h-3 text-brand-navy" />
                         </div>
                         <span className="text-xs text-gray-600 font-medium">{job.tech}</span>
                      </div>
                   </td>
                   <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         {job.status === 'completed' ? (
                           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                         ) : job.status === 'qc' ? (
                           <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                         ) : (
                           <Stethoscope className="w-3.5 h-3.5 text-indigo-400" />
                         )}
                         <span className="text-xs text-gray-700">{job.stage}</span>
                      </div>
                   </td>
                   <td className="px-8 py-5">
                      <span className="text-[10px] text-gray-400 uppercase font-bold bg-gray-100 px-2 py-1 rounded">2x Terminals, 1x Gel</span>
                   </td>
                   <td className="px-8 py-5 text-right">
                      <div className={`text-xs font-bold ${job.days > 2 ? 'text-status-danger' : 'text-emerald-600'}`}>{job.days}d in Lab</div>
                   </td>
                   <td className="px-8 py-5 text-right">
                      {job.status !== 'completed' && (
                        <button 
                          onClick={() => handleUpdateStatus(job.id, job.status)}
                          className="bg-brand-navy text-white text-[9px] font-bold uppercase px-3 py-1.5 rounded hover:bg-brand-steel transition-all"
                        >
                           {job.status === 'pending' ? 'Move to QC' : 'Approve QC'}
                        </button>
                      )}
                      {job.status === 'completed' && (
                        <div className="text-[9px] font-bold text-emerald-600 uppercase flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Certified
                        </div>
                      )}
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
