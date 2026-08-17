'use client';

import React, { useState } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { updateVisiMisiAction } from '@/app/admin/visi-misi/actions';

export default function VisiMisiForm({ initialData }: { initialData: { visi: string; misi: string[] } }) {
  const [misiList, setMisiList] = useState<string[]>(initialData.misi || ['']);
  const [visi, setVisi] = useState<string>(initialData.visi || '');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMisi = () => {
    setMisiList([...misiList, '']);
  };

  const handleRemoveMisi = (index: number) => {
    setMisiList(misiList.filter((_, i) => i !== index));
  };

  const handleMisiChange = (index: number, value: string) => {
    const updated = [...misiList];
    updated[index] = value;
    setMisiList(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const trimmed = misiList.filter(m => m.trim());
    formData.set('misi', JSON.stringify(trimmed));
    formData.set('visi', visi);
    
    try {
      const result = await updateVisiMisiAction(null, formData);
      
      if (result?.success) {
        setMessage({ type: 'success', text: 'Visi & Misi berhasil disimpan.' });
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

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Visi & Misi TPQ Al-Hasanah</h2>
        
        <div>
          <label htmlFor="visi" className="block text-sm font-medium text-gray-700 mb-1">
            Visi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="visi"
            name="visi"
            rows={4}
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Misi <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAddMisi}
              className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              <Plus size={14} /> Tambah Misi
            </button>
          </div>

          <div className="space-y-2">
            {misiList.map((misi, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-6 shrink-0">{index + 1}.</span>
                <input
                  type="text"
                  value={misi}
                  onChange={(e) => handleMisiChange(index, e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
                  placeholder={`Misi ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMisi(index)}
                  disabled={misiList.length <= 1}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
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