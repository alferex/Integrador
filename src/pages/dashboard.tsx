import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserFeedback, UserPreferences } from '../lib/supabase';
import { useAnalytics } from '../hooks/useAnalytics';
import styles from './dashboard.module.css';

export default function Dashboard(): React.ReactElement {
  const { user, loading } = useAuth();
  const [userFeedbacks, setUserFeedbacks] = useState<UserFeedback[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Rastrear analytics
  useAnalytics('/dashboard');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoadingData(true);
    try {
      // Carregar feedbacks do usuário
      const { data: feedbacks } = await supabase
        .from('user_feedback')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Carregar preferências do usuário
      const { data: prefs } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setUserFeedbacks(feedbacks || []);
      setPreferences(prefs);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const updatePreferences = async (newPrefs: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      const updatedPrefs = { ...preferences, ...newPrefs };
      
      if (preferences) {
        // Atualizar preferências existentes
        const { error } = await supabase
          .from('user_preferences')
          .update(updatedPrefs)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        // Criar novas preferências
        const { error } = await supabase
          .from('user_preferences')
          .insert([{ user_id: user.id, ...newPrefs }]);
        
        if (error) throw error;
      }

      setPreferences({ ...preferences, ...newPrefs } as UserPreferences);
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
    }
  };

  if (loading || loadingData) {
    return (
      <Layout title="Dashboard">
        <div className={styles.container}>
          <div className={styles.loading}>Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Dashboard">
        <div className={styles.container}>
          <div className={styles.loginRequired}>
            <h2>Acesso Restrito</h2>
            <p>Você precisa fazer login para acessar o dashboard.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
          <p>Bem-vindo, {user.user_metadata?.full_name || user.email}!</p>
        </div>

        <div className={styles.grid}>
          {/* Seção de Estatísticas */}
          <div className={styles.card}>
            <h3>Suas Estatísticas</h3>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{userFeedbacks.length}</span>
              <span className={styles.statLabel}>Feedbacks enviados</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {userFeedbacks.filter(f => f.feedback_type === 'helpful').length}
              </span>
              <span className={styles.statLabel}>Avaliações positivas</span>
            </div>
          </div>

          {/* Seção de Preferências */}
          <div className={styles.card}>
            <h3>Preferências</h3>
            <div className={styles.preference}>
              <label>Tema:</label>
              <select
                value={preferences?.theme || 'auto'}
                onChange={(e) => updatePreferences({ theme: e.target.value as any })}
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div className={styles.preference}>
              <label>
                <input
                  type="checkbox"
                  checked={preferences?.notifications_enabled ?? true}
                  onChange={(e) => updatePreferences({ notifications_enabled: e.target.checked })}
                />
                Receber notificações
              </label>
            </div>
          </div>

          {/* Histórico de Feedbacks */}
          <div className={styles.card + ' ' + styles.fullWidth}>
            <h3>Histórico de Feedbacks</h3>
            {userFeedbacks.length === 0 ? (
              <p>Você ainda não enviou nenhum feedback.</p>
            ) : (
              <div className={styles.feedbackList}>
                {userFeedbacks.map((feedback) => (
                  <div key={feedback.id} className={styles.feedbackItem}>
                    <div className={styles.feedbackHeader}>
                      <span className={styles.feedbackPage}>{feedback.page_path}</span>
                      <span className={styles.feedbackDate}>
                        {new Date(feedback.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.feedbackType}>
                      {feedback.feedback_type === 'helpful' ? '👍 Útil' : 
                       feedback.feedback_type === 'not_helpful' ? '👎 Não útil' : '💬 Sugestão'}
                    </div>
                    {feedback.comment && (
                      <div className={styles.feedbackComment}>{feedback.comment}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}