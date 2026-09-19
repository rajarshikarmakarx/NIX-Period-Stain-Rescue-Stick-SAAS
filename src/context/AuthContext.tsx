import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
}

interface SignUpResult {
  success: boolean;
  needsConfirmation?: boolean;
  error?: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (fullName: string, email: string, phone: string, password: string) => Promise<SignUpResult>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithPhone: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string, phone: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, emailFallback = '', phoneFallback = '') => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        setProfile(data);
      } else {
        // Fallback constructing profile from user metadata if table row is still syncing
        const sessionUser = (await supabase.auth.getUser()).data.user;
        const metaName = sessionUser?.user_metadata?.full_name || 'NIX Customer';
        const profileObj: UserProfile = {
          id: userId,
          full_name: metaName,
          email: sessionUser?.email || emailFallback,
          phone_number: sessionUser?.user_metadata?.phone_number || phoneFallback,
        };
        setProfile(profileObj);
      }
    } catch (e) {
      console.error('Error fetching profile from Supabase:', e);
    }
  };

  // Session listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }: { data: { session: Session | null }; error: Error | null }) => {
      if (error) {
        console.error('Supabase getSession error:', error.message);
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (fullName: string, email: string, phone: string, password: string): Promise<SignUpResult> => {
    try {
      // Check if phone number is already registered in public.profiles
      const { data: existingPhone } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone_number', phone)
        .maybeSingle();

      if (existingPhone) {
        return {
          success: false,
          error: 'An account with this phone number already exists. Please sign in or use a different phone number.',
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
            phone: phone,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Explicitly upsert profile into public.profiles table
      if (data.user) {
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            phone_number: phone,
            updated_at: new Date().toISOString(),
          });
        } catch (e) {
          console.warn('Could not direct upsert profile row during signup:', e);
        }
      }

      const needsConfirmation = !data.session;
      return { success: true, needsConfirmation };
    } catch (err: any) {
      return { success: false, error: err.message || 'Signup failed' };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, email);
        return { success: true };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    try {
      // 1. Look up the registered Email ID linked to this phone number in public.profiles table
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('email')
        .eq('phone_number', phone)
        .maybeSingle();

      if (profileRow?.email) {
        return await signInWithEmail(profileRow.email, password);
      }

      // 2. Fallback to native phone auth if configured in Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });

      if (!error && data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, '', phone);
        return { success: true };
      }

      return {
        success: false,
        error: 'No account found with this phone number. Please check your phone number or sign in using your Email ID.',
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Phone sign in failed' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Sign out error:', e);
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (fullName: string, phone: string) => {
    if (!user) return { success: false, error: 'No authenticated user found' };

    try {
      // 1. Update user metadata in Supabase Auth
      await supabase.auth.updateUser({
        data: { full_name: fullName, phone_number: phone },
      });

      // 2. Update profiles table row in Supabase DB
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone_number: phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.warn('Could not update profiles table row:', error.message);
      }

      setProfile((prev) =>
        prev ? { ...prev, full_name: fullName, phone_number: phone } : null
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signInWithEmail,
        signInWithPhone,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
