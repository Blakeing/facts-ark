/**
 * Toast composable for managing toast notifications
 *
 * @example
 * import { useToast } from '@/shared/ui/toast'
 *
 * const { toast } = useToast()
 *
 * // Show different types of toasts
 * toast.success({ title: 'Success!', description: 'Task completed' })
 * toast.error({ title: 'Error', description: 'Something went wrong' })
 * toast.warning({ title: 'Warning', description: 'Please review' })
 * toast.info({ title: 'Info', description: 'Did you know...' })
 *
 * // Custom toast with action
 * toast.create({
 *   title: 'New message',
 *   description: 'You have 1 unread message',
 *   type: 'info',
 *   action: { label: 'View', onClick: () => console.log('clicked') },
 *   duration: 10000,
 * })
 */

import { createToaster } from '@ark-ui/vue/toast'
import type { ToastOptions } from './toast.types'

// Helper to convert our options to Ark UI format
type ArkToastOptions = Parameters<ReturnType<typeof createToaster>['create']>[0]

// Global toaster instance
const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
  duration: 5000,
})

/**
 * Toast composable
 *
 * Provides a simple API for creating toast notifications
 */
export function useToast() {
  return {
    /**
     * The toaster instance
     */
    toaster,

    /**
     * Create a toast with custom options
     */
    toast: {
      /**
       * Create a custom toast
       */
      create: (options: ToastOptions) => {
        const arkOptions: ArkToastOptions = {
          title: options.title,
          description: options.description,
          type: options.type || 'info',
          duration: options.duration,
        }

        if (options.action) {
          const { label, onClick } = options.action
          arkOptions.action = {
            label,
            onClick: onClick ?? (() => {}),
          }
        }

        return toaster.create(arkOptions)
      },

      /**
       * Show a success toast
       */
      success: (options: Omit<ToastOptions, 'type'>) => {
        const arkOptions: ArkToastOptions = {
          title: options.title,
          description: options.description,
          type: 'success',
          duration: options.duration,
        }

        if (options.action) {
          arkOptions.action = {
            label: options.action.label,
            onClick: options.action.onClick || (() => {}),
          }
        }

        return toaster.success(arkOptions)
      },

      /**
       * Show an error toast
       */
      error: (options: Omit<ToastOptions, 'type'>) => {
        const arkOptions: ArkToastOptions = {
          title: options.title,
          description: options.description,
          type: 'error',
          duration: options.duration,
        }

        if (options.action) {
          arkOptions.action = {
            label: options.action.label,
            onClick: options.action.onClick || (() => {}),
          }
        }

        return toaster.error(arkOptions)
      },

      /**
       * Show a warning toast
       */
      warning: (options: Omit<ToastOptions, 'type'>) => {
        const arkOptions: ArkToastOptions = {
          title: options.title,
          description: options.description,
          type: 'warning',
          duration: options.duration,
        }

        if (options.action) {
          arkOptions.action = {
            label: options.action.label,
            onClick: options.action.onClick || (() => {}),
          }
        }

        return toaster.create(arkOptions)
      },

      /**
       * Show an info toast
       */
      info: (options: Omit<ToastOptions, 'type'>) => {
        const arkOptions: ArkToastOptions = {
          title: options.title,
          description: options.description,
          type: 'info',
          duration: options.duration,
        }

        if (options.action) {
          arkOptions.action = {
            label: options.action.label,
            onClick: options.action.onClick || (() => {}),
          }
        }

        return toaster.create(arkOptions)
      },

      /**
       * Show a promise-based toast
       * Automatically shows loading, success, or error states
       */
      promise: <T>(
        promise: Promise<T>,
        options: {
          loading: Omit<ToastOptions, 'type'>
          success: Omit<ToastOptions, 'type'> | ((data: T) => Omit<ToastOptions, 'type'>)
          error: Omit<ToastOptions, 'type'> | ((error: unknown) => Omit<ToastOptions, 'type'>)
        },
      ) => {
        const buildArkOptions = (opts: Omit<ToastOptions, 'type'>) => {
          const arkOpts: ArkToastOptions = {
            title: opts.title,
            description: opts.description,
            duration: opts.duration,
          }
          if (opts.action) {
            arkOpts.action = {
              label: opts.action.label,
              onClick: opts.action.onClick || (() => {}),
            }
          }
          return arkOpts
        }

        return toaster.promise(promise, {
          loading: buildArkOptions(options.loading),
          success: (data: T) => {
            const successOptions =
              typeof options.success === 'function' ? options.success(data) : options.success
            return buildArkOptions(successOptions)
          },
          error: (error: unknown) => {
            const errorOptions =
              typeof options.error === 'function' ? options.error(error) : options.error
            return buildArkOptions(errorOptions)
          },
        })
      },

      /**
       * Update an existing toast
       */
      update: (id: string, options: Partial<ToastOptions>) => {
        const arkOptions: Partial<ArkToastOptions> = {
          title: options.title,
          description: options.description,
          type: options.type,
          duration: options.duration,
        }

        if (options.action) {
          arkOptions.action = {
            label: options.action.label,
            onClick: options.action.onClick || (() => {}),
          }
        }

        return toaster.update(id, arkOptions)
      },

      /**
       * Dismiss a toast
       */
      dismiss: (id?: string) => {
        if (id) {
          toaster.dismiss(id)
        } else {
          toaster.dismiss()
        }
      },

      /**
       * Dismiss all toasts
       */
      dismissAll: () => {
        toaster.dismiss()
      },
    },
  }
}
