import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { GOOGLE_DOC_FORM } from '@/lib/config';
import FlyersSection from "@/components/sections/FlyersSection";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import BannerRotator from "@/components/layout/BannerRotator";
import TrainedWithUsSection from "@/components/sections/TrainedWithUsSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";

  const FLYER_URLS = [
      "/inicio/danok_bat_campusak_2025.webp",
      "/inicio/campus_porteros_verano_2025.webp",
  ];



export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const FLYER_URLS = [
    "/inicio/danok_bat_campusak_2025.webp",
    "/inicio/campus_porteros_verano_2025.webp",
  ];

  const BANNER_LIST = [
    {
      url: "/inicio/goalkeeper_banner.webp",
      alt: "Campus de Verano Vitoria - Gazteiz",
      link: GOOGLE_DOC_FORM.FORM_URL,
      buttonText: t('button_text'),
      title: t('coming_up_next'),
    },
    {
      url: "/inicio/goalkeeper_banner_2.svg",
      alt: "Campus de Verano Vitoria - Gazteiz",
      link: GOOGLE_DOC_FORM.FORM_URL,
      buttonText: t('button_text'),
      title: t('coming_up_next'),
    },
    {
      url: "/inicio/goalkeeper_banner_3.svg",
      alt: "Campus de Verano Vitoria - Gazteiz",
      link: GOOGLE_DOC_FORM.FORM_URL,
      buttonText: t('button_text'),
      title: t('coming_up_next'),
    }
  ]

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#eaf6fb] to-[#f8fafc]">
      {/* Hero Section */}

      <section className="w-full relative flex items-center justify-center min-h-[400px] bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg">
        <BannerRotator banners={BANNER_LIST} alt={t('coming_up_next')} fullHeight />
      </section>

      <TrainedWithUsSection title={t('train_with_us')} paragraph={t('paragraph_1')} />

      <TestimonialSection 
        founderQuote={t('founder_quote')}
        founderName={t('founder_1')}
      />
    </div>
  );
}

