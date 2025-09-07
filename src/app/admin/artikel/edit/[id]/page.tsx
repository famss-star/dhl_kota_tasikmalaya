"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Save,
  FileText,
  ChevronLeft,
  Image,
  User,
  Tag,
  Folder,
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  tags?: string[];
  isPublished: boolean;
  categoryId: string;
  authorId: string;
}

export default function EditArtikel() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Article>({
    id: "",
    title: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    tags: [],
    isPublished: false,
    categoryId: "",
    authorId: "",
  });

  // Fetch article data
  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}?admin=true`);
      const data = await response.json();

      if (response.ok && data.success) {
        const article = data.data;
        setFormData({
          id: article.id,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt || "",
          featuredImage: article.featuredImage || "",
          tags: article.tags || [],
          isPublished: article.isPublished,
          categoryId: article.categoryId || "",
          authorId: article.authorId,
        });
      } else {
        alert("Artikel tidak ditemukan");
        router.push("/admin/artikel");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      alert("Gagal mengambil data artikel");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
      fetchCategories();
    }
  }, [articleId]);

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
          featuredImage: result.data?.url || result.imageUrl || "",
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
      const response = await fetch(`/api/articles/${articleId}?admin=true`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          categoryId: formData.categoryId,
          featuredImage: formData.featuredImage, // Map featuredImage untuk API
          tags: formData.tags,
          isPublished: formData.isPublished,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Artikel berhasil diupdate!");
        router.push("/admin/artikel");
      } else {
        alert(data.error || "Gagal mengupdate artikel");
      }
    } catch (error) {
      console.error("Update article error:", error);
      alert("Terjadi kesalahan saat mengupdate artikel");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Memuat data artikel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="w-9 h-9 text-white" />
              Edit Artikel
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Update artikel untuk website DLH
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/admin/artikel"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Edit Artikel
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Judul Artikel *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan judul artikel"
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
                placeholder="Ringkasan singkat artikel"
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Kategori *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gambar Utama
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
              {formData.featuredImage && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Preview Gambar:
                  </p>
                  <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}

              {/* URL Input as Alternative */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <label
                  htmlFor="featuredImage"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Atau masukkan URL Gambar Eksternal
                </label>
                <input
                  type="text"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/image.jpg atau /uploads/articles/image.jpg"
                />
              </div>
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
                  typeof formData.tags === "string"
                    ? formData.tags
                    : formData.tags?.join(", ") || ""
                }
                onChange={handleTagsChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan tags dipisah koma, contoh: lingkungan, kesehatan, teknologi"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Pisahkan dengan koma untuk membuat beberapa tag
              </p>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Konten Artikel *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tulis konten artikel di sini..."
              />
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
                Publikasikan artikel
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Menyimpan..." : "Perbarui Artikel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
