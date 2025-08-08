interface StatItem {
  number: string;
  label: string;
  icon: string;
}

interface StatsSectionProps {
  stats: StatItem[];
  bgColor?: string;
}

export default function StatsSection({ 
  stats, 
  bgColor = "bg-white" 
}: StatsSectionProps) {
  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-blue-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
