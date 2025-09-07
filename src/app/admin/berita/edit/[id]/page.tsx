"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Newspaper, ChevronLeft } from "lucide-react";

interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  tags?: string[];
  isPublished: boolean;
  authorId: string;
}

export default function EditBerita() {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<News>({
    id: "",
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    thumbnail: "",
    tags: [],
    isPublished: false,
    authorId: "",
  });

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${newsId}?admin=true`);
      const data = await response.json();

      if (data.success) {
        const news: News = data.data;
        setFormData({
          id: news.id,
          title: news.title,
          slug: news.slug,
          content: news.content,
          excerpt: news.excerpt || "",
          thumbnail: news.thumbnail || "",
          tags: news.tags || [],
          isPublished: news.isPublished,
          authorId: news.authorId,
        });
      } else {
        alert(data.error || "Berita tidak ditemukan");
        router.push("/admin/berita");
      }
    } catch (error) {
      console.error("Fetch news error:", error);
      alert("Terjadi kesalahan saat memuat berita");
      router.push("/admin/berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar. Maksimal 5MB.");
      return;
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Tipe file tidak didukung. Gunakan PNG, JPG, JPEG, atau WebP.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: result.data?.url || result.imageUrl || "",
        }));
        alert("Gambar berhasil diupload!");
      } else {
        alert(result.error || "Gagal mengupload gambar");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengupload gambar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/news/${newsId}?admin=true`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          thumbnail: formData.thumbnail,
          tags: formData.tags,
          isPublished: formData.isPublished,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Berita berhasil diupdate!");
        router.push("/admin/berita");
      } else {
        alert(data.error || "Gagal mengupdate berita");
      }
    } catch (error) {
      console.error("Update news error:", error);
      alert("Terjadi kesalahan saat mengupdate berita");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-24 w-24 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Memuat berita...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Newspaper className="w-9 h-9 text-white" />
              Edit Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Update berita untuk website DLH
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Form Edit Berita
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Judul Berita *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan judul berita"
              />
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ringkasan
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Ringkasan singkat berita"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gambar Thumbnail
              </label>

              {/* File Upload Section */}
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Klik untuk upload</span>{" "}
                        atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, JPEG atau WebP (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {formData.thumbnail && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Preview Gambar:
                  </p>
                  <div className="relative">
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, thumbnail: "" })
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* URL Input as Alternative */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Atau masukkan URL gambar
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/image.jpg atau /uploads/news/image.jpg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Konten Berita *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tulis konten berita di sini..."
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={
                  Array.isArray(formData.tags) ? formData.tags.join(", ") : ""
                }
                onChange={handleTagsChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan tags dipisah koma, contoh: lingkungan, kesehatan, teknologi"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Pisahkan dengan koma untuk membuat beberapa tag
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPublished"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Publikasikan berita
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Menyimpan..." : "Update Berita"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
