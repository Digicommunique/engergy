import React, { useState } from 'react';
import { 
  Receipt, Landmark, Landmark as Bank, 
  ArrowUpRight, ArrowDownRight, FileText, 
  Download, Filter, Search, Calculator,
  TrendingDown, TrendingUp, X, CheckCircle2,
  AlertCircle, FileDown, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Accounting() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isReconModalOpen, setIsReconModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'xml' | 'excel'>('xml');
  const [isExporting, setIsExporting] = useState(false);

  const transactions = [
    { id: 'TXN-9021', type: 'PAYMENT_RCVD', entity: 'AutoPower Ltd', amount: 450000, date: '2026-04-27', account: 'HDFC Current' },
    { id: 'TXN-9020', type: 'VENDOR_PAY', entity: 'Lead Corp India', amount: -280000, date: '2026-04-26', account: 'SBI Corporate' },
    { id: 'TXN-9019', type: 'TAX_DEPOSIT', entity: 'GST Dept', amount: -150000, date: '2026-04-25', account: 'HDFC Current' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Accounting & GST Ledger</h2>
          <p className="text-gray-500 text-xs">Financial Transactions, Receivables & Tax Compliance</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-white border border-gray-200 text-brand-navy px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
          >
             <Download className="w-4 h-4" />
             Export Tally Prime
          </button>
          <button 
            onClick={() => setIsReconModalOpen(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
             <Calculator className="w-4 h-4" />
             GST Reconciliation
          </button>
        </div>
      </div>

      <AnimatePresence>
        {/* Tally Export Modal */}
        {isExportModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Tally Prime ERP Export</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Digital Ledger Bridge</p>
                </div>
                <button onClick={() => setIsExportModalOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Generate Tally-compatible XML or Excel manifests for direct ledger import. Includes vouchers, sub-ledgers, and GST partitions.</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setExportFormat('xml')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${exportFormat === 'xml' ? 'border-brand-electric bg-brand-electric/5' : 'border-gray-100'}`}
                    >
                      <FileText className={`w-6 h-6 ${exportFormat === 'xml' ? 'text-brand-electric' : 'text-gray-300'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy">XML Format</span>
                    </button>
                    <button 
                      onClick={() => setExportFormat('excel')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${exportFormat === 'excel' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}
                    >
                      <FileDown className={`w-6 h-6 ${exportFormat === 'excel' ? 'text-emerald-500' : 'text-gray-300'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy">Excel Data</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsExporting(true);
                    setTimeout(() => {
                      setIsExporting(false);
                      setIsExportModalOpen(false);
                      alert(`EnerSys_Transactions_${new Date().toISOString().split('T')[0]}.${exportFormat} has been generated and ready for Tally Prime import.`);
                    }, 2000);
                  }}
                  disabled={isExporting}
                  className="w-full py-4 bg-brand-navy text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-brand-steel transition-all flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isExporting ? 'Generating Manifest...' : 'Generate Tally Payload'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* GST Reconciliation Modal */}
        {isReconModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
            >
              <div className="p-6 bg-brand-electric text-brand-navy flex justify-between items-center">
                <div>
                  <h3 className="font-black italic">Smart GST Reconciler (GSTR-2B vs Purchase)</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Real-time ITC Audit Enginess</p>
                </div>
                <button onClick={() => setIsReconModalOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6 mb-8">
                   <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Total ITC (Purchase)</p>
                      <p className="text-2xl font-bold text-brand-navy">₹12,45,000</p>
                   </div>
                   <div className="p-4 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl">
                      <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest mb-1">ITC in GSTR-2B</p>
                      <p className="text-2xl font-bold text-brand-navy">₹12,40,200</p>
                   </div>
                   <div className="p-4 bg-status-danger/5 border border-status-danger/10 rounded-2xl">
                      <p className="text-[10px] font-black text-status-danger uppercase tracking-widest mb-1">Mismatch Gap</p>
                      <p className="text-2xl font-bold text-status-danger">₹4,800</p>
                   </div>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-gray-50 uppercase text-[9px] font-black tracking-[0.1em] text-gray-400">
                         <th className="px-6 py-4">Vendor GSTIN</th>
                         <th className="px-6 py-4">Invoice Value</th>
                         <th className="px-6 py-4">Internal ITC</th>
                         <th className="px-6 py-4">Portal ITC</th>
                         <th className="px-6 py-4">Audit Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {[
                          { gstin: '29AAACM4521P1Z5', val: 45000, internal: 8100, portal: 8100, status: 'Matched' },
                          { gstin: '07BBBCS8821Q2Z4', val: 120000, internal: 21600, portal: 18000, status: 'Mismatch' },
                          { gstin: '27MMMCP3301L1Z2', val: 82000, internal: 14760, portal: 14760, status: 'Matched' },
                          { gstin: '19KKKCT1105R1Z0', val: 56000, internal: 10080, portal: 0, status: 'Not in Portal' },
                        ].map((row, i) => (
                          <tr key={i} className="text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono font-bold text-brand-navy">{row.gstin}</td>
                            <td className="px-6 py-4">₹{row.val.toLocaleString()}</td>
                            <td className="px-6 py-4">₹{row.internal.toLocaleString()}</td>
                            <td className="px-6 py-4">₹{row.portal.toLocaleString()}</td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  {row.status === 'Matched' ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <AlertCircle className="w-3.5 h-3.5 text-status-danger" />
                                  )}
                                  <span className={row.status === 'Matched' ? 'text-emerald-700' : 'text-status-danger'}>
                                    {row.status}
                                  </span>
                               </div>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                   <button className="px-6 py-3 border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50">Download Discrepancy Report</button>
                   <button className="px-6 py-3 bg-brand-navy text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-steel transition-all shadow-lg shadow-brand-navy/20">Send vendor Reminders</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
           <div className="flex justify-between items-start mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Receivables</span>
           </div>
           <div className="text-xl font-bold text-brand-navy">₹5.82 Cr</div>
           <div className="h-1 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[70%]" />
           </div>
        </div>
        <div className="glass-card p-5">
           <div className="flex justify-between items-start mb-3">
              <TrendingDown className="w-5 h-5 text-status-danger" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payables (30D)</span>
           </div>
           <div className="text-xl font-bold text-brand-navy">₹1.15 Cr</div>
           <div className="h-1 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-status-danger w-[45%]" />
           </div>
        </div>
        <div className="glass-card p-5">
           <div className="flex justify-between items-start mb-3">
              <Bank className="w-5 h-5 text-brand-electric" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bank Balances</span>
           </div>
           <div className="text-xl font-bold text-brand-navy">₹82.4 Lac</div>
           <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Across 4 Accounts</p>
        </div>
        <div className="glass-card p-5">
           <div className="flex justify-between items-start mb-3">
              <FileText className="w-5 h-5 text-brand-steel" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ITC Claimable</span>
           </div>
           <div className="text-xl font-bold text-brand-navy">₹18.9 Lac</div>
           <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Current Month</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
           <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Financial Transaction Stream</h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search Transactions..." 
                   className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel transition-all w-64"
                 />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-100">
                 <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                 <th className="px-8 py-4">Transaction ID</th>
                 <th className="px-8 py-4">Associated Entity</th>
                 <th className="px-8 py-4">Bank Account</th>
                 <th className="px-8 py-4 text-right">Amount (₹)</th>
                 <th className="px-8 py-4">Category</th>
                 <th className="px-8 py-4 text-right">Date</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {transactions.map((txn, idx) => (
                 <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                   <td className="px-8 py-4">
                      <div className="text-xs font-bold text-brand-navy">{txn.id}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-400">Digital Flow ID</div>
                   </td>
                   <td className="px-8 py-4">
                      <span className="text-xs font-medium text-gray-700">{txn.entity}</span>
                   </td>
                   <td className="px-8 py-4 text-xs text-gray-500 font-medium italic">{txn.account}</td>
                   <td className={`px-8 py-4 text-right font-mono text-xs font-bold ${txn.amount > 0 ? 'text-emerald-600' : 'text-status-danger'}`}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount.toLocaleString()}
                   </td>
                   <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                         {txn.amount > 0 ? <ArrowDownRight className="w-3 h-3 text-emerald-500" /> : <ArrowUpRight className="w-3 h-3 text-status-danger" />}
                         <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{txn.type.replace(/_/g, ' ')}</span>
                      </div>
                   </td>
                   <td className="px-8 py-4 text-right text-xs font-mono text-gray-400 lowercase">{txn.date}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
