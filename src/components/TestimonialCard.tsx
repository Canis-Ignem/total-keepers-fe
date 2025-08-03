interface TestimonialCardProps {
  text: string;
}

export default function TestimonialCard({ text }: TestimonialCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg flex-1 min-w-[220px] min-h-[320px] max-h-[320px] flex flex-col justify-between hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">"</span>
        </div>
      </div>
      <p className="text-gray-700 text-center text-base leading-relaxed flex-1 flex items-center justify-center overflow-hidden px-2">
        {text}
      </p>
    </div>
  );
}
