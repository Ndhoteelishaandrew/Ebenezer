import React, { useState } from 'react';
import { Send, Bot, User, Code, FileText, Bug, CheckCircle } from 'lucide-react';

export default function AiMentorTab() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'I am your AI Architect, filled with wisdom for software craftsmanship. Describe a feature to generate Dart code, paste a stack trace to debug, or ask for an explanation of a complex concept.' }
  ]);
  const [input, setInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'I have analyzed your request. Here is a Flutter pattern that matches your needs:\n\n```dart\n// Suggested implementation\nclass SafeAreaWrapper extends StatelessWidget {\n  final Widget child;\n  const SafeAreaWrapper({super.key, required this.child});\n\n  @override\n  Widget build(BuildContext context) {\n    return SafeArea(\n      child: SingleChildScrollView(\n        child: child,\n      )\n    );\n  }\n}\n```\n\nEnsure you wrap your top-level components with this to prevent rendering overflows.' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden relative">
       {/* Toast */}
       {showToast && (
        <div className="absolute top-16 right-4 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-2 rounded-lg shadow-lg shadow-emerald-900/20 z-50 flex items-center space-x-2 animate-in slide-in-from-top-4">
           <CheckCircle className="w-4 h-4 text-emerald-400" />
           <span className="text-sm">{toastMsg}</span>
        </div>
      )}

       {/* Actions Bar */}
       <div className="flex px-4 py-3 border-b border-gray-800 bg-gray-900/50 space-x-2 overflow-x-auto no-scrollbar">
          <button onClick={() => handleAction("AI Prompt seeded: 'Generate a new feature module'")} title="Ask the AI to generate a Dart/Flutter component based on your requirements" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 whitespace-nowrap transition-colors">
            <Code className="w-3.5 h-3.5" /><span>Generate Code</span>
          </button>
          <button onClick={() => handleAction("AI Prompt seeded: 'Explain this logic block'")} title="Let the AI explain the selected or pasted code line by line" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 whitespace-nowrap transition-colors">
            <FileText className="w-3.5 h-3.5" /><span>Explain Logic</span>
          </button>
          <button onClick={() => handleAction("AI Prompt seeded: 'Fix this stack trace'")} title="Paste an error log to get root cause analysis and a fix" className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 whitespace-nowrap transition-colors">
            <Bug className="w-3.5 h-3.5" /><span>Fix Traceback</span>
          </button>
       </div>

       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] md:max-w-[70%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                   <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'ai' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-400'}`}>
                      {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                   </div>
                   <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-100 border border-blue-500/20' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
                      <pre className="font-sans whitespace-pre-wrap">{msg.content}</pre>
                   </div>
                </div>
             </div>
          ))}
       </div>

       {/* Input Area */}
       <div className="p-4 bg-gray-900 border-t border-gray-800 flex items-end space-x-2 shrink-0">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            title="Type your question or paste code/errors here"
            className="flex-1 bg-[#05060B] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-amber-500/50 resize-none max-h-32 min-h-[50px] transition-colors overflow-y-auto"
            placeholder="Describe a feature, ask a question, or paste an error..."
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            title="Send message to AI Architect"
            className="w-12 h-12 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-lg shadow-amber-900/20"
          >
             <Send className="w-5 h-5 text-white ml-0.5" />
          </button>
       </div>
    </div>
  );
}
