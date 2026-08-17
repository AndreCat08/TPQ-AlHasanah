'use client';

import React, { useState } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { updateProfileAction } from '@/app/admin/profil/actions';
import type { ProfileData } from '@/lib/db';

export default function ProfilForm({ initialData }: { initialData: ProfileData }) {
  const [stats, setStats] = useState(initialData.stats || []);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStat = () => {
    setStats([...stats, { label: '', count: '' }]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleStatChange = (index: number, field: 'label' | 'count', value: string) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set('stats', JSON.stringify(stats));

    try {
      const result = await updateProfileAction(null, formData);
      
      if (result?.success) {
        setMessage({ type: 'success', text: 'Profil berhasil disimpan.' });
        // Refresh page after 1.5 seconds to show updated data
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage({ 
          type: 'error', 
          text: (result as any)?.errors?._form?.[0] || 'Gagal menyimpan perubahan.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message?.type === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {message.text}
        </div>
      )}

      {message?.type === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {message.text}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Dasar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lembaga <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={initialData.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
              Tagline <span className="text-red-500">*</span>
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              defaultValue={initialData.tagline}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              No. Telepon / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={initialData.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={initialData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              defaultValue={initialData.address}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="established" className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Berdiri <span className="text-red-500">*</span>
            </label>
            <input
              id="established"
              name="established"
              type="text"
              defaultValue={initialData.established}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Statistik Utama</h2>
          <button
            type="button"
            onClick={handleAddStat}
            className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <Plus size={14} /> Tambah Statistik
          </button>
        </div>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Label (contoh: Santri Aktif)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
                <input
                  type="text"
                  placeholder="Jumlah (contoh: 150+)"
                  value={stat.count}
                  onChange={(e) => handleStatChange(index, 'count', e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStat(index)}
                disabled={stats.length <= 1}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                title="Hapus"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a
          href="/admin"
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>
    </form>
  );
}