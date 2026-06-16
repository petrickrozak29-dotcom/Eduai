"use client";

import DashboardShell from "@/components/layout/DashboardShell";

export default function ProgressSiswaPage() {
  const subjects = [
    { name: "Matematika", progress: 82, xp: 320, quizzes: 4 },
    { name: "Biologi", progress: 75, xp: 280, quizzes: 3 },
    { name: "Fisika", progress: 45, xp: 180, quizzes: 2 },
    { name: "Kimia", progress: 100, xp: 450, quizzes: 5 },
  ];

  const badges = ["Pelajar Aktif", "Kuis Perfect", "Streak 7 Hari", "Rajin Membaca"];

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-emerald-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Progress Belajar 📈</h2>
          <p className="mt-2 text-base text-slate-600">Pantau perkembangan belajarmu.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-green-400 p-5 text-white shadow-lg">
            <p className="text-sm font-black text-white/80">Total XP</p>
            <p className="mt-2 text-4xl font-black">1.250</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-5 text-white shadow-lg">
            <p className="text-sm font-black text-white/80">Quiz Selesai</p>
            <p className="mt-2 text-4xl font-black">12</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 p-5 text-white shadow-lg">
            <p className="text-sm font-black text-white/80">Badge</p>
            <p className="mt-2 text-4xl font-black">{badges.length}</p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
          <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
            <p className="mb-4 text-sm font-black text-slate-950">Per Mapel</p>
            <div className="space-y-4">
              {subjects.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm font-black">
                    <span>{s.name}</span>
                    <span>{s.progress}%</span>
                  </div>
                  <div className="mt-1 h-3 overflow-hidden rounded-sm bg-slate-200">
                    <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${s.progress}%` }} />
                  </div>
                  <div className="mt-1 flex gap-3 text-xs font-bold text-slate-500">
                    <span>{s.xp} XP</span>
                    <span>{s.quizzes} quiz</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-slate-950 p-4 text-white">
              <p className="text-xs font-black text-yellow-300">Weekly XP Chart</p>
              <div className="mt-3 grid h-24 grid-cols-7 items-end gap-2">
                {[180, 220, 150, 300, 240, 120, 80].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full rounded-sm bg-gradient-to-t from-emerald-400 to-yellow-300" style={{ height: `${h / 3}%` }} />
                    <span className="text-[10px] font-bold text-white/60">{["Sen","Sel","Rab","Kam","Jum","Sab","Min"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
            <p className="text-sm font-black text-slate-950">Badge 🏆</p>
            <div className="mt-4 space-y-3">
              {badges.map((b) => (
                <div key={b} className="flex items-center gap-3 rounded-lg bg-white border border-slate-200 p-3">
                  <span className="text-xl">⭐</span>
                  <span className="text-sm font-black text-slate-950">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
