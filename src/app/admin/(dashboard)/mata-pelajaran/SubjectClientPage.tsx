'use client';

import React from 'react';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { saveSubjectAction, deleteSubjectAction, reorderSubjectsAction } from './actions';
import { type SubjectItem, type IconItem } from '@/lib/db';

export default function SubjectClientPage({ initialData, icons }: { initialData: SubjectItem[]; icons: IconItem[] }) {
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
              <select
                value={item.icon || ''}
                onChange={(e) => onChange('icon', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {icons.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.value} {icon.label}
                  </option>
                ))}
              </select>
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
            <label className="block text-sm font-medium text-gray-700">Topik</label>
            <div className="space-y-2">
              {(item.topics || []).map((topic, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => {
                      const newTopics = [...(item.topics || [])];
                      newTopics[i] = e.target.value;
                      onChange('topics', newTopics);
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => onChange('topics', (item.topics || []).filter((_, index) => index !== i))}
                    className="text-red-500 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onChange('topics', [...(item.topics || []), ''])}
                className="text-sm text-blue-600 font-medium"
              >
                + Tambah Topik
              </button>
            </div>
          </div>
        </div>
      )}
      emptyItem={{ title: '', category: '', icon: '📚', desc: '', topics: [] }}
    />
  );
}
