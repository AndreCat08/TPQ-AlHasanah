'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { SubjectItem } from '@/lib/db';

interface SubjectsSectionProps {
  subjects: SubjectItem[];
}

export default function SubjectsSection({ subjects }: SubjectsSectionProps) {
  return (
    <section id="matpel" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-sm tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-md">
            Kurikulum Pendidikan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Mata Pelajaran & Program Bimbingan
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Materi disusun secara komunikatif dan sistematis sesuai tingkat perkembangan santri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                    {subj.icon}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {subj.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {subj.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {subj.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Materi Pokok:</div>
                <ul className="space-y-1.5">
                  {subj.topics.map((top, i) => (
                    <li key={i} className="flex items-center text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
