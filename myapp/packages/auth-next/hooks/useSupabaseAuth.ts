import { useState, useEffect } from 'react';
import { supabase } from '../../../apps/next/utils/supabase';
import { User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        // 非同期でセッションを取得する
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setError(error);
        }
        setUser(session?.user ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 認証状態の変化を監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      // subscription の解除（v2 では .subscription.unsubscribe() が必要です）
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Sign Up Error:', error.message);
      throw error;
    }
    return data.user;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Sign In Error:', error.message, error);
      // ここでエラーの内容に応じたメッセージを返すこともできます
      // 例: error.message に "Email not confirmed" が含まれている場合、ユーザーにメールを確認するよう促す
      throw error;
    }
    return data.user;
  };


  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign Out Error:', error.message);
      throw error;
    }
  };

  return { user, loading, error, signUp, signIn, signOut };
};