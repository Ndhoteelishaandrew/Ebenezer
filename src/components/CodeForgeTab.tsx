import React, { useState } from 'react';
import { Play, Terminal, Save, Settings, CloudUpload, FolderTree, FileJson, FileCode, Check, Smartphone, Github } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CodeForgeTab() {
  const [activeFile, setActiveFile] = useState('main.dart');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const files = [
    { name: 'main.dart', type: 'dart', icon: FileCode },
    { name: 'server.py', type: 'python', icon: FileCode },
    { name: 'buildozer.spec', type: 'config', icon: Settings },
    { name: 'pubspec.yaml', type: 'text', icon: FileJson },
  ];

  const codeSnippets: Record<string, string> = {
    'main.dart': `import 'package:flutter/material.dart';\nimport 'package:bezalel_studio/utils/error_handler.dart';\n\nvoid main() {\n  runApp(const BezalelStudioApp());\n}\n\nclass BezalelStudioApp extends StatelessWidget {\n  const BezalelStudioApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Bezalel Studio',\n      theme: ThemeData.dark().copyWith(\n        primaryColor: Colors.amber,\n        scaffoldBackgroundColor: const Color(0xFF05060B),\n      ),\n      home: const Scaffold(\n        body: SafeArea(\n          child: Center(\n            child: Text('The Craftsman\\'s Workshop', style: TextStyle(fontFamily: 'serif', color: Colors.amber)),\n          ),\n        ),\n      ),\n    );\n  }\n}`,
    'server.py': `from fastapi import FastAPI, HTTPException\nimport os\n\napp = FastAPI(title="Bezalel Cloud Forge")\n\n@app.get("/health")\ndef health_check():\n    return {"status": "healthy", "modules_active": 64}\n\n@app.post("/build/apk")\ndef trigger_buildozer(project_id: str):\n    try:\n        # Authenticate with credentials vault\n        # Dispatch to Github Actions or local VM\n        return {"job_id": "bld_8943x", "status": "queued"}\n    except Exception as e:\n        raise HTTPException(status_code=500, detail=str(e))`,
    'buildozer.spec': `[app]\ntitle = BezalelStudio\npackage.name = bezalelstudio\npackage.domain = org.ndhote\n\nsource.dir = .\nsource.include_exts = py,png,jpg,kv,atlas\nversion = 1.0.0\n\nrequirements = python3,kivy==2.3.0,kivymd==1.1.1,androguard,gitpython,requests,matplotlib\n\norientation = portrait\nfullscreen = 0\nandroid.permissions = INTERNET, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE\nandroid.api = 34\nandroid.minapi = 21`,
    'pubspec.yaml': `name: bezalel_studio\ndescription: "The Master Builder's Forge"\npublish_to: 'none'\n\nversion: 4.0.0+1\n\nenvironment:\n  sdk: '>=3.2.3 <4.0.0'\n\ndependencies:\n  flutter:\n    sdk: flutter\n  provider: ^6.1.1\n  flutter_blue_plus: ^1.16.5\n  path_provider: ^2.1.2\n  camera: ^0.10.5+9\n  sqflite: ^2.3.0\n\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n  flutter_lints: ^3.0.1`
  };

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 relative">
      {/* Toast Notification Constraint Satisfaction */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-2 rounded-lg shadow-lg shadow-emerald-900/20 z-50 flex items-center space-x-2 animate-in slide-in-from-top-4">
           <Check className="w-4 h-4 text-emerald-400" />
           <span className="text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Sidebar - File Explorer */}
      <div className="w-full lg:w-64 bg-[#111827] border border-gray-800 rounded-2xl flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
           <div className="flex items-center space-x-2 text-gray-300 font-semibold text-sm">
             <FolderTree className="w-4 h-4" />
             <span>Project Files</span>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {files.map(f => (
            <button
              key={f.name}
              onClick={() => setActiveFile(f.name)}
              title={`Open ${f.name} in the editor`}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                activeFile === f.name ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent"
              )}
            >
              <f.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{f.name}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
           <button onClick={() => handleAction("Initializing Git repository...")} className="w-full py-1.5 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors" title="Initialize Git tracking for this project">
             <Github className="w-3.5 h-3.5" /><span>Git Init</span>
           </button>
           <button onClick={() => handleAction("Generating Dockerfile...")} className="w-full py-1.5 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors" title="Create a multi-stage Dockerfile for container deployment">
             <Settings className="w-3.5 h-3.5" /><span>Add Dockerfile</span>
           </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden min-h-[400px]">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between p-3 border-b border-gray-800 bg-gray-900/50 gap-2">
           <div className="flex space-x-2">
             <button onClick={() => handleAction("File auto-saved locally.")} title="Save current file to internal staging" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors">
               <Save className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Save</span>
             </button>
             <button onClick={() => handleAction("Compiling Flutter UI (Hot Reload)...")} title="Preview Flutter UI changes instantly" className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors">
               <Smartphone className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Hot Reload</span>
             </button>
             <button onClick={() => handleAction("Triggering Buildozer VM...")} title="Compile the current project into an Android APK / AAB using Buildozer" className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors">
               <Play className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Build APK</span>
             </button>
           </div>
           
           <div className="flex space-x-2">
             <button onClick={() => handleAction("Deploying container to Heroku...")} title="Push the code repository to Heroku/Vercel/GitHub Pages based on project type" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-amber-400 rounded-lg text-xs font-medium transition-colors flex items-center space-x-2">
                <CloudUpload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Deploy Cloud</span>
             </button>
           </div>
        </div>

        {/* Text Area (Simulated Editor) */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar font-mono text-sm leading-relaxed text-gray-300 bg-[#0F111A]">
          <pre className="whitespace-pre-wrap outline-none" spellCheck={false}>
             {codeSnippets[activeFile]}
          </pre>
        </div>

        {/* Integrated Terminal */}
        <div className="h-48 border-t border-gray-800 bg-[#050505] flex flex-col shrink-0">
          <div className="px-3 py-1.5 border-b border-gray-800 flex items-center space-x-2 text-gray-500 text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-bold">Terminal / ZSH</span>
          </div>
          <div className="flex-1 p-3 font-mono text-[11px] md:text-xs text-gray-400 overflow-y-auto w-full space-y-1">
            <div><span className="text-emerald-500">ndhote@forge:~/bezalel_studio$</span> flutter doctor --android-licenses</div>
            <div>[✓] Android license status unknown.</div>
            <div><span className="text-emerald-500">ndhote@forge:~/bezalel_studio$</span> buildozer android debug</div>
            <div><span className="text-gray-500"># Check logs for android compilation progress...</span></div>
            <div><span className="text-amber-500 animate-pulse">_</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
