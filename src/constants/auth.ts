import { SSOProvider } from '@/types/auth';

export const ssoProviders: SSOProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    bgColor: 'bg-red-500 hover:bg-red-600',
    textColor: 'text-white',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '🪟',
    bgColor: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    textColor: 'text-white',
  },
];
