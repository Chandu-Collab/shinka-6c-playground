"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";
import { callAgentApi } from "@/lib/api";

interface WebsiteChatbotUIProps {
  agent: Agent;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function WebsiteChatbotUI({ agent }: WebsiteChatbotUIProps) {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation ID on mount
  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
    // Generate a simple unique ID
    setConversationId(crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15));
    
    // Add initial greeting
    setMessages([
      {
        id: "initial-msg",
        role: "assistant",
        content: "Hi there! How can I help you today?",
        timestamp: new Date().toISOString(),
      }
    ]);
  }, [agent.id]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message to UI
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    try {
      const response = await callAgentApi(agent.id, {
        conversationId,
        message: userMessage,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to connect to chatbot server.");
      }

      const data = response.data;
      
      let botText = "Sorry, I couldn't understand that response.";
      
      // Try to parse n8n webhook response
      if (Array.isArray(data) && data.length > 0) {
        if (data[0].output) botText = String(data[0].output);
        else if (data[0].messages) botText = String(data[0].messages);
        else if (data[0].message) botText = String(data[0].message);
        else if (data[0].json && data[0].json.output) botText = String(data[0].json.output);
        else botText = JSON.stringify(data);
      } else if (data && typeof data === 'object') {
         if (data.output) {
            botText = String(data.output);
         } else if (data.messages) {
            botText = String(data.messages);
         } else if (data.message) {
            botText = String(data.message);
         } else {
            botText = JSON.stringify(data);
         }
      } else if (typeof data === 'string') {
        botText = data;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botText,
        timestamp: new Date().toISOString(),
      }]);
      
      trackEvent({ event: "agent_success", agentId: agent.id });

    } catch (error: any) {
      console.error("Chat error:", error);
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: error.message },
      });
      showToast("Failed to connect to chatbot server. Make sure ngrok is running.", "error");
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl flex flex-col h-[700px]">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border bg-background/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white font-bold shadow-inner overflow-hidden">
            <span className="relative z-10 text-lg">💬</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-hover opacity-50"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              AI Support Assistant
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Online
            </div>
          </div>
        </div>
        <div className="text-xs text-muted font-mono bg-surface px-2 py-1 rounded-md border border-border/50">
          ID: {conversationId.substring(0, 8)}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background/30 to-background/5">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div 
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-accent text-white rounded-tr-sm' 
                  : 'bg-surface border border-border text-foreground/90 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                {msg.content}
              </div>
              <div className={`text-[10px] mt-2 font-medium ${msg.role === 'user' ? 'text-accent-foreground/70' : 'text-muted'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm relative overflow-hidden group">
              {/* Shimmer effect background */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] opacity-50"></div>
              
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "0ms", animationDuration: "1s" }}></span>
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "150ms", animationDuration: "1s" }}></span>
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(var(--accent),0.8)]" style={{ animationDelay: "300ms", animationDuration: "1s" }}></span>
                </div>
                <span className="text-sm font-medium bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent animate-pulse">
                  AI is typing...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/50 p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            className="w-full rounded-full border border-border bg-surface pl-6 pr-14 py-4 text-sm outline-none transition-all focus:border-accent focus:bg-background focus:ring-4 focus:ring-accent/10 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md transition-all hover:bg-accent-hover hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 -ml-0.5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
        <div className="mt-3 text-center text-[10px] text-muted/70">
          Powered by AI. Responses are generated dynamically and may contain errors.
        </div>
      </div>
    </div>
  );
}
