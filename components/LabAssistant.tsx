
import React, { useState, useRef, useEffect } from 'react';
import { labAssistant } from '../services/geminiService';

const LabAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: 'Selamat datang di Lab Console. Ada yang bisa saya bantu tentang profil Arjuna?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await labAssistant.chatWithArjuna(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', text: response || 'Error processing request.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] glass rounded-2xl shadow-2xl flex flex-col border-cyan-500/30 overflow-hidden transition-all duration-300 transform animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-cyan-500 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center">
                <i className="fa-solid fa-microchip text-cyan-400 text-sm"></i>
              </div>
              <div>
                <h4 className="text-slate-950 font-bold text-sm">Lab AI Assistant</h4>
                <p className="text-slate-900 text-[10px] mono font-bold">Status: Synchronized</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-950 hover:opacity-70">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'glass border-slate-700 text-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass p-3 rounded-xl flex gap-1 items-center">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya tentang Arjuna..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 text-slate-200"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-cyan-500 text-slate-950 rounded-lg flex items-center justify-center hover:bg-cyan-400"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-cyan-500 text-slate-950 rounded-full shadow-lg shadow-cyan-500/20 flex items-center justify-center hover:scale-110 transition-transform relative"
      >
        <i className={`fa-solid ${isOpen ? 'fa-terminal' : 'fa-robot'} text-2xl`}></i>
        {!isOpen && <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-600"></span>
        </span>}
      </button>
    </div>
  );
};

export default LabAssistant;
