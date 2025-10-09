/**
 * Vue Router Configuration
 *
 * Defines the application's routing structure using Vue Router.
 * Uses HTML5 history mode for clean URLs without hash fragments.
 *
 * Routes organized by purpose:
 * - / (home): Dashboard/activity view
 * - /components: Interactive component gallery (NEW)
 * - /showcase: Original component showcase
 * - /theme: Theming demo
 * - /transitions: Vue transitions demo
 * - /about: About page
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
      meta: {
        title: 'Dashboard',
        description: 'Activity and deployment overview',
      },
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentsView.vue'),
      meta: {
        title: 'Components',
        description: 'Interactive gallery of all 40+ UI components',
      },
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('../views/ComponentShowcaseView.vue'),
      meta: {
        title: 'Showcase',
        description: 'Component showcase with Park UI integration',
      },
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('../views/ThemeDemo.vue'),
      meta: {
        title: 'Theme',
        description: 'Tailwind CSS v4 theming ecosystem demo',
      },
    },
    {
      path: '/transitions',
      name: 'transitions',
      component: () => import('../components/TransitionDemo.vue'),
      meta: {
        title: 'Transitions',
        description: 'Vue Transition API demonstrations',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About',
        description: 'About Facts Ark design system',
      },
    },
  ],
})

export default router
