/**
 * Tailwind CSS v4 Configuration
 *
 * In Tailwind v4, most configuration is done via CSS using @theme directive.
 * See src/assets/park-ui-tokens.css for design token definitions.
 *
 * This file is kept minimal for Tailwind v4's new architecture.
 */

import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // Tailwind v4 uses CSS-based configuration via @theme directive
  // See src/assets/tailwind-theme.css for theme customization
} satisfies Config
