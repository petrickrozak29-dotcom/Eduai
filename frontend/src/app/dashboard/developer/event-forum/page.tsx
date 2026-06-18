import DashboardShell from "@/components/layout/DashboardShell";
import EventBoard from "@/components/dashboard/EventBoard";
import ForumBoard from "@/components/dashboard/ForumBoard";

export default function EventForumPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Event & Forum</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Tambah, edit, hapus, dan moderasi seluruh event serta forum diskusi.</p>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <EventBoard compact />
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <ForumBoard compact />
        </div>
      </div>
    </DashboardShell>
  );
}
