'use client';

import { signIn } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import { SocialLoginData } from '@/types/auth';
import { ssoProviders } from '@/constants/auth';
import { useTranslations } from 'next-intl';

interface SSOButtonProps {
  provider: typeof ssoProviders[0];
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function SSOButton({ provider, onSuccess, onError, disabled }: SSOButtonProps) {
  const { loginWithSocial } = useAuth();
  const t = useTranslations('auth');

  const handleSSOLogin = async () => {
    try {
      // Use NextAuth to handle OAuth flow
      const result = await signIn(provider.id, { 
        redirect: false,
        callbackUrl: '/' 
      });

      if (result?.error) {
        onError?.(result.error);
        return;
      }

      // If NextAuth succeeds, we need to get the user data and send to our backend
      // This will be handled in the SessionProvider wrapper
      onSuccess?.();
    } catch (error: any) {
      onError?.(error.message || t('sso_login_failed'));
    }
  };

  return (
    <button
      onClick={handleSSOLogin}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium 
        transition-all duration-200 
        ${provider.bgColor} ${provider.textColor}
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-md hover:shadow-lg
      `}
    >
      <span className="text-xl">{provider.icon}</span>
      <span>{t('continue_with')} {provider.name}</span>
    </button>
  );
}

interface SSOButtonsProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function SSOButtons({ onSuccess, onError, disabled }: SSOButtonsProps) {
  return (
    <div className="space-y-3">
      {ssoProviders.map((provider) => (
        <SSOButton
          key={provider.id}
          provider={provider}
          onSuccess={onSuccess}
          onError={onError}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
