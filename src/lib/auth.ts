import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      return true; // Allow all sign-ins
    },
    async jwt({ token, user, account }: any) {
      if (account && user) {
        token.provider = account.provider;
        token.socialId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        (session.user as any).provider = token.provider as string;
        (session.user as any).socialId = token.socialId as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
