'use client';

import React from 'react';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { saveSubjectAction, deleteSubjectAction, reorderSubjectsAction } from './actions';
import { type SubjectItem } from '@/lib/db';

export default function SubjectClientPage({ initialData }: { initialData: SubjectItem[] }) {
  return (
    <CollectionEditor<SubjectItem>
      title="Manajemen Mata Pelajaran"
      items={initialData}
      onSave={saveSubjectAction}
      onDelete={deleteSubjectAction}
      onReorder={reorderSubjectsAction}
      renderItem={(subject) => (
        <div>
          <p className="font-bold text-gray-800">{subject.icon} {subject.title}</p>
          <p className="text-sm text-gray-600">{subject.category}</p>
        </div>
      )}
      renderForm={(item, onChange) => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700">Ikon</label>
              <input
                type="text"
                value={item.icon || ''}
                onChange={(e) => onChange('icon', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
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
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={item.desc || ''}
              onChange={(e) => onChange('desc', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Topik (pisahkan dengan koma)</label>
            <textarea
              value={item.topics?.join(', ') || ''}
              onChange={(e) => onChange('topics', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Tajwid, Makhraj"
            />
          </div>
        </div>
      )}
      emptyItem={{ title: '', category: '', icon: '📚', desc: '', topics: [] }}
    />
  );
}
