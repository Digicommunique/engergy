import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';
import { Activity, BarChart3, TrendingUp, Zap, Calendar, Filter, Download, ShieldAlert } from 'lucide-react';

interface ReportProps {
  type: 'rm' | 'prod' | 'warranty' | 'dealers';
}

const RM_DATA = [
  { month: 'Jan', lead: 4500, oxide: 2100, acid: 800 },
  { month: 'Feb', lead: 5200, oxide: 2400, acid: 950 },
  { month: 'Mar', lead: 4800, oxide: 2200, acid: 880 },
  { month: 'Apr', lead: 6100, oxide: 3100, acid: 1100 },
];

const PROD_DATA = [
  { day: 'Mon', target: 100, actual: 85, efficiency: 85 },
  { day: 'Tue', target: 100, actual: 92, efficiency: 92 },
  { day: 'Wed', target: 100, actual: 88, efficiency: 88 },
  { day: 'Thu', target: 120, actual: 115, efficiency: 95 },
  { day: 'Fri', target: 120, actual: 108, efficiency: 90 },
  { day: 'Sat', target: 120, actual: 112, efficiency: 93 },
  { day: 'Sun', target: 80, actual: 75, efficiency: 94 },
];

const WARRANTY_DATA = [
  { model: 'INV-150', failures: 12, sales: 850, rate: 1.4 },
  { model: 'AUTO-35', failures: 8, sales: 1200, rate: 0.6 },
  { model: 'VRLA-100', failures: 15, sales: 600, rate: 2.5 },
];

const DEALER_DATA = [
  { name: 'AutoPower', sales: 4500000, returns: 2, score: 95 },
  { name: 'Bright Bat', sales: 1200000, returns: 5, score: 78 },
  { name: 'Industrial', sales: 2800000, returns: 1, score: 92 },
  { name: 'Energy Sol', sales: 3100000, returns: 3, score: 88 },
];

const COLORS = ['#00b4d8', '#0077b6', '#90e0ef', '#03045e'];

export default function Analytics({ type }: ReportProps) {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const renderRMReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Lead Consumed" val="20.6 Tons" trend="+12%" icon={Activity} />
        <StatCard label="Oxide Utilization" val="9.8 Tons" trend="-2%" icon={Activity} />
        <StatCard label="Acid Throughput" val="3.73 KL" trend="+5%" icon={Activity} />
      </div>
      <div className="glass-card p-8">
        <h3 className="font-bold text-brand-navy mb-8">Raw Material Consumption (Monthly)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RM_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" />
              <Bar dataKey="lead" name="Lead Alloy (Kg)" fill="#0077b6" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="oxide" name="Lead Oxide (Kg)" fill="#00b4d8" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderProdReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Avg Efficiency" val="91.4%" trend="+4.1%" icon={Zap} />
        <StatCard label="Units Produced" val="687 Units" trend="+15%" icon={Zap} />
        <StatCard label="QC Rejection Rate" val="1.2%" trend="-0.5%" icon={Zap} />
      </div>
      <div className="glass-card p-8">
        <h3 className="font-bold text-brand-navy mb-8">Daily Production Efficiency (%)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROD_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke="#00b4d8" strokeWidth={3} dot={{ fill: '#00b4d8', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="actual" stroke="#0077b6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderWarrantyReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Overall Fail Rate" val="1.15%" trend="-0.2%" icon={ShieldAlert} />
        <StatCard label="Avg Claim Time" val="4.2 Days" trend="-1.5d" icon={ShieldAlert} />
        <StatCard label="Replacement Cost" val="₹4.2L" trend="+8%" icon={ShieldAlert} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-8">
          <h3 className="font-bold text-brand-navy mb-8">Failures by Model</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WARRANTY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="failures"
                  nameKey="model"
                >
                  {WARRANTY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-8">
          <h3 className="font-bold text-brand-navy mb-8">Failure Rate Analytics (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WARRANTY_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis dataKey="model" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="rate" fill="#dc2626" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDealerReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Avg Dealer Score" val="88/100" trend="+2" icon={TrendingUp} />
        <StatCard label="Active Network" val="242" trend="+12" icon={TrendingUp} />
        <StatCard label="Total Sales Value" val="₹2.2Cr" trend="+18%" icon={TrendingUp} />
        <StatCard label="Return Ratio" val="0.4%" trend="-0.1%" icon={TrendingUp} />
      </div>
      <div className="glass-card p-8">
        <h3 className="font-bold text-brand-navy mb-8">Top Dealer Sales Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEALER_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip formatter={(value: any) => `₹${(value / 100000).toFixed(1)}L`} />
              <Bar dataKey="sales" fill="#0077b6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const titles = {
    rm: 'Raw Material Consumption Analytics',
    prod: 'Production Efficiency & Throughput',
    warranty: 'Warranty Failure & RMA Analysis',
    dealers: 'Dealer Performance & Network Health'
  };

  const icons = {
    rm: Activity,
    prod: BarChart3,
    warranty: Zap,
    dealers: TrendingUp
  };

  const ActiveIcon = icons[type];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
             <ActiveIcon className="w-6 h-6 text-brand-steel" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy tracking-tight">{titles[type]}</h2>
            <p className="text-xs text-gray-500 font-medium">Detailed operational intelligence and trend analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
             {['7D', '30D', '90D', '1Y'].map(range => (
               <button 
                 key={range}
                 className={`px-3 py-1 text-[10px] font-bold rounded ${range === '30D' ? 'bg-brand-navy text-white' : 'text-gray-400 hover:text-brand-navy'}`}
               >
                 {range}
               </button>
             ))}
           </div>
           <button className="bg-white border border-gray-200 p-2 rounded-lg text-gray-500 hover:text-brand-navy transition-all shadow-sm">
             <Filter className="w-4 h-4" />
           </button>
           <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-brand-steel shadow-md transition-all">
             <Download className="w-3.5 h-3.5" />
             Export PDF
           </button>
        </div>
      </div>

      <motion.div
        key={type}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {type === 'rm' && renderRMReport()}
        {type === 'prod' && renderProdReport()}
        {type === 'warranty' && renderWarrantyReport()}
        {type === 'dealers' && renderDealerReport()}
      </motion.div>
    </div>
  );
}

function StatCard({ label, val, trend, icon: Icon }: any) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="glass-card p-6 flex items-center justify-between group">
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-2xl font-bold text-brand-navy mb-2">{val}</div>
        <div className={`text-[10px] font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-status-danger'}`}>
           <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
           {trend} vs last period
        </div>
      </div>
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-brand-navy transition-colors">
        <Icon className="w-5 h-5 text-brand-steel group-hover:text-white transition-colors" />
      </div>
    </div>
  );
}
