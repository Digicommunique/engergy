import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, IndianRupee, Truck, ShieldCheck, 
  Search, Plus, Filter, Download, ExternalLink,
  ChevronRight, Building2, User
} from 'lucide-react';

export default function SalesManager() {
  const [activeTab, setActiveTab] = useState<'billing' | 'dispatch' | 'e-invoice'>('billing');

  const mockInvoices = [
    { id: 'INV/2026/0402', dealer: 'AutoPower Ltd', amount: 458000, date: '2026-04-27', status: 'Pending Approval', gst: '78,840' },
    { id: 'INV/2026/0401', dealer: 'Bright Battery', amount: 125000, date: '2026-04-26', status: 'Dispatched', gst: '22,500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Sales & Billing Management</h2>
          <p className="text-gray-500 text-xs">GST Compliance & Regional Dispatch Tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg">
             <Plus className="w-4 h-4" />
             Create New Invoice
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 gap-8">
        {[
          { id: 'billing', label: 'GST Billing', icon: FileText },
          { id: 'dispatch', label: 'Dispatch Tracking', icon: Truck },
          { id: 'e-invoice', label: 'E-Invoice Portal', icon: ExternalLink }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 ${
              activeTab === tab.id ? 'border-brand-electric text-brand-navy' : 'border-transparent text-gray-400 hover:text-brand-navy'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-brand-electric">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Mtd Sales Revenue</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-brand-navy">₹1.28 Cr</span>
            <span className="text-[10px] font-bold text-emerald-500">+12% vs LY</span>
          </div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-brand-steel">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Pending Dispatches</div>
          <div className="text-2xl font-bold text-brand-navy">42 Batches</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-brand-navy">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Tax Liability (GST)</div>
          <div className="text-2xl font-bold text-brand-navy">₹22.4 Lac</div>
        </div>
      </div>

      {activeTab === 'billing' ? (
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Invoice Ledger</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Invoice/Dealer..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel transition-all w-64"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-100">
                 <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 uppercase text-[10px] font-bold tracking-widest text-gray-500">
                  <th className="px-8 py-4">Invoice #</th>
                  <th className="px-8 py-4">Dealer Details</th>
                  <th className="px-8 py-4 text-right">Taxable Value</th>
                  <th className="px-8 py-4 text-right">GST (18%)</th>
                  <th className="px-8 py-4 text-right">Total Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockInvoices.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="text-xs font-bold text-brand-navy">{inv.id}</div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{inv.date}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-gray-400" />
                         </div>
                         <div>
                            <div className="text-xs font-bold text-brand-navy">{inv.dealer}</div>
                            <div className="text-[10px] text-gray-400">Platinum Tier Dealer</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right text-xs font-mono font-medium text-gray-600">₹{(inv.amount - parseInt(inv.gst.replace(/,/g, ''))).toLocaleString()}</td>
                    <td className="px-8 py-5 text-right text-xs font-mono font-medium text-gray-600">₹{inv.gst}</td>
                    <td className="px-8 py-5 text-right text-xs font-mono font-bold text-brand-navy">₹{inv.amount.toLocaleString()}</td>
                    <td className="px-8 py-5">
                       <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                         inv.status === 'Dispatched' ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-steel/10 text-brand-steel'
                       }`}>
                         {inv.status}
                       </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <button className="p-2 text-brand-steel hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all">
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'dispatch' ? (
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Live Dispatch Tracking</h3>
            <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              SYSTEM ACTIVE: 42 BATCHES IN TRANSIT
            </div>
          </div>
          <div className="space-y-6">
            {[
              { id: 'DP-770', dest: 'Lucknow Hub', courier: 'BlueDart', status: 'Out for Delivery', progress: 95 },
              { id: 'DP-771', dest: 'Indore Depot', courier: 'Delhivery', status: 'Shipped', progress: 45 },
              { id: 'DP-772', dest: 'Surat Dealer', courier: 'Self Fleet', status: 'Packed', progress: 15 },
            ].map((track) => (
              <div key={track.id} className="p-6 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-brand-navy">{track.id} &rarr; {track.dest}</span>
                    <span className="text-[10px] font-bold text-brand-steel uppercase">{track.status}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-brand-electric h-full" style={{ width: `${track.progress}%` }} />
                  </div>
                </div>
                <div className="flex gap-4 items-center min-w-[200px]">
                  <div className="text-right flex-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{track.courier}</p>
                    <p className="text-[10px] font-bold text-brand-navy">ETA: Tomorrow</p>
                  </div>
                  <button className="p-2 bg-white border border-gray-200 rounded-lg text-brand-steel hover:text-brand-navy shadow-sm">
                    <Truck className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 flex flex-col items-center text-center">
           <div className="w-20 h-20 bg-brand-navy/5 rounded-full flex items-center justify-center mb-6">
              <ExternalLink className="w-10 h-10 text-brand-steel" />
           </div>
           <h3 className="text-lg font-bold text-brand-navy mb-2">Government E-Invoice Portal</h3>
           <p className="text-sm text-gray-500 max-w-md mb-8">Direct integration with GSTN for real-time IRN generation and digital signing of B2B invoices.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg text-left">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Authenticated</p>
                 <p className="text-xs text-brand-navy">Session active for User: DC_ADMIN_01</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Queue Status</p>
                 <p className="text-xs text-brand-navy">0 Pending, 158 Success today</p>
              </div>
           </div>
           <button className="mt-8 bg-brand-navy text-white px-8 py-3 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-xl">
              <Plus className="w-4 h-4" />
              Generate Bulk E-Invoices
           </button>
        </div>
      )}
    </div>
  );
}
