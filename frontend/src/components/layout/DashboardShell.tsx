"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogoMark } from "@/components/ui/LogoMark";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SVGProps, ReactNode, JSX } from "react";

type Role = "SISWA" | "GURU" | "DEVELOPER";

interface NavItem {
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const siswaNav: NavItem[] = [
  { label: "Beranda", href: "/dashboard/siswa", icon: HomeIcon },
  { label: "Kelas Saya", href: "/dashboard/siswa/learning-path", icon: PathIcon },
  { label: "Materi", href: "/dashboard/siswa/materi", icon: BookIcon },
  { label: "Quiz", href: "/dashboard/siswa/quiz", icon: ClipboardIcon },
  { label: "AI Assistant", href: "/dashboard/siswa/ai-assistant", icon: BotIcon },
  { label: "Learning Index", href: "/dashboard/siswa/learning-index", icon: ChartIcon },
  { label: "Forum", href: "/dashboard/siswa/forum", icon: MessageIcon },
  { label: "Event", href: "/dashboard/siswa/event", icon: TrophyIcon },
  { label: "Pengaturan", href: "/dashboard/siswa/pengaturan", icon: SettingsIcon },
];

const guruNav: NavItem[] = [
  { label: "Beranda", href: "/dashboard/guru", icon: HomeIcon },
  { label: "Kelas Saya", href: "/dashboard/guru/kelas-saya", icon: UsersIcon },
  { label: "Materi", href: "/dashboard/guru/materi", icon: BookIcon },
  { label: "AI Generate Materi", href: "/dashboard/guru/ai-generate-materi", icon: SparkIcon },
  { label: "AI Generate Quiz", href: "/dashboard/guru/ai-generate-quiz", icon: SparkIcon },
  { label: "Bank Soal", href: "/dashboard/guru/bank-soal", icon: DatabaseIcon },
  { label: "Monitoring & Analitik", href: "/dashboard/guru/monitoring-siswa", icon: EyeIcon },
  { label: "Forum", href: "/dashboard/guru/forum", icon: MessageIcon },
  { label: "Event", href: "/dashboard/guru/event", icon: TrophyIcon },
  { label: "Pengaturan", href: "/dashboard/guru/pengaturan", icon: SettingsIcon },
];

const developerNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/developer", icon: HomeIcon },
  { label: "Manajemen Guru", href: "/dashboard/developer/manajemen-guru", icon: UsersIcon },
  { label: "Manajemen Siswa", href: "/dashboard/developer/manajemen-siswa", icon: GraduationIcon },
  { label: "Manajemen Developer", href: "/dashboard/developer/manajemen-developer", icon: CodeIcon },
  { label: "Manajemen Materi", href: "/dashboard/developer/manajemen-materi", icon: BookIcon },
  { label: "Manajemen Quiz", href: "/dashboard/developer/manajemen-quiz", icon: ClipboardIcon },
  { label: "Event & Forum", href: "/dashboard/developer/event-forum", icon: MessageIcon },
  { label: "Analytics", href: "/dashboard/developer/analytics", icon: ChartIcon },
  { label: "Monitoring Sistem", href: "/dashboard/developer/monitoring-sistem", icon: EyeIcon },
  { label: "Pengaturan Platform", href: "/dashboard/developer/pengaturan-platform", icon: SettingsIcon },
];

const navMap: Record<Role, NavItem[]> = {
  SISWA: siswaNav,
  GURU: guruNav,
  DEVELOPER: developerNav,
};

const accentMap: Record<Role, string> = {
  SISWA: "from-red-600 via-yellow-400 to-emerald-500",
  GURU: "from-emerald-500 via-blue-500 to-cyan-400",
  DEVELOPER: "from-slate-950 via-blue-600 to-emerald-500",
};

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) {
    return (
      <div className="edupath-shell flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <LogoMark size="md" />
          <p className="mt-4 font-black text-slate-600">Memuat...</p>
        </div>
      </div>
    );
  }

  const role = user.role;
  const navItems = navMap[role];
  const accent = accentMap[role];
  const roleLabel = role === "SISWA" ? "Siswa" : role === "GURU" ? "Guru" : "Developer";

  return (
    <div className="edupath-shell flex min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <span className="learning-band learning-band-one" />
        <span className="learning-band learning-band-two" />
        <span className="grid-sheen" />
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg ring-1 ring-slate-200 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          {sidebarOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/50 bg-white/75 backdrop-blur-2xl transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-white/50 px-5 py-6">
            <LogoMark />
            <div>
              <Link href="/" className="text-lg font-black text-slate-950">
                EduPath <span className="text-red-600">AI</span>
              </Link>
              <p className="text-xs font-bold text-slate-500">{roleLabel}</p>
            </div>
          </div>

          <div className={`mx-4 mt-4 rounded-lg bg-gradient-to-br ${accent} p-4 text-white shadow-lg`}>
            <p className="text-xs font-black text-white/75">Welcome</p>
            <p className="mt-1 text-lg font-black truncate">{user.name}</p>
            <p className="text-xs font-semibold text-white/75 truncate">{user.email}</p>
          </div>

          <nav className="mt-4 flex-1 overflow-y-auto space-y-1 px-3 pb-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-slate-950 text-white shadow-lg"
                      : "text-slate-600 hover:bg-white/80 hover:text-slate-950"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/50 p-4">
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              <LogoutIcon className="h-5 w-5" />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="relative z-10 flex-1 px-4 py-6 sm:px-6 lg:px-8 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m-4-6v6m8-6v6m4-6v6" /></svg>;
}
function PathIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 20h16M12 4v12m-4-4l4 4 4-4" /></svg>;
}
function BookIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 1 4 16.5v-11Z" /><path d="M8 6h8M8 10h8M8 14h5" /></svg>;
}
function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 12l2 2 4-5" /></svg>;
}
function BotIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 5v3M8 13h.01M16 13h.01" /></svg>;
}
function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16v-5" /><path d="M12 16V8" /><path d="M16 16v-7" /></svg>;
}
function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a7 7 0 0 1-7 7H8l-5 3 2-5a7 7 0 1 1 16-5Z" /><path d="M8 11h8M8 15h5" /></svg>;
}
function TrophyIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></svg>;
}
function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>;
}
function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function GraduationIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></svg>;
}
function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="M19 16l.8 2.7L22 19.5l-2.2.8L19 23l-.8-2.7-2.2-.8 2.2-.8L19 16Z" /></svg>;
}
function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
}
function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>;
}
function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>;
}
