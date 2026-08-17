'use client';

import React from 'react';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { saveAsatidzAction, deleteAsatidzAction, reorderAsatidzAction } from './actions';
import { type AsatidzItem } from '@/lib/db';

export default function AsatidzClientPage({ initialData }: { initialData: AsatidzItem[] }) {
  return (
    <CollectionEditor<AsatidzItem>
      title="Manajemen Asatidz"
      items={initialData}
      onSave={saveAsatidzAction}
      onDelete={deleteAsatidzAction}
      onReorder={reorderAsatidzAction}
      renderItem={(ustadz) => (
        <div className="flex items-center gap-4">
          <img src={ustadz.image} alt={ustadz.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-bold text-gray-800">{ustadz.name}</p>
            <p className="text-sm text-gray-600">{ustadz.role}</p>
          </div>
        </div>
      )}
      renderForm={(item, onChange) => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => onChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                value={item.role || ''}
                onChange={(e) => onChange('role', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
            <input
              type="text"
              value={item.image || ''}
              onChange={(e) => onChange('image', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={item.bio || ''}
              onChange={(e) => onChange('bio', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kutipan</label>
            <textarea
              value={item.quote || ''}
              onChange={(e) => onChange('quote', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
            />
          </div>
        </div>
      )}
      emptyItem={{ name: '', role: '', bio: '', image: '', quote: '' }}
    />
  );
}
