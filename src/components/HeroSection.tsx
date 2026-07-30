'use client';

import React from 'react';
import { Sparkles, Phone, Clock, BookOpen } from 'lucide-react';
import { ProfileData } from '@/lib/db';

interface HeroSectionProps {
  profile: ProfileData;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 opacity-95"></div>

      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Penerimaan Santri Baru Tahun Ajaran 2026/2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Membentuk Generasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200">Qur'ani & Berakhlak</span> Mulia
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.tagline}. TPQ Al-Hasanah hadir sebagai wadah bimbingan membaca, menghafal, dan memahami Al-Qur'an dengan metode interaktif, ramah anak, dan terstruktur.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={`https://wa.me/${profile.phone}?text=Assalamu'alaikum,%20saya%20mau%20daftar%20santri%20baru%20TPQ%20Al-Hasanah`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                <span>Daftar Sekarang (WhatsApp)</span>
              </a>

              <button
                onClick={() => scrollToSection('matpel')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-semibold px-6 py-4 rounded-xl transition-all"
              >
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Lihat Kurikulum</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {profile.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-3 rounded-xl backdrop-blur-sm text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-amber-400">{stat.count}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white space-y-6">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800"
                    alt="Santri Belajar Quran"
                    className="w-full h-full object-cover transform hover:scale-105 transition-duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      Suasana Belajar
                    </span>
                    <p className="text-sm font-semibold mt-1 text-slate-100">
                      Ruang Kelas Nyaman & Interaktif
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-slate-300">
                    <div className="p-2 bg-emerald-900/50 text-emerald-400 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Waktu Belajar Fleksibel</div>
                      <div className="text-xs text-slate-400">Shift Sore (15.30 - 17.00 WIB)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-slate-300">
                    <div className="p-2 bg-amber-900/50 text-amber-400 rounded-lg">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Kurikulum Terstandar</div>
                      <div className="text-xs text-slate-400">Iqra, Tajwid, Tahfidz & Akhlak</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
