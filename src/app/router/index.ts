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
 * - /todos: FSD todo app demo
 * - /wizard: XState multi-step form wizard demo (NEW)
 * - /about: About page
 *
 * Lazy-loaded routes are code-split into separate chunks,
 * improving initial page load performance.
 *
 * @see {@link https://router.vuejs.org/guide/}
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../../pages/home/ui/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Dashboard',
        description: 'Activity and deployment overview',
      },
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../../pages/components/ui/ComponentsPage.vue'),
      meta: {
        title: 'Components',
        description: 'Interactive gallery of all 40+ UI components',
      },
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('../../pages/showcase/ui/ShowcasePage.vue'),
      meta: {
        title: 'Showcase',
        description: 'Component showcase with Park UI integration',
      },
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('../../pages/theme/ui/ThemePage.vue'),
      meta: {
        title: 'Theme',
        description: 'Tailwind CSS v4 theming ecosystem demo',
      },
    },
    {
      path: '/transitions',
      name: 'transitions',
      component: () => import('../../shared/ui/demos/TransitionDemo.vue'),
      meta: {
        title: 'Transitions',
        description: 'Vue Transition API demonstrations',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../../pages/about/ui/AboutPage.vue'),
      meta: {
        title: 'About',
        description: 'About Facts Ark design system',
      },
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../../pages/todos/ui/TodosPage.vue'),
      meta: {
        title: 'Todos',
        description: 'Feature-Sliced Design todo app with Pinia Colada',
      },
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: () => import('../../pages/wizard/ui/WizardPage.vue'),
      meta: {
        title: 'Form Wizard',
        description: 'Multi-step form powered by XState',
      },
    },
  ],
})

export default router
