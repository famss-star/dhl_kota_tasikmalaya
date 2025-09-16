"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Info,
  Target,
  Plus,
  Trash2,
  Image,
  Eye,
  EyeOff,
  RefreshCw,
  ClipboardList,
  FileText,
} from "lucide-react";

interface AboutData {
  visi: string;
  misi: string[];
  tentangKami: string;
  tupoksi: {
    tugasPokok: string;
    kepalaDinas: string[];
    sekretariat: {
      deskripsi: string;
      tugas: string[];
    };
    subUmum: {
      deskripsi: string;
      tugas: string[];
    };
    subKeuangan: {
      deskripsi: string;
      tugas: string[];
    };
  };
}

export default function AdminTentangPage() {
  const [activeTab, setActiveTab] = useState("tentang-kami");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // State untuk data dari database
  const [aboutData, setAboutData] = useState<AboutData>({
    visi: "",
    misi: [""],
    tentangKami: "",
    tupoksi: {
      tugasPokok: "",
      kepalaDinas: [],
      sekretariat: {
        deskripsi: "",
        tugas: [],
      },
      subUmum: {
        deskripsi: "",
        tugas: [],
      },
      subKeuangan: {
        deskripsi: "",
        tugas: [],
      },
    },
  });

  // State untuk Tentang DLH
  const [tentangData, setTentangData] = useState({
    deskripsi: "",
    deskripsi_lanjutan: "",
    alamat: "Jl. Noenoeng Tisnasapoetra No.5 Kota Tasikmalaya",
    tugas_pokok: "",
    fungsi: "",
    logo_url: "/logo-dlh.png",
  });

  // State untuk Visi & Misi
  const [visiMisiData, setVisiMisiData] = useState({
    visi: "",
    misi: [""],
  });

  // State untuk Tupoksi
  const [tupoksiData, setTupoksiData] = useState({
    tugasPokok: "",
    kepalaDinas: {
      deskripsi: "",
      tugas: [""],
    },
    sekretariat: {
      deskripsi: "",
      tugas: [""],
    },
    subUmum: {
      deskripsi: "",
      tugas: [""],
    },
    subKeuangan: {
      deskripsi: "",
      tugas: [""],
    },
  });

  // Load data dari database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/tentang");
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);

          // Set data ke form
          setVisiMisiData({
            visi: data.visi,
            misi: data.misi.length > 0 ? data.misi : [""],
          });

          // Set data tentang kami langsung
          setTentangData((prev) => ({
            ...prev,
            deskripsi: data.tentangKami || "",
          }));

          // Set data tupoksi
          if (data.tupoksi) {
            setTupoksiData({
              tugasPokok: data.tupoksi.tugasPokok || "",
              kepalaDinas: {
                deskripsi: data.tupoksi.kepalaDinas?.deskripsi || "",
                tugas:
                  data.tupoksi.kepalaDinas?.tugas &&
                  data.tupoksi.kepalaDinas.tugas.length > 0
                    ? data.tupoksi.kepalaDinas.tugas
                    : [""],
              },
              sekretariat: {
                deskripsi: data.tupoksi.sekretariat?.deskripsi || "",
                tugas:
                  data.tupoksi.sekretariat?.tugas &&
                  data.tupoksi.sekretariat.tugas.length > 0
                    ? data.tupoksi.sekretariat.tugas
                    : [""],
              },
              subUmum: {
                deskripsi: data.tupoksi.subUmum?.deskripsi || "",
                tugas:
                  data.tupoksi.subUmum?.tugas &&
                  data.tupoksi.subUmum.tugas.length > 0
                    ? data.tupoksi.subUmum.tugas
                    : [""],
              },
              subKeuangan: {
                deskripsi: data.tupoksi.subKeuangan?.deskripsi || "",
                tugas:
                  data.tupoksi.subKeuangan?.tugas &&
                  data.tupoksi.subKeuangan.tugas.length > 0
                    ? data.tupoksi.subKeuangan.tugas
                    : [""],
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: "tentang-kami", label: "Tentang Kami", icon: FileText },
    { id: "visi-misi", label: "Visi & Misi", icon: Target },
    { id: "tupoksi", label: "Tupoksi", icon: ClipboardList },
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      let updateData = {};

      if (section === "tentang") {
        // Gunakan hanya field deskripsi saja
        updateData = {
          tentangKami: tentangData.deskripsi,
        };
      } else if (section === "visi-misi") {
        updateData = {
          visi: visiMisiData.visi,
          misi: visiMisiData.misi.filter((m) => m.trim() !== ""),
        };
      } else if (section === "tupoksi") {
        updateData = {
          tupoksi: {
            tugasPokok: tupoksiData.tugasPokok,
            kepalaDinas: {
              deskripsi: tupoksiData.kepalaDinas.deskripsi,
              tugas: tupoksiData.kepalaDinas.tugas.filter(
                (t) => t.trim() !== ""
              ),
            },
            sekretariat: {
              deskripsi: tupoksiData.sekretariat.deskripsi,
              tugas: tupoksiData.sekretariat.tugas.filter(
                (t) => t.trim() !== ""
              ),
            },
            subUmum: {
              deskripsi: tupoksiData.subUmum.deskripsi,
              tugas: tupoksiData.subUmum.tugas.filter((t) => t.trim() !== ""),
            },
            subKeuangan: {
              deskripsi: tupoksiData.subKeuangan.deskripsi,
              tugas: tupoksiData.subKeuangan.tugas.filter(
                (t) => t.trim() !== ""
              ),
            },
          },
        };
      }

      const response = await fetch("/api/admin/tentang", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert(`Data ${section} berhasil disimpan!`);

        // Refresh data
        const fetchResponse = await fetch("/api/admin/tentang");
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setAboutData(data);
        }
      } else {
        throw new Error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Gagal menyimpan data ${section}`);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setDataLoading(true);
    try {
      const response = await fetch("/api/admin/tentang");
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);

        // Update form data
        setVisiMisiData({
          visi: data.visi,
          misi: data.misi.length > 0 ? data.misi : [""],
        });

        setTentangData((prev) => ({
          ...prev,
          deskripsi: data.tentangKami || "",
        }));
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const addMisi = () => {
    setVisiMisiData((prev) => ({
      ...prev,
      misi: [...prev.misi, ""],
    }));
  };

  const removeMisi = (index: number) => {
    setVisiMisiData((prev) => ({
      ...prev,
      misi: prev.misi.filter((_, i) => i !== index),
    }));
  };

  const updateMisi = (index: number, value: string) => {
    setVisiMisiData((prev) => ({
      ...prev,
      misi: prev.misi.map((item, i) => (i === index ? value : item)),
    }));
  };

  // Helper functions untuk tupoksi
  const addKepalaDinas = () => {
    setTupoksiData((prev) => ({
      ...prev,
      kepalaDinas: {
        ...prev.kepalaDinas,
        tugas: [...prev.kepalaDinas.tugas, ""],
      },
    }));
  };

  const removeKepalaDinas = (index: number) => {
    setTupoksiData((prev) => ({
      ...prev,
      kepalaDinas: {
        ...prev.kepalaDinas,
        tugas: prev.kepalaDinas.tugas.filter((_, i) => i !== index),
      },
    }));
  };

  const updateKepalaDinas = (index: number, value: string) => {
    setTupoksiData((prev) => ({
      ...prev,
      kepalaDinas: {
        ...prev.kepalaDinas,
        tugas: prev.kepalaDinas.tugas.map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const updateKepalaDinasDesc = (value: string) => {
    setTupoksiData((prev) => ({
      ...prev,
      kepalaDinas: {
        ...prev.kepalaDinas,
        deskripsi: value,
      },
    }));
  };

  // Helper functions untuk Sekretariat
  const addSekretariatTugas = () => {
    setTupoksiData((prev) => ({
      ...prev,
      sekretariat: {
        ...prev.sekretariat,
        tugas: [...prev.sekretariat.tugas, ""],
      },
    }));
  };

  const removeSekretariatTugas = (index: number) => {
    setTupoksiData((prev) => ({
      ...prev,
      sekretariat: {
        ...prev.sekretariat,
        tugas: prev.sekretariat.tugas.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSekretariatTugas = (index: number, value: string) => {
    setTupoksiData((prev) => ({
      ...prev,
      sekretariat: {
        ...prev.sekretariat,
        tugas: prev.sekretariat.tugas.map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  // Helper functions untuk Sub Bagian Umum
  const addSubUmumTugas = () => {
    setTupoksiData((prev) => ({
      ...prev,
      subUmum: {
        ...prev.subUmum,
        tugas: [...prev.subUmum.tugas, ""],
      },
    }));
  };

  const removeSubUmumTugas = (index: number) => {
    setTupoksiData((prev) => ({
      ...prev,
      subUmum: {
        ...prev.subUmum,
        tugas: prev.subUmum.tugas.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSubUmumTugas = (index: number, value: string) => {
    setTupoksiData((prev) => ({
      ...prev,
      subUmum: {
        ...prev.subUmum,
        tugas: prev.subUmum.tugas.map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  // Helper functions untuk Sub Bagian Keuangan
  const addSubKeuanganTugas = () => {
    setTupoksiData((prev) => ({
      ...prev,
      subKeuangan: {
        ...prev.subKeuangan,
        tugas: [...prev.subKeuangan.tugas, ""],
      },
    }));
  };

  const removeSubKeuanganTugas = (index: number) => {
    setTupoksiData((prev) => ({
      ...prev,
      subKeuangan: {
        ...prev.subKeuangan,
        tugas: prev.subKeuangan.tugas.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSubKeuanganTugas = (index: number, value: string) => {
    setTupoksiData((prev) => ({
      ...prev,
      subKeuangan: {
        ...prev.subKeuangan,
        tugas: prev.subKeuangan.tugas.map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Info className="w-9 h-9 text-white" />
              Manajemen Profil & Tentang
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola informasi tentang DLH, visi misi, dan struktur organisasi
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center px-6 py-4">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                  showPreview
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-red-200 dark:hover:bg-red-500 dark:hover:text-gray-100"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-500/30 dark:hover:bg-green-900"
                }`}
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
              </button>
              <button
                onClick={refreshData}
                disabled={dataLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
              >
                <RefreshCw
                  className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`}
                />
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {dataLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Tab: Tentang DLH */}
              {activeTab === "tentang-kami" && (
                <div className="space-y-6">
                  {/* Preview Section */}
                  {showPreview && (
                    <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-green-600" />
                        Preview Halaman Tentang
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-4 border-green-500 pb-2">
                            Tentang Kami
                          </h4>
                          {tentangData.deskripsi && (
                            <div className="text-gray-700 dark:text-gray-300">
                              {tentangData.deskripsi
                                .split("\n")
                                .map((paragraph, index) => (
                                  <p key={index} className="mb-4 indent-8">
                                    {index === 0 && (
                                      <span className="font-bold">
                                        Dinas Lingkungan Hidup Kota Tasikmalaya{" "}
                                      </span>
                                    )}
                                    {paragraph}
                                  </p>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi Tentang DLH Kota Tasikmalaya
                    </label>
                    <textarea
                      value={tentangData.deskripsi}
                      onChange={(e) =>
                        setTentangData((prev) => ({
                          ...prev,
                          deskripsi: e.target.value,
                        }))
                      }
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi tentang DLH Kota Tasikmalaya... 

Gunakan Enter untuk membuat paragraf baru."
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Tips: Tekan Enter untuk membuat paragraf baru. Paragraf
                      pertama akan secara otomatis ditambahkan prefix &quot;Dinas
                      Lingkungan Hidup Kota Tasikmalaya&quot;.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave("tentang")}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                      {isLoading ? "Menyimpan..." : "Simpan Tentang"}
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: Visi & Misi */}
              {activeTab === "visi-misi" && (
                <div className="space-y-6">
                  {/* Preview Visi Misi */}
                  {showPreview && (
                    <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-green-600" />
                        Preview Visi & Misi
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Visi Preview */}
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <h4 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                              VISI
                            </h4>
                            <div className="text-center">
                              <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                                &quot;{visiMisiData.visi}&quot;
                              </p>
                            </div>
                          </div>

                          {/* Misi Preview */}
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <h4 className="text-2xl font-bold text-blue-600 dark:text-sky-600 mb-4 text-center">
                              MISI
                            </h4>
                            <ul className="space-y-3">
                              {visiMisiData.misi.map((misi, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                    {index + 1}
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                                    {misi}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Kolom Visi */}
                    <section>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Visi
                      </label>
                      <textarea
                        value={visiMisiData.visi}
                        onChange={(e) =>
                          setVisiMisiData((prev) => ({
                            ...prev,
                            visi: e.target.value,
                          }))
                        }
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Visi DLH Kota Tasikmalaya..."
                      />
                    </section>

                    {/* Kolom Misi */}
                    <section>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Misi
                        </label>
                        <button
                          onClick={addMisi}
                          className="flex items-center gap-2 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          <Plus className="w-3 h-3" />
                          Tambah
                        </button>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {visiMisiData.misi.map((misi, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                              {index + 1}
                            </div>
                            <textarea
                              value={misi}
                              onChange={(e) =>
                                updateMisi(index, e.target.value)
                              }
                              rows={2}
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              placeholder={`Misi ${index + 1}...`}
                            />
                            {visiMisiData.misi.length > 1 && (
                              <button
                                onClick={() => removeMisi(index)}
                                className="flex-shrink-0 w-6 h-6 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded flex items-center justify-center mt-1 transition-colors duration-200"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave("visi-misi")}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                      {isLoading ? "Menyimpan..." : "Simpan Visi & Misi"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Tab: Tupoksi */}
          {activeTab === "tupoksi" && (
            <div className="space-y-6">
              {/* Preview Tupoksi */}
              {showPreview && (
                <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-600" />
                    Preview Tupoksi
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                        Tugas Pokok dan Fungsi
                      </h4>

                      {/* Tugas Pokok */}
                      {tupoksiData.tugasPokok && (
                        <div className="mb-6">
                          <h5 className="text-xl font-semibold text-blue-600 dark:text-sky-500 mb-4">
                            Tugas Pokok:
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                            <span className="font-bold">
                              Dinas Lingkungan Hidup Daerah
                            </span>{" "}
                            {tupoksiData.tugasPokok}
                          </p>
                        </div>
                      )}

                      <h5 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                        Rincian Tugas Unit:
                      </h5>

                      {/* Kepala Dinas */}
                      <div className="mb-6">
                        <h6 className="font-bold text-gray-800 dark:text-white mb-2">
                          Kepala Dinas
                        </h6>
                        {tupoksiData.kepalaDinas.deskripsi && (
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                            {tupoksiData.kepalaDinas.deskripsi}
                          </p>
                        )}
                        {tupoksiData.kepalaDinas.tugas.filter((t) => t.trim())
                          .length > 0 && (
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            {tupoksiData.kepalaDinas.tugas
                              .filter((t) => t.trim())
                              .map((tugas, index) => (
                                <li key={index}>{tugas}</li>
                              ))}
                          </ul>
                        )}
                      </div>

                      {/* Sekretariat */}
                      <div className="mb-6">
                        <h6 className="font-bold text-gray-800 dark:text-white mb-2">
                          Sekretariat
                        </h6>
                        {tupoksiData.sekretariat.deskripsi && (
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                            {tupoksiData.sekretariat.deskripsi}
                          </p>
                        )}
                        {tupoksiData.sekretariat.tugas.filter((t) => t.trim())
                          .length > 0 && (
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            {tupoksiData.sekretariat.tugas
                              .filter((t) => t.trim())
                              .map((tugas, index) => (
                                <li key={index}>{tugas}</li>
                              ))}
                          </ul>
                        )}
                      </div>

                      {/* Sub Bagian Umum dan Kepegawaian */}
                      <div className="mb-6">
                        <h6 className="font-bold text-gray-800 dark:text-white mb-2">
                          Sub Bagian Umum dan Kepegawaian
                        </h6>
                        {tupoksiData.subUmum.deskripsi && (
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                            {tupoksiData.subUmum.deskripsi}
                          </p>
                        )}
                        {tupoksiData.subUmum.tugas.filter((t) => t.trim())
                          .length > 0 && (
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            {tupoksiData.subUmum.tugas
                              .filter((t) => t.trim())
                              .map((tugas, index) => (
                                <li key={index}>{tugas}</li>
                              ))}
                          </ul>
                        )}
                      </div>

                      {/* Sub Bagian Keuangan */}
                      <div className="mb-6">
                        <h6 className="font-bold text-gray-800 dark:text-white mb-2">
                          Sub Bagian Keuangan
                        </h6>
                        {tupoksiData.subKeuangan.deskripsi && (
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                            {tupoksiData.subKeuangan.deskripsi}
                          </p>
                        )}
                        {tupoksiData.subKeuangan.tugas.filter((t) => t.trim())
                          .length > 0 && (
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            {tupoksiData.subKeuangan.tugas
                              .filter((t) => t.trim())
                              .map((tugas, index) => (
                                <li key={index}>{tugas}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tugas Pokok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tugas Pokok
                </label>
                <textarea
                  value={tupoksiData.tugasPokok}
                  onChange={(e) =>
                    setTupoksiData((prev) => ({
                      ...prev,
                      tugasPokok: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Tugas pokok DLH..."
                />
              </div>

              {/* Kepala Dinas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Kepala Dinas
                </label>
                <textarea
                  value={tupoksiData.kepalaDinas.deskripsi}
                  onChange={(e) => updateKepalaDinasDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-4"
                  placeholder="Deskripsi tugas kepala dinas..."
                />

                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tugas Kepala Dinas
                  </label>
                  <button
                    onClick={addKepalaDinas}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Tugas
                  </button>
                </div>

                <div className="space-y-3">
                  {tupoksiData.kepalaDinas.tugas.map((tugas, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                        {index + 1}
                      </div>
                      <textarea
                        value={tugas}
                        onChange={(e) =>
                          updateKepalaDinas(index, e.target.value)
                        }
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={`Tugas ${index + 1}...`}
                      />
                      {tupoksiData.kepalaDinas.tugas.length > 1 && (
                        <button
                          onClick={() => removeKepalaDinas(index)}
                          className="flex-shrink-0 w-8 h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg flex items-center justify-center mt-2 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sekretariat */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Sekretariat
                </h4>

                {/* Deskripsi Sekretariat */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi Sekretariat
                  </label>
                  <textarea
                    value={tupoksiData.sekretariat.deskripsi}
                    onChange={(e) =>
                      setTupoksiData((prev) => ({
                        ...prev,
                        sekretariat: {
                          ...prev.sekretariat,
                          deskripsi: e.target.value,
                        },
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi tugas pokok sekretariat..."
                  />
                </div>

                {/* Tugas Sekretariat */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tugas Sekretariat
                    </label>
                    <button
                      onClick={addSekretariatTugas}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Tugas
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tupoksiData.sekretariat.tugas.map((tugas, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-sm font-medium text-purple-600 dark:text-purple-400 mt-2">
                          {index + 1}
                        </div>
                        <textarea
                          value={tugas}
                          onChange={(e) =>
                            updateSekretariatTugas(index, e.target.value)
                          }
                          rows={2}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder={`Tugas ${index + 1}...`}
                        />
                        {tupoksiData.sekretariat.tugas.length > 1 && (
                          <button
                            onClick={() => removeSekretariatTugas(index)}
                            className="flex-shrink-0 w-8 h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg flex items-center justify-center mt-2 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub Bagian Umum dan Kepegawaian */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Sub Bagian Umum dan Kepegawaian
                </h4>

                {/* Deskripsi Sub Umum */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi Sub Bagian Umum dan Kepegawaian
                  </label>
                  <textarea
                    value={tupoksiData.subUmum.deskripsi}
                    onChange={(e) =>
                      setTupoksiData((prev) => ({
                        ...prev,
                        subUmum: { ...prev.subUmum, deskripsi: e.target.value },
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi tugas pokok sub bagian umum dan kepegawaian..."
                  />
                </div>

                {/* Tugas Sub Umum */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tugas Sub Bagian Umum dan Kepegawaian
                    </label>
                    <button
                      onClick={addSubUmumTugas}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Tugas
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tupoksiData.subUmum.tugas.map((tugas, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                          {index + 1}
                        </div>
                        <textarea
                          value={tugas}
                          onChange={(e) =>
                            updateSubUmumTugas(index, e.target.value)
                          }
                          rows={2}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder={`Tugas ${index + 1}...`}
                        />
                        {tupoksiData.subUmum.tugas.length > 1 && (
                          <button
                            onClick={() => removeSubUmumTugas(index)}
                            className="flex-shrink-0 w-8 h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg flex items-center justify-center mt-2 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub Bagian Keuangan */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Sub Bagian Keuangan
                </h4>

                {/* Deskripsi Sub Keuangan */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi Sub Bagian Keuangan
                  </label>
                  <textarea
                    value={tupoksiData.subKeuangan.deskripsi}
                    onChange={(e) =>
                      setTupoksiData((prev) => ({
                        ...prev,
                        subKeuangan: {
                          ...prev.subKeuangan,
                          deskripsi: e.target.value,
                        },
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi tugas pokok sub bagian keuangan..."
                  />
                </div>

                {/* Tugas Sub Keuangan */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tugas Sub Bagian Keuangan
                    </label>
                    <button
                      onClick={addSubKeuanganTugas}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Tugas
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tupoksiData.subKeuangan.tugas.map((tugas, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-2">
                          {index + 1}
                        </div>
                        <textarea
                          value={tugas}
                          onChange={(e) =>
                            updateSubKeuanganTugas(index, e.target.value)
                          }
                          rows={2}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder={`Tugas ${index + 1}...`}
                        />
                        {tupoksiData.subKeuangan.tugas.length > 1 && (
                          <button
                            onClick={() => removeSubKeuanganTugas(index)}
                            className="flex-shrink-0 w-8 h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg flex items-center justify-center mt-2 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave("tupoksi")}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Menyimpan..." : "Simpan Tupoksi"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
