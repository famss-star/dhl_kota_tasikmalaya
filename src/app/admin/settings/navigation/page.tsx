'use client';

import { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  parentId?: string;
  active: boolean;
  children?: NavigationItem[];
}

export default function NavigationSettingsPage() {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<NavigationItem | null>(null);

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setNavItems([
          { id: '1', label: 'Beranda', href: '/', order: 1, active: true },
          { id: '2', label: 'Profil', href: '/profil', order: 2, active: true },
          { id: '3', label: 'Informasi', href: '/informasi', order: 3, active: true },
          { id: '4', label: 'Pelayanan', href: '/pelayanan', order: 4, active: true },
          { id: '5', label: 'Galeri', href: '/galeri', order: 5, active: true },
          { id: '6', label: 'Kontak', href: '/kontak', order: 6, active: true }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching navigation:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: NavigationItem = {
      id: editItem ? editItem.id : Date.now().toString(),
      label: formData.get('label') as string || '',
      href: formData.get('href') as string || '',
      order: parseInt(formData.get('order') as string) || 0,
      parentId: formData.get('parentId') as string || undefined,
      active: formData.get('active') === 'on'
    };

    if (editItem) {
      setNavItems(items => items.map(item => 
        item.id === editItem.id ? newItem : item
      ));
    } else {
      setNavItems(items => [...items, newItem]);
    }

    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item: NavigationItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus item navigasi ini?')) {
      setNavItems(items => items.filter(item => item.id !== id));
    }
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const items = [...navItems];
    const index = items.findIndex(item => item.id === id);
    
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
      // Update order
      items[index].order = index + 1;
      items[index - 1].order = index;
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
      // Update order
      items[index].order = index + 1;
      items[index + 1].order = index + 2;
    }
    
    setNavItems(items);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const parentItems = navItems.filter(item => !item.parentId);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pengaturan Navigasi</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Menu
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? 'Edit' : 'Tambah'} Menu Navigasi
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  type="text"
                  name="label"
                  defaultValue={editItem?.label}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Contoh: Beranda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL/Link</label>
                <input
                  type="text"
                  name="href"
                  defaultValue={editItem?.href}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Contoh: /beranda atau https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Urutan</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editItem?.order}
                  className="w-full border rounded px-3 py-2"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Parent Menu</label>
                <select
                  name="parentId"
                  defaultValue={editItem?.parentId || ''}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">-- Menu Utama --</option>
                  {parentItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={editItem?.active ?? true}
                  className="mr-2"
                />
                <label className="text-sm">Aktif</label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editItem ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditItem(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Items List */}
      <div className="grid gap-2">
        {navItems
          .sort((a, b) => a.order - b.order)
          .map((item, index) => (
          <div key={item.id} className="border rounded-lg p-4 flex items-center gap-4">
            {/* Drag Handle */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveItem(item.id, 'up')}
                disabled={index === 0}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                onClick={() => moveItem(item.id, 'down')}
                disabled={index === navItems.length - 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ↓
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold">{item.label}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.active ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">URL:</span> {item.href}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Urutan:</span> {item.order}
                {item.parentId && (
                  <span className="ml-3">
                    <span className="font-medium">Parent:</span> {
                      navItems.find(p => p.id === item.parentId)?.label
                    }
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {navItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Belum ada menu navigasi. Klik tombol "Tambah Menu" untuk memulai.
        </div>
      )}

      {/* Preview */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-3">Preview Navigasi:</h3>
        <div className="flex flex-wrap gap-4">
          {navItems
            .filter(item => item.active && !item.parentId)
            .sort((a, b) => a.order - b.order)
            .map(item => (
            <div key={item.id} className="relative group">
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
              
              {/* Show children if any */}
              {navItems.some(child => child.parentId === item.id && child.active) && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {navItems
                    .filter(child => child.parentId === item.id && child.active)
                    .sort((a, b) => a.order - b.order)
                    .map(child => (
                    <a
                      key={child.id}
                      href={child.href}
                      className="block text-sm text-gray-600 hover:text-gray-800 py-1"
                      onClick={(e) => e.preventDefault()}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
