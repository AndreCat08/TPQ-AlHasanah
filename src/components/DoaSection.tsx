'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { SampleDoaItem } from '@/lib/db';

interface DoaSectionProps {
  doas: SampleDoaItem[];
}

export default function DoaSection({ doas }: DoaSectionProps) {
  const [selectedDoa, setSelectedDoa] = useState<SampleDoaItem>(doas[0] || {
    id: 1,
    title: "Doa Sebelum Belajar",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلاَمِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولاً ، رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
    latin: "Radhitu billahi rabba, wa bil islami dina, wa bi Muhammadin nabiyya wa rasula. Rabbi zidni 'ilman warzuqni fahma.",
    meaning: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai Nabi dan Rasulku. Ya Allah, tambahkanlah kepadaku ilmu dan berikanlah aku karunia pemahaman."
  });

  return (
    <section id="doa" className="py-20 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kumpulan Doa Harian Santri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Doa-Doa Pilihan Pembentukan Karakter
          </h2>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Bimbingan hafalan doa harian yang diamalkan santri TPQ Al-Hasanah dalam aktivitas sehari-hari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Doa selector list */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Daftar Doa Harian</h3>
            {doas.map((doa) => (
              <button
                key={doa.id}
                onClick={() => setSelectedDoa(doa)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedDoa.id === doa.id
                    ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${selectedDoa.id === doa.id ? 'bg-emerald-500' : 'bg-slate-900 text-emerald-400'}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">{doa.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Doa showcase card */}
          <div className="lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>{selectedDoa.title}</span>
              </h3>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                Teks & Terjemahan
              </span>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-700 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">Teks Arab</span>
                <p className="text-2xl sm:text-3xl font-serif text-right text-emerald-300 mt-3 leading-loose" dir="rtl">
                  {selectedDoa.arabic}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Transliterasi Latin</span>
                <p className="text-sm italic text-slate-200 mt-1 font-medium">{selectedDoa.latin}</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">Artinya / Makna</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{selectedDoa.meaning}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}