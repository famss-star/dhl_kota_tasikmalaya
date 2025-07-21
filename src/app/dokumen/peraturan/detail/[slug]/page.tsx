"use client";

import { notFound } from "next/navigation";
import React from "react";
// @ts-ignore
import { use } from "react";

// Dummy data, should be replaced with real data source
const peraturanList = [
  {
    judul: "UU No. 32 Tahun 2009",
    deskripsi: "Tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
    tahun: "2009",
    kategori: "Undang-Undang",
    link: "#",
    isi: `Ini adalah isi lengkap dari UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup.`
  },
  {
    judul: "UU No. 18 Tahun 2008",
    deskripsi: "Tentang Pengelolaan Sampah",
    tahun: "2008",
    kategori: "Undang-Undang",
    link: "#",
    isi: `Ini adalah isi lengkap dari UU No. 18 Tahun 2008 tentang Pengelolaan Sampah.`
  },
  {
    judul: "*Perwal Nomor 66 Tahun 2016",
    deskripsi: "Tugas Pokok Dan Rincian Tugas Unit Dlh Kota Tasikmalaya",
    tahun: "2016",
    kategori: "Peraturan Pemerintah",
    link: "https://www.dlh.tasikmalayakota.go.id/download_file-1_f536_PERWAL_KOTA_TSM_TUPOKSI_DLH_NO.66_2016.pdf",
    isi: `Ini adalah isi lengkap dari Perwal Nomor 66 Tahun 2016 tentang Tugas Pokok Dan Rincian Tugas Unit Dlh Kota Tasikmalaya.`
  },
  {
    judul: "PP No. 81 Tahun 2012",
    deskripsi: "Tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga",
    tahun: "2012",
    kategori: "Peraturan Pemerintah",
    link: "#",
    isi: `Ini adalah isi lengkap dari PP No. 81 Tahun 2012 tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga.`
  },
  {
    judul: "Perda Kota Tasikmalaya No. 4 Tahun 2020",
    deskripsi: "Tentang Pengelolaan Sampah",
    tahun: "2020",
    kategori: "Peraturan Daerah",
    link: "#",
    isi: `Ini adalah isi lengkap dari Perda Kota Tasikmalaya No. 4 Tahun 2020 tentang Pengelolaan Sampah.`
  },
  {
    judul: "Perda Kota Tasikmalaya No. 7 Tahun 2019",
    deskripsi: "Tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
    tahun: "2019",
    kategori: "Peraturan Daerah",
    link: "#",
    isi: `Ini adalah isi lengkap dari Perda Kota Tasikmalaya No. 7 Tahun 2019 tentang Perlindungan dan Pengelolaan Lingkungan Hidup.`
  }
];

function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, "-");
}

const PeraturanDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  // Next.js App Router: params is now a Promise, must use React.use()
  // @ts-ignore
  const { slug } = use(params);
  const peraturan = peraturanList.find(
    (item) => slugify(item.judul) === slug
  );

  if (!peraturan) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            {peraturan.judul}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {peraturan.deskripsi}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Kategori: {peraturan.kategori} | Tahun: {peraturan.tahun}
          </p>
          <hr className="my-4" />
          <div className="prose dark:prose-invert max-w-none">
            <p>{peraturan.isi}</p>
          </div>
          {peraturan.link && peraturan.link !== "#" && (
            <a
              href={peraturan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Unduh PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeraturanDetailPage;
