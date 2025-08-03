import Image from "next/image";
import PlanningCard from "@/components/PlanningCard";
import { getTranslations } from "next-intl/server";

export default async function CampusDeVeranoBilbao({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "campus" });

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#eaf6fb] to-[#f8fafc]">
      {/* Hero Section */}
      <section className="w-full relative flex items-center justify-center min-h-[320px] bg-gradient-to-r from-blue-500 to-blue-300 shadow-lg mb-10">
        <div className="relative z-10 flex flex-col items-center justify-center py-10 px-4 w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center mb-4 tracking-tight">
            {t('campus_weekly_planning')}
          </h1>
          <a
            href="#matricula"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
          >
            {t('information_and_registration')}
          </a>
        </div>
      </section>

      {/* Planning Cards Section */}
      <section className="w-full flex flex-col items-center gap-12 px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          <PlanningCard
            imgSrc="/campus_de_verano/planificacion_semanal_turno_1.webp"
            alt={t('week_1_alt')}
            fechas={t('week_1_dates')}
          />
          <PlanningCard
            imgSrc="/campus_de_verano/planificacion_semanal_turno_2.webp"
            alt={t('week_2_alt')}
            fechas={t('week_2_dates')}
          />
          <PlanningCard
            imgSrc="/campus_de_verano/planificacion_semanal_turno_3.webp"
            alt={t('week_3_alt')}
            fechas={t('week_3_dates')}
          />
          
        </div>
      </section>
    </div>
  );
}
