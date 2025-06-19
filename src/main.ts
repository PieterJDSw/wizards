import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { definePreset } from '@primeuix/themes'
import Vue3Lottie from 'vue3-lottie'

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

app.mount('#app')
