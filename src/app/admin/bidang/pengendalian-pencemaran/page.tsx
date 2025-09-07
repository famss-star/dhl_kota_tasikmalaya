"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Save, Trash2, Plus, Award, AlertTriangle } from "lucide-react";
import { useBidangData } from "@/hooks/useBidangData";

export default function AdminBidangPengendalianPencemaranPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState<number>(250);
  const contentRef = useRef<HTMLUListElement>(null);
  const {
    bidangData,
    setBidangData,
    isLoading: isLoadingData,
    error,
    updateBidangData,
  } = useBidangData("pengendalian-pencemaran");

  const DINAS_NAME = "Dinas Lingkungan Hidup Kota Tasikmalaya";

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    // Update height when bidangData changes or showAll changes
    if (bidangData) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(updateHeight, 100);
    }
  }, [showAll, bidangData?.tugasPokok]);

  const handleSave = async () => {
    if (!bidangData) return;

    setIsLoading(true);
    try {
      await updateBidangData(bidangData);
      alert("Data Bidang Pengendalian Pencemaran berhasil disimpan!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan data Bidang Pengendalian Pencemaran"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addTugas = () => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            tugasPokok: [...prev.tugasPokok, ""],
          }
        : null
    );
  };

  const removeTugas = (index: number) => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            tugasPokok: prev.tugasPokok.filter((_, i) => i !== index),
          }
        : null
    );
  };

  const updateTugas = (index: number, value: string) => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            tugasPokok: prev.tugasPokok.map((tugas, i) =>
              i === index ? value : tugas
            ),
          }
        : null
    );
  };

  const addFungsi = () => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            fungsi: [...prev.fungsi, ""],
          }
        : null
    );
  };

  const removeFungsi = (index: number) => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            fungsi: prev.fungsi.filter((_, i) => i !== index),
          }
        : null
    );
  };

  const updateFungsi = (index: number, value: string) => {
    if (!bidangData) return;
    setBidangData((prev) =>
      prev
        ? {
            ...prev,
            fungsi: prev.fungsi.map((fungsiItem, i) =>
              i === index ? value : fungsiItem
            ),
          }
        : null
    );
  };

  // Loading state
  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                Error
              </h3>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!bidangData) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
                Data Tidak Ditemukan
              </h3>
              <p className="text-yellow-700 dark:text-yellow-400">
                Data bidang pengendalian pencemaran tidak ditemukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-9 h-9 text-white" />
              {bidangData.name}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola informasi {bidangData.name} {DINAS_NAME}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("info")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "info"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Edit Informasi
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "preview"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Preview
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Bidang
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={bidangData.name}
                    onChange={(e) =>
                      setBidangData((prev) =>
                        prev
                          ? {
                              ...prev,
                              name: e.target.value,
                            }
                          : null
                      )
                    }
                    placeholder="Nama bidang..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={bidangData.active ? "aktif" : "non-aktif"}
                    onChange={(e) =>
                      setBidangData((prev) =>
                        prev
                          ? {
                              ...prev,
                              active: e.target.value === "aktif",
                            }
                          : null
                      )
                    }
                  >
                    <option value="aktif">Aktif</option>
                    <option value="non-aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              {/* About Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Tentang Bidang
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={bidangData.aboutTitle}
                  onChange={(e) =>
                    setBidangData((prev) =>
                      prev
                        ? {
                            ...prev,
                            aboutTitle: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Tentang bidang..."
                />
              </div>

              {/* About Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Tentang Bidang
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={bidangData.aboutDescription}
                  onChange={(e) =>
                    setBidangData((prev) =>
                      prev
                        ? {
                            ...prev,
                            aboutDescription: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Deskripsi tentang bidang..."
                />
              </div>

              {/* Tugas Pokok Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Tugas Pokok
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={bidangData.tugasPokokTitle}
                  onChange={(e) =>
                    setBidangData((prev) =>
                      prev
                        ? {
                            ...prev,
                            tugasPokokTitle: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Tugas Pokok"
                />
              </div>

              {/* Tugas Pokok */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daftar Tugas Pokok
                  </label>
                  <button
                    type="button"
                    onClick={addTugas}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Tugas
                  </button>
                </div>
                <div className="space-y-3">
                  {bidangData.tugasPokok.map((tugas, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400 min-w-[2rem]">
                        {index + 1}.
                      </span>
                      <textarea
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={tugas}
                        onChange={(e) => updateTugas(index, e.target.value)}
                        placeholder={`Tugas pokok ${index + 1}...`}
                      />
                      <button
                        type="button"
                        onClick={() => removeTugas(index)}
                        className="mt-2 p-1 text-red-600 hover:text-red-700 focus:outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fungsi Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Fungsi
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={bidangData.fungsiTitle}
                  onChange={(e) =>
                    setBidangData((prev) =>
                      prev
                        ? {
                            ...prev,
                            fungsiTitle: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="Fungsi"
                />
              </div>

              {/* Fungsi */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daftar Fungsi
                  </label>
                  <button
                    type="button"
                    onClick={addFungsi}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah Fungsi
                  </button>
                </div>
                <div className="space-y-3">
                  {bidangData.fungsi.map((fungsiItem, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400 min-w-[2rem]">
                        {index + 1}.
                      </span>
                      <textarea
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={fungsiItem}
                        onChange={(e) => updateFungsi(index, e.target.value)}
                        placeholder={`Fungsi ${index + 1}...`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFungsi(index)}
                        className="mt-2 p-1 text-red-600 hover:text-red-700 focus:outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {/* Hero Section */}
              <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                      <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                        {bidangData.name}
                      </h1>
                    </div>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                      {DINAS_NAME}
                    </p>
                  </div>
                </div>
              </section>

              <div className="container mx-auto px-4 py-12">
                {/* Deskripsi Bidang Pengendalian Pencemaran */}
                <section className="max-w-6xl mx-auto mb-8">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                        {bidangData.aboutTitle}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                        <span className="font-bold">{bidangData.name}</span>{" "}
                        {bidangData.aboutDescription}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Rincian Tugas Bidang Pengendalian Pencemaran */}
                <section className="max-w-6xl mx-auto mb-12">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                      <div className="flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      {bidangData.tugasPokokTitle}
                    </h3>

                    {/* Content with fade effect when collapsed */}
                    <div className="relative">
                      <div
                        style={{
                          height: showAll ? height : "400px",
                          overflow: "hidden",
                          transition:
                            "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <ul
                          ref={contentRef}
                          className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300"
                        >
                          {bidangData.tugasPokok.map((tugas, index) => (
                            <li
                              key={index}
                              className={`transform transition-all duration-500 ease-out ${
                                showAll
                                  ? "opacity-100 translate-y-0 scale-100"
                                  : index < 6
                                  ? "opacity-100 translate-y-0 scale-100"
                                  : "opacity-60 translate-y-0 scale-100"
                              }`}
                              style={{
                                transitionDelay: `${index * 30}ms`,
                              }}
                            >
                              {tugas}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fade overlay when collapsed */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                          showAll
                            ? "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      ></div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                        onClick={() => setShowAll((v) => !v)}
                      >
                        {showAll
                          ? "Tampilkan Lebih Sedikit"
                          : "Tampilkan Semua"}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Fungsi */}
                <section className="max-w-6xl mx-auto mb-12">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                      <div className="flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      {bidangData.fungsiTitle}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {bidangData.fungsi.map((fungsiItem, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                        >
                          <span className="bg-blue-100 dark:bg-blue-900 text-green-600 dark:text-blue-400 rounded-full min-w-[1.5rem] min-h-[1.5rem] flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {fungsiItem}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Back to Bidang */}
                <section>
                  <div className="text-center">
                    <a
                      href="/bidang"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Kembali ke Daftar Bidang
                    </a>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
