import Catalog from "@/components/Catalog";
import { getTranslations } from "next-intl/server";

export default async function CatalogPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  const products = [
    {
      id: "guante_pro_grip_2025",
      name: t('products.guante_pro_grip_2025.name'),
      description: t('products.guante_pro_grip_2025.description'),
      price: 79.99,
      img: "/train_with_us/gloves.svg",
      tag: "NOVEDAD",
      sizes: ["7", "8", "9", "10", "11"],
      tags: ["profesional", "látex", "adulto"]
    },
    {
      id: "guante_all_weather",
      name: t('products.guante_all_weather.name'),
      description: t('products.guante_all_weather.description'),
      price: 69.99,
      img: "/train_with_us/gloves.svg",
      tag: "NOVEDAD",
      sizes: ["8", "9", "10"],
      tags: ["clima", "adulto"]
    },
    {
      id: "guante_junior",
      name: t('products.guante_junior.name'),
      description: t('products.guante_junior.description'),
      price: 39.99,
      img: "/train_with_us/gloves.svg",
      tag: "NOVEDAD",
      sizes: ["5", "6", "7"],
      tags: ["junior", "niño"]
    },
    {
      id: "guante_ultra_flex",
      name: t('products.guante_ultra_flex.name'),
      description: t('products.guante_ultra_flex.description'),
      price: 59.99,
      img: "/train_with_us/gloves.svg",
      tag: "PRO",
      sizes: ["8", "9", "10", "11"],
      tags: ["flexible", "adulto"]
    },
    {
      id: "guante_aqua_control",
      name: t('products.guante_aqua_control.name'),
      description: t('products.guante_aqua_control.description'),
      price: 74.99,
      img: "/train_with_us/gloves.svg",
      tag: "CLIMA",
      sizes: ["7", "8", "9"],
      tags: ["clima", "látex"]
    },
    {
      id: "guante_classic",
      name: t('products.guante_classic.name'),
      description: t('products.guante_classic.description'),
      price: 49.99,
      img: "/train_with_us/gloves.svg",
      tag: "BÁSICO",
      sizes: ["9", "10", "11"],
      tags: ["clásico", "adulto"]
    },
    {
      id: "guante_speed_junior",
      name: t('products.guante_speed_junior.name'),
      description: t('products.guante_speed_junior.description'),
      price: 34.99,
      img: "/train_with_us/gloves.svg",
      tag: "JUNIOR",
      sizes: ["5", "6", "7"],
      tags: ["junior", "ligero"]
    },
    {
      id: "guante_power_grip",
      name: t('products.guante_power_grip.name'),
      description: t('products.guante_power_grip.description'),
      price: 84.99,
      img: "/train_with_us/gloves.svg",
      tag: "PRO",
      sizes: ["8", "9", "10"],
      tags: ["profesional", "protección"]
    },
    {
      id: "guante_eco_friendly",
      name: t('products.guante_eco_friendly.name'),
      description: t('products.guante_eco_friendly.description'),
      price: 54.99,
      img: "/train_with_us/gloves.svg",
      tag: "ECO",
      sizes: ["7", "8", "9"],
      tags: ["ecológico", "adulto"]
    },
    {
      id: "guante_training",
      name: t('products.guante_training.name'),
      description: t('products.guante_training.description'),
      price: 29.99,
      img: "/train_with_us/gloves.svg",
      tag: "ENTRENAMIENTO",
      sizes: ["8", "9", "10", "11"],
      tags: ["entrenamiento", "adulto"]
    },
    {
      id: "guante_soft_touch",
      name: t('products.guante_soft_touch.name'),
      description: t('products.guante_soft_touch.description'),
      price: 44.99,
      img: "/train_with_us/gloves.svg",
      tag: "CONFORT",
      sizes: ["6", "7", "8"],
      tags: ["confort", "niño"]
    },
    {
      id: "guante_extreme_grip",
      name: t('products.guante_extreme_grip.name'),
      description: t('products.guante_extreme_grip.description'),
      price: 89.99,
      img: "/train_with_us/gloves.svg",
      tag: "PRO",
      sizes: ["9", "10", "11"],
      tags: ["profesional", "extremo"]
    },
    {
      id: "guante_summer_edition",
      name: t('products.guante_summer_edition.name'),
      description: t('products.guante_summer_edition.description'),
      price: 64.99,
      img: "/train_with_us/gloves.svg",
      tag: "VERANO",
      sizes: ["7", "8", "9", "10"],
      tags: ["verano", "adulto"]
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f8fafc] to-[#eaf6fb] py-16 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-lg">
        {t('title')}
      </h1>
      <Catalog products={products} />
    </section>
  );
}

