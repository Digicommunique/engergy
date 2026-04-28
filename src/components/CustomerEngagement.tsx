import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, QrCode, Share2, MessageSquare, 
  Battery, ShieldCheck, Wrench, Gift, 
  MapPin, Bell, Search, Star, ChevronRight, X, Trash2
} from 'lucide-react';

export default function CustomerEngagement() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [notificationSent, setNotificationSent] = useState(false);
  const [qrDest, setQrDest] = useState('auth.powerwise.com/v2/scan');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [activeModal, setActiveModal] = useState<'campaign' | 'dest' | 'appraisal' | 'none'>('none');
  const [tempDest, setTempDest] = useState(qrDest);
  const [appraisalSerial, setAppraisalSerial] = useState('');
  const [appraisalResult, setAppraisalResult] = useState<{ value: number, health: number } | null>(null);

  const stats = [
    { label: 'Active App Users', val: '4,280', icon: Smartphone, color: 'text-brand-electric' },
    { label: 'QR Scans (Last 30D)', val: '12,450', icon: QrCode, color: 'text-brand-steel' },
    { label: 'Claim Requests', val: '142', icon: ShieldCheck, color: 'text-brand-navy' },
    { label: 'Avg User Rating', val: '4.8/5', icon: Star, color: 'text-yellow-500' },
  ];

  const handleSendOffer = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
    alert('Promotional offer pushed to all active mobile users.');
  };

  const handleGenerateBatch = () => {
    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      alert('Batch of 500 Unique QR IDs generated and synced with Production Line A.');
    }, 2000);
  };

  const handleCheckAppraisal = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate lookup
    setAppraisalResult({
      value: Math.floor(2500 + Math.random() * 2000),
      health: Math.floor(40 + Math.random() * 50)
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Customer Engagement Portal</h2>
          <p className="text-gray-500 text-xs">QR-Linked Mobile Ecosystem & Direct-to-Consumer Analytics</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveModal('campaign')}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-navy hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            Marketing Campaigns
          </button>
          <button 
            onClick={handleGenerateBatch}
            disabled={isGeneratingQR}
            className={`px-4 py-2 border rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              isGeneratingQR ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-brand-navy text-white border-brand-navy hover:bg-brand-steel'
            }`}
          >
            {isGeneratingQR ? (
              <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-brand-navy rounded-full animate-spin" />
            ) : (
              <QrCode className="w-3.5 h-3.5" />
            )}
            {isGeneratingQR ? 'Generating...' : 'Generate Batch QRs'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeModal === 'campaign' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                <h3 className="font-bold">Campaign Designer</h3>
                <button onClick={() => setActiveModal('none')} className="hover:rotate-90 transition-transform">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-500 mb-2">Select a campaign template to broadcast to users</p>
                {['Summer Peak Exchange', 'Referral Multiplier', 'Monsoon Health Checkup'].map(c => (
                  <button 
                    key={c}
                    onClick={() => {
                      alert(`Campaign "${c}" has been scheduled for broadcast.`);
                      setActiveModal('none');
                    }}
                    className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-brand-electric hover:bg-brand-navy/5 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-brand-navy">{c}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-electric transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="glass-card p-6 border-b-2 border-transparent hover:border-brand-electric transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-100 group-hover:bg-brand-navy/5 transition-colors`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+12%</span>
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-brand-navy">{s.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Preview Frame */}
        <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
          <div className="relative w-[280px] h-[580px] bg-brand-navy rounded-[3rem] p-3 shadow-2xl border-4 border-brand-steel">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-navy rounded-b-2xl z-10"></div>
            
            {/* Screen */}
            <div className="w-full h-full bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col relative">
                {activeScreen === 'home' ? (
                  <motion.div 
                    key="home"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-brand-navy text-white p-6 pt-10">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-[10px] text-white/60">Good Morning,</p>
                          <p className="font-bold text-sm">Aditya Sharma</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
                          <Bell className="w-4 h-4" />
                          {notificationSent && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-electric rounded-full animate-ping" />
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded-2xl p-4 flex gap-4 items-center border border-white/10 shadow-inner">
                        <div className="w-10 h-10 bg-brand-electric rounded-xl flex items-center justify-center">
                          <Battery className="w-6 h-6 text-brand-navy" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Primary Device</p>
                          <p className="font-bold text-xs">INV-150 SuperFlow</p>
                        </div>
                        <div className="text-right">
                          <p className="text-brand-electric font-bold text-sm">98%</p>
                          <p className="text-[8px] text-white/40 uppercase">Healthy</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-2 gap-3">
                        <MobileNavItem onClick={() => setActiveScreen('warranty')} icon={ShieldCheck} label="Warranty" color="bg-emerald-100 text-emerald-600" />
                        <MobileNavItem onClick={() => setActiveScreen('service')} icon={Wrench} label="Service" color="bg-brand-navy/5 text-brand-navy" />
                        <MobileNavItem onClick={() => setActiveScreen('rewards')} icon={Gift} label="Rewards" color="bg-amber-100 text-amber-600" />
                        <MobileNavItem onClick={() => setActiveScreen('dealer')} icon={MapPin} label="Find Dealer" color="bg-indigo-100 text-indigo-600" />
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-xs text-brand-navy">Service History</h4>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="space-y-3">
                          <ServiceLog brand="Energy" date="24 Apr 2026" status="Completed" />
                          <ServiceLog brand="Health Check" date="12 Jan 2026" status="Verified" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-brand-navy to-brand-steel p-4 rounded-2xl text-white">
                        <h4 className="font-bold text-xs mb-1">Exchange & Save</h4>
                        <p className="text-[10px] text-white/70 mb-3 text-pretty leading-relaxed">Get up to ₹4,000 off on your next purchase by recycling your old battery.</p>
                        <button 
                          onClick={() => {
                            setAppraisalResult(null);
                            setAppraisalSerial('');
                            setActiveModal('appraisal');
                          }}
                          className="w-full bg-brand-electric text-brand-navy text-[10px] font-bold py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                          Check Appraisal Value
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="other"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full bg-white"
                  >
                    <div className="p-6 pt-10 border-b border-gray-100 flex items-center justify-between">
                       <button onClick={() => setActiveScreen('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                         <X className="w-5 h-5 text-gray-400" />
                       </button>
                       <h4 className="font-bold text-sm text-brand-navy capitalize">{activeScreen} Portal</h4>
                       <div className="w-8" />
                    </div>
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                       <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Smartphone className="w-8 h-8 text-brand-navy/20" />
                       </div>
                       <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed px-4">Direct integration simulation active. Connect device for real sync.</p>
                       <button 
                        onClick={() => setActiveScreen('home')}
                        className="bg-brand-navy text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                       >
                         Back to Home
                       </button>
                    </div>
                  </motion.div>
                )}

              {/* Mobile Tab Bar */}
              <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center mt-auto">
                <button onClick={() => setActiveScreen('home')} className={`p-2 transition-colors ${activeScreen === 'home' ? 'text-brand-electric' : 'text-gray-300'}`}>
                   <Smartphone className="w-5 h-5" />
                </button>
                <Search className="w-5 h-5 text-gray-300" />
                <MessageSquare className="w-5 h-5 text-gray-300" />
                <Star className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Management */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="glass-card p-8">
            <h3 className="font-bold text-brand-navy mb-6">QR Engagement Funnel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FunnelStep 
                  label="Unique QR Scans" 
                  val="45,200" 
                  percent="100%" 
                  desc="Total customers who scanned the warranty QR code" 
                  color="bg-brand-navy"
                />
                <FunnelStep 
                  label="App Download" 
                  val="32,400" 
                  percent="71%" 
                  desc="Installed the 'PowerCare' mobile application" 
                  color="bg-brand-steel"
                />
                <FunnelStep 
                  label="Product Registration" 
                  val="28,800" 
                  percent="63%" 
                  desc="Completed warranty registration via the app" 
                  color="bg-brand-electric"
                />
                <FunnelStep 
                  label="Recurring Engagement" 
                  val="12,100" 
                  percent="26%" 
                  desc="Users checking health or requesting service" 
                  color="bg-emerald-500"
                />
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-white p-3 rounded-2xl shadow-xl mb-4 relative">
                  <QrCode className="w-full h-full text-brand-navy" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-electric rounded-full flex items-center justify-center text-brand-navy text-[1.5rem] font-bold shadow-lg">!</div>
                </div>
                <h4 className="font-bold text-brand-navy mb-2">Instant Loyalty Trigger</h4>
                <p className="text-xs text-gray-500 mb-6 px-4">Current QR redirects to: <span className="text-brand-electric font-mono break-all">{qrDest}</span></p>
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={() => {
                      setTempDest(qrDest);
                      setActiveModal('dest');
                    }}
                    className="flex-1 bg-white border border-gray-200 text-brand-navy text-[10px] font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors uppercase tracking-wider shadow-sm"
                  >
                    Edit Dest
                  </button>
                  <button 
                    onClick={handleSendOffer}
                    className="flex-1 bg-brand-navy text-white text-[10px] font-bold py-2.5 rounded-lg hover:bg-brand-steel transition-colors uppercase tracking-wider shadow-sm"
                  >
                    {notificationSent ? 'Sent!' : 'Add Offer'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {activeModal === 'dest' && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                >
                  <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                    <h3 className="font-bold">Update QR Destination</h3>
                    <button onClick={() => setActiveModal('none')}><X className="w-5 h-5" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Redirect URL</label>
                       <input 
                        type="text" 
                        value={tempDest}
                        onChange={(e) => setTempDest(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-steel font-mono"
                       />
                    </div>
                    <button 
                      onClick={() => {
                        setQrDest(tempDest);
                        setActiveModal('none');
                        alert('Global QR Destination updated across all production nodes.');
                      }}
                      className="w-full py-3 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-steel transition-all shadow-lg"
                    >
                      Save Configuration
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeModal === 'appraisal' && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                  <div className="p-6 bg-brand-navy text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-brand-electric" />
                      <h3 className="font-bold">Scrap Appraisal Tool</h3>
                    </div>
                    <button onClick={() => setActiveModal('none')}><X className="w-5 h-5" /></button>
                  </div>
                  <div className="p-8 space-y-6">
                    <form onSubmit={handleCheckAppraisal} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Battery Serial Number</label>
                        <div className="flex gap-2">
                          <input 
                            required
                            type="text" 
                            placeholder="SN-XXXXX"
                            value={appraisalSerial}
                            onChange={(e) => setAppraisalSerial(e.target.value)}
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-steel font-mono"
                          />
                          <button type="submit" className="bg-brand-navy text-white px-4 rounded-xl hover:bg-brand-steel transition-all">
                            <Search className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </form>

                    {appraisalResult && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimated Value</p>
                            <p className="text-3xl font-black text-brand-navy">₹{appraisalResult.value.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Residual Health</p>
                            <p className="text-xl font-bold text-emerald-500">{appraisalResult.health}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-emerald-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${appraisalResult.health}%` }} />
                        </div>
                        <p className="text-[10px] text-gray-500 italic">Value based on current Lead (Pb) market price of ₹168/kg and assumed 45% plate degradation.</p>
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => alert('Voucher code EX-SAVE-881 generated!')}
                            className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
                          >
                            Apply to Exchange
                          </button>
                          <button 
                             onClick={() => setActiveModal('none')}
                             className="px-6 py-3 border border-emerald-200 text-emerald-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all"
                          >
                            Save Quote
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="glass-card overflow-hidden">
             <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold text-xs uppercase tracking-widest text-brand-navy flex items-center gap-2">
                 <Bell className="w-3.5 h-3.5 text-brand-electric" />
                 Recent Engagement Activities
               </h3>
                <button 
                  onClick={() => alert('Loading historic engagement logs...')}
                  className="text-[10px] font-bold text-brand-electric uppercase hover:underline"
                >
                  View All Notifications
                </button>
             </div>
             <div className="divide-y divide-gray-50">
               <EngagementRow user="Rajesh Kumar" action="Registered for Warranty" item="INV-150-TUB" time="2 mins ago" status="Verified" />
               <EngagementRow user="Anjali Singh" action="Service Request" item="AUTO-35L" time="15 mins ago" status="Action Required" />
               <EngagementRow user="Vikram Ad" action="Referral Generated" item="Coupon: REF-400" time="1 hour ago" status="Success" />
               <EngagementRow user="Sunita M." action="Points Redeemed" item="150 Points" time="3 hours ago" status="Processed" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ icon: Icon, label, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`${color} p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-95 active:scale-90 transition-all shadow-sm`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function ServiceLog({ brand, date, status }: any) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        <div>
          <p className="text-[10px] font-bold text-brand-navy">{brand}</p>
          <p className="text-[8px] text-gray-400">{date}</p>
        </div>
      </div>
      <p className="text-[8px] font-bold uppercase text-brand-navy/60">{status}</p>
    </div>
  );
}

function FunnelStep({ label, val, percent, desc, color }: any) {
  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-brand-navy">{label}</span>
          <span className="text-xs text-gray-400 font-medium">({val})</span>
        </div>
        <span className="text-xs font-bold text-brand-steel">{percent}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: percent }}></div>
      </div>
      <p className="text-[9px] text-gray-400 mt-2">{desc}</p>
    </div>
  );
}

function EngagementRow({ user, action, item, time, status }: any) {
  return (
    <div className="px-8 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-brand-navy/5 flex items-center justify-center font-bold text-brand-navy text-[10px]">
          {user.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <div className="text-xs font-bold text-brand-navy">{user}</div>
          <div className="text-[10px] text-gray-400">{action}: <span className="text-brand-steel font-medium">{item}</span></div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-bold text-brand-navy">{time}</div>
        <div className={`text-[8px] font-bold uppercase tracking-wider ${
          status === 'Action Required' ? 'text-status-danger' : 
          status === 'Success' ? 'text-emerald-500' : 'text-brand-steel'
        }`}>{status}</div>
      </div>
    </div>
  );
}
