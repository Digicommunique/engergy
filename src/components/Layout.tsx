import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Battery, User, LogOut, Bell } from 'lucide-react';
import { NAV_GROUPS } from '../constants';

interface LayoutProps {
  children: ReactNode;
  activeView: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
}

export default function Layout({ children, activeView, onNavigate, onLogout }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-main font-sans">
      {/* Sidebar */}
      <aside 
        style={{ background: 'var(--sidebar-gradient)' }}
        className="w-[240px] text-gray-400 flex flex-col fixed inset-y-0 z-50 shadow-2xl overflow-y-auto custom-scrollbar"
      >
        <div className="py-6">
          <div className="px-6 flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-electric rounded-lg flex items-center justify-center text-brand-navy font-bold shadow-lg shadow-brand-electric/20">
               ⚡
            </div>
            <span className="font-bold text-lg text-white tracking-tight leading-none">POWERSYNC <span className="block text-[10px] uppercase font-light opacity-60 tracking-[0.2em] mt-1">Industrial ERP</span></span>
          </div>

          <nav className="px-0 space-y-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.group} className="space-y-1">
                <div className="px-6 text-[10px] font-bold uppercase text-white/60 tracking-[0.15em] mb-2">
                  {group.group}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-2.5 text-[12px] font-bold tracking-tight transition-all group border-l-4 ${
                      activeView === item.id 
                        ? 'bg-white/10 text-white border-brand-electric shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' 
                        : 'border-transparent text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-3.5 h-3.5 transition-colors ${
                      activeView === item.id ? 'text-brand-electric' : 'text-white/60 group-hover:text-white'
                    }`} />
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div 
          style={{ background: 'rgba(0,0,0,0.2)' }}
          className="mt-auto p-4 border-t border-white/5"
        >
           <div className="bg-white/5 p-4 rounded-lg flex flex-col gap-3 group border border-white/5 shadow-inner">
             <div className="uppercase text-[9px] font-bold text-gray-500 tracking-widest leading-relaxed">System Health</div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-xs text-white/80">Synchronized</div>
             </div>
           </div>
           
           <button 
             onClick={onLogout}
             className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg text-[11px] font-bold text-gray-500 hover:text-red-400 transition-all uppercase tracking-widest"
           >
             <LogOut className="w-3 h-3" />
             Exit System
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[220px] min-h-screen flex flex-col">
        {/* Top Header */}
        <header 
          style={{ background: 'var(--header-gradient)' }}
          className="h-16 text-white px-8 flex items-center justify-between sticky top-0 z-40 border-b-[3px] border-brand-electric shadow-lg flex-shrink-0"
        >
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_8px_rgba(0,200,83,0.5)] animate-pulse" />
               <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Factory Node: BLR-01</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Bell className="w-4 h-4 text-white hover:text-brand-electric cursor-pointer transition-colors" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-electric border-2 border-slate-800 rounded-full" />
            </div>
            
            <div className="h-8 w-px bg-white/20" />
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-white tracking-tight">Digital Communique</div>
                <div className="text-[10px] font-bold text-brand-electric uppercase tracking-tighter">Super User Account</div>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 flex-1">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-gray-100 bg-white/50">
          <p className="text-gray-400 text-[11px] text-center font-medium tracking-wide">
            © 2026 DIGITAL COMMUNIQUE PRIVATE LIMITED. ALL RIGHTS RESERVED. | SYSTEM VERSION 4.2.1-ERP
          </p>
        </footer>
      </main>
    </div>
  );
}
