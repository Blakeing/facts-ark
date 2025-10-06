/**
 * Application Entry Point
 *
 * This file initializes the Vue 3 application with:
 * - Pinia for state management
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

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Enable Pinia store
app.use(createPinia())

// Enable Vue Router
app.use(router)

// Mount the app
app.mount('#app')
