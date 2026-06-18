import UserManagement from "@/components/dashboard/UserManagement";

export default function ManajemenSiswaPage() {
  return (
    <UserManagement
      role="SISWA"
      title="Manajemen Siswa"
      description="Tambah, edit, dan hapus akun siswa yang terhubung ke kelas, materi, forum, dan event."
      identityLabel="NIS"
      emptyLabel="Belum ada data siswa"
    />
  );
}
