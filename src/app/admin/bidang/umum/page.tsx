"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import StatisticsSection, {
  StatisticsItem,
} from "@/components/StatisticsSection";
import {
  Building2,
  Save,
  Eye,
  Target,
  Trees,
  Factory,
  Trash2,
  Network,
  Landmark,
} from "lucide-react";

interface BidangKerja {
  id: number;
  nama_bidang: string;
  deskripsi: string;
  struktur_organisasi: string;
  status: "aktif" | "non-aktif";
}

export default function AdminBidangUmumPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "tugas" | "preview">(
    "info"
  );
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState<number>(250);
  const contentRef = useRef<HTMLDivElement>(null);

  // Constants
  const DINAS_NAME = "Dinas Lingkungan Hidup Kota Tasikmalaya";

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const PLACEHOLDER_TEXTS = {
    namaBidang: "Nama bidang...",
    deskripsi: "Deskripsi tugas dan tanggung jawab bidang...",
    strukturOrganisasi: "Struktur organisasi dalam bidang...",
  };

  const PREVIEW_TEXTS = {
    exploreTitle: "Jelajahi Lebih Lanjut",
    statisticsTitle: "Pencapaian Kinerja 2025",
    statisticsSubtitle: "Komitmen nyata untuk lingkungan berkelanjutan",
    buttonText: "Pelajari Lebih Lanjut",
    navItems: {
      strukturOrganisasi: "Struktur Organisasi",
      strukturOrganisasiDesc: "Lihat bagan organisasi lengkap",
      strukturOrganisasiDesc2: "Struktur organisasi dan profil pimpinan",
    },
  };

  const [bidangData, setBidangData] = useState<BidangKerja>({
    id: 1,
    nama_bidang: "Bidang Kerja",
    deskripsi: "Struktur Organisasi Dinas Lingkungan Hidup Kota Tasikmalaya",
    struktur_organisasi:
      "Dinas Lingkungan Hidup Kota Tasikmalaya memiliki 3 bidang utama yang bekerja secara sinergis untuk mewujudkan lingkungan hidup yang lestari, bersih, dan sehat.",
    status: "aktif",
  });

  const bidangList = [
    {
      id: 1,
      name: "Bidang Tata Lingkungan",
      description:
        "Bidang Tata Lingkungan mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis dan pengoordinasian penyelenggaraan kebijakan perencanaan lingkungan hidup, pengelolaan keanekaragaman hayati dan pengelolaan ruang terbuka hijau (RTH).",
      icon: <Trees size={40} className="text-green-600 dark:text-green-400" />,
      color: "green",
      features: [
        "Penyusunan dan penetapan RPPLH dan dokumen daya dukung dan daya tampung",
        "Penyusunan Kajian Lingkungan Hidup Strategis (KLHS)",
        "Pemeriksaan UKL-UPL dan fasilitasi penilaian AMDAL",
        "Pengelolaan keanekaragaman hayati dan ruang terbuka hijau",
        "Pengelolaan sarana prasarana keanekaragaman hayati dan RTH",
        "Pengembangan kapasitas kelembagaan dan SDM",
      ],
    },
    {
      id: 2,
      name: "Bidang Pengendalian Pencemaran",
      description:
        "Mengawasi dan mengendalikan pencemaran air, udara, dan tanah",
      icon: <Factory size={40} className="text-red-600 dark:text-red-400" />,
      color: "red",
      features: [
        "Monitoring Kualitas Air",
        "Pengawasan Emisi Gas Buang",
        "Pengendalian Limbah B3",
        "Pengujian Kualitas Udara",
      ],
    },
    {
      id: 3,
      name: "Bidang Pengelolaan Sampah",
      description: "Mengelola sistem persampahan kota secara terintegrasi",
      icon: <Trash2 size={40} className="text-teal-600 dark:text-teal-400" />,
      color: "teal",
      features: [
        "Pengumpulan dan Pengangkutan Sampah",
        "Pengelolaan TPA Regional",
        "Program 3R (Reduce, Reuse, Recycle)",
        "Bank Sampah dan Komposter",
      ],
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log("Saving bidang umum data...", bidangData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Data Bidang Umum berhasil disimpan!");
    } catch (error) {
      alert("Gagal menyimpan data Bidang Umum");
    } finally {
      setIsLoading(false);
    }
  };

  const items: StatisticsItem[] = [
    { value: "95%", label: "Pelayanan Perizinan" },
    { value: "100+", label: "Pengawasan Rutin" },
    { value: "80%", label: "Cakupan Sampah" },
    { value: "50+", label: "Penegakan Hukum" },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-600 dark:text-green-400",
        hover: "hover:border-green-300 dark:hover:border-green-600",
        button: "bg-green-600 hover:bg-green-700",
      },
      red: {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-600 dark:text-red-400",
        hover: "hover:border-red-300 dark:hover:border-red-600",
        button: "bg-red-600 hover:bg-red-700",
      },
      teal: {
        bg: "bg-teal-100 dark:bg-teal-900",
        text: "text-teal-600 dark:text-teal-400",
        hover: "hover:border-teal-300 dark:hover:border-teal-600",
        button: "bg-teal-600 hover:bg-teal-700",
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Building2 className="w-9 h-9 text-white" />
              {bidangData.nama_bidang}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola informasi {bidangData.nama_bidang} {DINAS_NAME}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex">
            {[
              { id: "info", label: "Informasi Bidang", icon: Building2 },
              { id: "preview", label: "Preview", icon: Eye },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600 dark:text-green-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Informasi Bidang */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Bidang
                  </label>
                  <input
                    type="text"
                    value={bidangData.nama_bidang}
                    onChange={(e) =>
                      setBidangData((prev) => ({
                        ...prev,
                        nama_bidang: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={PLACEHOLDER_TEXTS.namaBidang}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={bidangData.status}
                    onChange={(e) =>
                      setBidangData((prev) => ({
                        ...prev,
                        status: e.target.value as "aktif" | "non-aktif",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="non-aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Bidang
                </label>
                <textarea
                  value={bidangData.deskripsi}
                  onChange={(e) =>
                    setBidangData((prev) => ({
                      ...prev,
                      deskripsi: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={PLACEHOLDER_TEXTS.deskripsi}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Struktur Organisasi
                </label>
                <textarea
                  value={bidangData.struktur_organisasi}
                  onChange={(e) =>
                    setBidangData((prev) => ({
                      ...prev,
                      struktur_organisasi: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={PLACEHOLDER_TEXTS.strukturOrganisasi}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Menyimpan..." : "Simpan Informasi"}
                </button>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === "preview" && (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {/* Hero Section */}
              <section className="bg-gradient-to-r from-gray-600 to-slate-600 text-white py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                      <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                        {bidangData.nama_bidang}
                      </h1>
                    </div>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">
                      {DINAS_NAME}
                    </p>
                  </div>
                </div>
              </section>

              <div className="container mx-auto px-4 py-12">
                {/* Deskripsi Bidang Umum */}
                <section className="max-w-6xl mx-auto mb-8">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-gray-500 pb-2">
                        Tentang Bidang Umum
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                        <span className="font-bold">
                          {bidangData.nama_bidang}
                        </span>{" "}
                        {bidangData.deskripsi}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Struktur Organisasi Section */}
                <section className="max-w-6xl mx-auto mb-12">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-gray-500 pb-2">
                      <div className="flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-gray-600" />
                      </div>
                      Struktur Organisasi
                    </h3>

                    {/* Content with fade effect when collapsed */}
                    <div className="relative">
                      <div
                        ref={contentRef}
                        style={{
                          height: showAll ? height : "250px",
                          overflow: "hidden",
                          transition:
                            "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {bidangData.struktur_organisasi}
                        </div>
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
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
                        onClick={() => setShowAll((v) => !v)}
                      >
                        {showAll
                          ? "Tampilkan Lebih Sedikit"
                          : "Tampilkan Semua"}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Bidang-bidang Kerja */}
                <section className="max-w-6xl mx-auto mb-12">
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-gray-500 pb-2">
                      <div className="flex items-center justify-center">
                        <Target className="w-6 h-6 text-gray-600" />
                      </div>
                      Bidang-bidang Kerja DLH
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {bidangList.map((bidang) => {
                        const colors = getColorClasses(bidang.color);
                        return (
                          <div
                            key={bidang.id}
                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 ${colors.hover} transition duration-300 transform hover:scale-105 flex flex-col`}
                          >
                            <div className="text-center mb-4 flex-1">
                              <div
                                className={`${colors.bg} ${colors.text} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-2xl`}
                              >
                                {bidang.icon}
                              </div>
                              <h4
                                className={`text-lg font-bold ${colors.text} mb-2`}
                              >
                                {bidang.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {bidang.description}
                              </p>
                            </div>
                            <div className="text-center mt-auto">
                              <Link
                                href={
                                  bidang.name === "Bidang Tata Lingkungan"
                                    ? "/bidang/tata-lingkungan"
                                    : bidang.name ===
                                      "Bidang Pengendalian Pencemaran"
                                    ? "/bidang/pengendalian-pencemaran"
                                    : bidang.name ===
                                      "Bidang Pengelolaan Sampah"
                                    ? "/bidang/pengelolaan-sampah"
                                    : "#"
                                }
                              >
                                <button
                                  className={`${colors.button} text-white px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-sm`}
                                >
                                  Pelajari Lebih Lanjut
                                </button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* Statistics */}
                <section className="max-w-6xl mx-auto mb-12">
                  <StatisticsSection
                    title={PREVIEW_TEXTS.statisticsTitle}
                    subtitle={PREVIEW_TEXTS.statisticsSubtitle}
                    items={items}
                  />
                </section>

                {/* Back to Bidang */}
                <section>
                  <div className="text-center">
                    <a
                      href="/bidang"
                      className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
