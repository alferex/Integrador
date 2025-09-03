import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { signIn, signUp, signInWithProvider } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let result;
      if (mode === 'signin') {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password);
      }

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage(mode === 'signup' ? 'Verifique seu email para confirmar a conta!' : 'Login realizado com sucesso!');
        if (mode === 'signin') {
          onClose();
        }
      }
    } catch (error) {
      setMessage('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'github' | 'google') => {
    setLoading(true);
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        setMessage(error.message);
      }
    } catch (error) {
      setMessage('Erro ao fazer login com ' + provider);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{mode === 'signin' ? 'Entrar' : 'Criar Conta'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.providerButtons}>
            <button
              className={styles.providerButton}
              onClick={() => handleProviderLogin('github')}
              disabled={loading}
            >
              <span>🐙</span> Continuar com GitHub
            </button>
            <button
              className={styles.providerButton}
              onClick={() => handleProviderLogin('google')}
              disabled={loading}
            >
              <span>🔍</span> Continuar com Google
            </button>
          </div>

          <div className={styles.divider}>
            <span>ou</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('sucesso') || message.includes('Verifique') ? styles.success : styles.error}`}>
                {message}
              </div>
            )}

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Carregando...' : (mode === 'signin' ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          <div className={styles.switchMode}>
            {mode === 'signin' ? (
              <p>
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={styles.linkButton}
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={styles.linkButton}
                >
                  Faça login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}