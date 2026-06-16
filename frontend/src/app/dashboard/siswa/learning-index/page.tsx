"use client";

import DashboardShell from "@/components/layout/DashboardShell";

export default function LearningIndexSiswaPage() {
  const subjects = [
    { name: "Biologi", score: 88, icon: "🧬" },
    { name: "Matematika", score: 82, icon: "📐" },
    { name: "Fisika", score: 72, icon: "⚡" },
    { name: "Kimia", score: 94, icon: "🧪" },
    { name: "B. Indonesia", score: 78, icon: "📖" },
    { name: "B. Inggris", score: 85, icon: "🌍" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-blue-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Learning Index 📊</h2>
          <p className="mt-2 text-base text-slate-600">Skor pemahamanmu di setiap mata pelajaran.</p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 via-emerald-400 to-yellow-300 p-6 text-white shadow-lg">
            <p className="text-sm font-black text-white/80">Rata-rata LI</p>
            <p className="mt-2 text-5xl font-black">83</p>
            <p className="text-sm font-bold text-white/80">Naik 4% dari minggu lalu</p>
            <div className="mt-4 h-3 overflow-hidden rounded-sm bg-white/25">
              <div className="h-full w-[83%] rounded-sm bg-white" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-white/20 p-3"><p className="text-lg font-black">1.250</p><p className="text-xs font-bold">XP</p></div>
              <div className="rounded-lg bg-white/20 p-3"><p className="text-lg font-black">7</p><p className="text-xs font-bold">Streak</p></div>
            </div>
          </div>

          <div className="space-y-3">
            {subjects.map((s) => (
              <div key={s.name} className="flex items-center gap-4 rounded-lg border border-white/70 bg-white p-4 shadow-sm">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-black text-slate-950">{s.name}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-sm bg-slate-100">
                    <div className="h-full rounded-sm bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
                <span className="text-2xl font-black text-slate-950">{s.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
