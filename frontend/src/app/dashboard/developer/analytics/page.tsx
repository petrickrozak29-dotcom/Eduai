"use client";

import DashboardShell from "@/components/layout/DashboardShell";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Statistik dan analitik sistem secara keseluruhan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-lg font-black text-slate-900">Aktivitas Pengguna</h2>
            <div className="flex h-48 items-end gap-2">
              <div className="flex-1 rounded-t-lg bg-emerald-400" style={{ height: "60%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-500" style={{ height: "40%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-400" style={{ height: "75%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-500" style={{ height: "50%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-400" style={{ height: "85%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-500" style={{ height: "65%" }} />
              <div className="flex-1 rounded-t-lg bg-emerald-400" style={{ height: "45%" }} />
            </div>
            <div className="mt-2 flex justify-between text-xs font-bold text-slate-400">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>
          </div>

          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-lg font-black text-slate-900">Distribusi Pengguna</h2>
            <div className="flex h-48 items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-32 w-16 items-end rounded-lg bg-blue-400">
                  <div className="w-full rounded-lg bg-blue-600" style={{ height: "0%" }} />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">Guru (0)</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-32 w-16 items-end rounded-lg bg-emerald-400">
                  <div className="w-full rounded-lg bg-emerald-600" style={{ height: "0%" }} />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">Siswa (0)</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-32 w-16 items-end rounded-lg bg-amber-400">
                  <div className="w-full rounded-lg bg-amber-600" style={{ height: "0%" }} />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">Developer (0)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Total Login Hari Ini</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">0</p>
            <p className="text-xs font-bold text-slate-400">H+0 dari kemarin</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Materi Dibuat</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">0</p>
            <p className="text-xs font-bold text-slate-400">Minggu ini</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Quiz Dikerjakan</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">0</p>
            <p className="text-xs font-bold text-slate-400">Minggu ini</p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-black bg-amber-50 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-center text-base font-bold text-slate-600">
            Data akan muncul real-time setelah sistem terhubung ke API
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}