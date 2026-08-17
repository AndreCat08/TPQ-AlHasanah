'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ChevronUp, ChevronDown, Save, X, Loader2 } from 'lucide-react';

interface CollectionEditorProps<T> {
  title: string;
  items: T[];
  onSave: (item: Partial<T>) => Promise<any>;
  onDelete: (id: number) => Promise<any>;
  onReorder: (orderedIds: number[]) => Promise<any>;
  renderItem: (item: T) => React.ReactNode;
  renderForm: (item: Partial<T>, onChange: (field: keyof T, value: any) => void) => React.ReactNode;
  emptyItem: Partial<T>;
}

export default function CollectionEditor<T extends { id: number }>({
  title,
  items,
  onSave,
  onDelete,
  onReorder,
  renderItem,
  renderForm,
  emptyItem,
}: CollectionEditorProps<T>) {
  const [localItems, setLocalItems] = useState<T[]>(items);
  const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newItems = [...localItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newItems.length) return;
    
    const [movedItem] = newItems.splice(index, 1);
    newItems.splice(newIndex, 0, movedItem);
    
    setLocalItems(newItems);
    try {
      await onReorder(newItems.map(item => item.id));
    } catch (error) {
      setLocalItems(items); // Rollback
      setMessage({ type: 'error', text: 'Gagal mengubah urutan.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    try {
      await onDelete(id);
      setMessage({ type: 'success', text: 'Item berhasil dihapus.' });
      setLocalItems(localItems.filter(item => item.id !== id));
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal menghapus item.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const result = await onSave(editingItem);
      if (result?.success) {
        setMessage({ type: 'success', text: 'Berhasil disimpan.' });
        setEditingItem(null);
        // We'll need to refresh the list, so better to reload or use a more complex state
        window.location.reload();
      } else {
        setMessage({ 
          type: 'error', 
          text: result?.errors?._form?.[0] || 'Gagal menyimpan.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm border ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => setEditingItem(emptyItem)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus size={18} /> Tambah Baru
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {localItems.map((item, index) => (
            <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-0"
                >
                  <ChevronUp size={20} />
                </button>
                <button
                  disabled={index === localItems.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-0"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                {renderItem(item)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
          {localItems.length === 0 && (
            <li className="p-12 text-center text-gray-500">Belum ada data.</li>
          )}
        </ul>
      </div>

      {/* Modal Form */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800">
                {editingItem.id ? 'Edit Item' : 'Tambah Baru'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {renderForm(editingItem, (field, value) => setEditingItem({ ...editingItem, [field]: value }))}
              
              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium text-sm"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
