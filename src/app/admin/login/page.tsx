'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || 'Gagal masuk');
        setPassword('');
        return;
      }

      const next = new URLSearchParams(window.location.search).get('next');
      router.replace(next && next.startsWith('/admin') ? next : '/admin');
      router.refresh();
    } catch {
      setError('Tidak dapat menghubungi server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Panel Admin</h1>
            <p className="text-sm text-slate-400">TPQ Al-Hasanah</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl"
        >
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Password Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Masukkan password"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start space-x-2 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl p-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSubmitting ? 'Memproses...' : 'Masuk'}</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          <a href="/" className="hover:text-slate-300 transition-colors">
            &larr; Kembali ke Beranda
          </a>
        </p>
      </div>
    </div>
  );
}
