"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CartIcon from "@/components/CartIcon";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations("layout");
  return (
    <header className="flex flex-row items-center py-4 border-b border-gray-200 w-full max-w-7xl mx-auto px-4">
      <div className="flex-shrink-0 flex items-center">
        <Image
          src="/logo.webp"
          alt="TKB Logo"
          className="h-20 w-auto"
          width={80}
          height={80}
        />
      </div>
      <nav className="flex-1 flex flex-wrap gap-6 text-sm font-semibold justify-center ml-8">
        <a href="/" className="hover:text-blue-700">{t('home')}</a>
        <a href="/campus-de-verano-bilbao" className="hover:text-blue-700">{t('campus')}</a>
        <a href="#" className="hover:text-blue-700">{t('coaches')}</a>
        <a href="#" className="hover:text-blue-700">{t('contact')}</a>
        <a href="/catalog" className="hover:text-blue-700">{t('gloves')}</a>
        <a href="#" className="hover:text-blue-700">{t('photos')}</a>
      </nav>
      <CartIcon />
    </header>
  );
};

export default Header;
