import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Spectra',
  description: 'Cryptographic asset discovery and quantum risk intelligence',
  appearance: 'force-dark',
  head: [['link', { rel: 'icon', href: '/spectra-mark.svg' }]],
  themeConfig: {
    logo: '/spectra-mark.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/reference/cli' },
      { text: 'Compliance', link: '/compliance/cnsa-20' },
      { text: 'Integrations', link: '/integrations/github-actions' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Design Manifesto', link: '/guide/about' },
            { text: 'Known Limitations', link: '/guide/known-limitations' },
            { text: 'What is Spectra', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'CLI Commands', link: '/reference/cli' },
            { text: 'Algorithm Database', link: '/reference/algorithms' },
            { text: 'Quantum Risk Score (QRS)', link: '/reference/qrs' },
            { text: 'CBOM Format', link: '/reference/cbom' },
            { text: 'Cryptographic Agility Index (CAI)', link: '/reference/cai' },
            { text: 'Cryptographic Posture Score (CPS)', link: '/reference/cps' }
          ]
        }
      ],
      '/integrations/': [
        {
          text: 'Integrations',
          items: [
            { text: 'GitHub Actions', link: '/integrations/github-actions' },
            { text: 'VS Code', link: '/integrations/vscode' },
            { text: 'Docker', link: '/integrations/docker' },
            { text: 'Pre-commit Hooks', link: '/integrations/pre-commit' },
            { text: 'GitLab CI', link: '/integrations/gitlab-ci' }
          ]
        }
      ],
      '/compliance/': [
        {
          text: 'Compliance Frameworks',
          items: [
            { text: 'NSA CNSA 2.0', link: '/compliance/cnsa-20' },
            { text: 'NIST SP 800-131A', link: '/compliance/nist-800-131a' },
            { text: 'PCI DSS v4.0', link: '/compliance/pci-dss-4' },
            { text: 'FIPS 140-3', link: '/compliance/fips-140-3' }
          ]
        }
      ]
    },
    editLink: {
      pattern: 'https://github.com/HarshalPatel1972/spectra/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Harshal Patel',
    }
  }
})
