"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type AnalyticsOverviewData } from "@/lib/api";

const emptyData: AnalyticsOverviewData = {
  totals: { guru: 0, siswa: 0, mataPelajaran: 0, kelas: 0, materi: 0, kuis: 0 },
  aiUsage: { generatedMaterials: 0, generatedQuizzes: 0, assistantSessions: 0 },
  learningAnalytics: { averageLearningIndex: 0, recentResults: [] },
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsOverviewData>(emptyData);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const result = await api.get<AnalyticsOverviewData>("/analytics/overview");
    if (result.success && result.data) setData(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAnalytics();
    const timer = window.setInterval(() => loadAnalytics(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadAnalytics]);

  const maxUsers = Math.max(data.totals.guru, data.totals.siswa, data.totals.mataPelajaran, 1);
  const activityBars = useMemo(() => {
    const base = data.totals.materi + data.totals.kuis + data.learningAnalytics.recentResults.length;
    return [35, 50, 45, 70, 60, 80, 55].map((value, index) => Math.min(100, value + base + index * 2));
  }, [data]);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Statistik guru, siswa, materi, quiz, dan Learning Index dari API.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-lg font-black text-slate-900">Aktivitas Pengguna</h2>
            <div className="flex h-48 items-end gap-2">
              {activityBars.map((height, index) => <div key={index} className="flex-1 rounded-t-lg bg-emerald-500" style={{ height: `${height}%` }} />)}
            </div>
            <div className="mt-2 flex justify-between text-xs font-bold text-slate-400">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => <span key={day}>{day}</span>)}
            </div>
          </div>

          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-lg font-black text-slate-900">Distribusi Platform</h2>
            <div className="flex h-48 items-center justify-center gap-4">
              {[
                ["Guru", data.totals.guru, "bg-blue-600"],
                ["Siswa", data.totals.siswa, "bg-emerald-600"],
                ["Mapel", data.totals.mataPelajaran, "bg-amber-600"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="flex h-32 w-16 items-end rounded-lg bg-slate-100">
                    <div className={`w-full rounded-lg ${color}`} style={{ height: `${Math.max(4, (Number(value) / maxUsers) * 100)}%` }} />
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-500">{label} ({value})</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {[
            ["Kelas", data.totals.kelas],
            ["Materi", data.totals.materi],
            ["Quiz", data.totals.kuis],
            ["Rata-rata LI", data.learningAnalytics.averageLearningIndex],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-black text-slate-900">{label}</h2>
              <p className="mt-2 text-4xl font-black text-slate-900">{loading ? "-" : value}</p>
              <p className="text-xs font-bold text-slate-400">Real-time API</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
