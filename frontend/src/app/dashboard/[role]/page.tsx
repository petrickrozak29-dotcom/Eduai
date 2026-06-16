import Link from "next/link";
import { notFound } from "next/navigation";
import type { SVGProps } from "react";

type RoleKey = "siswa" | "guru" | "developer";

const roleData: Record<
  RoleKey,
  {
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
    sidebar: string[];
    stats: { label: string; value: string; tone: string }[];
    primaryCards: { title: string; text: string; value: string; tone: string }[];
    focus: string[];
  }
> = {
  siswa: {
    label: "Siswa",
    eyebrow: "Gamified Learning Hub",
    title: "Dashboard Siswa",
    description: "Ruang belajar personal untuk pretest, materi adaptif, XP, streak, kuis, forum, dan Learning Index.",
    accent: "from-red-600 via-yellow-400 to-emerald-500",
    sidebar: ["Dashboard", "EduPath AI", "AI Assistant", "Progress", "Nilai", "Learning Index", "Forum", "Event", "Profil"],
    stats: [
      { label: "XP Minggu Ini", value: "1.250", tone: "bg-red-50 text-red-600" },
      { label: "Streak", value: "7 Hari", tone: "bg-yellow-50 text-yellow-700" },
      { label: "Learning Index", value: "88", tone: "bg-emerald-50 text-emerald-600" },
      { label: "Kuis Selesai", value: "12", tone: "bg-blue-50 text-blue-600" },
    ],
    primaryCards: [
      { title: "Materi Adaptif", text: "Biologi: Sistem pernapasan manusia", value: "75%", tone: "from-red-500 to-rose-400" },
      { title: "Kuis Per Bab", text: "Matematika: Fungsi kuadrat", value: "82%", tone: "from-yellow-400 to-orange-400" },
      { title: "AI Assistant", text: "3 ringkasan dan 2 flashcard baru", value: "Live", tone: "from-blue-500 to-cyan-400" },
    ],
    focus: ["Ulang materi visual Bab 2", "Selesaikan latihan soal cerita", "Ikuti forum diskusi kelas X IPA"],
  },
  guru: {
    label: "Guru",
    eyebrow: "AI Teaching Workspace",
    title: "Dashboard Guru",
    description: "Pusat pengelolaan kelas, generate materi AI, review modul, publish kuis, dan monitoring aktivitas siswa.",
    accent: "from-emerald-500 via-blue-500 to-cyan-400",
    sidebar: ["Dashboard", "EduPath AI", "Kelas", "Siswa", "Nilai", "Monitoring", "Forum", "Event", "Profil"],
    stats: [
      { label: "Kelas Aktif", value: "8", tone: "bg-emerald-50 text-emerald-600" },
      { label: "Materi AI", value: "24", tone: "bg-blue-50 text-blue-600" },
      { label: "Perlu Review", value: "6", tone: "bg-yellow-50 text-yellow-700" },
      { label: "Publikasi", value: "18", tone: "bg-red-50 text-red-600" },
    ],
    primaryCards: [
      { title: "Generate Materi", text: "Fase E - Biologi - Sistem Pernapasan", value: "Draft", tone: "from-blue-500 to-cyan-400" },
      { title: "Monitoring Kelas", text: "Kelas X IPA 1 butuh remedial ringan", value: "64%", tone: "from-emerald-500 to-green-400" },
      { title: "Kuis Otomatis", text: "Kuis akhir bab siap direview", value: "12 Soal", tone: "from-yellow-400 to-orange-400" },
    ],
    focus: ["Review materi kinestetik", "Publish kuis akhir Bab 3", "Pantau siswa dengan Learning Index rendah"],
  },
  developer: {
    label: "Developer",
    eyebrow: "Platform Control Center",
    title: "Dashboard Developer",
    description: "Panel visual untuk monitoring guru, siswa, kelas, mata pelajaran, AI usage, uptime, dan analytics platform.",
    accent: "from-slate-950 via-blue-600 to-emerald-500",
    sidebar: ["Dashboard", "Manajemen Guru", "Manajemen Siswa", "Manajemen Kelas", "Mata Pelajaran", "Kurikulum", "AI Monitoring", "Analytics", "Pengaturan"],
    stats: [
      { label: "Total Guru", value: "128", tone: "bg-blue-50 text-blue-600" },
      { label: "Total Siswa", value: "2.4k", tone: "bg-emerald-50 text-emerald-600" },
      { label: "AI Usage", value: "18k", tone: "bg-red-50 text-red-600" },
      { label: "Uptime", value: "99.8%", tone: "bg-yellow-50 text-yellow-700" },
    ],
    primaryCards: [
      { title: "AI Usage Monitor", text: "Generate materi, assistant chat, dan upload dokumen", value: "+18%", tone: "from-blue-600 to-cyan-400" },
      { title: "Learning Analytics", text: "Rata-rata Learning Index seluruh sekolah", value: "81", tone: "from-emerald-500 to-green-400" },
      { title: "Aktivitas Harian", text: "Siswa aktif, guru publish, forum berjalan", value: "2.1k", tone: "from-red-500 to-yellow-400" },
    ],
    focus: ["Optimasi queue AI generation", "Audit kelas dengan aktivitas rendah", "Sinkronisasi kurikulum Fase E dan F"],
  },
};

type PageProps = {
  params: Promise<{ role: string }>;
};

export function generateStaticParams() {
  return Object.keys(roleData).map((role) => ({ role }));
}

