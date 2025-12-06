// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event, 'session:', session);
      if (session?.user) {
        // Usar supabase.auth.getUser() para obtener un objeto de usuario autenticado
        const { data: { user: authenticatedUser }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching authenticated user:', error);
          setUser(null);
        } else {
          setUser(authenticatedUser);
          console.log('User set (authenticated):', authenticatedUser);
        }
      } else {
        setUser(null);
        console.log('User set to null');
      }
      setLoading(false);
    });

    // Initial check
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log('Initial user check:', user);
      setLoading(false);
    };
    getUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
      return { user: null, error };
    }
    setUser(data.user);
    router.push('/'); // Redirect to home after sign in
    return { user: data.user, error: null };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error.message);
      return { user: null, error };
    }
    setUser(data.user);
    router.push('/'); // Redirect to home after sign up
    return { user: data.user, error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      return { error };
    }
    setUser(null);
    router.push('/auth/signin'); // Redirect to sign in page after sign out
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
