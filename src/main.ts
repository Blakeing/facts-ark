/**
 * Application Entry Point
 *
 * This file initializes the Vue 3 application with:
 * - Pinia for state management
 * - Pinia Colada for data fetching
 * - Vue Router for navigation
 * - Tailwind CSS v4 for styling
 *
 * The app is mounted to the #app element in index.html
 *
 * @see {@link https://vuejs.org/guide/quick-start.html}
 */

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

import App from './App.vue'
import router from './app/router'

const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()

// Enable Pinia store
app.use(pinia)

// Enable Pinia Colada for data fetching
app.use(PiniaColada)

// Enable Vue Router
app.use(router)

// Mount the app
app.mount('#app')
