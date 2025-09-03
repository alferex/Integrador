import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import QRCode from '@site/src/components/QRCode';
import { FeedbackWidget } from '@site/src/components/Feedback';
import { useAnalytics } from '@site/src/hooks/useAnalytics';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="docs/integrator/Introdução">
            Conheça a documentação do nosso Integrador 😁
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  // Rastrear analytics para a página inicial
  useAnalytics('/');
  
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QRCode />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <FeedbackWidget pagePath="/" />
        </div>
      </main>
    </Layout>
  );
}
