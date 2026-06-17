"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const columns = ["Nama", "NIP", "Email", "Mapel", "Status"];

export default function ManajemenGuruPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Guru</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Kelola seluruh data guru di platform EduPath AI
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-black text-slate-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-slate-300">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                      </svg>
                      <p className="font-bold text-slate-400">Belum ada data guru</p>
                      <p className="text-xs font-semibold text-slate-400">
                        Data akan muncul real-time dari dashboard guru
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}