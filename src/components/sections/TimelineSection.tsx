interface Milestone {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineSectionProps {
  title: string;
  subtitle: string;
  milestones: Milestone[];
  bgColor?: string;
}

export default function TimelineSection({
  title,
  subtitle,
  milestones,
  bgColor = "bg-white"
}: TimelineSectionProps) {
  return (
    <section className={`py-24 ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-px"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:items-center`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 rounded-full border-4 ${
                  milestone.status === 'completed' ? 'bg-green-500 border-green-200' :
                  milestone.status === 'current' ? 'bg-blue-500 border-blue-200 animate-pulse' :
                  'bg-gray-300 border-gray-200'
                } z-10`}>
                  {milestone.status === 'completed' && (
                    <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                }`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className={`text-sm font-semibold mb-2 ${
                      milestone.status === 'completed' ? 'text-green-600' :
                      milestone.status === 'current' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {milestone.date}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
