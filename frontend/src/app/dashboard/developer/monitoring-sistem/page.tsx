"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type DeveloperDashboardData } from "@/lib/api";

function StatusDot({ status }: { status: "online" | "offline" | "warning" }) {
  const colorMap = { online: "bg-emerald-500", offline: "bg-red-500", warning: "bg-amber-500" };
  return <span className={`inline-block h-3 w-3 rounded-full ${colorMap[status]} shadow-[0_0_6px_rgba(0,0,0,0.3)]`} />;
}

export default function MonitoringSistemPage() {
  const [data, setData] = useState<DeveloperDashboardData | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMonitoring = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const started = performance.now();
    const result = await api.get<DeveloperDashboardData>("/developer/dashboard");
    setLatency(Math.round(performance.now() - started));
    if (result.success && result.data) setData(result.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMonitoring();
    const timer = window.setInterval(() => loadMonitoring(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadMonitoring]);

  const apiOnline = data?.monitoring.apiStatus === "healthy";
  const statusItems = [
    { label: "API Server", status: apiOnline ? "online" as const : "warning" as const },
    { label: "Database", status: data ? "online" as const : "warning" as const },
    { label: "Realtime Polling", status: "online" as const },
    { label: "AI Queue", status: data?.platform.aiQueue === "normal" ? "online" as const : "warning" as const },
  ];

  const activeUsers = (data?.totals?.guru || 0) + (data?.totals?.siswa || 0) + (data?.totals?.developer || 0);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Monitoring Sistem</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Status platform, aktivitas user, dan log sistem dari API.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <StatusDot status={item.status} />
              <div>
                <p className="text-sm font-black text-slate-900">{item.label}</p>
                <p className="text-xs font-bold uppercase text-slate-400">{item.status === "online" ? "Online" : "Warning"}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Total Pengguna</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">{loading ? "-" : activeUsers}</p>
            <p className="text-xs font-bold text-slate-400">Guru, siswa, developer</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Uptime Server</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">{data?.platform.uptime || "-"}</p>
            <p className="text-xs font-bold text-slate-400">Dari backend</p>
          </div>
          <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">Response Time</h2>
            <p className="mt-2 text-4xl font-black text-slate-900">{latency ?? "-"} ms</p>
            <p className="text-xs font-bold text-slate-400">Polling terakhir</p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-lg font-black text-slate-900">Real-time Log</h2>
          <div className="space-y-2">
            {(data?.logs || []).length > 0 ? data!.logs!.map((log) => (
              <div key={log.id} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600">
                <span className="w-24 shrink-0">{new Intl.DateTimeFormat("id-ID", { timeStyle: "short" }).format(new Date(log.createdAt))}</span>
                <span className="w-28 shrink-0 rounded bg-slate-200 px-2 py-0.5 text-center uppercase text-slate-600">{log.user?.role || "SYSTEM"}</span>
                <span className="truncate">{log.action} {log.user?.name ? `oleh ${log.user.name}` : ""}</span>
              </div>
            )) : (
              <div className="rounded-lg bg-slate-50 px-4 py-6 text-center text-xs font-bold text-slate-400">
                {loading ? "Memuat log sistem" : "Belum ada log sistem"}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
