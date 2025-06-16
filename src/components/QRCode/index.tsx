import React from 'react';
import type { ReactElement } from 'react';
import styles from './styles.module.css';

export default function QRCode(): ReactElement {
  return (
    <section className={styles.qrSection}>
      <div className={styles.qrContainer}>
        <h2>Acesse nosso site</h2>
        <img 
          src="/img/frame.png" 
          alt="QR Code do site"
          className={styles.qrImage}
        />
        <p>Escaneie o QR Code para acessar o site em seu dispositivo móvel</p>
      </div>
    </section>
  );
}