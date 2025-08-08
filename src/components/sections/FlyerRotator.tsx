"use client";

import { useState, useEffect } from "react";
import FlyersSection from "./FlyersSection";

interface FlyerRotatorProps {
  flyerUrls: string[];
}

export default function FlyerRotator({ flyerUrls }: FlyerRotatorProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % flyerUrls.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [flyerUrls.length, index]);

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + flyerUrls.length) % flyerUrls.length);
  };
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % flyerUrls.length);
  };

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-300 rounded-2xl shadow-lg">
      <button
        onClick={goToPrev}
        aria-label="Previous flyer"
        className="absolute left-[-32px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
        style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <FlyersSection imgSrc={flyerUrls[index]} key={flyerUrls[index]} />
      <button
        onClick={goToNext}
        aria-label="Next flyer"
        className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-full w-12 h-12 flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"
        style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
}
