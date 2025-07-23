"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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

import { Splide as SplideType } from '@splidejs/splide';

export default function Carousel() {
  const [current, setCurrent] = React.useState(0);
  const [splideIndex, setSplideIndex] = React.useState(0);
  const splideRef = React.useRef<SplideType | null>(null);

  // Sinkronisasi background dengan Splide
  const handleMove = (splide: any, newIndex: number) => {
	setCurrent(newIndex % carouselImages.length);
	setSplideIndex(newIndex % bannerImages.length);
  };

  // Banner images for Splide overlay
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

  return (
	<div className="relative w-full mx-auto mb-8 aspect-[16/9]">
	  {/* Background carousel slideshow */}
	  <div className="overflow-hidden rounded-lg shadow-lg w-full h-full relative">
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
			  fill
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
			  focus: 'center',
			  gap: '2rem',
			  arrows: false,
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
			onMounted={(_splide) => {
			  setCurrent(_splide.index);
			  setSplideIndex(_splide.index);
			}}
		  >
			{bannerImages.map((banner, idx) => (
			  <SplideSlide key={banner.src} className="flex items-center justify-center">
				<div className="flex items-center justify-center w-full h-full transition-all duration-500">
				  <Image
					src={banner.src}
					alt={banner.alt}
					width={idx === splideIndex ? 1060 : 400}
					height={idx === splideIndex ? 354 : 140}
					className={`object-contain drop-shadow-xl transition-all duration-500 ${idx === splideIndex ? 'scale-100 z-10' : 'scale-90 opacity-60'}`}
					priority={idx === 0}
				  />
				</div>
			  </SplideSlide>
			))}
		  </Splide>
		</div>
	  </div>
	</div>
  );
}
