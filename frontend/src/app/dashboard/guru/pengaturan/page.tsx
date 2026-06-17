"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";

const students = [
  { id: "1", name: "Ahmad Fauzi", kelas: "X-A", nisn: "1234567890" },
  { id: "2", name: "Bella Safira", kelas: "X-B", nisn: "1234567891" },
];

const pendidikanOptions = ["D3", "S1", "S2", "S3"];
const statusKepegawaianOptions = ["PNS", "PPPK", "GTY", "Honorer"];
const agamaOptions = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];
const jenisKelaminOptions = ["Laki-laki", "Perempuan"];

export default function GuruPengaturan() {
  const [activeTab, setActiveTab] = useState<"pdikti" | "siswa">("pdikti");

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-black text-slate-900">Pengaturan</h1>
        <p className="mb-6 text-sm font-bold text-slate-500">Kelola data diri dan manajemen siswa</p>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab("pdikti")}
            className={`rounded-xl border-2 border-black px-6 py-3 font-bold shadow-lg transition ${
              activeTab === "pdikti" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Data PDDIKTI
          </button>
          <button
            onClick={() => setActiveTab("siswa")}
            className={`rounded-xl border-2 border-black px-6 py-3 font-bold shadow-lg transition ${
              activeTab === "siswa" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Manajemen Siswa
          </button>
        </div>

        {activeTab === "pdikti" && <PDIKTIForm />}
        {activeTab === "siswa" && <ManajemenSiswa />}
      </div>
    </DashboardShell>
  );
}

function PDIKTIForm() {
  return (
    <div className="rounded-xl border-2 border-black bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-black text-slate-900">Data PDDIKTI</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nama Lengkap" />
        <Input label="NIP" />
        <Input label="NUPTK" />
        <Input label="Tempat Lahir" />
        <Input label="Tanggal Lahir" type="date" />
        <Select label="Jenis Kelamin" options={jenisKelaminOptions} />
        <Select label="Agama" options={agamaOptions} />
        <Input label="Alamat" />
        <Input label="No HP" />
        <Select label="Pendidikan Terakhir" options={pendidikanOptions} />
        <Input label="Perguruan Tinggi" />
        <Input label="Program Studi" />
        <Input label="Tahun Lulus" type="number" />
        <Select label="Status Kepegawaian" options={statusKepegawaianOptions} />
        <Input label="Instansi" />
        <Input label="Mata Pelajaran" />
        <div>
          <label className="mb-1 block text-sm font-bold text-slate-700">Foto Profil</label>
          <input
            type="file"
            className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-md"
            accept="image/*"
          />
        </div>
        <Input label="Password" type="password" />
      </div>
      <button className="mt-6 rounded-xl border-2 border-black bg-emerald-500 px-8 py-3 font-bold text-white shadow-xl transition hover:bg-emerald-600">
        Simpan
      </button>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-slate-700">{label}</label>
      <input
        type={type}
        className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-md"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-slate-700">{label}</label>
      <select className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-md">
        <option value="">Pilih {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ManajemenSiswa() {
  return (
    <div className="rounded-xl border-2 border-black bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-black text-slate-900">Manajemen Siswa</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="p-3 font-black text-slate-700">Nama</th>
              <th className="p-3 font-black text-slate-700">Kelas</th>
              <th className="p-3 font-black text-slate-700">NISN</th>
              <th className="p-3 font-black text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center font-bold text-slate-400">
                  Belum ada data siswa
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-800">{s.name}</td>
                  <td className="p-3 font-bold text-slate-800">{s.kelas}</td>
                  <td className="p-3 font-bold text-slate-800">{s.nisn}</td>
                  <td className="flex gap-2 p-3">
                    <button className="rounded-lg border-2 border-black bg-amber-400 px-4 py-1 text-sm font-bold shadow-md transition hover:bg-amber-500">
                      Edit
                    </button>
                    <button className="rounded-lg border-2 border-black bg-red-500 px-4 py-1 text-sm font-bold text-white shadow-md transition hover:bg-red-600">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}