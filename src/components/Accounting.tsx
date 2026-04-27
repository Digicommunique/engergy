import React, { useState } from 'react';
import { 
  Receipt, Landmark, Landmark as Bank, 
  ArrowUpRight, ArrowDownRight, FileText, 
  Download, Filter, Search, Calculator,
  TrendingDown, TrendingUp
} from 'lucide-react';

export default function Accounting() {
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
          <button className="bg-white border border-gray-200 text-brand-navy px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-gray-50 flex items-center gap-2 transition-all">
             <Download className="w-4 h-4" />
             Export Tally Prime
          </button>
          <button className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg">
             <Calculator className="w-4 h-4" />
             GST Reconciliation
          </button>
        </div>
      </div>

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
