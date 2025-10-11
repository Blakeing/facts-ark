import { createApp, defineComponent } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

/**
 * Helper to test composables that need Vue's injection context
 * @param composable - The composable function to test
 * @returns The result of the composable and an unmount function
 */
export function withSetup<T>(composable: () => T): [T, () => void] {
  let result!: T
  const app = createApp({
    setup() {
      result = composable()
      // Suppress missing template warning
      return () => {}
    },
  })

  const pinia = createPinia()
  app.use(pinia)
  app.use(PiniaColada)

  const el = document.createElement('div')
  app.mount(el)

  const unmount = () => {
    app.unmount()
    el.remove()
  }

  return [result, unmount]
}