export default async function DashboardRolePage({ params }: PageProps) {
  const { role } = await params;

  if (!isRole(role)) {
    notFound();
  }

  const data = roleData[role];

  return (
    <main className="edupath-shell min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <DashboardBackdrop />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-black text-slate-950">
            EduPath <span className="text-red-600">AI</span>
          </span>
        </Link>
        <div className="flex flex-wrap justify-end gap-2">
          <Link href="/edupath-ai" className="rounded-lg border border-white/70 bg-white/75 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur">
            EduPath AI
          </Link>
          <Link href="/login" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-red-600/20">
            Login
          </Link>
        </div>
      </div>

      <section className="relative z-10 mx-auto mt-6 grid max-w-7xl gap-5 lg:grid-cols-[270px_1fr]">
        <aside className="rounded-lg border border-white/70 bg-white/72 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className={`rounded-lg bg-gradient-to-br ${data.accent} p-4 text-white shadow-lg`}>
            <p className="text-xs font-black uppercase text-white/75">Mode</p>
            <h1 className="mt-1 text-2xl font-black">{data.label}</h1>
          </div>

          <nav className="mt-4 space-y-1" aria-label={`Navigasi dashboard ${data.label}`}>
            {data.sidebar.map((item, index) => (
              <button
                key={item}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-black transition ${
                  index === 0 ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10" : "text-slate-600 hover:bg-white hover:text-slate-950"
                }`}
                type="button"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
                  <MenuDotIcon className="h-4 w-4" />
                </span>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-5">
          <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div>
                <p className="text-sm font-black uppercase text-blue-600">{data.eyebrow}</p>
                <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">{data.title}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{data.description}</p>
              </div>
              <div className={`rounded-lg bg-gradient-to-br ${data.accent} p-5 text-white`}>
                <p className="text-sm font-black text-white/80">Status Hari Ini</p>
                <div className="mt-5 h-3 overflow-hidden rounded-sm bg-white/25">
                  <div className="h-full w-4/5 rounded-sm bg-white" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {["Live", "Sync", "AI"].map((item) => (
                    <span key={item} className="rounded-lg bg-white/18 px-2 py-3 text-sm font-black">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.stats.map((stat) => (
              <article key={stat.label} className={`rounded-lg border border-white/70 p-5 shadow-sm ${stat.tone}`}>
                <p className="text-sm font-black opacity-80">{stat.label}</p>
                <p className="mt-2 text-3xl font-black">{stat.value}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-red-600">Workspace Preview</p>
                  <h3 className="text-2xl font-black text-slate-950">Aktivitas Utama</h3>
                </div>
                <Link href="/edupath-ai" className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white">
                  Buka AI
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {data.primaryCards.map((card) => (
                  <article key={card.title} className={`rounded-lg bg-gradient-to-br ${card.tone} p-5 text-white shadow-lg`}>
                    <p className="text-sm font-black text-white/82">{card.title}</p>
                    <p className="mt-3 min-h-16 text-sm leading-6 text-white/90">{card.text}</p>
                    <p className="mt-5 text-3xl font-black">{card.value}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-950">Learning Analytics</p>
                  <p className="text-sm font-black text-red-600">Real-time</p>
                </div>
                <div className="grid h-44 grid-cols-12 items-end gap-2">
                  {[35, 58, 46, 70, 66, 82, 54, 76, 88, 73, 92, 84].map((height, index) => (
                    <div key={`${height}-${index}`} className="rounded-sm bg-gradient-to-t from-blue-600 to-emerald-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                <p className="text-xs font-black uppercase text-emerald-600">Prioritas</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">Rekomendasi</h3>
                <div className="mt-4 space-y-3">
                  {data.focus.map((item) => (
                    <div key={item} className="rounded-lg bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-black uppercase text-yellow-300">Visual Placeholder</p>
                <h3 className="mt-1 text-2xl font-black">Fitur berikutnya</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Dashboard ini masih visual frontend awal. Integrasi data, autentikasi, dan CRUD bisa dicicil setelah flow utama stabil.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}

function isRole(role: string): role is RoleKey {
  return role === "siswa" || role === "guru" || role === "developer";
}

function DashboardBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="learning-band learning-band-one" />
      <span className="learning-band learning-band-two" />
      <span className="learning-band learning-band-three" />
      <span className="grid-sheen" />
      {Array.from({ length: 16 }).map((_, index) => (
        <span key={index} className={`learning-particle particle-${index + 1}`} />
      ))}
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9">
        <path d="M8 11.5c4.6.7 8 2.6 10.2 5.7v16.2C15.9 30.7 12.5 29 8 28.3V11.5Z" fill="#EF4444" />
        <path d="M36 11.5c-4.6.7-8 2.6-10.2 5.7v16.2c2.3-2.7 5.7-4.4 10.2-5.1V11.5Z" fill="#22C55E" />
        <path d="M20 10.3c.9-2.3 2.4-4.1 4.5-5.3 1.9 1.4 3 3.2 3.3 5.3-1.9.7-3.4 1.9-4.7 3.7A12.4 12.4 0 0 0 20 10.3Z" fill="#3B82F6" />
        <path d="M18.2 17.2c-2.2-3.1-5.6-5-10.2-5.7v3.8c3.7.7 6.5 2.3 8.2 4.7l2 2.7v-5.5Z" fill="#FACC15" opacity=".9" />
      </svg>
    </div>
  );
}

function MenuDotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
