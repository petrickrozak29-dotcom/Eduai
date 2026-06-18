import DashboardShell from "@/components/layout/DashboardShell";
import EventBoard from "@/components/dashboard/EventBoard";

export default function GuruEventPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-orange-600">Event</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Event</h1>
          <p className="mt-2 text-base leading-8 text-slate-600">Tambah dan kelola event yang otomatis tampil di dashboard siswa dan developer.</p>
        </header>
        <EventBoard />
      </div>
    </DashboardShell>
  );
}
