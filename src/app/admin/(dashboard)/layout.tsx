'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Building, Target, BookOpen, UserCheck, Calendar, Book } from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/pendaftaran', icon: Users, label: 'Pendaftaran' },
    { href: '/admin/mata-pelajaran', icon: BookOpen, label: 'Mata Pelajaran' },
    { href: '/admin/asatidz', icon: UserCheck, label: 'Asatidz' },
    { href: '/admin/kegiatan', icon: Calendar, label: 'Kegiatan' },
    { href: '/admin/doa', icon: Book, label: 'Doa' },
    { href: '/admin/profil', icon: Building, label: 'Profil' },
    { href: '/admin/visi-misi', icon: Target, label: 'Visi & Misi' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin TPQ Al-Hasanah</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-slate-300'
                }`}
            >
              <item.icon size={20} /> <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

