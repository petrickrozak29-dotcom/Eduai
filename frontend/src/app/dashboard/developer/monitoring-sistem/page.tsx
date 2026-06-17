"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const statusItems = [
  { label: "API Server", status: "online" as const },
  { label: "Database", status: "online" as const },
  { label: "WebSocket", status: "offline" as const },
  { label: "Storage Service", status: "online" as const },
];

function StatusDot({ status }: { status: "online" | "offline" | "warning" }) {
  const colorMap = {
    online: "bg-emerald-500",
    offline: "bg-red-500",
    warning: "bg-amber-500",
  };
  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${colorMap[status]} shadow-[0_0_6px_rgba(0,0,0,0.3)]`}
    />
  );
}

export default function MonitoringSistemPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Monitoring Sistem</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Pantau status dan kesehatan platform EduPath AI secara real-time
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <StatusDot status={item.status} />
              <div>
                <p className="text-sm font-black text-slate-900">{item.label}</p>
                <p className="text-xs font-bold uppercase text-slate-400">
                  {item.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Pengguna Aktif</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">0</p>
            <p className="text-xs font-bold text-slate-400">Saat ini</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Uptime Server</h2>
            <p className="mt-2 font-black text-slate-900">-- hari -- jam -- menit</p>
            <p className="text-xs font-bold text-slate-400">Sejak terakhir deploy</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Response Time</h2>
            <p className="mt-2 font-black text-slate-900">-- ms</p>
            <p className="text-xs font-bold text-slate-400">Rata-rata</p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-lg font-black text-slate-900">Real-time Log</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2 text-xs font-bold text-slate-400">
                <span className="w-16 shrink-0">--:--:--</span>
                <span className="w-20 shrink-0 rounded bg-slate-200 px-2 py-0.5 text-center uppercase text-slate-500">
                  INFO
                </span>
                <span className="truncate">Menunggu data log real-time...</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-bold text-slate-400">
            Log akan muncul real-time saat sistem berjalan
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}