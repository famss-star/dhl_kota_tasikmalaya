"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Users, Landmark, Network } from "lucide-react";

interface AboutData {
  visi: string;
  misi: string[];
  tentangKami: string;
  tupoksi: {
    tugasPokok: string;
    kepalaDinas: {
      deskripsi: string;
      tugas: string[];
    };
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

const TentangDLH: React.FC = () => {
  const [showFullTupoksi, setShowFullTupoksi] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [aboutData, setAboutData] = useState<AboutData>({
    visi: "",
    misi: [],
    tentangKami: "",
    tupoksi: {
      tugasPokok: "",
      kepalaDinas: {
        deskripsi: "",
        tugas: [],
      },
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showFullTupoksi && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [showFullTupoksi]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/tentang");
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        } else {
          console.error("Failed to fetch about data");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Tentang Dinas Lingkungan Hidup
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tentang Kami */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                  Tentang Kami
                </h2>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                ) : (
                  <div className="text-gray-700 dark:text-gray-300">
                    {aboutData.tentangKami
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
          </section>

          {/* Visi Misi */}
          <section id="visi-misi" className="mb-12 scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visi */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-green-500/50 target:border-green-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
                  VISI
                </h2>
                <div className="text-center max-w-xl">
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </div>
                  ) : (
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                      &quot;{aboutData.visi}&quot;
                    </p>
                  )}
                </div>
              </div>

              {/* Misi */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-blue-500/50 target:border-blue-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-600 mb-6 text-center">
                  MISI
                </h2>
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start">
                        <div className="min-w-[2rem] min-h-[2rem] bg-gray-300 dark:bg-gray-600 rounded-full mr-3 mt-0.5"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {aboutData.misi.map((misiItem, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {misiItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Tugas Pokok dan Fungsi (Tupoksi) */}
          <section id="tupoksi" className="mb-8 scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                  Tugas Pokok dan Fungsi
                </h2>

                <h3 className="text-xl font-semibold text-blue-600 dark:text-sky-500 mb-4">
                  Tugas Pokok:
                </h3>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                    <span className="font-bold">
                      Dinas Lingkungan Hidup Daerah
                    </span>{" "}
                    {aboutData.tupoksi.tugasPokok}
                  </p>
                )}

                {/* Content with fade effect when collapsed */}
                <div className="relative">
                  <div
                    style={{
                      height: showFullTupoksi ? height : "200px",
                      overflow: "hidden",
                      transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div
                      ref={contentRef}
                      className={
                        showFullTupoksi
                          ? "opacity-100 transition-opacity duration-500"
                          : "opacity-100 transition-opacity duration-300"
                      }
                    >
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                        Rincian Tugas Unit:
                      </h3>

                      {loading ? (
                        <div className="animate-pulse space-y-4">
                          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                          <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"
                              ></div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold mt-6 mb-2">Kepala Dinas</h4>
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                            {aboutData.tupoksi.kepalaDinas?.deskripsi || ""}
                          </p>
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            {(aboutData.tupoksi.kepalaDinas?.tugas || []).map(
                              (tugas: string, index: number) => (
                                <li key={index}>{tugas}</li>
                              )
                            )}
                          </ul>

                          {showFullTupoksi && (
                            <>
                              <h4 className="font-bold mt-6 mb-2">
                                Sekretariat
                              </h4>
                              <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.sekretariat.deskripsi}
                              </p>
                              <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.sekretariat.tugas.map(
                                  (tugas, index) => (
                                    <li key={index}>{tugas}</li>
                                  )
                                )}
                              </ul>

                              <h4 className="font-bold mt-6 mb-2">
                                Sub Bagian Umum dan Kepegawaian
                              </h4>
                              <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.subUmum.deskripsi}
                              </p>
                              <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.subUmum.tugas.map(
                                  (tugas, index) => (
                                    <li key={index}>{tugas}</li>
                                  )
                                )}
                              </ul>

                              <h4 className="font-bold mt-6 mb-2">
                                Sub Bagian Keuangan
                              </h4>
                              <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.subKeuangan.deskripsi}
                              </p>
                              <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                                {aboutData.tupoksi.subKeuangan.tugas.map(
                                  (tugas, index) => (
                                    <li key={index}>{tugas}</li>
                                  )
                                )}
                              </ul>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Fade overlay when collapsed */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      showFullTupoksi
                        ? "opacity-0 translate-y-2"
                        : "opacity-100 translate-y-0"
                    }`}
                  ></div>
                </div>

                {/* Tombol expand/collapse */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowFullTupoksi(!showFullTupoksi)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                  >
                    {showFullTupoksi ? "Sembunyikan" : "Lihat Selengkapnya"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Links */}
          <section className="mb-8">
            <div className="lg:col-span-2 lg:row-span-1 grid grid-cols-2 gap-8">
              <Link href="/profil/struktur-organisasi" className="group flex">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-blue-300 dark:border-gray-700 dark:group-hover:border-blue-600">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Landmark className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Struktur Organisasi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Bagan organisasi lengkap dan deskripsi tugas setiap bidang
                  </p>
                  <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Lihat Struktur
                  </span>
                </div>
              </Link>
              <Link href="/profil/pegawai" className="group flex">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-purple-300 dark:border-gray-700 dark:group-hover:border-purple-600">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Profil Pegawai
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Profil lengkap sumber daya manusia dan komposisi kepegawaian
                    DLH Kota Tasikmalaya
                  </p>
                  <span className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Lihat Profil
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TentangDLH;
