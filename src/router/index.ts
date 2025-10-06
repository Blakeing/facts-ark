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
    // Component category pages
    {
      path: '/components/data-display',
      name: 'data-display',
      component: () => import('../views/components/DataDisplayView.vue'),
    },
    {
      path: '/components/form-inputs',
      name: 'form-inputs',
      component: () => import('../views/components/FormInputsView.vue'),
    },
    {
      path: '/components/navigation',
      name: 'navigation',
      component: () => import('../views/components/NavigationView.vue'),
    },
    {
      path: '/components/actions',
      name: 'actions',
      component: () => import('../views/components/ActionsView.vue'),
    },
    {
      path: '/components/layout',
      name: 'layout',
      component: () => import('../views/components/LayoutView.vue'),
    },
    // Legacy route - redirect to data display
    {
      path: '/components',
      redirect: '/components/data-display',
    },
  ],
})

export default router
