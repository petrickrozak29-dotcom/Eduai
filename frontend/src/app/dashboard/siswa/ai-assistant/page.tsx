"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Halo! Aku AI Assistant EduPath. Tanya apa aja tentang pelajaranmu! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: "ai",
        text: `EduPath AI: ${input}. Konsep intinya adalah... Mulai dari definisi, contoh sederhana, lalu latihan soal biar paham. Mau aku bikin flashcard juga?`,
      }]);
      setLoading(false);
    }, 1000);
    setInput("");
  };

  const [showFlashcard, setShowFlashcard] = useState(false);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-emerald-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">AI Assistant 🤖</h2>
          <p className="mt-2 text-base text-slate-600">Tanya apa aja, AI bantu jelasin.</p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
            <div className="h-[400px] overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${m.role === "user" ? "bg-slate-950 text-white" : "bg-white border border-slate-200"}`}>
                    <p className="text-sm font-semibold leading-6">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && <div className="flex justify-start"><div className="rounded-lg bg-white border border-slate-200 p-4"><p className="text-sm font-semibold text-slate-500">Mengetik...</p></div></div>}
            </div>
            <div className="mt-4 flex gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tanya tentang pelajaran..." className="h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              <button onClick={handleSend} disabled={loading}
                className="h-12 rounded-lg bg-emerald-600 px-5 text-sm font-black text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50">Kirim</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <p className="text-sm font-black text-slate-950">Mode Belajar</p>
              <div className="mt-3 space-y-2">
                <button onClick={() => setShowFlashcard(false)} className="w-full rounded-lg bg-slate-100 px-4 py-3 text-left text-sm font-black text-slate-700 hover:bg-slate-200">💬 Chat</button>
                <button onClick={() => setShowFlashcard(true)} className="w-full rounded-lg bg-slate-100 px-4 py-3 text-left text-sm font-black text-slate-700 hover:bg-slate-200">📇 Flashcard</button>
              </div>
            </div>
            {showFlashcard && (
              <div className="rounded-lg border border-white/70 bg-white p-5 shadow">
                <p className="text-sm font-black text-slate-950">Flashcard</p>
                <div className="mt-3 rounded-lg bg-yellow-50 p-4 text-center">
                  <p className="font-black text-slate-950">Konsep Inti</p>
                  <p className="mt-2 text-sm text-slate-600">Ide utama pembelajaran</p>
                </div>
                <button className="mt-3 w-full rounded-lg bg-emerald-600 py-2 text-xs font-black text-white">Balik Kartu</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
