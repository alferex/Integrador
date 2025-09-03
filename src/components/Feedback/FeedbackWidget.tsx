import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, UserFeedback } from '../../lib/supabase';
import styles from './styles.module.css';

interface FeedbackWidgetProps {
  pagePath: string;
}

export default function FeedbackWidget({ pagePath }: FeedbackWidgetProps) {
  const { user } = useAuth();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'helpful' | 'not_helpful' | 'suggestion'>('helpful');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [existingFeedbacks, setExistingFeedbacks] = useState<UserFeedback[]>([]);

  useEffect(() => {
    loadFeedbacks();
  }, [pagePath]);

  const loadFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .eq('page_path', pagePath)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Erro ao carregar feedbacks:', error);
      } else {
        setExistingFeedbacks(data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar feedbacks:', error);
    }
  };

  const submitFeedback = async () => {
    setLoading(true);
    setMessage('');

    try {
      const feedbackData: UserFeedback = {
        user_id: user?.id || null,
        page_path: pagePath,
        feedback_type: feedbackType,
        comment: comment.trim() || null,
        rating: feedbackType === 'suggestion' ? rating : null,
      };

      const { error } = await supabase
        .from('user_feedback')
        .insert([feedbackData]);

      if (error) {
        setMessage('Erro ao enviar feedback: ' + error.message);
      } else {
        setMessage('Feedback enviado com sucesso!');
        setComment('');
        setShowFeedbackForm(false);
        loadFeedbacks(); // Recarregar feedbacks
      }
    } catch (error) {
      setMessage('Erro ao enviar feedback');
    } finally {
      setLoading(false);
    }
  };

  const quickFeedback = async (type: 'helpful' | 'not_helpful') => {
    setLoading(true);
    try {
      const feedbackData: UserFeedback = {
        user_id: user?.id || null,
        page_path: pagePath,
        feedback_type: type,
      };

      const { error } = await supabase
        .from('user_feedback')
        .insert([feedbackData]);

      if (error) {
        setMessage('Erro ao enviar feedback');
      } else {
        setMessage('Obrigado pelo feedback!');
        loadFeedbacks();
      }
    } catch (error) {
      setMessage('Erro ao enviar feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.feedbackWidget}>
      <div className={styles.feedbackHeader}>
        <h4>Esta página foi útil?</h4>
        <div className={styles.quickActions}>
          <button
            className={styles.helpfulButton}
            onClick={() => quickFeedback('helpful')}
            disabled={loading}
          >
            👍 Sim
          </button>
          <button
            className={styles.notHelpfulButton}
            onClick={() => quickFeedback('not_helpful')}
            disabled={loading}
          >
            👎 Não
          </button>
          <button
            className={styles.detailedButton}
            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
          >
            💬 Comentar
          </button>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('sucesso') || message.includes('Obrigado') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      {showFeedbackForm && (
        <div className={styles.feedbackForm}>
          <div className={styles.formGroup}>
            <label>Tipo de feedback:</label>
            <select 
              value={feedbackType} 
              onChange={(e) => setFeedbackType(e.target.value as any)}
            >
              <option value="helpful">Útil</option>
              <option value="not_helpful">Não útil</option>
              <option value="suggestion">Sugestão</option>
            </select>
          </div>

          {feedbackType === 'suggestion' && (
            <div className={styles.formGroup}>
              <label>Avaliação (1-5):</label>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Comentário (opcional):</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deixe seu comentário ou sugestão..."
              rows={3}
            />
          </div>

          <div className={styles.formActions}>
            <button 
              onClick={submitFeedback} 
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Enviando...' : 'Enviar Feedback'}
            </button>
            <button 
              onClick={() => setShowFeedbackForm(false)}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {existingFeedbacks.length > 0 && (
        <div className={styles.existingFeedbacks}>
          <h5>Feedbacks recentes:</h5>
          {existingFeedbacks.map((feedback, index) => (
            <div key={feedback.id || index} className={styles.feedbackItem}>
              <div className={styles.feedbackMeta}>
                <span className={styles.feedbackType}>
                  {feedback.feedback_type === 'helpful' ? '👍' : 
                   feedback.feedback_type === 'not_helpful' ? '👎' : '💬'}
                </span>
                <span className={styles.feedbackDate}>
                  {new Date(feedback.created_at || '').toLocaleDateString()}
                </span>
              </div>
              {feedback.comment && (
                <div className={styles.feedbackComment}>{feedback.comment}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}