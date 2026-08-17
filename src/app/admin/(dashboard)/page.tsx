import { getRegistrations, getProfile, getSubjects, getAsatidz, getActivities, getSampleDoas } from '@/lib/db';
import { requireSession } from '@/lib/session';
import Link from 'next/link';
import { Users, BookOpen, UserCheck, Calendar, ArrowRight } from 'lucide-react';

export default async function AdminDashboardPage() {
  requireSession();

  const registrations = await getRegistrations();
  const profile = await getProfile();
  const subjects = await getSubjects();
  const asatidz = await getAsatidz();
  const activities = await getActivities();
  const doas = await getSampleDoas();

  const recentRegistrations = registrations.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      <p className="text-gray-600">Selamat datang di panel admin {profile.name}.</p>

      {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pendaftar</p>
              <p className="text-2xl font-bold text-gray-800">{registrations.length}</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mata Pelajaran</p>
              <p className="text-2xl font-bold text-gray-800">{subjects.length}</p>
            </div>
            <BookOpen className="text-emerald-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Asatidz</p>
              <p className="text-2xl font-bold text-gray-800">{asatidz.length}</p>
            </div>
            <UserCheck className="text-amber-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Kegiatan</p>
              <p className="text-2xl font-bold text-gray-800">{activities.length}</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Pendaftaran Terbaru</h2>
          <Link
            href="/admin/pendaftaran"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">Nama</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">WhatsApp</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">Program</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">REG-{reg.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reg.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <a
                      href={`https://wa.me/${reg.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {reg.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reg.program}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {reg.createdAt.toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentRegistrations.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">Belum ada pendaftaran</div>
          )}
        </div>
      </div>
    </div>
  );
}
