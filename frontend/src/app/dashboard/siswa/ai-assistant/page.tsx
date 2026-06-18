"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardShell from "@/components/layout/DashboardShell";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Siap. Aku bantu susun penjelasan singkatnya: mulai dari konsep utama, contoh sederhana, lalu latihan kecil untuk menguji pemahaman.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const quickActions = [
    { label: "Rangkum", icon: "📝" },
    { label: "Flashcard", icon: "🃏" },
    { label: "Latihan Soal", icon: "✏️" },
  ];

  const handleFileUpload = () => {
    alert("Pilih file materi dari perangkat kamu.");
  };

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-12rem)] flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950">AI Assistant</h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Tanya apapun tentang pelajaran</p>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col rounded-xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-8">
                <p className="text-6xl">🤖</p>
                <h2 className="mt-4 text-xl font-black text-slate-950">Halo! Ada yang bisa dibantu?</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  Tanyakan tentang materi pelajaran, minta rangkuman, atau latihan soal
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl border-2 px-4 py-3 ${
                      msg.role === "user"
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-950"
                    }`}
                  >
                    <p className="text-sm font-bold">{msg.content}</p>
                    <p className="mt-1 text-xs font-bold opacity-60">
                      {msg.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 border-t-2 border-slate-100 px-4 py-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-slate-50"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t-2 border-slate-100 p-4">
            <form onSubmit={handleSend} className="flex gap-2">
              <button
                type="button"
                onClick={handleFileUpload}
                className="flex items-center gap-1 rounded-lg border-2 border-slate-200 bg-white px-3 py-3 font-bold text-slate-500 transition hover:bg-slate-50"
                title="Upload file"
              >
                <span className="text-lg">📎</span>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 rounded-lg border-2 border-slate-200 px-4 py-3 font-bold text-slate-950 placeholder:text-slate-400 focus:border-slate-950 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-lg border-2 border-slate-950 bg-slate-950 px-6 py-3 font-black text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
