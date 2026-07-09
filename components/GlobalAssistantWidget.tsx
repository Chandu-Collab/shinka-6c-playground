"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function GlobalAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation ID
  useEffect(() => {
    setConversationId(crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15));
    
    // Initial greeting
    setMessages([
      {
        id: "initial-msg",
        role: "assistant",
        content: "Hi! I'm your Shinka-6c Assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    }]);
    setIsLoading(true);

    try {
      // Use the production URL provided by the user
      const webhookUrl = process.env.NEXT_PUBLIC_SHINKA_ASSISTANT_WEBHOOK_URL || "";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let botText = "Sorry, I couldn't understand that response.";
      
      // Try to parse n8n webhook response based on previous logic
      if (Array.isArray(data) && data.length > 0) {
        if (data[0].output) botText = data[0].output;
        else if (data[0].messages) botText = data[0].messages;
        else if (data[0].message) botText = data[0].message;
        else if (data[0].json && data[0].json.output) botText = data[0].json.output;
        else botText = JSON.stringify(data);
      } else if (data && typeof data === 'object') {
         if (data.output) botText = data.output;
         else if (data.messages) botText = data.messages;
         else if (data.message) botText = data.message;
         else botText = JSON.stringify(data);
      } else if (typeof data === 'string') {
        botText = data;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botText,
        timestamp: new Date().toISOString(),
      }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please ensure the assistant server is online.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] overflow-hidden rounded-3xl border border-border bg-surface-elevated/95 shadow-2xl backdrop-blur-xl flex flex-col animate-fade-in origin-bottom-right transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-background/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full shadow-[0_0_15px_rgba(var(--accent),0.5)] overflow-hidden bg-white/5">
                <img src="/logo.png" alt="Shinka-6c Logo" className="relative z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-hover opacity-20"></div>
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-foreground">
                  Shinka-6c Assistant
                </h2>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-500 uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Online
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-muted hover:bg-surface hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-background/30 to-background/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-accent to-accent-hover text-white rounded-br-sm shadow-[0_4px_14px_rgba(var(--accent),0.3)]' 
                      : 'bg-surface-elevated border border-border text-foreground/90 rounded-bl-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-[14px]">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] opacity-50"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "0ms", animationDuration: "1s" }}></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "150ms", animationDuration: "1s" }}></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "300ms", animationDuration: "1s" }}></span>
                    </div>
                    <span className="text-[11px] font-medium bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent animate-pulse">
                      thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background/80 p-4">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder="Ask me anything..."
                className="w-full rounded-full border border-border bg-surface pl-5 pr-12 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-background focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-md transition-all hover:bg-accent-hover hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -ml-0.5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-white shadow-[0_8px_30px_rgba(var(--accent),0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_40px_rgba(var(--accent),0.7)] ${isOpen ? 'rotate-90 scale-90 shadow-none' : ''}`}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <img src="/logo.png" alt="Chat" className="relative z-10 h-9 w-9 object-cover rounded-full" />
          )}
        </button>
        
        {/* Notification Badge */}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-background"></span>
          </span>
        )}
      </div>
    </div>
  );
}
