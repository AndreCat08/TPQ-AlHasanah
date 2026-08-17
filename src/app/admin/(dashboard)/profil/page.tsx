import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProfilForm from '@/components/admin/ProfilForm';
import { getProfile } from '@/lib/db';

export default async function AdminProfilPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Profil</h1>
      </div>

      <ProfilForm initialData={profile} />
    </div>
  );
}
