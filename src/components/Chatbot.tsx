import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Jsi asistent Daniela Devátého, experta na stavbu AI MVP a automatizací. Tvým úkolem je pomoci uživatelům projít jejich představu o projektu a odhadnout cenu.
Daniel se specializuje na:
- Rychlé MVP (dodání do 14 dnů).
- AI integrace a automatizace.
- Datové systémy.

Ceny se obvykle pohybují:
- Malá automatizace/skript: 10 000 - 30 000 Kč.
- Standardní MVP: 50 000 - 150 000 Kč.
- Komplexní AI systém: 200 000 Kč+.

Tvůj postup:
1. Přivítej uživatele a zeptej se na jejich vizi nebo problém, který chtějí řešit.
2. Zjisti rozsah projektu (co přesně to má dělat, pro koho to je).
3. Na základě informací nabídni hrubý odhad ceny (vždy zdůrazni, že je to jen odhad a Daniel to musí potvrdit).
4. Požádej o kontakt (email), aby se Daniel mohl ozvat s konkrétní nabídkou.

Důležité:
- Buď stručný, profesionální a věcný.
- NEPOUŽÍVEJ ŽÁDNÉ FORMÁTOVÁNÍ (hvězdičky, tučné písmo, nadpisy).
- Místo zvýrazňování používej odřádkování (Enter).
- Nic jiného nedělej. Pokud se uživatel ptá na nesouvisející věci, zdvořile ho vrať k tématu projektu.
- Mluv česky.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Ahoj! Jsem Danielův AI asistent. Máš nějaký nápad na projekt nebo automatizaci, o které bychom si mohli promluvit?' }
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

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "Omlouvám se, ale něco se pokazilo. Zkus to prosím znovu.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Omlouvám se, momentálně mám technické potíže. Zkus to prosím za chvíli." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-primary text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        id="chatbot-toggle"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-[101] w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] glass-panel border border-primary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/10 flex justify-between items-center bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">MVP Architect AI</h3>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-on-surface-variant hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-primary text-on-primary-container rounded-tr-none' 
                      : 'bg-surface-container-high text-on-surface rounded-tl-none border border-outline-variant'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-high p-3 rounded-2xl rounded-tl-none border border-outline-variant">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/10 bg-surface-container-low">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Napiš zprávu..."
                  className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 rounded-xl py-3 pl-4 pr-12 text-sm text-white transition-all"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary-container disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
