import { getRegistrations } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AdminRegistrationsPage() {
  requireSession();

  const registrations = await getRegistrations();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Pendaftaran</h1>
      <div className="bg-white rounded-lg shadow">
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
            {registrations.map((reg) => (
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
        {registrations.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">Belum ada pendaftaran</div>
        )}
      </div>
    </div>
  );
}
