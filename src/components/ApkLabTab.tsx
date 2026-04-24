import React, { useState } from 'react';
import { PackageSearch, FileBox, ShieldAlert, Network, Share2, AlertTriangle, CheckCircle2, Hammer, Shield, Save } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ApkLabTab() {
  const [activeSubtab, setActiveSubtab] = useState('metadata');
  const [isParsing, setIsParsing] = useState(false);
  const [hasApk, setHasApk] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const fireToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSimulateLoad = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setHasApk(true);
    }, 1500);
  };

  const handleSimulateError = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 4000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      {showToast && (
        <div className="absolute top-4 right-4 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-xl shadow-lg shadow-emerald-900/20 z-50 flex items-start space-x-3 animate-in slide-in-from-top-4 max-w-sm">
           <ShieldAlert className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
           <div className="text-sm font-medium leading-snug">{toastMsg}</div>
        </div>
      )}

      {errorVisible && (
        <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-start space-x-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-4">
           <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
           <div>
              <div className="font-semibold text-sm">Corrupt APK selected</div>
              <div className="text-xs text-red-300">Invalid ZIP format or missing AndroidManifest.xml. Please choose another file.</div>
           </div>
        </div>
      )}

      {/* Hero / Upload Section */}
      <div className={cn("bg-[#111827] border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all", hasApk ? "py-6" : "py-24")}>
        {!hasApk && !isParsing && (
           <>
             <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4">
               <FileBox className="w-8 h-8" />
             </div>
             <h2 className="text-xl font-bold text-gray-200 mb-2">Inspect an APK</h2>
             <p className="text-gray-400 text-sm max-w-md mb-6">Analyze manifests, view resources, and map dependencies securely in a read-only environment.</p>
             <div className="flex space-x-4">
               <button onClick={handleSimulateLoad} title="Load a sample APK to analyze structurally without making changes" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-900/20">
                 Load Example APK
               </button>
               <button onClick={handleSimulateError} title="Trigger a simulated error to demonstrate self-healing UI" className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-lg font-medium text-sm transition-colors border border-gray-700">
                 Test Error Handler
               </button>
             </div>
           </>
        )}
        {isParsing && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="text-sm text-gray-400 animate-pulse">Running primary parser...</div>
          </div>
        )}
        {hasApk && !isParsing && (
           <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                   <PackageSearch className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-200 text-lg">com.example.watchtower</h3>
                  <div className="text-xs font-mono text-gray-500 mt-1">Version 2.4.0 (Build 42) • Size: 14.2 MB</div>
                </div>
              </div>
              <button onClick={() => setHasApk(false)} title="Unload the current APK and return to the upload screen" className="px-4 py-2 bg-gray-800 text-xs text-gray-400 rounded-lg hover:bg-gray-700 transition-colors">Clear</button>
           </div>
        )}
      </div>

      {/* Analysis Tabs */}
      {hasApk && (
        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          <div className="flex space-x-2 border-b border-gray-800 pb-px overflow-x-auto no-scrollbar pt-2 px-2 bg-[#111827]">
            {[
              { id: 'metadata', label: 'Extract & Inspect', icon: PackageSearch, title: "Displays basic APK information like permissions and SDK versions" },
              { id: 'integrity', label: 'Security & Certs', icon: ShieldAlert, title: "Verifies APK signature and Play Integrity Attestation" },
              { id: 'network', label: 'Ads & Trackers', icon: Network, title: "Detects known advertising networks and tracking SDKs" },
              { id: 'modify', label: 'Forge (Mod)', icon: Hammer, title: "Modify resources and repackage APK" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubtab(tab.id)}
                title={tab.title}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm font-medium",
                  activeSubtab === tab.id ? "border-amber-500 text-amber-500" : "border-transparent text-gray-500 hover:text-gray-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-[#111827] border border-gray-800 rounded-2xl p-6 overflow-y-auto no-scrollbar">
            {activeSubtab === 'metadata' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Permissions (4)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 flex items-center space-x-3 cursor-help" title="Standard permission: allows the app to open network sockets">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-sm font-mono text-gray-300">INTERNET</span>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 flex items-center space-x-3 cursor-help" title="Dangerous permission: allows read access to user's contacts data">
                       <AlertTriangle className="w-4 h-4 text-amber-500" />
                       <span className="text-sm font-mono text-gray-300">READ_CONTACTS</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex justify-between items-center">
                     <span>SDK Versions</span>
                     <button onClick={() => fireToast("Exporting AndroidManifest.xml...")} className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 hover:text-white transition-colors">Export Manifest</button>
                  </h4>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex flex-col space-y-2 text-sm">
                    <div className="flex justify-between cursor-help" title="Minimum Android version required to install the app"><span className="text-gray-500">Min SDK</span><span className="text-gray-300 font-mono">26 (Android 8.0)</span></div>
                    <div className="flex justify-between cursor-help" title="Android version the app was tested against"><span className="text-gray-500">Target SDK</span><span className="text-gray-300 font-mono">34 (Android 14)</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex justify-between items-center">
                     <span>Activities (2)</span>
                     <button onClick={() => fireToast("Dumping classes.dex method count...")} className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 hover:text-white transition-colors">Dex Map</button>
                  </h4>
                  <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-1 flex flex-col divide-y divide-gray-800/50">
                     <div className="px-3 py-2 text-sm font-mono text-gray-300 truncate">com.example.MainActivity <span className="text-emerald-500 text-xs ml-2">[LAUNCHER]</span></div>
                     <div className="px-3 py-2 text-sm font-mono text-gray-300 truncate">com.example.SettingsActivity</div>
                  </div>
                </div>
              </div>
            )}
            {activeSubtab === 'integrity' && (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4" title="Cryptographic validation of the APK to ensure it hasn't been tampered with">
                 <ShieldAlert className="w-12 h-12 text-emerald-500" />
                 <h3 className="text-lg font-bold text-gray-200">Signature Valid</h3>
                 <p className="text-sm text-gray-400 max-w-sm">The application is signed with a valid v2/v3 certificate. Play Integrity Attestation passes.</p>
              </div>
            )}
             {activeSubtab === 'network' && (
              <div className="space-y-4">
                 <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex items-center justify-between cursor-help" title="Identified integration with the Google AdMob advertising SDK">
                    <div className="flex flex-col">
                       <span className="font-semibold text-gray-200 text-sm">Google AdMob</span>
                       <span className="text-xs text-gray-500">com.google.android.gms.ads</span>
                    </div>
                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors border border-gray-700">Disable</button>
                 </div>
                 <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 flex items-center justify-between cursor-help" title="No traces of Facebook Audience Network found in classes.dex">
                    <div className="flex flex-col">
                       <span className="font-semibold text-gray-200 text-sm opacity-50">Facebook Audience</span>
                       <span className="text-xs text-gray-500">com.facebook.ads</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded uppercase font-bold tracking-wider">Clean</span>
                 </div>
              </div>
            )}
            
            {activeSubtab === 'modify' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                       <Hammer className="w-5 h-5 text-amber-500" />
                       <h3 className="font-semibold text-sm text-gray-200">Smali Injection</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">Inject custom toast messages or bypass flags directly into dex instructions.</p>
                    <button onClick={() => fireToast("Preparing Smali injector environment...")} className="w-full text-xs py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">Start Injected Mod</button>
                 </div>
                 <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                       <Shield className="w-5 h-5 text-emerald-500" />
                       <h3 className="font-semibold text-sm text-gray-200">Re-Sign APK</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">Sign modified application using internal debug keystore prior to install.</p>
                    <button onClick={() => fireToast("Signing APK. Check logs for success...")} className="w-full text-xs py-2 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600/30 border border-emerald-500/20 rounded transition-colors">Sign & Package</button>
                 </div>
                 <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                       <Network className="w-5 h-5 text-blue-500" />
                       <h3 className="font-semibold text-sm text-gray-200">Sec Config Override</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">Add custom CA to network security config for packet interception.</p>
                    <button onClick={() => fireToast("Network security config overwritten.")} className="w-full text-xs py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">Apply MITM Config</button>
                 </div>
                 <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                       <Save className="w-5 h-5 text-blue-400" />
                       <h3 className="font-semibold text-sm text-gray-200">Auto-Backup Mod</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 h-8">Store orig.apk and patched.apk into staging area.</p>
                    <button onClick={() => fireToast("Archived to staging area.")} className="w-full text-xs py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">Backup Workspace</button>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
