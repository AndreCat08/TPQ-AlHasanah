'use client';

import React from 'react';
import { AsatidzItem } from '@/lib/db';

interface AsatidzSectionProps {
  asatidz: AsatidzItem[];
}

export default function AsatidzSection({ asatidz }: AsatidzSectionProps) {
  return (
    <section id="asatidz" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-sm tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-md">
            Tenaga Pendidik
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Daftar Asatidz & Ustadzah
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Pengajar yang amanah, sabar, dan berpengalaman dalam membimbing bacaan Al-Qur'an.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {asatidz.map((ustadz) => (
            <div
              key={ustadz.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={ustadz.image}
                    alt={ustadz.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase">
                      {ustadz.role}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {ustadz.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ustadz.bio}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 italic text-xs text-slate-500 font-serif">
                "{ustadz.quote}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
