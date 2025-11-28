// app/auth/signup/page.tsx
'use client';

import React from 'react';
import AuthForm from '@/components/auth/AuthForm'; // Commented out AuthForm
import Link from 'next/link';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons'; // Import SocialAuthButtons

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))] bg-[var(--background-light)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--foreground-dark)]">
            Crea tu Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/signin" className="font-medium text-[var(--accent-gold)] hover:text-yellow-700">
              Inicia Sesión
            </Link>
          </p>
        </div>
        <AuthForm type="signup" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O regístrate con</span>
          </div>
        </div>

        <SocialAuthButtons />
      </div>
    </div>
  );
};

export default SignUpPage;
