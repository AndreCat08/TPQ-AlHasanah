'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full transition-colors"
    >
      <LogOut size={20} /> Keluar
    </button>
  );
}
