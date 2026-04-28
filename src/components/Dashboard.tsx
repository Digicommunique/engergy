import { motion } from 'motion/react';
import { Activity, Zap, Package, AlertTriangle, ArrowUpRight, TrendingUp, TrendingDown, ShieldCheck, ShieldAlert, IndianRupee } from 'lucide-react';
import { BATTERY_MODELS } from '../constants';
import { InventoryItem } from './Inventory';
import { WarrantyRegistration } from '../App';

interface DashboardProps {
  inventory: InventoryItem[];
  registrations: WarrantyRegistration[];
  complaints: any[];
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CHART_DATA = [
  { name: 'Mon', efficiency: 85 },
  { name: 'Tue', efficiency: 92 },
  { name: 'Wed', efficiency: 88 },
  { name: 'Thu', efficiency: 95 },
  { name: 'Fri', efficiency: 90 },
  { name: 'Sat', efficiency: 94 },
  { name: 'Sun', efficiency: 91 },
];

export default function Dashboard({ inventory, registrations, complaints }: DashboardProps) {
  const criticalItems = inventory.filter(i => i.stock <= i.minLevel).length;
  const activeTickets = complaints.filter(c => c.status !== 'Closed').length;
  const leadStock = inventory.find(i => i.material.toLowerCase().includes('lead'))?.stock || 0;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          label="Total Revenue" 
          val="₹1.28 Cr" 
          detail="Target: ₹1.5 Cr"
          highlightClass="text-brand-electric"
          icon={IndianRupee}
        />
        <StatCard 
          label="Warranty Base" 
          val={registrations.length.toString()} 
          detail="Active Registrations"
          highlightClass="text-brand-electric"
          icon={ShieldCheck}
        />
        <StatCard 
          label="Inventory Health" 
          val={`${inventory.length} Items`}
          detail={`${criticalItems} below threshold`}
          highlightClass={criticalItems > 0 ? "text-status-danger" : "text-emerald-500"}
          icon={Package}
        />
        <StatCard 
          label="Service Queue" 
          val={activeTickets.toString()} 
          detail="Active Tickets"
          highlightClass={activeTickets > 5 ? "text-status-danger" : "text-status-warning"}
          icon={ShieldAlert}
        />
        <StatCard 
          label="Lead Availability" 
          val={`${(leadStock / 1000).toFixed(1)} Tons`} 
          detail="Primary Raw Material"
          highlightClass="text-emerald-500"
          icon={Zap}
        />
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-navy">Production Efficiency (%)</h3>
            <button className="text-xs font-bold text-brand-steel hover:underline focus:outline-none uppercase tracking-widest">Live Feed</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="efficiency" radius={[4, 4, 0, 0]} barSize={32}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#00b4d8' : '#dee2e6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-brand-navy mb-6 uppercase text-xs tracking-widest">Recent Operational Activity</h3>
          <div className="space-y-6">
            {complaints.length > 0 && (
              <ActivityItem 
                title="Service Ticket Raised" 
                time="Recent" 
                desc={`For ${complaints[0].serialNumber}`}
                type="warranty"
              />
            )}
            {registrations.length > 0 && (
              <ActivityItem 
                title="Warranty Registered" 
                time="Recent" 
                desc={`SN: ${registrations[0].id}`}
                type="warranty"
              />
            )}
            <ActivityItem 
              title="System Ready" 
              time="Ongoing" 
              desc="All modules synchronized"
              type="mrp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, val, detail, icon: Icon, highlightClass }: any) {
  return (
    <div className="glass-card p-5 min-h-[110px] flex flex-col justify-between hover:border-brand-steel transition-colors group cursor-default">
      <div>
        <div className="stat-label mb-1 uppercase tracking-widest">{label}</div>
        <div className="stat-value text-2xl">{val}</div>
      </div>
      <div className={`text-[11px] font-bold mt-3 flex items-center gap-1.5 ${highlightClass}`}>
        {Icon && <Icon className="w-3 h-3" />}
        {detail}
      </div>
    </div>
  );
}

function ActivityItem({ title, time, desc, type }: any) {
  return (
    <div className="flex gap-4 group">
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
        type === 'mrp' ? 'bg-brand-electric' : 
        type === 'bom' ? 'bg-brand-steel' : 'bg-status-warning'
      }`} />
      <div>
        <div className="text-sm font-bold text-brand-navy group-hover:text-brand-steel transition-colors">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
        <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{time}</div>
      </div>
    </div>
  );
}
