'use client';

import React from 'react';
import { Heart, CheckCircle } from 'lucide-react';
import { ProfileData } from '@/lib/db';

interface AboutSectionProps {
  profile: ProfileData;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800"
                alt="Al-Qur'an dan Bimbingan"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-emerald-900/10"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <Heart className="w-6 h-6 text-amber-300 fill-amber-300" />
                <span className="font-bold text-lg">Lingkungan Islami</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Menanamkan rasa cinta Al-Qur'an sejak usia dini dalam suasana kasih sayang dan kekeluargaan.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-md">
                Tentang Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Mendidik dengan Ilmu, Menuntun dengan Cinta
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              <strong className="text-slate-900">{profile.name}</strong> berdiri sejak tahun {profile.established} sebagai tempat pembelajaran Al-Qur'an bagi anak-anak usia TK hingga Remaja. Kami berkomitmen memberikan pendidikan baca Al-Qur'an secara tartil, sesuai tajwid, dan diimbangi dengan pembentukan akhlakul karimah.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Metode Interaktif", desc: "Proses belajar santai namun fokus dan mudah dipahami anak." },
                { title: "Tenaga Pengajar Sanad", desc: "Dibimbing Asatidz lulusan pesantren terpercaya." },
                { title: "Kurikulum Komprehensif", desc: "Materi Iqra, Tajwid, Doa Harian, dan Praktik Shalat." },
                { title: "Fasilitas Lengkap", desc: "Ruang ber-AC, karpet nyaman, dan media pembelajaran visual." },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
