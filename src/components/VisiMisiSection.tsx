'use client';

import React from 'react';
import { Compass, GraduationCap, Sparkles } from 'lucide-react';
import { VisiMisiData } from '@/lib/db';

interface VisiMisiSectionProps {
  visiMisi: VisiMisiData;
}

export default function VisiMisiSection({ visiMisi }: VisiMisiSectionProps) {
  return (
    <section id="visimisi" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-md">
            Arah & Komitmen
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Visi & Misi TPQ Al-Hasanah
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Panduan landasan kami dalam mencetak generasi penerus bangsa yang shaleh dan berwawasan luas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900/80 to-teal-950/90 border border-emerald-700/50 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">Visi Utama</h3>
              <p className="text-xl sm:text-2xl font-bold text-white mt-3 leading-snug">
                "{visiMisi.visi}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-800/60 flex items-center space-x-3 text-xs text-emerald-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Orientasi jangka panjang mencetak huffazh yang berakhlak mulia.</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700 p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Misi Organisasi</h3>
                <p className="text-xs text-slate-400">Langkah nyata yang kami jalankan secara berkelanjutan</p>
              </div>
            </div>

            <div className="space-y-4">
              {visiMisi.misi.map((misi, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/60 hover:border-emerald-500/50 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
