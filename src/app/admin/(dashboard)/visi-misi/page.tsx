import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import VisiMisiForm from '@/components/admin/VisiMisiForm';
import { getVisiMisi } from '@/lib/db';

export default async function AdminVisiMisiPage() {
  const visiMisi = await getVisiMisi();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Visi & Misi</h1>
      </div>

      <VisiMisiForm initialData={visiMisi} />
    </div>
  );
}
