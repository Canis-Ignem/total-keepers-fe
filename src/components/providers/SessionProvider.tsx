'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { SocialLoginData } from '@/types/auth';

function AuthSyncComponent() {
  const { data: session, status } = useSession();
  const { loginWithSocial, isAuthenticated } = useAuth();

  useEffect(() => {
    const syncAuthWithBackend = async () => {
      if (status === 'authenticated' && session?.user && !isAuthenticated) {
        try {
          console.log('NextAuth session:', session); // Debug log
          
          // Map NextAuth session to our backend format
          let provider: 'google' | 'microsoft' | 'facebook' = 'google';
          
          // Determine provider based on session data
          if ((session as any).provider === 'azure-ad') {
            provider = 'microsoft';
          } else if ((session as any).provider === 'facebook') {
            provider = 'facebook';
          }

          // For Google OAuth, the social_id is typically in session.user.sub
          // If not available, we'll use the email as fallback
          const socialId = (session as any).user?.sub || 
                          (session.user as any).id || 
                          (session.user as any).socialId || 
                          session.user.email || '';

          const socialLoginData: SocialLoginData = {
            provider,
            email: session.user.email || '',
            name: session.user.name || '',
            social_id: socialId,
            avatar_url: session.user.image || undefined,
            first_name: session.user.name?.split(' ')[0] || '',
            last_name: session.user.name?.split(' ').slice(1).join(' ') || '',
          };

          console.log('Sending social login data:', socialLoginData); // Debug log
          await loginWithSocial(socialLoginData);
        } catch (error) {
          console.error('Failed to sync SSO auth with backend:', error);
        }
      }
    };

    syncAuthWithBackend();
  }, [session, status, isAuthenticated, loginWithSocial]);

  return null;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      <AuthSyncComponent />
      {children}
    </NextAuthSessionProvider>
  );
}
