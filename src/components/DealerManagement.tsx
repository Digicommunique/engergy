import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserPlus, CreditCard, Landmark, 
  MapPin, TrendingUp, Search, MoreVertical, 
  ShieldCheck, ShieldAlert, X, Globe, Phone
} from 'lucide-react';

export default function DealerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'credit' | 'inactive'>('all');
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [dealers, setDealers] = useState([
    { id: 'D-801', name: 'AutoPower Ltd', territory: 'North-West', credit: '₹45,00,000', status: 'Active', tier: 'Platinum' },
    { id: 'D-802', name: 'Bright Battery', territory: 'South-West', credit: '₹12,00,000', status: 'Blocked', tier: 'Gold' },
    { id: 'D-803', name: 'Industrial UPS Corp', territory: 'Central', credit: '₹28,00,000', status: 'Active', tier: 'Platinum' },
  ]);

  const [newDealer, setNewDealer] = useState({ name: '', territory: 'North', tier: 'Gold', credit: '₹10,00,000' });

  const filteredDealers = useMemo(() => {
    return dealers.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           d.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeFilter === 'inactive') return matchesSearch && (d.status === 'Blocked' || d.status === 'Inactive');
      if (activeFilter === 'credit') return matchesSearch && (parseInt(d.credit.replace(/[^0-9]/g, '')) > 2000000 || d.tier === 'Platinum');
      
      return matchesSearch;
    });
  }, [dealers, searchTerm, activeFilter]);

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    const dealer = {
      id: `D-${Math.floor(804 + Math.random() * 100)}`,
      name: newDealer.name,
      territory: newDealer.territory,
      tier: newDealer.tier,
      credit: newDealer.credit,
      status: 'Active'
    };
    setDealers([dealer, ...dealers]);
    setIsOnboarding(false);
    setNewDealer({ name: '', territory: 'North', tier: 'Gold', credit: '₹10,00,000' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Dealer Network Management</h2>
          <p className="text-gray-500 text-xs">Onboarding, Credit Control & Territorial Analytics</p>
        </div>
        <button 
          onClick={() => setIsOnboarding(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-brand-steel transition-all flex items-center gap-2 shadow-lg"
        >
           <UserPlus className="w-4 h-4" />
           Onboard New Dealer
        </button>
      </div>

      <AnimatePresence>
        {isOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
              <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-brand-electric" />
                  </div>
                  <div>
                    <h3 className="font-bold">Dealer Registration Portal</h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">New Business Onboarding</p>
                  </div>
                </div>
                <button onClick={() => setIsOnboarding(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleOnboard} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Company / Agency Name</label>
                    <input 
                      required value={newDealer.name} onChange={(e) => setNewDealer({...newDealer, name: e.target.value})}
                      placeholder="Enter legal entity name"
                      className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Assigned Territory</label>
                    <select 
                      value={newDealer.territory} onChange={(e) => setNewDealer({...newDealer, territory: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                    >
                      <option>North</option>
                      <option>South</option>
                      <option>West</option>
                      <option>East</option>
                      <option>Central</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Account Tier</label>
                    <select 
                      value={newDealer.tier} onChange={(e) => setNewDealer({...newDealer, tier: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm"
                    >
                      <option>Bronze</option>
                      <option>Silver</option>
                      <option>Gold</option>
                      <option>Platinum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Initial Credit Limit</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        value={newDealer.credit} onChange={(e) => setNewDealer({...newDealer, credit: e.target.value})}
                        className="w-full border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Contact Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-navy/5 p-4 rounded-lg flex gap-3 text-brand-steel">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 text-brand-electric" />
                  <p className="text-[10px] leading-relaxed">By submitting, you initiate the KYC verification process. Background credit check will be performed by the finance department within 48 hours.</p>
                </div>

                <button type="submit" className="w-full bg-brand-navy text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all shadow-brand-navy/20">
                  Submit Onboarding Application
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-brand-electric">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Total Active Dealers</div>
          <div className="text-2xl font-bold text-brand-navy">124</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-emerald-500">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Total Outstanding</div>
          <div className="text-2xl font-bold text-brand-navy">₹4.2 Cr</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-status-warning">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Near Credit Limit</div>
          <div className="text-2xl font-bold text-brand-navy">12 Accounts</div>
        </div>
        <div className="glass-card p-6 border-l-4 border-l-brand-navy">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Net Receipts MTD</div>
          <div className="text-2xl font-bold text-brand-navy">₹82.5 Lac</div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex gap-4">
             <button 
               onClick={() => setActiveFilter('all')}
               className={`text-xs font-bold transition-all border-b-2 pb-1 ${activeFilter === 'all' ? 'text-brand-navy border-brand-electric' : 'text-gray-400 hover:text-brand-navy border-transparent'}`}
             >
               All Dealers
             </button>
             <button 
               onClick={() => setActiveFilter('credit')}
               className={`text-xs font-bold transition-all border-b-2 pb-1 ${activeFilter === 'credit' ? 'text-brand-navy border-brand-electric' : 'text-gray-400 hover:text-brand-navy border-transparent'}`}
             >
               Credit Holders
             </button>
             <button 
               onClick={() => setActiveFilter('inactive')}
               className={`text-xs font-bold transition-all border-b-2 pb-1 ${activeFilter === 'inactive' ? 'text-brand-navy border-brand-electric' : 'text-gray-400 hover:text-brand-navy border-transparent'}`}
             >
               Inactive
             </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-steel transition-all shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && console.log('Searching...')}
                  placeholder="Search Dealer / ID..." 
                  className="pl-9 pr-4 py-2 text-xs outline-none w-64"
                />
              </div>
              <button 
                onClick={() => console.log('Search triggered')}
                className="bg-brand-navy text-white px-4 text-[10px] font-bold uppercase tracking-wider hover:bg-brand-steel transition-colors border-l border-gray-100"
              >
                Search
              </button>
            </div>
            {(searchTerm || activeFilter !== 'all') && (
              <button 
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all"
                title="Clear Filters"
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
                <th className="px-8 py-4">Dealer Identity</th>
                <th className="px-8 py-4">Territory</th>
                <th className="px-8 py-4">Tier</th>
                <th className="px-8 py-4 text-right">Credit Limit</th>
                <th className="px-8 py-4 text-right">Outstanding</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDealers.map((d, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="text-xs font-bold text-brand-navy">{d.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{d.id}</div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {d.territory}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                     <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                       d.tier === 'Platinum' ? 'bg-indigo-100 text-indigo-700' : 
                       d.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                     }`}>
                       {d.tier}
                     </span>
                  </td>
                  <td className="px-8 py-4 text-right font-mono text-xs text-gray-600">{d.credit}</td>
                  <td className="px-8 py-4 text-right font-mono text-xs text-status-danger font-bold">₹{(Math.random() * 500000).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-8 py-4">
                     <div className="flex items-center gap-2">
                        {d.status === 'Active' ? <ShieldCheck className="w-3 h-3 text-emerald-500" /> : <ShieldAlert className="w-3 h-3 text-status-danger" />}
                        <span className={`text-[10px] font-bold uppercase ${d.status === 'Active' ? 'text-emerald-600' : 'text-status-danger'}`}>{d.status}</span>
                     </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-brand-navy transition-colors">
                      <MoreVertical className="w-4 h-4" />
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
