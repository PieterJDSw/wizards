import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
      exclude: [...configDefaults.exclude, 'e2e/**'],
      coverage: {
        provider: 'istanbul',
      },
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
