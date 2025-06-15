import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Node Red',
    Svg: require('@site/static/img/imagem_2025-06-10_200024209.svg').default,
    description: (
      <>
        Automatize tudo com apenas alguns cliques! O Node-RED transforma ideias em fluxos de automação eficientes, sem precisar programar.
      </>
    ),
  },
  {
    title: 'Raspberry Pi',
    Svg: require('@site/static/img/rasp.svg').default,
    description: (
      <>
        Potência, flexibilidade e inovação na palma da sua mão. Leve seu projeto ao próximo nível com o versátil Raspberry Pi.
      </>
    ),
  },
  {
    title: 'Banco de Dados',
    Svg: require('@site/static/img/banco.svg').default,
    description: (
      <>
        Seus dados, sempre organizados, seguros e acessíveis. Conte com um banco de dados robusto para dar estabilidade ao seu sistema.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
