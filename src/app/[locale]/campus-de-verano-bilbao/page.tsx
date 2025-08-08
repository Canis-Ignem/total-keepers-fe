import { getTranslations } from "next-intl/server";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  TrainingScheduleSection,
  TestimonialsSection,
  RegistrationSection,
  FAQSection
} from "@/components/sections";

// Main Page Component
export default async function CampusDeVeranoBilbao({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "campus" });

  // Hero Section Data
  const heroProps = {
    backgroundImage: "/inicio/goalkeeper_banner.webp",
    backgroundAlt: "Elite Goalkeeper Training",
    badge: t('hero.badge'),
    title: t('hero.title'),
    titleHighlight: t('hero.title_highlight'),
    subtitle: t('hero.subtitle'),
    socialProofGoalkeepers: t('hero.social_proof_goalkeepers'),
    socialProofRating: t('hero.social_proof_rating'),
    ctaPrimary: t('hero.cta_primary'),
    ctaSecondary: t('hero.cta_secondary')
  };

  // Stats Section Data
  const statsData = [
    { number: "15+", label: t('stats.years_experience'), icon: "🏆" },
    { number: "500+", label: t('stats.goalkeepers_trained'), icon: "👥" },
    { number: "95%", label: t('stats.success_rate'), icon: "📈" },
    { number: "20+", label: t('stats.pro_players'), icon: "⚽" }
  ];

  // Features Section Data
  const featuresData = [
    {
      icon: "🎯",
      title: t('features.methodology_title'),
      description: t('features.methodology_desc')
    },
    {
      icon: "👨‍🏫",
      title: t('features.coaches_title'),
      description: t('features.coaches_desc')
    },
    {
      icon: "📊",
      title: t('features.analytics_title'),
      description: t('features.analytics_desc')
    },
    {
      icon: "🏟️",
      title: t('features.facilities_title'),
      description: t('features.facilities_desc')
    },
    {
      icon: "🎖️",
      title: t('features.development_title'),
      description: t('features.development_desc')
    },
    {
      icon: "🤝",
      title: t('features.networking_title'),
      description: t('features.networking_desc')
    }
  ];

  // Training Schedule Data
  const scheduleData = [
    {
      week: t('week_1_dates'),
      image: "/campus_de_verano/planificacion_semanal_turno_1.webp",
      alt: t('week_1_alt'),
      highlights: [
        t('schedule.week_1_highlight_1'),
        t('schedule.week_1_highlight_2'),
        t('schedule.week_1_highlight_3')
      ],
      availability: t('schedule.spots_left_3')
    },
    {
      week: t('week_2_dates'),
      image: "/campus_de_verano/planificacion_semanal_turno_2.webp", 
      alt: t('week_2_alt'),
      highlights: [
        t('schedule.week_2_highlight_1'),
        t('schedule.week_2_highlight_2'),
        t('schedule.week_2_highlight_3')
      ],
      availability: t('schedule.spots_left_5')
    },
    {
      week: t('week_3_dates'),
      image: "/campus_de_verano/planificacion_semanal_turno_3.webp",
      alt: t('week_3_alt'),
      highlights: [
        t('schedule.week_3_highlight_1'),
        t('schedule.week_3_highlight_2'),
        t('schedule.week_3_highlight_3')
      ],
      availability: t('schedule.spots_left_2')
    }
  ];

  // Testimonials Data
  const testimonialsData = [
    {
      name: t('testimonials.carlos_name'),
      role: t('testimonials.carlos_role'),
      quote: t('testimonials.carlos_quote')
    },
    {
      name: t('testimonials.ana_name'),
      role: t('testimonials.ana_role'), 
      quote: t('testimonials.ana_quote')
    },
    {
      name: t('testimonials.miguel_name'),
      role: t('testimonials.miguel_role'),
      quote: t('testimonials.miguel_quote')
    }
  ];

  // Registration Section Data
  const registrationData = {
    limitedOffer: t('registration.limited_offer'),
    title: t('registration.title'),
    subtitle: t('registration.subtitle'),
    whatsIncluded: t('registration.whats_included'),
    includedItems: [
      t('registration.included_training'),
      t('registration.included_analysis'), 
      t('registration.included_equipment'),
      t('registration.included_assessment'),
      t('registration.included_networking'),
      t('registration.included_certificate')
    ],
    originalPrice: t('registration.original_price'),
    earlyBirdPrice: t('registration.early_bird_price'),
    earlyBirdLabel: t('registration.early_bird_label'),
    saveAmount: t('registration.save_amount'),
    paymentPlans: t('registration.payment_plans'),
    guarantee: t('registration.guarantee'),
    ctaButton: t('registration.cta_button'),
    contactInfo: t('registration.contact_info')
  };

  // FAQ Data
  const faqData = [
    {
      question: t('faq.age_question'),
      answer: t('faq.age_answer')
    },
    {
      question: t('faq.equipment_question'),
      answer: t('faq.equipment_answer')
    },
    {
      question: t('faq.meals_question'),
      answer: t('faq.meals_answer')
    },
    {
      question: t('faq.refund_question'),
      answer: t('faq.refund_answer')
    },
    {
      question: t('faq.accommodation_question'),
      answer: t('faq.accommodation_answer')
    },
    {
      question: t('faq.scouts_question'),
      answer: t('faq.scouts_answer')
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <HeroSection {...heroProps} />
      <StatsSection stats={statsData} />
      <FeaturesSection 
        title={t('features.title')}
        subtitle={t('features.subtitle')}
        features={featuresData}
      />
      <TrainingScheduleSection
        title={t('schedule.title')}
        subtitle={t('schedule.subtitle')}
        sessions={scheduleData}
        reserveButtonText={t('schedule.reserve_button')}
      />
      <TestimonialsSection
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        testimonials={testimonialsData}
      />
      <RegistrationSection {...registrationData} />
      <FAQSection title={t('faq.title')} faqs={faqData} />
    </div>
  );
}
