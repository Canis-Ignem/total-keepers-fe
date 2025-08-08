"use client";

import { useState } from "react";
import Image from "next/image";

interface PlanningCardProps {
  imgSrc: string;
  alt: string;
  fechas: string;
}

export default function PlanningCard({ imgSrc, alt, fechas }: PlanningCardProps) {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <>
      {modalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setModalImg(null)}
        >
          <Image
            src={modalImg}
            alt={alt}
            width={800}
            height={600}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            priority
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition-colors"
            onClick={() => setModalImg(null)}
            aria-label="Close image"
          >
            ×
          </button>
        </div>
      )}

      <div className="bg-white/95 border border-blue-200 rounded-3xl shadow-2xl flex flex-col items-center p-6 hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="mb-4 w-full flex flex-col items-center">
          <span className="text-blue-700 font-bold text-lg mb-1">{fechas}</span>
        </div>
        <Image
          src={imgSrc}
          alt={alt}
          width={400}
          height={300}
          className="rounded-xl shadow border border-gray-200 w-full max-w-xs mx-auto"
          onClick={() => setModalImg(imgSrc)}
        />
      </div>
    </>
  );
}