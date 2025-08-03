"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


interface Banner {
  url: string;
  link: string;
  buttonText: string;
  alt?: string;
  title?: string;
}

interface BannerRotatorProps {
  banners: Banner[];
  alt?: string;
}


export default function BannerRotator({ banners, alt = "Banner", fullHeight = false }: BannerRotatorProps & { fullHeight?: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [banners.length, index]);

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const current = banners[index];

  return (
    <div
      className={
        fullHeight
          ? "relative w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 overflow-hidden"
          : "relative w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 overflow-hidden"
      }
      style={fullHeight ? { minHeight: 400, height: '100%' } : { height: 220, minHeight: 220, maxHeight: 220 }}
    >
      {current.title && (
        <div className="absolute top-6 left-6 z-20 px-5 py-2 bg-gray-900/80 text-white text-xl font-bold rounded-lg shadow-lg text-left pointer-events-none select-none">
          {current.title}
        </div>
      )}
      <button
        onClick={goToPrev}
        aria-label="Previous banner"
        className="absolute -left-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none rounded-full w-16 h-16 flex items-center justify-center z-30 hover:bg-white/20 transition-colors"
        style={{boxShadow: 'none'}}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="30 38 14 24 30 10" />
        </svg>
      </button>
      <Image
        src={current.url}
        alt={current.alt || alt}
        className="w-full h-full object-cover object-center shadow-lg border-4 border-blue-200"
        fill={true}
        priority
      />
      
      {current.link && current.buttonText && (
        <a
          href={current.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 bottom-3 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white font-bold px-8 py-1.5 rounded-full shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 z-20 border-2 border-blue-200"
          style={{marginBottom: 0}}
        >
          {current.buttonText}
        </a>
      )}
      <button
        onClick={goToNext}
        aria-label="Next banner"
        className="absolute -right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none rounded-full w-16 h-16 flex items-center justify-center z-30 hover:bg-white/20 transition-colors"
        style={{boxShadow: 'none'}}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 38 34 24 18 10" />
        </svg>
      </button>
    </div>
  );
}
