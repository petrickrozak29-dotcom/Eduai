"use client";

export function LogoMark({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-11 w-11" : size === "md" ? "h-14 w-14" : "h-20 w-20";
  const svgSize = size === "sm" ? "h-9 w-9" : size === "md" ? "h-12 w-12" : "h-16 w-16";
  return (
    <div className={`flex items-center justify-center rounded-lg bg-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 ${dim}`}>
      <svg viewBox="0 0 44 44" aria-hidden="true" className={svgSize}>
        <path d="M8 11.5c4.6.7 8 2.6 10.2 5.7v16.2C15.9 30.7 12.5 29 8 28.3V11.5Z" fill="#EF4444" />
        <path d="M36 11.5c-4.6.7-8 2.6-10.2 5.7v16.2c2.3-2.7 5.7-4.4 10.2-5.1V11.5Z" fill="#22C55E" />
        <path d="M20 10.3c.9-2.3 2.4-4.1 4.5-5.3 1.9 1.4 3 3.2 3.3 5.3-1.9.7-3.4 1.9-4.7 3.7A12.4 12.4 0 0 0 20 10.3Z" fill="#3B82F6" />
        <path d="M18.2 17.2c-2.2-3.1-5.6-5-10.2-5.7v3.8c3.7.7 6.5 2.3 8.2 4.7l2 2.7v-5.5Z" fill="#FACC15" opacity=".9" />
      </svg>
    </div>
  );
}
