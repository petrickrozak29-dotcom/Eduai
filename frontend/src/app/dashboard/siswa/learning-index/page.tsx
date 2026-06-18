"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiClassEnrollment } from "@/lib/api";

export default function LearningIndexSiswaPage() {
  const [enrollments, setEnrollments] = useState<ApiClassEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadIndex = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const result = await api.get<ApiClassEnrollment[]>("/classes/student-classes");
    if (result.success && Array.isArray(result.data)) {
      setEnrollments(result.data);
      setMessage("");
    } else if (!silent) {
      setMessage(result.message || "Gagal memuat Learning Index");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadIndex();
    const timer = window.setInterval(() => loadIndex(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadIndex]);

  const average = useMemo(() => {
    if (enrollments.length === 0) return 0;
    const total = enrollments.reduce((sum, item) => sum + Number(item.learningIndex || item.pretestScore || 0), 0);
    return Math.round(total / enrollments.length);
  }, [enrollments]);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-blue-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Learning Index</h2>
          <p className="mt-2 text-base text-slate-600">Data diambil dari kelas, pretest, materi, dan tersinkron ke guru serta developer.</p>
        </header>

        {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

        <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 via-emerald-400 to-yellow-300 p-6 text-white shadow-lg">
            <p className="text-sm font-black text-white/80">Rata-rata LI</p>
            <p className="mt-2 text-5xl font-black">{average}</p>
            <p className="text-sm font-bold text-white/80">Berdasarkan kelas aktif</p>
            <div className="mt-4 h-3 overflow-hidden rounded-sm bg-white/25">
              <div className="h-full rounded-sm bg-white" style={{ width: `${Math.min(100, average)}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-white/20 p-3"><p className="text-lg font-black">{enrollments.length}</p><p className="text-xs font-bold">Kelas</p></div>
              <div className="rounded-lg bg-white/20 p-3"><p className="text-lg font-black">{enrollments.reduce((sum, item) => sum + (item.kelas.materials?.length || 0), 0)}</p><p className="text-xs font-bold">Materi</p></div>
            </div>
          </div>

          <div className="space-y-3">
            {enrollments.length > 0 ? enrollments.map((item) => {
              const score = Math.round(Number(item.learningIndex || item.pretestScore || 0));
              return (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border border-white/70 bg-white p-4 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-sm font-black text-blue-700">{item.kelas.subject?.name?.slice(0, 2).toUpperCase() || "LI"}</div>
                  <div className="flex-1">
                    <p className="font-black text-slate-950">{item.kelas.subject?.name || item.kelas.name}</p>
                    <p className="text-xs font-bold text-slate-500">{item.kelas.name} - {item.kelas.materials?.length || 0} materi</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-sm bg-slate-100">
                      <div className="h-full rounded-sm bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${Math.min(100, score)}%` }} />
                    </div>
                  </div>
                  <span className="text-2xl font-black text-slate-950">{score}%</span>
                </div>
              );
            }) : (
              <div className="rounded-lg border border-white/70 bg-white p-8 text-center font-bold text-slate-400">
                {loading ? "Memuat Learning Index" : "Belum ada data Learning Index dari kelas"}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
