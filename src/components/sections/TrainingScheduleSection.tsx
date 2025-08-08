import Image from "next/image";
import Link from "next/link";

interface TrainingSession {
  week: string;
  image: string;
  alt: string;
  highlights: string[];
  availability: string;
  reserveButtonHref?: string;
}

interface TrainingScheduleSectionProps {
  title: string;
  subtitle: string;
  sessions: TrainingSession[];
  reserveButtonText: string;
  bgColor?: string;
  textColor?: string;
}

export default function TrainingScheduleSection({
  title,
  subtitle,
  sessions,
  reserveButtonText,
  bgColor = "bg-blue-900",
  textColor = "text-white"
}: TrainingScheduleSectionProps) {
  return (
    <section className={`py-24 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} mb-6`}>
            {title}
          </h2>
          <p className={`text-xl ${textColor === 'text-white' ? 'text-blue-100' : 'text-gray-600'} max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={session.image}
                  alt={session.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {session.availability}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{session.week}</h3>
                <div className="space-y-2 mb-6">
                  {session.highlights.map((highlight: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={session.reserveButtonHref || "#registration"}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  {reserveButtonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
