import UserManagement from "@/components/dashboard/UserManagement";

export default function ManajemenGuruPage() {
  return (
    <UserManagement
      role="GURU"
      title="Manajemen Guru"
      description="Tambah, edit, dan hapus akun guru yang terintegrasi ke seluruh platform."
      identityLabel="NIP"
      emptyLabel="Belum ada data guru"
    />
  );
}
