import Image from "next/image";

interface TrainedWithUsSectionProps {
  title: string;
  paragraph: string;
}

const cards = [
  {
    img: "/train_with_us/football.svg",
    label: "",
    href: "#"
  },
  {
    img: "/train_with_us/gloves.svg",
    label: "",
    href: "#"
  },
  {
    img: "/train_with_us/goal.jpg",
    label: "",
    href: "#"
  }
];

export default function TrainedWithUsSection({ title, paragraph }: TrainedWithUsSectionProps) {
  return (
    <section
      className="w-full py-16 px-4 flex justify-center items-center"
      style={{
        background: "radial-gradient(ellipse at 60% 40%, #1e293b 60%, #3b0764 100%)",
        minHeight: 480,
        position: 'relative',
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12 relative z-10">
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg text-left">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-4 font-medium text-left">
            {paragraph}
          </p>
        </div>
        <div className="flex-1 w-full max-w-2xl flex flex-row gap-8 justify-center items-center">
          {cards.map((card, idx) => (
            <a
              key={card.img || idx}
              href={card.href}
              className="relative flex flex-col justify-end items-start bg-white/0 rounded-3xl overflow-hidden shadow-xl transition-transform hover:scale-105 cursor-pointer min-w-[180px] sm:min-w-[220px] max-w-[280px] w-full aspect-[3/4] group"
              style={{backdropFilter: 'blur(0.5px)'}}
            >
              <Image
                src={card.img}
                alt={card.label}
                fill
                sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 280px"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                draggable={false}
                priority={idx === 0}
              />
              <span className="absolute left-4 top-4 text-white text-3xl font-bold drop-shadow-lg z-10 rotate-[-90deg] origin-top-left whitespace-nowrap select-none">
                {card.label}
              </span>
              <span className="absolute right-4 bottom-4 z-10">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-white/10 group-hover:bg-white/20 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="8 4 16 12 8 20" />
                  </svg>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <img
        src="/train_with_us/bg.png"
        alt="Train with us background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
    </section>
  );
}
