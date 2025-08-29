'use client';

import Link from 'next/link';
import { useState } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
}

export default function HomepageCarouselPage() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([
    {
      id: 1,
      title: 'Slide 1',
      description: 'Deskripsi slide 1',
      image: '/banner1.jpg',
      link: '#',
      active: true
    },
    {
      id: 2,
      title: 'Slide 2', 
      description: 'Deskripsi slide 2',
      image: '/banner2.png',
      link: '#',
      active: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<CarouselItem | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: CarouselItem = {
      id: editItem ? editItem.id : Date.now(),
      title: formData.get('title') as string || '',
      description: formData.get('description') as string || '',
      image: formData.get('image') as string || '',
      link: formData.get('link') as string || '',
      active: formData.get('active') === 'on'
    };

    if (editItem) {
      setCarouselItems(items => items.map(item => 
        item.id === editItem.id ? newItem : item
      ));
    } else {
      setCarouselItems(items => [...items, newItem]);
    }

    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item: CarouselItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Hapus item carousel ini?')) {
      setCarouselItems(items => items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Carousel Homepage</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Slide
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? 'Edit' : 'Tambah'} Slide Carousel
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editItem?.title}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  defaultValue={editItem?.description}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editItem?.image}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Link (Opsional)</label>
                <input
                  type="url"
                  name="link"
                  defaultValue={editItem?.link}
                  className="w-full border rounded px-3 py-2"
                />
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

      {/* Carousel Items List */}
      <div className="grid gap-4">
        {carouselItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.active ? 'Aktif' : 'Tidak Aktif'}
                </span>
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Link
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
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

      {carouselItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Belum ada slide carousel. Klik tombol &quot;Tambah Slide&quot; untuk memulai.
        </div>
      )}
    </div>
  );
}
