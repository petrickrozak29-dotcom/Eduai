import DashboardShell from "@/components/layout/DashboardShell";
import ForumBoard from "@/components/dashboard/ForumBoard";

export default function ForumSiswaPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-indigo-600">Siswa</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Forum Diskusi</h1>
          <p className="mt-2 text-base text-slate-600">Data forum tersinkron real-time dengan guru dan developer.</p>
        </header>
        <ForumBoard />
      </div>
    </DashboardShell>
  );
}
