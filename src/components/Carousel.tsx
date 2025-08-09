"use client";
import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const carouselImages = [
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/hidroponik_882020222.jpg",
    alt: "DLH Kota Tasikmalaya 1",
  },
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/survey-perizinan-amdal_178200356.jpg",
    alt: "DLH Kota Tasikmalaya 2",
  },
  {
    src: "https://www.dlh.tasikmalayakota.go.id/images/slide/karnaval-budaya-lingkungan-hidup_776888217.jpg",
    alt: "DLH Kota Tasikmalaya 3",
  },
];

const bannerImages = [
  {
    src: '/banner1.jpg',
    alt: 'Banner 1',
  },
  {
    src: '/banner2.png',
    alt: 'Banner 2',
  },
  {
    src: '/banner3.png',
    alt: 'Banner 3',
  },
];

export default function Carousel() {
  const [current, setCurrent] = React.useState<number>(0);
  const [splideIndex, setSplideIndex] = React.useState<number>(0);
  const splideRef = React.useRef<{ index: number } | null>(null);

  // Sinkronisasi background dengan Splide
  const handleMove = (splide: { index: number }) => {
    const activeIndex = splide.index;
    setCurrent(activeIndex % carouselImages.length);
    setSplideIndex(activeIndex % bannerImages.length); // Use modulo for proper loop
  };

  // For perPage: 2, the "active" slide is the one on the left (index 0 of visible slides)
  const isActive = (idx: number) => {
    const normalizedSplideIndex = splideIndex % bannerImages.length;
    const normalizedIdx = idx % bannerImages.length;
    return normalizedSplideIndex === normalizedIdx;
  };

  return (
    <div className="relative w-full mx-auto mb-8 aspect-[16/9]">
      {/* Background carousel slideshow */}
      {carouselImages.map((img, idx) => (
        <div
          key={img.src}
          className={`transition-opacity brightness-50 duration-700 absolute inset-0 w-full h-full flex items-center justify-center ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill={true}
            className="w-full h-full object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
        </div>
      ))}

      {/* Splide overlay for banners */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
        <Splide
          ref={splideRef}
          options={{
            type: 'loop',
            perPage: 3,
            focus: 1, // Focus on the first visible slide (left side)
            gap: '2rem',
            arrows: true,
            pagination: true,
            autoplay: true,
            interval: 3500,
            pauseOnHover: false,
            pauseOnFocus: false,
            breakpoints: {
              1024: { perPage: 1, gap: '1rem' },
              640: { perPage: 1, gap: '0.5rem' },
            },
          }}
          className="w-full splide-banner"
          onMove={handleMove}
          onMounted={() => {
            setCurrent(0);
            setSplideIndex(0);
          }}
        >
          {bannerImages.map((banner, idx) => (
            <SplideSlide key={`${banner.src}-${idx}`} className="flex items-center justify-center">
              <div className="flex items-center justify-center w-full h-full transition-all duration-500">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  width={isActive(idx) ? 1060 : 400}
                  height={isActive(idx) ? 354 : 140}
                  className={`object-contain drop-shadow-xl transition-all duration-500 ${
                    isActive(idx) ? 'scale-100 z-10' : 'scale-90 opacity-60'
                  }`}
                  priority={idx === 0}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}