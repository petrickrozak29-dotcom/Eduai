"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockQuizzes } from "@/lib/api";
import { useState } from "react";

export default function QuizSiswaPage() {
  const quizzes = getMockQuizzes();
  const [tab, setTab] = useState<"tersedia" | "riwayat">("tersedia");

  const results = [
    { quiz: "Pretest Biologi", score: 70, date: "2 hari lalu", status: "lulus" },
    { quiz: "Kuis Bab 2 - Pernapasan", score: 85, date: "5 hari lalu", status: "lulus" },
    { quiz: "Pretest Matematika", score: 65, date: "1 minggu lalu", status: "lulus" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-yellow-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Quiz & Latihan 📝</h2>
          <p className="mt-2 text-base text-slate-600">Uji pemahamanmu dengan kuis adaptif.</p>
          <div className="mt-4 flex gap-2">
            {(["tersedia","riwayat"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-black transition ${tab === t ? "bg-yellow-500 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200"}`}>
                {t === "tersedia" ? "Tersedia" : "Riwayat"}
              </button>
            ))}
          </div>
        </header>

        {tab === "tersedia" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((q) => (
              <div key={q.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-black text-slate-950">{q.title}</p>
                    <p className="text-sm font-bold text-slate-500">{q.subject}</p>
                  </div>
                  <span className={`rounded-lg px-3 py-1 text-xs font-black ${q.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{q.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span>{q.questions} soal</span>
                  <span className="rounded bg-slate-100 px-2 py-1">{q.type}</span>
                </div>
                <button className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-xs font-black text-white shadow-lg hover:bg-yellow-600">Kerjakan</button>
              </div>
            ))}
          </div>
        )}

        {tab === "riwayat" && (
          <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                    <th className="px-5 py-4">Quiz</th><th className="px-5 py-4">Skor</th><th className="px-5 py-4">Tanggal</th><th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-5 py-4 font-bold text-slate-950">{r.quiz}</td>
                      <td className="px-5 py-4 font-bold text-emerald-600">{r.score}/100</td>
                      <td className="px-5 py-4 text-slate-600">{r.date}</td>
                      <td className="px-5 py-4"><span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
