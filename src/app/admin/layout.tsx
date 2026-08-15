import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users } from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin TPQ Al-Hasanah</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 hover:text-blue-300">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/pendaftaran" className="flex items-center gap-3 hover:text-blue-300">
            <Users size={20} /> Pendaftaran
          </Link>
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
