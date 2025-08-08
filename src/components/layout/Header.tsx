"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import CartIcon from "../cart/CartIcon";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations("layout");
  const { user, isAuthenticated, logout } = useAuth();
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    // Handle both custom auth and NextAuth logout
    if (isAuthenticated) {
      await logout(); // Custom auth logout
    }
    if (status === 'authenticated') {
      await signOut({ redirect: false }); // NextAuth logout
    }
    setIsUserMenuOpen(false);
  };

  // Use either custom auth user or NextAuth session data
  const currentUser = user || (session?.user ? {
    first_name: session.user.name?.split(' ')[0] || '',
    last_name: session.user.name?.split(' ').slice(1).join(' ') || '',
    avatar_url: session.user.image,
    email: session.user.email
  } : null);

  const isUserAuthenticated = isAuthenticated || (status === 'authenticated' && session?.user);

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
        <a href="/campus-booking" className="hover:text-blue-700">{t('book_training')}</a>
        <a href="#" className="hover:text-blue-700">{t('coaches')}</a>
        <a href="/new-gloves" className="hover:text-blue-700">{t('new_gloves')}</a>
        <a href="/catalog" className="hover:text-blue-700">{t('gloves')}</a>
        <a href="#" className="hover:text-blue-700">{t('photos')}</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <CartIcon />
        
        {/* Authentication Menu */}
        {isUserAuthenticated && currentUser ? (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              {currentUser.avatar_url ? (
                <img
                  src={currentUser.avatar_url}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  {currentUser.first_name?.[0]}{currentUser.last_name?.[0]}
                </div>
              )}
              <span className="hidden sm:block">{currentUser.first_name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('sign_out')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              {t('sign_in')}
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {t('sign_up')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
