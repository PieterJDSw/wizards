<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  {
    label: 'Home',
    icon: 'fas fa-home',
    to: '/',
  },
  {
    label: 'Houses',
    icon: 'fas fa-building',
    to: '/houses',
  },
  {
    label: 'Spells',
    icon: 'fas fa-bolt',
    to: '/spells',
  },
  {
    label: 'Elixirs',
    icon: 'fas fa-flask',
    to: '/elixirs',
  },
])
</script>

<template>
  <div class="app-container">
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-2">
        <Menubar :model="items" class="custom-menubar">
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
      </div>
    </header>

    <main class="container mx-auto py-8 px-4">
      <RouterView />
    </main>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  height: 100%;
  width: 100%;
  background-color: #fff !important;
}

#app,
.app-container {
  min-height: 100vh;
  width: 100%;
  background-color: #fff !important;
}

.custom-menubar {
  background-color: #fff !important;
  border: none !important;
  z-index: 100 !important;
  display: block !important;
  position: relative !important;
}

.custom-menubar .p-menubar,
.custom-menubar .p-menuitem,
.custom-menubar .p-menuitem-link,
.custom-menubar .p-menuitem-text,
.custom-menubar .p-menuitem-icon {
  background-color: #fff !important;
  color: #333 !important;
}

.custom-menubar .p-menubar {
  display: flex !important;
  border: none !important;
  background-color: #fff !important;
}

.custom-menubar .p-menuitem-link {
  display: flex !important;
  align-items: center !important;
  padding: 0.75rem 1rem !important;
}

.custom-menubar .p-menuitem-icon {
  margin-right: 0.5rem !important;
}

.custom-menubar .p-menuitem-link:hover {
  background-color: #f5f5f5 !important;
}

:root {
  --surface-a: #fff;
  --surface-b: #fff;
  --surface-c: #fff;
  --surface-d: #fff;
  --surface-e: #fff;
  --surface-f: #fff;
}
</style>
