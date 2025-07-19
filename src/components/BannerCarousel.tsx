"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/hidroponik_882020222.jpg",
    alt: "Hidroponik DLH Kota Tasikmalaya",
    href: "/informasi/berita"
  },
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/survey-perizinan-amdal_178200356.jpg",
    alt: "Survey Perizinan AMDAL",
    href: "/pelayanan"
  },
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/karnaval-budaya-lingkungan-hidup_776888217.jpg",
    alt: "Karnaval Budaya Lingkungan Hidup",
    href: "/galeri"
  }
];

export default function  () {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 my-8">
      <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
        {/* Slide container */}
        <div
          className="flex h-full transition-transform duration-700"
          style={{ width: `${images.length * 100}%`, transform: `translateX(-${current * (100 / images.length)}%)` }}
        >
          {images.map((img, idx) => (
            <div key={img.src} className="relative w-full h-full flex-shrink-0" style={{ width: `${100 / images.length}%` }}>
              {img.href ? (
                <Link href={img.href} className="block w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="100vw"
                    className="object-cover w-full h-full rounded-xl"
                    priority={idx === 0}
                  />
                </Link>
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-full rounded-xl"
                  priority={idx === 0}
                />
              )}
            </div>
          ))}
        </div>
        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 rounded-full p-2 shadow z-20"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          onClick={next}
          aria-label="Selanjutnya"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 rounded-full p-2 shadow z-20"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full border-2 ${idx === current ? "bg-green-500 border-green-700" : "bg-white/70 border-white"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
