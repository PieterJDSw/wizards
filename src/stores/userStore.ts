import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserResource } from '@clerk/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResource | null>(null)
  const role = ref(null)
  const isSignedIn = ref(false)

  function setUser(newUser: UserResource) {
    user.value = newUser
    role.value = newUser?.publicMetadata?.role || null
    isSignedIn.value = !!newUser
  }

  function clearUser() {
    user.value = null
    role.value = null
    isSignedIn.value = false
  }

  return { user, role, isSignedIn, setUser, clearUser }
})
