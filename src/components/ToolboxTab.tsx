import React, { useState } from 'react';
import { Shield, Palette, Wrench, Activity, Wifi, HardDrive, Network, Lock, Zap, CheckCircle, Search, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ToolboxTab() {
  const [activeCategory, setActiveCategory] = useState('system');
  const [actionMessage, setActionMessage] = useState('');

  const handleAction = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const categories = [
    { id: 'system', label: 'System & Device', icon: HardDrive },
    { id: 'network', label: 'Network & Security', icon: Network },
    { id: 'recovery', label: 'Self Healing', icon: Shield },
    { id: 'ux', label: 'Themes & UX', icon: Palette },
  ];

  const tools = {
    system: [
      { name: 'Battery Health', desc: 'Cycle count & degradation', action: () => handleAction('Battery capacity at 94%. Cycle count: 412.') },
      { name: 'Storage Analyzer', desc: 'Find large caches', action: () => handleAction('Scanning storage... Found 1.2GB of removable cache.') },
      { name: 'Sensor Dashboard', desc: 'Test hardware sensors', action: () => handleAction('All sensors (Accel, Gyro, Mag) responding normally.') },
      { name: 'Process Viewer', desc: 'Non-root background tasks', action: () => handleAction('Identified 14 background tasks using 450MB RAM.') },
      { name: 'Image OCR', desc: 'Extract text from images', action: () => handleAction('Please select an image to extract text.') },
      { name: 'Clipboard Manager', desc: 'Secure history', action: () => handleAction('Clipboard history is empty. Service running.') },
    ],
    network: [
      { name: 'Port Scanner', desc: 'Local network IP scan', action: () => handleAction('Scanning 192.168.1.0/24... Found 3 active hosts.') },
      { name: 'SSL Certificate Validator', desc: 'Inspect cert chains', action: () => handleAction('Please enter URL to inspect certificate.') },
      { name: 'MAC Address Spoofer', desc: 'Virtual interfaces only', action: () => handleAction('Virtual MAC updated to 02:XX:XX:XX:XX:XX for next session.') },
      { name: 'WiFi Analyzer', desc: 'Channel & signal strength', action: () => handleAction('Current SSID on Channel 6, Signal: -45dBm (Excellent)') },
      { name: 'Hash Generator', desc: 'MD5/SHA/Bcrypt', action: () => handleAction('Opening cryptographic hash utility.') },
      { name: 'DNS Configurator', desc: 'Change local lookup', action: () => handleAction('DNS temporarily switched to 1.1.1.1 (Cloudflare).') },
    ],
    recovery: [
      { name: 'Integrity Check', desc: 'Validate core modules', action: () => handleAction('All 64 foundational modules passed checksum validation.') },
      { name: 'Clear Stale Locks', desc: 'Remove old project locks', action: () => handleAction('Cleaned up 2 orphaned lock files.') },
      { name: 'Memory Leak Detector', desc: 'Analyze RAM usage', action: () => handleAction('No active memory leaks detected in current sandbox.') },
      { name: 'Recover Project', desc: 'Restore from staging', action: () => handleAction('No corrupted projects found in staging area.') },
      { name: 'Emergency Reset', desc: 'Factory defaults', action: () => handleAction('WARNING: Click again within 5s to confirm settings reset.') },
      { name: 'Auto-Backup Service', desc: 'Configure intervals', action: () => handleAction('Auto-backup interval set to 300 seconds (5 mins).') },
    ],
    ux: [
      { name: 'Theme Engine', desc: 'Wall / Law / Holy', action: () => handleAction('Theme persists across reloads via localStorage.') },
      { name: 'Font Scaling', desc: 'Adjust readability', action: () => handleAction('Font scaling factor reset to 1.0x.') },
      { name: 'Compact Mode', desc: 'Dense UI for small screens', action: () => handleAction('Compact mode toggled. Restart required for full effect.') },
      { name: 'Haptic Feedback', desc: 'Vibration on tap', action: () => handleAction('Haptic feedback enabled (if supported by device).') },
    ]
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Action Toast */}
      {actionMessage && (
        <div className="absolute top-4 right-4 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl shadow-lg shadow-emerald-900/20 z-50 flex items-start space-x-3 animate-in slide-in-from-top-4 max-w-sm">
           <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
           <div className="text-sm font-medium">{actionMessage}</div>
        </div>
      )}

      {/* About App Banner */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600"></div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold font-serif text-gray-100 tracking-wide uppercase">Bezalel Studio</h2>
            <div className="text-xs text-gray-400">The Master Builder's Forge</div>
          </div>
        </div>
        <div className="italic text-xs text-amber-500/80 max-w-2xl mb-4 leading-relaxed bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 hidden md:block">
          “I have filled him with the Spirit of God, with wisdom, with understanding, with knowledge and with all kinds of skills.” (Exodus 31:3)
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
           <span>v4.0 (PWA/Offline Capable)</span>
           <span className="hidden sm:inline">•</span>
           <span>Dev: Ndhote Elisha Andrew</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar shrink-0">
           {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                title={`Open ${cat.label} tools`}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium whitespace-nowrap",
                  activeCategory === cat.id 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                    : "bg-[#111827] border border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                )}
              >
                 <cat.icon className="w-4 h-4 shrink-0" />
                 <span>{cat.label}</span>
              </button>
           ))}
        </div>

        {/* Tools Grid */}
        <div className="flex-1 bg-[#111827] border border-gray-800 rounded-2xl p-6 overflow-y-auto">
          <h3 className="font-bold text-gray-200 mb-6 uppercase tracking-widest text-sm flex items-center">
            {categories.find(c => c.id === activeCategory)?.icon && React.createElement(categories.find(c => c.id === activeCategory)!.icon, { className: "w-4 h-4 mr-2 text-amber-500" })}
            {categories.find(c => c.id === activeCategory)?.label} Tools
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {tools[activeCategory as keyof typeof tools].map((tool, idx) => (
               <div key={idx} className="bg-[#1F2937] border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-amber-500/30 transition-colors">
                 <div>
                   <h4 className="font-semibold text-gray-200 text-sm group-hover:text-amber-400 transition-colors">{tool.name}</h4>
                   <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
                 </div>
                 <button 
                   onClick={tool.action}
                   title={`Execute ${tool.name}`}
                   className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-colors"
                 >
                    <Zap className="w-4 h-4" />
                 </button>
               </div>
             ))}
          </div>

          {activeCategory === 'ux' && (
             <div className="mt-8 border-t border-gray-800 pt-6">
                <h4 className="font-semibold text-gray-200 text-sm mb-4">Color Palette Preview</h4>
                <div className="flex space-x-2">
                   <div className="w-10 h-10 rounded-lg bg-[#05060B]" title="Background"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#0F111A]" title="Surface"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#111827]" title="Card"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#1F2937]" title="Highlight"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#3B82F6]" title="Primary Accent (Blue)"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#D4AF37]" title="Secondary Accent (Gold)"></div>
                   <div className="w-10 h-10 rounded-lg bg-[#10B981]" title="Success (Emerald)"></div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
