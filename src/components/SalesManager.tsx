import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, IndianRupee, Truck, ShieldCheck, 
  Search, Plus, Filter, Download, ExternalLink,
  ChevronRight, Building2, User, X, QrCode
} from 'lucide-react';

export default function SalesManager() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'billing' | 'dispatch' | 'e-invoice'>('billing');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInvoiceModalOpen(false);
    alert('Invoice generated successfully. IRN synced with GSTN portal. Batch QR codes and serial numbers attached to the manifest.');
  };

  const mockInvoices = [
    { id: 'INV/2026/0402', dealer: 'AutoPower Ltd', amount: 458000, date: '2026-04-27', status: 'Pending Approval', gst: '78,840', serials: ['PW-INV-2026-001', 'PW-INV-2026-002', 'PW-INV-2026-003'] },
    { id: 'INV/2026/0401', dealer: 'Bright Battery', amount: 125000, date: '2026-04-26', status: 'Dispatched', gst: '22,500', serials: ['PW-AUTO-2026-112', 'PW-AUTO-2026-113'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Sales & Billing Management</h2>
          <p className="text-gray-500 text-xs">GST Compliance & Regional Dispatch Tracking</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsInvoiceModalOpen(true)}
            className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
          >
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
                       <div className="flex justify-end gap-2 text-brand-steel">
                          <button 
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-2 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all"
                            title="View Invoice Details"
                          >
                             <Search className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => alert('Downloading PDF Invoice with embedded Serial Manifest & QR...')}
                            className="p-2 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all"
                          >
                             <Download className="w-4 h-4" />
                          </button>
                       </div>
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
            <div>
              <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wider">Live Dispatch Tracking</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Real-time GPS & Carrier Sync</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsInvoiceModalOpen(true)}
                className="bg-white border border-gray-200 text-brand-navy px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
              >
                 <Plus className="w-3 h-3" />
                 Quick Invoice
              </button>
              <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                SYSTEM ACTIVE: 42 BATCHES
              </div>
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
           <div className="flex gap-4">
            <button 
              onClick={() => setIsInvoiceModalOpen(true)}
              className="mt-8 bg-brand-navy text-white px-8 py-3 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-xl"
            >
               <Plus className="w-4 h-4" />
               New E-Invoice
            </button>
            <button 
              onClick={() => alert('Processing bulk IRN generation for pending queue...')}
              className="mt-8 bg-white border border-gray-200 text-brand-navy px-8 py-3 rounded-lg font-bold text-xs hover:bg-gray-50 transition-all flex items-center gap-2 shadow-md"
            >
               <Download className="w-4 h-4" />
               Bulk Generate
            </button>
           </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">Tax Invoice: {selectedInvoice.id}</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest">{selectedInvoice.date}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="hover:rotate-90 transition-transform"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Billed To</p>
                    <p className="text-sm font-bold text-brand-navy">{selectedInvoice.dealer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount (Incl. GST)</p>
                    <p className="text-2xl font-black text-brand-navy">₹{selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-inner mb-2">
                    <QrCode className="w-full h-full text-brand-navy" strokeWidth={1.5} />
                  </div>
                  <p className="text-[8px] font-black text-brand-navy uppercase leading-tight">Scan for APK &<br/>Registration</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Serial Numbers Dispatched</p>
                <div className="max-h-32 overflow-y-auto border border-gray-100 rounded-xl divide-y divide-gray-50 font-mono text-[10px]">
                  {selectedInvoice.serials.map((s: string, idx: number) => (
                    <div key={idx} className="p-2.5 flex justify-between items-center bg-white hover:bg-gray-50">
                      <span className="text-brand-navy font-bold">{s}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => alert('Initiating digital hand-over to dealer portal...')}
                className="w-full py-4 bg-brand-electric text-brand-navy font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-brand-electric/20"
              >
                Sign & Transmit to Dealer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-brand-electric" />
                  <h3 className="font-bold">New GST Compliant Invoice</h3>
               </div>
               <button onClick={() => setIsInvoiceModalOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>
            <form onSubmit={handleCreateInvoice} className="p-8 space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Dealer</label>
                     <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel">
                        <option>AutoPower Ltd (NCR-772)</option>
                        <option>Bright Battery (MAH-102)</option>
                        <option>Southern Electricals (TN-445)</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice Date</label>
                     <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel font-mono" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Add Items (Production Batches)</label>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                     <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50">
                           <tr className="text-[9px] font-bold text-gray-400 uppercase">
                              <th className="px-4 py-2">Batch/Model</th>
                              <th className="px-4 py-2">Available</th>
                              <th className="px-4 py-2">Quantity</th>
                              <th className="px-4 py-2 text-right">Rate</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           <tr>
                              <td className="px-4 py-3 font-bold">B-2026/04 - Power-X 150</td>
                              <td className="px-4 py-3 text-emerald-600">45 Units</td>
                              <td className="px-4 py-3">
                                 <input type="number" defaultValue="10" className="w-16 px-2 py-1 border rounded" />
                              </td>
                              <td className="px-4 py-3 text-right font-mono font-bold">₹12,450</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="text-right flex-1 pr-8">
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Grand Total (Incl 18% GST)</p>
                     <p className="text-2xl font-black text-brand-navy">₹1,46,910</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsInvoiceModalOpen(false)} className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                    <button type="submit" className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-steel transition-all shadow-lg flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" />
                       Generate & Sign
                    </button>
                  </div>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
