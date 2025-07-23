import React from "react";
import Image from "next/image";

export default function PimpinanSection() {
  return (
    <section className="w-full my-12 px-0 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-8 transition-all">
          <div className="md:basis-3/4 basis-full text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800 dark:text-green-300">Sambutan Kepala Dinas</h2>
            <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg mb-4">
              "Selamat datang di portal Dinas Lingkungan Hidup Kota Tasikmalaya. Kami berkomitmen untuk mewujudkan lingkungan yang bersih, sehat, dan lestari melalui kolaborasi dengan masyarakat. Mari bersama menjaga dan mencintai lingkungan demi masa depan yang lebih baik."
            </p>
            <div className="font-semibold text-green-700 dark:text-green-200">Drs. Nama Pimpinan</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Kepala Dinas Lingkungan Hidup</div>
          </div>
          <div className="md:basis-1/4 basis-full flex justify-center md:justify-end">
            <div className="relative w-32 md:w-40 aspect-[3/4]">
              {/* Persegi di belakang gambar */}
              <div className="absolute w-28 h-28 md:w-40 md:h-35 bg-transparent border-2 border-b-0 border-gray-300 dark:border-green-700 z-0 rounded-t-md left-1/2 bottom-0 -translate-x-1/2" />
              {/* Gambar tetap aspect 3/4 */}
              <div className="relative bg-transparent w-full h-full z-10 overflow-hidden">
                <Image
                src="/pemimpin.png"
                alt="Foto Kepala Dinas"
                fill
                className="object-cover object-top"
                priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
