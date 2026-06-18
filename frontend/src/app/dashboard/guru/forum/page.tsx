import DashboardShell from "@/components/layout/DashboardShell";
import ForumBoard from "@/components/dashboard/ForumBoard";

export default function GuruForumPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-sky-600">Forum</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Forum Diskusi</h1>
          <p className="mt-2 text-base leading-8 text-slate-600">Forum sudah direset ke data API dan tersinkron dengan siswa serta developer.</p>
        </header>
        <ForumBoard />
      </div>
    </DashboardShell>
  );
}
