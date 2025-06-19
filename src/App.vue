<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Houses', icon: 'pi pi-building', to: '/houses' },
  { label: 'Spells', icon: 'pi pi-bolt', to: '/spells' },
  { label: 'Elixirs', icon: 'pi pi-turkish-lira', to: '/elixirs' },
])
const isDark = ref(false)

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('app-dark', isDark.value)
}
</script>

<template>
  <div class="app-container">
    <header style="display: flex; align-items: center; justify-content: space-between">
      <Menubar :model="items">
        <template #item="{ item }">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="p-menuitem-link"
            v-slot="{ href, navigate, isActive }"
          >
            <a :href="href" @click="navigate" :class="[isActive ? 'router-link-active' : '']">
              <span v-if="item.icon" :class="['mr-2', item.icon]"></span>
              <span class="p-menuitem-text">{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </Menubar>
      <Button @click="toggleDarkMode" class="ml-4">
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </Button>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
/* No custom or Tailwind CSS needed! */
html,
body {
  background: var(--surface-ground, #fff);
  transition: background 0.3s;
}

.app-dark,
.app-dark body {
  background: var(--surface-ground, #474749);
}
</style>
