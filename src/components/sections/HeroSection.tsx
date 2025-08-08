import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  backgroundImage: string;
  backgroundAlt: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  socialProofGoalkeepers: string;
  socialProofRating: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
}

export default function HeroSection({
  backgroundImage,
  backgroundAlt,
  badge,
  title,
  titleHighlight,
  subtitle,
  socialProofGoalkeepers,
  socialProofRating,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryHref = "#registration",
  ctaSecondaryHref = "#methodology"
}: HeroSectionProps) {
  // Split title to highlight the specified part
  const titleParts = title.split(' ');
  const mainTitle = titleParts.slice(0, -2).join(' ');
  const endTitle = titleParts.slice(-2).join(' ');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-blue-900 text-sm font-semibold mb-6 shadow-lg animate-pulse">
            🏆 {badge}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {mainTitle} <span className="text-yellow-400">{titleHighlight}</span><br />
            {endTitle}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                ))}
              </div>
              <span className="ml-2 text-sm">{socialProofGoalkeepers}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-white text-sm">{socialProofRating}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaPrimaryHref}
              className="inline-flex items-center px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              🚀 {ctaPrimary}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={ctaSecondaryHref}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              📚 {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
