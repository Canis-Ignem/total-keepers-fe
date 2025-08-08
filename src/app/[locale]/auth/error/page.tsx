'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AuthErrorPage() {
  const t = useTranslations('auth');
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams?.get('error');
    setError(errorParam || t('auth_error_occurred'));
  }, [searchParams, t]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('auth_error_title')}
          </h2>
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
          <div className="mt-6">
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {t('try_signing_in_again')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
