import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
      docgen: 'vue-component-meta',
    },
  },
}

export default config
