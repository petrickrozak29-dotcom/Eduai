"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function AIGenerateMateriPage() {
  const [subject, setSubject] = useState("Biologi");
  const [phase] = useState("Fase E - Kelas X");
  const [acuan, setAcuan] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-blue-600">AI Generator</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Generate Materi 🤖</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Masukkan materi acuan, AI akan menyusun konten visual, auditori, dan kinestetik secara otomatis.
          </p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Fase</span>
                  <select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option>Fase E - Kelas X</option>
                    <option>Fase F - Kelas XI</option>
                    <option>Fase F - Kelas XII</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option>Biologi</option>
                    <option>Matematika</option>
                    <option>Fisika</option>
                    <option>Kimia</option>
                    <option>Bahasa Indonesia</option>
                    <option>Bahasa Inggris</option>
                    <option>Sejarah</option>
                    <option>Ekonomi</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Materi Acuan</span>
                <textarea
                  value={acuan}
                  onChange={(e) => setAcuan(e.target.value)}
                  placeholder="Tulis atau tempel materi acuan di sini. AI akan mengembangkannya menjadi 3 gaya belajar..."
                  rows={8}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !acuan}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-black text-white shadow-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <>⏳ Memproses...</>
                ) : (
                  <>✨ Generate dengan AI</>
                )}
              </button>
            </div>
          </form>

          {/* Preview Panel */}
          <div className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">{phase}</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">{subject}</h3>
              <p className="text-sm font-bold text-slate-500">Hasil Generate AI</p>

              {!generated ? (
                <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <span className="text-5xl">🤖</span>
                  <p className="mt-3 text-sm font-bold text-slate-500">Masukkan materi acuan dan klik Generate</p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {[
                    { type: "Visual", content: "Infografik tentang sistem pernapasan manusia, diagram alur proses pertukaran gas.", color: "bg-red-50 border-red-200 text-red-700" },
                    { type: "Auditori", content: "Narasi penjelasan: 'Tarik napas... oksigen masuk ke alveolus...'", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                    { type: "Kinestetik", content: "Eksperimen sederhana: hitung napas per menit, bandingkan sebelum dan sesudah lari.", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                  ].map((item) => (
                    <div key={item.type} className={`rounded-lg border p-4 ${item.color}`}>
                      <p className="text-sm font-black">{item.type}</p>
                      <p className="mt-2 text-sm leading-6">{item.content}</p>
                    </div>
                  ))}

                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 rounded-lg bg-emerald-600 py-3 text-sm font-black text-white hover:bg-emerald-700">Simpan sebagai Draft</button>
                    <button className="flex-1 rounded-lg bg-slate-950 py-3 text-sm font-black text-white hover:bg-slate-800">Review & Edit</button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow">
              <p className="text-xs font-black uppercase text-yellow-300">Tips</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Semakin detail materi acuan yang diberikan, semakin baik hasil generate AI. Sertakan contoh, analogi, atau referensi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
