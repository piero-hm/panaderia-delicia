// components/auth/SocialAuthButtons.tsx
'use client';

import React from 'react';
import { toast } from 'react-toastify';

const SocialAuthButtons = () => {
  // En un entorno real, estos botones tendrían lógica para iniciar sesión con proveedores de OAuth
  // Por ahora, son solo placeholders visuales.

  const handleGoogleSignIn = () => {
    toast.info('Iniciar sesión con Google (funcionalidad no implementada)');
    // Aquí iría la lógica de Supabase para signInWithOAuth({ provider: 'google' })
  };

  const handleFacebookSignIn = () => {
    toast.info('Iniciar sesión con Facebook (funcionalidad no implementada)');
    // Aquí iría la lógica de Supabase para signInWithOAuth({ provider: 'facebook' })
  };

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={handleGoogleSignIn}
        className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h3.32c-.34 2.04-2.05 3.58-3.32 3.58-1.96 0-3.56-1.59-3.56-3.56s1.6-3.56 3.56-3.56c.98 0 1.86.4 2.53 1.05l2.36-2.36c-1.6-1.5-3.7-2.42-5.89-2.42-4.85 0-8.79 3.94-8.79 8.79s3.94 8.79 8.79 8.79c4.52 0 8.23-3.24 8.79-7.5h-8.79z" />
          </svg>
        </span>
        Iniciar Sesión con Google
      </button>
      <button
        onClick={handleFacebookSignIn}
        className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.35c0 .732.593 1.325 1.325 1.325h11.358v-9.294h-3.13v-3.622h3.13v-2.19c0-3.102 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.075c.732 0 1.325-.593 1.325-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
          </svg>
        </span>
        Iniciar Sesión con Facebook
      </button>
    </div>
  );
};

export default SocialAuthButtons;
