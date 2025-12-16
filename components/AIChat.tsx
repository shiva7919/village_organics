import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Hi! I\'m Verdie 🌿. Ask me about organic food benefits or healthy recipes!' }
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
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg.text);
    
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: response };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100'}`}
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[350px] bg-white rounded-2xl shadow-2xl border border-green-100 flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-green-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Verdie AI</h3>
                <p className="text-xs text-green-100">Your Organic Expert</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-600 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto bg-stone-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-stone-800 text-white rounded-br-none'
                      : 'bg-white text-stone-700 border border-stone-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-100">
            <div className="flex items-center bg-stone-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about organic food..."
                className="flex-grow bg-transparent outline-none text-sm text-stone-700 placeholder-stone-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="ml-2 text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
