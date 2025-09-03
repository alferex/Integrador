import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../Auth';
import styles from './styles.module.css';

export default function UserButton() {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  if (loading) {
    return <div className={styles.loading}>...</div>;
  }

  if (!user) {
    return (
      <>
        <button
          className={styles.loginButton}
          onClick={() => setShowAuthModal(true)}
        >
          Entrar
        </button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return (
    <div className={styles.userMenu}>
      <button
        className={styles.userButton}
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <div className={styles.avatar}>
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Avatar" />
          ) : (
            <span>{user.email?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <span className={styles.userName}>
          {user.user_metadata?.full_name || user.email}
        </span>
      </button>

      {showUserMenu && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem}>
            <strong>{user.email}</strong>
          </div>
          <hr className={styles.divider} />
          <button
            className={styles.dropdownButton}
            onClick={() => {
              setShowUserMenu(false);
              // Navegar para dashboard (implementar depois)
            }}
          >
            Dashboard
          </button>
          <button
            className={styles.dropdownButton}
            onClick={() => {
              setShowUserMenu(false);
              // Navegar para configurações (implementar depois)
            }}
          >
            Configurações
          </button>
          <hr className={styles.divider} />
          <button
            className={styles.dropdownButton}
            onClick={handleSignOut}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}