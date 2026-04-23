import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) checkInactivity();
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        localStorage.setItem('last_activity', Date.now().toString());
      }
      setLoading(false);
    });

    // Inactivity check
    const checkInactivity = () => {
      const lastActivity = localStorage.getItem('last_activity');
      const timeout = 2 * 60 * 60 * 1000; // 2 hours
      if (lastActivity && Date.now() - parseInt(lastActivity) > timeout) {
        logout();
      } else {
        localStorage.setItem('last_activity', Date.now().toString());
      }
    };

    const interval = setInterval(checkInactivity, 60000); // Check every minute

    const handleUserActivity = () => {
      localStorage.setItem('last_activity', Date.now().toString());
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
