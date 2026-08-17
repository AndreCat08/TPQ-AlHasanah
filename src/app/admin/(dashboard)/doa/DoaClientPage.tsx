'use client';

import React from 'react';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { saveDoaAction, deleteDoaAction, reorderDoasAction } from './actions';
import { type SampleDoaItem } from '@/lib/db';

export default function DoaClientPage({ initialData }: { initialData: SampleDoaItem[] }) {
  return (
    <CollectionEditor<SampleDoaItem>
      title="Manajemen Doa"
      items={initialData}
      onSave={saveDoaAction}
      onDelete={deleteDoaAction}
      onReorder={reorderDoasAction}
      renderItem={(doa) => (
        <div>
          <p className="font-bold text-gray-800">{doa.title}</p>
          <p className="text-sm text-gray-600 truncate">{doa.meaning}</p>
        </div>
      )}
      renderForm={(item, onChange) => (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              value={item.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Arab</label>
            <textarea
              value={item.arabic || ''}
              onChange={(e) => onChange('arabic', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-right focus:ring-2 focus:ring-blue-500 outline-none"
              dir="rtl"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Latin</label>
            <textarea
              value={item.latin || ''}
              onChange={(e) => onChange('latin', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Arti</label>
            <textarea
              value={item.meaning || ''}
              onChange={(e) => onChange('meaning', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
        </div>
      )}
      emptyItem={{ title: '', arabic: '', latin: '', meaning: '' }}
    />
  );
}
