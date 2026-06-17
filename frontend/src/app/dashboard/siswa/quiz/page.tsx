"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "@/components/layout/DashboardShell";

interface QuizItem {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  status: "tersedia" | "selesai";
  score?: number;
}

export default function QuizPage() {
  const [activeTab, setActiveTab] = useState<"tersedia" | "riwayat">("tersedia");
  const [quizzes] = useState<QuizItem[]>([]);

  const availableQuizzes = quizzes.filter((q) => q.status === "tersedia");
  const historyQuizzes = quizzes.filter((q) => q.status === "selesai");

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Quiz</h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Uji pemahaman Anda</p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-2 rounded-xl border-2 border-slate-200 bg-white p-1 shadow-lg"
        >
          <button
            onClick={() => setActiveTab("tersedia")}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-black transition ${
              activeTab === "tersedia" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            Tersedia
          </button>
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-black transition ${
              activeTab === "riwayat" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            Riwayat
          </button>
        </motion.div>

        {/* Empty State */}
        {((activeTab === "tersedia" && availableQuizzes.length === 0) ||
          (activeTab === "riwayat" && historyQuizzes.length === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
          >
            <p className="text-5xl">✍️</p>
            <p className="mt-3 text-lg font-black text-slate-950">
              {activeTab === "tersedia" ? "Belum ada quiz tersedia" : "Belum ada riwayat quiz"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-500">
              {activeTab === "tersedia"
                ? "Quiz akan muncul setelah guru memberikan quiz di kelas"
                : "Quiz yang sudah dikerjakan akan muncul di sini"}
            </p>
          </motion.div>
        )}

        {/* Quiz Lists */}
        <div className="space-y-3">
          {(activeTab === "tersedia" ? availableQuizzes : historyQuizzes).map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-white p-5 shadow-lg"
            >
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-950">{quiz.title}</h3>
                <p className="text-sm font-bold text-slate-500">{quiz.subject}</p>
                <p className="mt-1 text-xs font-bold text-slate-400">{quiz.questionsCount} soal</p>
              </div>
              {quiz.status === "tersedia" ? (
                <button className="rounded-lg border-2 border-emerald-500 bg-emerald-400 px-5 py-2 font-black text-white shadow-lg transition hover:bg-emerald-500">
                  Kerjakan
                </button>
              ) : (
                <div className="text-right">
                  <span className="font-black text-emerald-600">{quiz.score}/100</span>
                  <p className="text-xs font-bold text-slate-400">Selesai</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}