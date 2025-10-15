/**
 * Vitest Configuration for Machine Tests
 *
 * Separate config for XState machine tests that don't need server setup.
 */

import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // No globalSetup - machines don't need json-server
    },
  }),
)
