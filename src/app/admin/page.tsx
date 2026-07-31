'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Search, ArrowLeft, RefreshCw, Calendar, Phone, User, MessageSquare, Layers, LogOut } from 'lucide-react';
import { RegistrationItem } from '@/lib/db';

export default function AdminPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter((reg) => {
    const term = searchTerm.toLowerCase();
    return (
      reg.name.toLowerCase().includes(term) ||
      reg.phone.toLowerCase().includes(term) ||
      reg.program.toLowerCase().includes(term) ||
      reg.message.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Panel Admin TPQ Al-Hasanah</h1>
                <p className="text-xs text-slate-400">Manajemen Data Pendaftaran Santri Baru</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-red-900/60 border border-slate-700 hover:border-red-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-red-300 transition-all"
              title="Keluar dari panel admin"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pendaftar</div>
            <div className="text-3xl font-black text-amber-400 mt-2">{registrations.length}</div>
            <div className="text-xs text-slate-400 mt-1">Formulir masuk via website</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status Sistem</div>
            <div className="text-3xl font-black text-emerald-400 mt-2">Aktif</div>
            <div className="text-xs text-slate-400 mt-1">Fullstack API & Database JSON</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Update Terakhir</div>
            <div className="text-base font-bold text-white mt-2">
              {registrations.length > 0
                ? new Date(registrations[0].createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : '-'}
            </div>
            <div className="text-xs text-slate-400 mt-1">Pendaftaran terbaru</div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama, nomor WA, program, atau pesan..."
            className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder-slate-500"
          />
        </div>

        {/* Table / List */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Daftar Pesan & Pendaftaran</span>
              <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                {filteredRegistrations.length} Data
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-500" />
              <span>Memuat data pendaftaran...</span>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Tidak ada data pendaftaran yang ditemukan.
            </div>
          ) : (
            <div className="divide-y divide-slate-700/60">
              {filteredRegistrations.map((reg) => (
                <div key={reg.id} className="p-5 hover:bg-slate-750 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
<span className="text-xs font-mono font-bold bg-slate-900 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded-lg">
                         REG-{reg.id}
                       </span>
                      <h3 className="font-bold text-base text-white flex items-center space-x-2">
                        <User className="w-4 h-4 text-amber-400" />
                        <span>{reg.name}</span>
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(reg.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </span>

                      <a
                        href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-lg font-bold flex items-center space-x-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>WhatsApp ({reg.phone})</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs pt-1">
                    <div className="sm:col-span-4 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <span className="text-slate-400 font-semibold block mb-1 flex items-center space-x-1">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Program Minat:</span>
                      </span>
                      <span className="text-slate-200 font-bold">{reg.program}</span>
                    </div>

                    <div className="sm:col-span-8 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                      <span className="text-slate-400 font-semibold block mb-1 flex items-center space-x-1">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pesan / Catatan:</span>
                      </span>
                      <span className="text-slate-200 italic">{reg.message || '(Tidak ada pesan)'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
