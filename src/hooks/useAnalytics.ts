import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, PageAnalytics } from '../lib/supabase';

// Gerar um ID de sessão único para analytics
const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Armazenar sessionId no sessionStorage
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export function useAnalytics(pagePath: string) {
  const { user } = useAuth();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const analyticsData: PageAnalytics = {
          page_path: pagePath,
          user_id: user?.id || null,
          session_id: getSessionId(),
          user_agent: navigator.userAgent,
        };

        // Inserir dados de analytics (sem aguardar resposta para não afetar performance)
        supabase
          .from('page_analytics')
          .insert([analyticsData])
          .then(({ error }) => {
            if (error) {
              console.warn('Erro ao enviar analytics:', error);
            }
          });
      } catch (error) {
        console.warn('Erro ao rastrear página:', error);
      }
    };

    // Pequeno delay para evitar múltiplas chamadas durante navegação rápida
    const timer = setTimeout(trackPageView, 1000);

    return () => clearTimeout(timer);
  }, [pagePath, user?.id]);

  return null; // Este hook não retorna dados, apenas rastreia
}