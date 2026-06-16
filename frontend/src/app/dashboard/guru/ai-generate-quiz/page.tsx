"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function AIGenerateQuizPage() {
  const [subject, setSubject] = useState("Biologi");
  const [chapter, setChapter] = useState("Bab 2 - Sistem Pernapasan");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("sedang");
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
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-emerald-600">AI Generator</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Generate Quiz 📝</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            AI akan menyusun soal pilihan ganda berdasarkan materi dan bab yang dipilih.
          </p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                    <option>Biologi</option><option>Matematika</option><option>Fisika</option>
                    <option>Kimia</option><option>Bahasa Indonesia</option><option>Bahasa Inggris</option>
                    <option>Sejarah</option><option>Ekonomi</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Bab</span>
                  <select value={chapter} onChange={(e) => setChapter(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                    <option>Bab 1 - Pendahuluan</option><option>Bab 2 - Sistem Pernapasan</option>
                    <option>Bab 3 - Fungsi Kuadrat</option><option>Bab 4 - Gerak Lurus</option>
                    <option>Bab 5 - Struktur Atom</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Jumlah Soal</span>
                  <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} min={5} max={50} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Tingkat Kesulitan</span>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                    <option value="mudah">Mudah</option><option value="sedang">Sedang</option><option value="sulit">Sulit</option>
                  </select>
                </label>
              </div>

              <button type="submit" disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-black text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50">
                {loading ? "⏳ Menyusun soal..." : "✨ Generate Quiz"}
              </button>
            </div>
          </form>

          <div className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <h3 className="text-lg font-black text-slate-950">Hasil Generate</h3>
              {!generated ? (
                <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <span className="text-5xl">📝</span>
                  <p className="mt-3 text-sm font-bold text-slate-500">Isi form dan klik Generate</p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {[
                    { q: "Apa fungsi utama alveolus dalam sistem pernapasan?", a: "Tempat pertukaran O₂ dan CO₂" },
                    { q: "Proses inspirasi terjadi ketika...", a: "Diafragma berkontraksi dan rongga dada mengembang" },
                    { q: "Gas yang dikeluarkan saat ekspirasi adalah...", a: "Karbon dioksida (CO₂)" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-sm font-black text-slate-950">{i + 1}. {item.q}</p>
                      <p className="mt-1 text-xs font-bold text-emerald-600">✓ {item.a}</p>
                    </div>
                  ))}
                  <p className="text-center text-xs font-bold text-slate-500">...dan {count - 3} soal lainnya</p>
                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 rounded-lg bg-emerald-600 py-3 text-sm font-black text-white hover:bg-emerald-700">Simpan sebagai Draft</button>
                    <button className="flex-1 rounded-lg bg-slate-950 py-3 text-sm font-black text-white hover:bg-slate-800">Review & Edit</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
