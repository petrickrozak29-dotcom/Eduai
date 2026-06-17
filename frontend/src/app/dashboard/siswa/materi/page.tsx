"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "@/components/layout/DashboardShell";

interface MaterialItem {
  id: string;
  subject: string;
  chaptersCount: number;
  progress: number;
}

const subjects = ["Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Indonesia", "Bahasa Inggris", "Sejarah", "Geografi", "Ekonomi", "Sosiologi"];

export default function MateriPage() {
  const [filterSubject, setFilterSubject] = useState("");
  const [materials] = useState<MaterialItem[]>([]);

  const filteredMaterials = filterSubject
    ? materials.filter((m) => m.subject === filterSubject)
    : materials;

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Materi</h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Belajar sesuai mata pelajaran</p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-lg"
        >
          <label className="text-sm font-black text-slate-950 mb-2 block">Filter Mata Pelajaran</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 font-bold text-slate-950 focus:border-slate-950 focus:outline-none"
          >
            <option value="">Semua Mata Pelajaran</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </motion.div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
          >
            <p className="text-5xl">📚</p>
            <p className="mt-3 text-lg font-black text-slate-950">Belum ada materi</p>
            <p className="mt-1 text-sm font-bold text-slate-500">
              Materi akan muncul setelah AI Assistant menghasilkan materi berdasarkan kelas Anda
            </p>
          </motion.div>
        )}

        {/* Material Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((mat) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-lg transition hover:shadow-xl cursor-pointer"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-950">{mat.subject}</h2>
                <span className="text-2xl">📖</span>
              </div>
              <p className="text-sm font-bold text-slate-500 mb-3">
                {mat.chaptersCount} Bab
              </p>
              <div className="overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${mat.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-bold text-slate-500">{mat.progress}% selesai</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}