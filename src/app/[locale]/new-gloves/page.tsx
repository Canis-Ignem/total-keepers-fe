"use client";
import { useState, useEffect } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  HeroSection,
  StatsSection,
  BenefitsSection,
  VotingSection,
  TimelineSection,
  TestimonialsSection,
  FAQSection
} from "@/components/sections";

interface VoteOption {
  id: string;
  name: string;
  description: string;
  image: string;
  currentVotes: number;
  features: string[];
}

// Mock data for voting options - in a real app, this would come from your API
const mockVotingOptions: VoteOption[] = [
  {
    id: "predator-evolution",
    name: "Predator Evolution",
    description: "Advanced grip technology with enhanced latex palm for superior ball control in all weather conditions.",
    image: "/gloves/predator-evolution.jpg", // You'll need to add these images
    currentVotes: 1247,
    features: [
      "3D Control Palm Technology",
      "Weather-Resistant Latex",
      "Anatomical Fit System",
      "Removable Finger Spines"
    ]
  },
  {
    id: "phantom-grip",
    name: "Phantom Grip Pro",
    description: "Ultra-lightweight design with revolutionary grip patterns for maximum contact and ball feel.",
    image: "/gloves/phantom-grip.jpg",
    currentVotes: 892,
    features: [
      "Ultra-Light Construction",
      "Revolutionary Grip Pattern",
      "Moisture-Wicking Interior",
      "Extended Wrist Protection"
    ]
  },
  {
    id: "titan-shield",
    name: "Titan Shield Elite",
    description: "Maximum protection meets professional performance with reinforced knuckle guards and impact zones.",
    image: "/gloves/titan-shield.jpg",
    currentVotes: 1056,
    features: [
      "Reinforced Knuckle Guards",
      "Impact-Resistant Zones",
      "Professional Latex Palm",
      "Adjustable Wrist Strap"
    ]
  }
];

export default function NewGlovesPage() {
  const t = useTranslations("gloves");
  const [userVote, setUserVote] = useState<string | null>(null);
  const [votingOptions, setVotingOptions] = useState<VoteOption[]>(mockVotingOptions);
  const [showResults, setShowResults] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    // Calculate total votes
    const total = votingOptions.reduce((sum, option) => sum + option.currentVotes, 0);
    setTotalVotes(total);

    // Check if user has already voted (in a real app, check auth state and backend)
    const savedVote = localStorage.getItem('glove-vote');
    if (savedVote) {
      setUserVote(savedVote);
      setShowResults(true);
    }
  }, [votingOptions]);

  const handleVote = (optionId: string) => {
    if (userVote) return; // Already voted

    // Update vote count
    setVotingOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, currentVotes: option.currentVotes + 1 }
          : option
      )
    );

    // Save user's vote
    setUserVote(optionId);
    localStorage.setItem('glove-vote', optionId);
    setShowResults(true);

    // In a real app, send vote to backend API
    // await api.submitVote(optionId);
  };

  // Hero Section Data
  const heroProps = {
    backgroundImage: "/gloves/hero-background.jpg", // You'll need to add this image
    backgroundAlt: "Professional Goalkeeper Gloves Design",
    badge: t('hero.badge'),
    title: t('hero.title'),
    titleHighlight: t('hero.title_highlight'),
    subtitle: t('hero.subtitle'),
    socialProofGoalkeepers: t('hero.social_proof_goalkeepers'),
    socialProofRating: t('hero.social_proof_rating'),
    ctaPrimary: t('hero.cta_primary'),
    ctaSecondary: t('hero.cta_secondary'),
    ctaPrimaryHref: "#voting",
    ctaSecondaryHref: "#timeline"
  };

  // Stats Data
  const statsData = [
    { number: "10K+", label: t('stats.votes_cast'), icon: "🗳️" },
    { number: "3", label: t('stats.design_options'), icon: "🧤" },
    { number: "30", label: t('stats.days_remaining'), icon: "⏰" },
    { number: "Pro", label: t('stats.quality_level'), icon: "⭐" }
  ];

  // Benefits Data
  const benefitsData = [
    {
      icon: "🎯",
      title: t('benefits.voice_title'),
      description: t('benefits.voice_desc')
    },
    {
      icon: "🏆",
      title: t('benefits.quality_title'),
      description: t('benefits.quality_desc')
    },
    {
      icon: "💰",
      title: t('benefits.discount_title'),
      description: t('benefits.discount_desc')
    },
    {
      icon: "📦",
      title: t('benefits.early_access_title'),
      description: t('benefits.early_access_desc')
    }
  ];

  // Timeline Data
  const timelineData = [
    {
      date: t('timeline.voting_date'),
      title: t('timeline.voting_title'),
      description: t('timeline.voting_desc'),
      status: 'current' as const
    },
    {
      date: t('timeline.design_date'),
      title: t('timeline.design_title'),
      description: t('timeline.design_desc'),
      status: 'upcoming' as const
    },
    {
      date: t('timeline.production_date'),
      title: t('timeline.production_title'),
      description: t('timeline.production_desc'),
      status: 'upcoming' as const
    },
    {
      date: t('timeline.launch_date'),
      title: t('timeline.launch_title'),
      description: t('timeline.launch_desc'),
      status: 'upcoming' as const
    }
  ];

  // Testimonials Data (from past glove designs)
  const testimonialsData = [
    {
      name: t('testimonials.keeper1_name'),
      role: t('testimonials.keeper1_role'),
      quote: t('testimonials.keeper1_quote')
    },
    {
      name: t('testimonials.keeper2_name'),
      role: t('testimonials.keeper2_role'),
      quote: t('testimonials.keeper2_quote')
    },
    {
      name: t('testimonials.keeper3_name'),
      role: t('testimonials.keeper3_role'),
      quote: t('testimonials.keeper3_quote')
    }
  ];

  // FAQ Data
  const faqData = [
    {
      question: t('faq.voting_question'),
      answer: t('faq.voting_answer')
    },
    {
      question: t('faq.multiple_votes_question'),
      answer: t('faq.multiple_votes_answer')
    },
    {
      question: t('faq.production_question'),
      answer: t('faq.production_answer')
    },
    {
      question: t('faq.discount_question'),
      answer: t('faq.discount_answer')
    },
    {
      question: t('faq.shipping_question'),
      answer: t('faq.shipping_answer')
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <HeroSection {...heroProps} />
      
      <StatsSection stats={statsData} />
      
      <BenefitsSection 
        title={t('benefits.title')}
        subtitle={t('benefits.subtitle')}
        benefits={benefitsData}
      />
      
      <VotingSection
        title={t('voting.title')}
        subtitle={t('voting.subtitle')}
        options={votingOptions}
        onVote={handleVote}
        userVote={userVote || undefined}
        totalVotes={totalVotes}
        showResults={showResults}
        bgColor="bg-blue-50"
      />
      
      <TimelineSection
        title={t('timeline.title')}
        subtitle={t('timeline.subtitle')}
        milestones={timelineData}
      />
      
      <TestimonialsSection
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        testimonials={testimonialsData}
      />
      
      <FAQSection 
        title={t('faq.title')} 
        faqs={faqData}
      />
    </div>
  );
}
