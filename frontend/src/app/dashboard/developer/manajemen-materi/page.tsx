"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const columns = ["Judul", "Mapel", "Guru", "Status"];

export default function ManajemenMateriPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Materi</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Seluruh materi pembelajaran dari semua guru
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Cari materi..."
            className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none focus:ring-2 focus:ring-black sm:max-w-xs"
          />
          <select className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none sm:max-w-[160px]">
            <option>Semua Mapel</option>
          </select>
          <select className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none sm:max-w-[160px]">
            <option>Semua Status</option>
          </select>
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
                        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 1 4 16.5v-11Z" />
                        <path d="M8 6h8M8 10h8M8 14h5" />
                      </svg>
                      <p className="font-bold text-slate-400">Belum ada materi</p>
                      <p className="text-xs font-semibold text-slate-400">
                        Data real-time dari semua guru
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