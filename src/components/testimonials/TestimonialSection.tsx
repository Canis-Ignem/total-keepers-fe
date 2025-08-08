"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import TestimonialCard from "./TestimonialCard";

interface TestimonialSectionProps {
  founderQuote: string;
  founderName: string;
}

export default function TestimonialSection({ founderQuote, founderName }: TestimonialSectionProps) {
  const t = useTranslations("home");
  
  // Group testimonials into sets of three
  const testimonialGroups = [
    [
      t('testimonial_1'),
      t('testimonial_2'),
      t('testimonial_3')
    ],
    [
      t('testimonial_4'),
      t('testimonial_5'),
      t('testimonial_6')
    ]
  ];

  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % testimonialGroups.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [testimonialGroups.length]);

  return (
    <div 
      className="w-full flex flex-col lg:flex-row"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%)",
        minHeight: 480,
        position: 'relative',
      }}
    >
      {/* Testimonials Section */}
      <section 
        className="w-full lg:w-1/2 py-16 px-4 flex justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-8 relative z-10">
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight text-center">
            {t('hear_our_clients')}
          </h2>
          <div className="relative w-full">
            {/* Rotating Testimonial Groups */}
            <div className="flex flex-col sm:flex-row gap-6 transition-all duration-500 ease-in-out justify-center">
              {testimonialGroups[currentGroup].map((testimonial, index) => (
                <TestimonialCard key={`group-${currentGroup}-testimonial-${index}`} text={testimonial} />
              ))}
            </div>
            
            {/* Group Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonialGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGroup(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentGroup 
                      ? 'bg-white scale-110' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`View testimonial group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote Section */}
      <section 
        className="w-full lg:w-1/2 py-16 px-4 flex justify-center items-center"
      >
        <div className="flex justify-center items-center w-full max-w-lg relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl w-full">
            <blockquote className="text-white text-2xl leading-relaxed font-normal mb-8">
              {founderQuote}
            </blockquote>
            <cite className="text-white/90 text-xl font-medium not-italic block">
              — {founderName}
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
}
