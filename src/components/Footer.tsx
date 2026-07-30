'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { ProfileData } from '@/lib/db';

interface FooterProps {
  profile: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Lembaga Pendidikan Al-Qur'an terpercaya yang berfokus pada kelancaran bacaan tajwid, hafalan, dan pembentukan akhlakul karimah sejak dini.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm">Navigasi Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-emerald-400">Tentang Kami</button></li>
              <li><button onClick={() => scrollToSection('visimisi')} className="hover:text-emerald-400">Visi & Misi</button></li>
              <li><button onClick={() => scrollToSection('matpel')} className="hover:text-emerald-400">Mata Pelajaran</button></li>
              <li><button onClick={() => scrollToSection('doa')} className="hover:text-emerald-400">Doa Harian</button></li>
              <li><button onClick={() => scrollToSection('kegiatan')} className="hover:text-emerald-400">Potret Kegiatan</button></li>
              <li><button onClick={() => scrollToSection('asatidz')} className="hover:text-emerald-400">Daftar Pengajar</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">Hadits Nabi SAW</span>
            <p className="text-xs italic text-slate-300 leading-relaxed">
              "Khairukum man ta'allamal-Qur'aana wa 'allamah."
            </p>
            <p className="text-[11px] text-slate-500">
              (Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya. - HR. Bukhari)
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Dirancang untuk Generasi Qur'ani Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
