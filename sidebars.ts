import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 */
const sidebars: SidebarsConfig = {
  // Explicitly define the sidebar structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Integrator',
      items: [
        'integrator/introduction',
        'integrator/equipment',
        'integrator/plc-integration',
        'integrator/raspberry-integration',
        'integrator/challenges-conclusion',
      ],
    },
  ],
};

export default sidebars;
