import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, HardDrive, Cpu, Battery, Trash2, CheckCircle2 } from 'lucide-react';

const activityData = [
  { day: 'Mon', lines: 120, builds: 2 },
  { day: 'Tue', lines: 250, builds: 4 },
  { day: 'Wed', lines: 380, builds: 3 },
  { day: 'Thu', lines: 190, builds: 5 },
  { day: 'Fri', lines: 450, builds: 7 },
  { day: 'Sat', lines: 100, builds: 1 },
  { day: 'Sun', lines: 50, builds: 0 },
];

const storageData = [
  { name: 'Projects', value: 400 },
  { name: 'Cache', value: 300 },
  { name: 'APKs', value: 300 },
  { name: 'Free', value: 200 },
];
const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#1F2937'];

export default function DashboardTab() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      {/* Toast Notification Constraint Satisfaction */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-2 rounded-lg shadow-lg shadow-emerald-900/20 z-50 flex items-center space-x-2 animate-in slide-in-from-top-4">
           <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
           <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Activity Chart */}
      <div className="card lg:col-span-2 bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-5 h-5 text-blue-500" />
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Activity History</h2>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }}
                itemStyle={{ color: '#E5E7EB' }}
              />
              <Line type="monotone" dataKey="lines" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="builds" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Storage Analyzer */}
      <div className="card bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Storage</h2>
          </div>
          <button onClick={() => handleAction('Running garbage collection... freed 1.2GB.')} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-red-400" title="One-Tap Clean: Clear memory caches and temporary files to free up disk space">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={storageData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-light text-gray-200">1.2<span className="text-sm text-gray-500">GB</span></span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="card lg:col-span-3 bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Cpu className="w-5 h-5 text-emerald-500" />
          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase">System & Activity Monitor</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="grid grid-cols-1 gap-6">
             {[
                { label: 'CPU Load', value: '14%', icon: Cpu, color: 'text-emerald-500', bar: 'bg-emerald-500', width: '14%' },
                { label: 'RAM Usage', value: '2.1 GB', icon: Activity, color: 'text-blue-500', bar: 'bg-blue-500', width: '45%' },
                { label: 'Battery', value: '88%', icon: Battery, color: 'text-amber-500', bar: 'bg-amber-500', width: '88%' },
             ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-4 bg-[#1F2937] p-4 rounded-xl shadow-sm">
                  <div className={`p-3 rounded-lg bg-gray-900 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
                      <span className="text-sm font-bold text-gray-200">{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.bar}`} style={{ width: stat.width }}></div>
                    </div>
                  </div>
                </div>
             ))}
           </div>
           
           <div className="bg-[#1F2937] rounded-xl p-4 flex flex-col space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase border-b border-gray-800 pb-2">Recent Operations</h3>
              {[
                { title: 'Compiled payload for Android 14', time: '10 mins ago', color: 'text-emerald-500' },
                { title: 'Decompiled com.secure.app.apk', time: '2 hours ago', color: 'text-blue-500' },
                { title: 'Dart UI layout file saved', time: '5 hours ago', color: 'text-amber-500' },
                { title: 'Cleaned orphaned cache files', time: '1 day ago', color: 'text-gray-400' },
              ].map((activity, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-sm font-medium text-gray-200 truncate">{activity.title}</p>
                  <p className={`text-xs ${activity.color} mt-0.5`}>{activity.time}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
