"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockLearningPaths, getMockQuizzes } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LearningPathPage() {
  const [activePath, setActivePath] = useState<string | null>(null);
  const paths = getMockLearningPaths();
  const quizzes = getMockQuizzes();

  const selectedPath = paths.find((p) => p.id === activePath) || paths[0];

  return (
    <DashboardShell>
      <div className="space-y-5">
        {/* Header */}
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-black uppercase text-red-600">Learning Path</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
                Jalur Belajar Personal 📚
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                Pilih mata pelajaran → Pretest → Materi adaptif sesuai gaya belajarmu → Kuis → Learning Index meningkat!
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-red-600 via-yellow-400 to-emerald-500 p-5 text-white shadow-lg">
              <p className="text-sm font-black text-white/80">Total Progress</p>
              <p className="mt-2 text-4xl font-black">76%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-sm bg-white/25">
                <motion.div initial={{ width: 0 }} animate={{ width: "76%" }} className="h-full rounded-sm bg-white" />
              </div>
              <p className="mt-2 text-xs font-semibold text-white/75">4 dari 12 bab selesai</p>
            </div>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
          {/* Subject List */}
          <div className="rounded-lg border border-white/70 bg-white/72 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <p className="text-xs font-black uppercase text-slate-500 mb-3">Mata Pelajaran</p>
            <div className="space-y-2">
              {paths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => setActivePath(path.id)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    selectedPath.id === path.id
                      ? "border-red-200 bg-red-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{path.icon}</span>
                      <div>
                        <p className="text-sm font-black text-slate-950">{path.subject}</p>
                        <p className="text-xs font-bold text-slate-500">{path.bab}</p>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
                      {path.progress}%
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-sm bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${path.progress}%` }}
                      className="h-full rounded-sm bg-gradient-to-r from-red-500 to-emerald-500"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Path Detail */}
          <div className="space-y-5">
            {/* Stages */}
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-emerald-600">Learning Stages</p>
                  <h3 className="text-2xl font-black text-slate-950">
                    {selectedPath.subject} — {selectedPath.bab}
                  </h3>
                </div>
                <span className={`rounded-lg px-4 py-2 text-sm font-black ${
                  selectedPath.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {selectedPath.status === "aktif" ? "🟢 Aktif" : "✅ Selesai"}
                </span>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-slate-200" />

                <div className="space-y-6">
                  {selectedPath.stages.map((stage, index) => (
                    <div key={stage.name} className="relative flex gap-5">
                      <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-black ${
                        stage.done
                          ? "bg-emerald-100 text-emerald-600 ring-4 ring-emerald-200"
                          : index === selectedPath.stages.findIndex((s) => !s.done)
                          ? "bg-blue-100 text-blue-600 ring-4 ring-blue-200 animate-pulse"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {stage.done ? "✓" : index === selectedPath.stages.findIndex((s) => !s.done) ? "→" : "○"}
                      </div>
                      <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-black text-slate-950">{stage.name}</p>
                            <p className="text-xs font-bold text-slate-500">
                              {stage.done ? "Selesai" : index === selectedPath.stages.findIndex((s) => !s.done) ? "Siap dikerjakan" : "Belum tersedia"}
                            </p>
                          </div>
                          {stage.score !== null && (
                            <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700">
                              {stage.score}/100
                            </span>
                          )}
                        </div>
                        {index === selectedPath.stages.findIndex((s) => !s.done) && (
                          <Link
                            href="/dashboard/siswa/materi"
                            className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-black text-white shadow-lg hover:bg-blue-700"
                          >
                            Mulai Belajar
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Quizzes */}
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="mb-4 text-sm font-black text-slate-950">Kuis Terkait</p>
              <div className="grid gap-3 md:grid-cols-2">
                {quizzes.filter(q => q.subject === selectedPath.subject).map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div>
                      <p className="text-sm font-black text-slate-950">{quiz.title}</p>
                      <p className="text-xs font-bold text-slate-500">{quiz.questions} soal • {quiz.type}</p>
                    </div>
                    <span className={`rounded-lg px-3 py-1 text-xs font-black ${
                      quiz.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {quiz.status === "published" ? "Tersedia" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
