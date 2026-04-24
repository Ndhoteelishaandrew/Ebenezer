/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, FileArchive, Code2, BrainCircuit, Settings, Menu, Wrench } from 'lucide-react';
import { cn } from './lib/utils';
import DashboardTab from './components/DashboardTab';
import ApkLabTab from './components/ApkLabTab';
import CodeForgeTab from './components/CodeForgeTab';
import AiMentorTab from './components/AiMentorTab';
import ToolboxTab from './components/ToolboxTab';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', component: DashboardTab },
    { icon: FileArchive, label: 'APK Lab', component: ApkLabTab },
    { icon: Code2, label: 'Code Forge', component: CodeForgeTab },
    { icon: BrainCircuit, label: 'AI Architect', component: AiMentorTab },
    { icon: Wrench, label: 'Toolbox', component: ToolboxTab },
  ];

  const CurrentTab = navItems[activeTab].component;

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#05060B] text-gray-200 overflow-hidden font-sans">
      {/* Sidebar Navigation - Desktop */}
      <nav className="w-20 bg-[#0F111A] border-r border-gray-800 hidden md:flex flex-col items-center py-6 shrink-0 z-10">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black font-serif font-bold text-xl mb-12 shadow-lg shadow-amber-900/50">
          א
        </div>
        <div className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              title={item.label}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all group relative",
                activeTab === index 
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/50" 
                  : "text-gray-500 hover:bg-gray-800 hover:text-gray-300 border border-transparent"
              )}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex justify-between items-center p-4 md:p-6 shrink-0 border-b md:border-b-0 border-gray-800 z-10 bg-[#05060B]">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-serif font-bold text-lg md:hidden shadow-lg shadow-amber-900/50">
                א
             </div>
             <div>
               <h1 className="text-xl md:text-2xl font-bold font-serif text-gray-100 tracking-wide uppercase">Bezalel Studio</h1>
               <div className="text-xs text-amber-500/80 italic font-medium hidden sm:block">The Craftsman's Workshop</div>
             </div>
          </div>
          <div className="hidden sm:flex items-center bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full space-x-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Environment Ready</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-[#05060B] min-h-0">
           <CurrentTab />
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden bg-[#0F111A] border-t border-gray-800 flex justify-around p-3 shrink-0 pb-safe">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              title={item.label}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors",
                activeTab === index ? "text-amber-500" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[9px] uppercase font-bold tracking-wider">{item.label}</span>
            </button>
          ))}
      </nav>
    </div>
  );
}
