"use client";

import { useState } from "react";
import Image from "next/image";

interface FlyersSectionProps {
    imgSrc: string
}
export default function FlyersSection({ imgSrc }: FlyersSectionProps) {
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
            alt="Enlarged flyer"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            width={800}
            height={1200}
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition-colors"
            onClick={() => setModalImg(imgSrc)}
            aria-label="Close image"
          >
            ×
          </button>
        </div>
      )}
      <div
        className="flex flex-col items-center bg-white rounded-2xl shadow-xl border border-blue-100 p-8 hover:scale-105 transition-transform duration-200 cursor-pointer max-w-[520px] w-full mx-auto"
        onClick={() => setModalImg(imgSrc)}
      >
        <Image
          src={imgSrc}
          alt="Campus de Porteros Verano"
          className="rounded-xl shadow max-w-full h-auto mb-4"
          width={480}
          height={680}
        />
      </div>
    </>
  );
}