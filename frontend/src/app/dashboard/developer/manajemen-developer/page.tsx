import UserManagement from "@/components/dashboard/UserManagement";

export default function ManajemenDeveloperPage() {
  return (
    <UserManagement
      role="DEVELOPER"
      title="Manajemen Developer"
      description="Tambah, edit, dan hapus akses developer platform EduPath AI."
      identityLabel="Role"
      emptyLabel="Belum ada data developer"
    />
  );
}
