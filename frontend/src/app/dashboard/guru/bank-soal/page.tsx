"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockQuizzes } from "@/lib/api";
import { useState } from "react";

export default function BankSoalPage() {
  const [quizzes] = useState(getMockQuizzes());
  const [filterSubject, setFilterSubject] = useState("Semua");

  const subjects = ["Semua", ...new Set(quizzes.map((q) => q.subject))];
  const filtered = filterSubject === "Semua" ? quizzes : quizzes.filter((q) => q.subject === filterSubject);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-violet-600">Bank Soal</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Bank Soal 📚</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">Kumpulan soal untuk pretest, kuis per bab, dan kuis akhir.</p>
            </div>
            <button className="inline-flex h-12 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-black text-white shadow-lg hover:bg-violet-700">
              + Buat Soal Baru
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setFilterSubject(s)}
                className={`rounded-lg px-4 py-2 text-xs font-black transition ${filterSubject === s ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </header>

        <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                  <th className="px-5 py-4">Judul</th><th className="px-5 py-4">Mapel</th><th className="px-5 py-4">Tipe</th>
                  <th className="px-5 py-4">Soal</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-950">{q.title}</td>
                    <td className="px-5 py-4">{q.subject}</td>
                    <td className="px-5 py-4"><span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold">{q.type}</span></td>
                    <td className="px-5 py-4 font-bold">{q.questions}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-lg px-3 py-1 text-xs font-black ${q.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{q.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
