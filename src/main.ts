import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { definePreset } from '@primeuix/themes'
import Vue3Lottie from 'vue3-lottie'
import { clerkPlugin } from '@clerk/vue'
import * as Sentry from '@sentry/vue'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

import App from './App.vue'
import router from './router'

const wizardingPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: wizardingPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(VueQueryPlugin)
app.use(Vue3Lottie)
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
Sentry.init({
  app,
  dsn: 'https://305d0821a27a930fa04b7db2738e14e3@o4509539012968448.ingest.de.sentry.io/4509539014475856',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // This enables automatic instrumentation (highly recommended),
  // but is not necessary for purely manual usage
  // If you only want to use custom instrumentation:
  // * Remove the BrowserTracing integration
  // * add Sentry.addTracingExtensions() above your Sentry.init() call
  integrations: [Sentry.browserTracingIntegration()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  _experiments: { enableLogs: true },
  // Set tracePropagationTargets to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/gorgeous-gaufre-50e360\.netlify\.app\//],
})
app.mount('#app')
