'use client';

import React from 'react';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { saveActivityAction, deleteActivityAction, reorderActivitiesAction } from './actions';
import { type ActivityItem } from '@/lib/db';

export default function ActivityClientPage({ initialData }: { initialData: ActivityItem[] }) {
  return (
    <CollectionEditor<ActivityItem>
      title="Manajemen Kegiatan"
      items={initialData}
      onSave={saveActivityAction}
      onDelete={deleteActivityAction}
      onReorder={reorderActivitiesAction}
      renderItem={(activity) => (
        <div className="flex items-center gap-4">
          <img src={activity.image} alt={activity.title} className="w-16 h-12 rounded object-cover" />
          <div>
            <p className="font-bold text-gray-800">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.category} • {activity.date}</p>
          </div>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori</label>
              <input
                type="text"
                value={item.category || ''}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="text"
                value={item.date || ''}
                onChange={(e) => onChange('date', e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={item.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
        </div>
      )}
      emptyItem={{ title: '', category: '', date: '', image: '', description: '' }}
    />
  );
}
