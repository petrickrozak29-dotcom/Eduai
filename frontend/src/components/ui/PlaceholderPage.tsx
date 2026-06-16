"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  parentRoute: string;
  parentLabel: string;
}

export default function PlaceholderPage({
  title,
  description,
  icon,
  features,
  parentRoute,
  parentLabel,
}: PlaceholderPageProps) {
  return (
    <DashboardShell>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-lg text-center">
          <span className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-4xl shadow-lg">
            {icon}
          </span>
          <h2 className="mt-6 text-4xl font-black text-slate-950">{title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>

          {features && features.length > 0 && (
            <div className="mt-6 inline-block rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-left">
              <p className="mb-2 text-sm font-black text-blue-700">Fitur yang akan tersedia:</p>
              <ul className="space-y-1">
                {features.map((f) => (
                  <li key={f} className="text-sm font-semibold text-blue-700/80">
                    ✨ {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={parentRoute}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white shadow-lg hover:bg-slate-800"
            >
              ← Kembali ke {parentLabel}
            </Link>
          </div>

          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-black text-emerald-700">🚧 Dalam Pengembangan</p>
            <p className="mt-1 text-sm leading-6 text-emerald-700/80">
              Fitur ini sedang dikembangkan untuk tahap selanjutnya.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
