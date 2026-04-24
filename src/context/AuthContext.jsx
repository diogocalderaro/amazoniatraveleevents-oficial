import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

/**
 * Checks if a JWT token's exp claim is expired or about to expire (within 60s).
 */
function isTokenExpiredOrExpiring(session) {
  if (!session?.access_token) return true;
  try {
    const payload = JSON.parse(atob(session.access_token.split('.')[1]));
    const expiresAt = payload.exp * 1000; // convert to ms
    const bufferMs = 60 * 1000; // 60 second buffer
    return Date.now() >= (expiresAt - bufferMs);
  } catch {
    return true; // if we can't parse the token, treat as expired
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // sessionReady is true only when we have a confirmed valid (non-expired) session
  const [sessionReady, setSessionReady] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error during sign out:', err);
    }
    setUser(null);
    setSessionReady(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // No session at all — user is not logged in
          if (mounted) {
            setUser(null);
            setSessionReady(false);
            setLoading(false);
          }
          return;
        }

        // Check inactivity timeout (2 hours)
        const lastActivity = localStorage.getItem('last_activity');
        const timeout = 2 * 60 * 60 * 1000;
        if (lastActivity && Date.now() - parseInt(lastActivity) > timeout) {
          console.log('[Auth] Session inactive for too long, signing out.');
          await handleLogout();
          if (mounted) setLoading(false);
          return;
        }

        // Check if the token is expired or about to expire
        if (isTokenExpiredOrExpiring(session)) {
          console.log('[Auth] Token expired or expiring, attempting refresh...');
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError || !refreshData?.session) {
            console.warn('[Auth] Token refresh failed, signing out.', refreshError?.message);
            await handleLogout();
            if (mounted) setLoading(false);
            return;
          }

          // Refresh succeeded — use the new session
          console.log('[Auth] Token refreshed successfully.');
          if (mounted) {
            setUser(refreshData.session.user);
            setSessionReady(true);
            localStorage.setItem('last_activity', Date.now().toString());
            setLoading(false);
          }
        } else {
          // Token is still valid
          if (mounted) {
            setUser(session.user);
            setSessionReady(true);
            localStorage.setItem('last_activity', Date.now().toString());
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('[Auth] Error initializing session:', err);
        if (mounted) {
          setUser(null);
          setSessionReady(false);
          setLoading(false);
        }
      }
    }

    initSession();

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      console.log('[Auth] Auth state changed:', event);

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSessionReady(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setSessionReady(true);
        localStorage.setItem('last_activity', Date.now().toString());
      } else {
        setUser(null);
        setSessionReady(false);
      }

      setLoading(false);
    });

    // Inactivity check every minute
    const inactivityInterval = setInterval(() => {
      const lastActivity = localStorage.getItem('last_activity');
      const timeout = 2 * 60 * 60 * 1000;
      if (lastActivity && Date.now() - parseInt(lastActivity) > timeout) {
        console.log('[Auth] Inactivity timeout reached, signing out.');
        handleLogout();
      }
    }, 60000);

    // Track user activity
    const handleUserActivity = () => {
      localStorage.setItem('last_activity', Date.now().toString());
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearInterval(inactivityInterval);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [handleLogout]);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  async function logout() {
    await handleLogout();
  }

  return (
    <AuthContext.Provider value={{ user, loading, sessionReady, login, logout }}>
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
