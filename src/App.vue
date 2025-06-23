<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import { useUser } from '@clerk/vue'
import { useUserStore } from './stores/userStore'
const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Houses', icon: 'pi pi-building', to: '/houses' },
  { label: 'Spells', icon: 'pi pi-bolt', to: '/spells' },
  { label: 'Elixirs', icon: 'pi pi-turkish-lira', to: '/elixirs' },
  { label: 'Trivia', icon: 'pi pi-sparkles', to: '/leaderboard' },
  // { label: 'Ingredients', icon: 'pi pi-turkish-lira', to: '/elixirs' },
])
const { user } = useUser()
const userStore = useUserStore()

watch(
  user,
  (newUser) => {
    if (newUser) {
      userStore.setUser(newUser)
    } else {
      userStore.clearUser()
    }
  },
  { immediate: true },
)

const isDark = ref(false)
function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('app-dark', isDark.value)
}
onMounted(() => {})
</script>

<template>
  <div class="app-container">
    <header style="align-items: center" class="mb-4">
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
        <template #end>
          <div class="flex space-x-2 align-items-center justify-content-center">
            <Button @click="toggleDarkMode" class="ml-4">
              {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </Button>
            <SignedOut>
              <SignInButton
                :appearance="{
                  elements: {
                    img: {
                      width: '100%',
                      height: '100%',
                    },
                    span: {
                      width: '100%',
                      height: '100%',
                    },
                    Button: {
                      fontSize: '14px',
                      textTransform: 'none',
                      backgroundColor: '#611BBD',
                      '&:hover, &:focus, &:active': {
                        backgroundColor: '#49247A',
                      },
                    },
                  },
                }"
              />
            </SignedOut>
            <SignedIn>
              <UserButton
                :appearance="{
                  elements: {
                    img: {
                      width: '100%',
                      height: '100%',
                    },
                    span: {
                      width: '100%',
                      height: '100%',
                    },
                    Button: {
                      fontSize: '14px',
                      textTransform: 'none',
                      backgroundColor: '#611BBD',
                      '&:hover, &:focus, &:active': {
                        backgroundColor: '#49247A',
                      },
                    },
                  },
                }"
              />
            </SignedIn>
          </div>
        </template>
      </Menubar>
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

publicMetadata.role
