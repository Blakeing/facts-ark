/**
 * Contact Form Feature
 *
 * Simple contact form demonstrating unified form architecture.
 */

export { useContactForm } from './model/useContactForm'
export { contactSchema } from './model/contactSchema'
export type { ContactFormData } from './model/contactSchema'
export { default as ContactForm } from './ui/ContactForm.vue'
