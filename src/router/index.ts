/**
 * Vue Router Configuration
 *
 * Defines the application's routing structure using Vue Router.
 * Uses HTML5 history mode for clean URLs without hash fragments.
 *
 * Routes:
 * - / (home): Main landing page (eager loaded)
 * - /about: About page (lazy loaded)
 * - /components: Component showcase page (lazy loaded)
 *
 * Lazy-loaded routes are code-split into separate chunks,
 * improving initial page load performance.
 *
 * @see {@link https://router.vuejs.org/guide/}
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Lazy-loaded route: generates separate chunk (About.[hash].js)
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/showcase',
      name: 'showcase',
      // Component showcase with all migrated Park UI components
      component: () => import('../views/ComponentShowcaseView.vue'),
    },
    {
      path: '/theme',
      name: 'theme',
      // Tailwind CSS v4 theming ecosystem demo
      component: () => import('../views/ThemeDemo.vue'),
    },
  ],
})

export default router
