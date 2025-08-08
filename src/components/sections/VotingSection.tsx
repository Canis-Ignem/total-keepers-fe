import Image from "next/image";
import { useState } from "react";

interface VoteOption {
  id: string;
  name: string;
  description: string;
  image: string;
  currentVotes: number;
  features: string[];
}

interface VotingSectionProps {
  title: string;
  subtitle: string;
  options: VoteOption[];
  onVote: (optionId: string) => void;
  userVote?: string;
  totalVotes: number;
  bgColor?: string;
  showResults?: boolean;
}

export default function VotingSection({
  title,
  subtitle,
  options,
  onVote,
  userVote,
  totalVotes,
  bgColor = "bg-white",
  showResults = false
}: VotingSectionProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  return (
    <section className={`py-24 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
          {showResults && (
            <p className="text-lg text-gray-500 mt-4">
              Total votes: {totalVotes.toLocaleString()}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const percentage = getVotePercentage(option.currentVotes);
            const isUserChoice = userVote === option.id;
            const isHovered = hoveredOption === option.id;

            return (
              <div 
                key={option.id}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform ${
                  isHovered ? 'scale-105 shadow-2xl' : ''
                } ${isUserChoice ? 'ring-4 ring-blue-500' : ''}`}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {/* Vote Progress Bar (only shown if showResults) */}
                {showResults && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}

                {/* User's choice indicator */}
                {isUserChoice && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Your Vote
                    </div>
                  </div>
                )}

                {/* Glove Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-contain p-6"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{option.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{option.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Voting Results */}
                  {showResults && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {option.currentVotes.toLocaleString()} votes
                        </span>
                        <span className="text-lg font-bold text-blue-900">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Vote Button */}
                  <button
                    onClick={() => onVote(option.id)}
                    disabled={!!userVote}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      isUserChoice
                        ? 'bg-blue-500 text-white cursor-default'
                        : userVote
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isUserChoice ? 'Your Choice ✓' : userVote ? 'Vote Cast' : 'Vote for This Design'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
