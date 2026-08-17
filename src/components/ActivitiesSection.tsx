'use client';

import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { ActivityItem } from '@/lib/db';

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  const [activityFilter, setActivityFilter] = useState('Semua');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const categories = ['Semua', 'Pembelajaran', 'Khataman', 'Prestasi', 'Outbound'];

  const filteredActivities = activityFilter === 'Semua'
    ? activities
    : activities.filter((act) => act.category === activityFilter);

  return (
    <section id="kegiatan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-emerald-700 font-bold text-sm tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-md">
              Galeri Foto
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Potret Kegiatan Santri
            </h2>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Dokumentasi aktivitas pembelajaran, lomba, serta kebersamaan santri TPQ Al-Hasanah.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActivityFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activityFilter === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {activity.category}
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow">
                  {activity.isRoutine
                    ? activity.routineNotes || 'Tidak ada catatan rutin'
                    : activity.activityDate
                      ? new Date(activity.activityDate).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Tanggal tidak tersedia'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                  <span>Lihat Rincian Foto</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 z-10 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="bg-emerald-600 text-xs font-bold px-2.5 py-1 rounded-md mb-2 inline-block">
                  {selectedActivity.category}
                </span>
                <h3 className="text-2xl font-bold">{selectedActivity.title}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Waktu:{' '}
                  {selectedActivity.isRoutine
                    ? selectedActivity.routineNotes || 'Tidak ada catatan rutin'
                    : selectedActivity.activityDate
                      ? new Date(selectedActivity.activityDate).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Tanggal tidak tersedia'}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {selectedActivity.description}
              </p>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Dokumentasi resmi TPQ Al-Hasanah. Kegiatan ini diselenggarakan untuk memotivasi santri agar semakin semangat dalam menuntut ilmu agama.
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
