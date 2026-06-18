import DashboardShell from "@/components/layout/DashboardShell";
import EventBoard from "@/components/dashboard/EventBoard";

export default function EventSiswaPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-rose-600">Siswa</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Event & Kegiatan</h1>
          <p className="mt-2 text-base text-slate-600">Event dari guru dan developer tampil otomatis di sini.</p>
        </header>
        <EventBoard />
      </div>
    </DashboardShell>
  );
}
