import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from './userStore'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets user and role correctly', () => {
    const store = useUserStore()
    const user = { publicMetadata: { role: 'admin' } }
    store.setUser(user)
    expect(store.user).toStrictEqual(user)
    expect(store.role).toBe('admin')
    expect(store.isSignedIn).toBe(true)
  })

  it('clears user and resets state', () => {
    const store = useUserStore()
    store.setUser({ publicMetadata: { role: 'admin' } })
    store.clearUser()
    expect(store.user).toBe(null)
    expect(store.role).toBe(null)
    expect(store.isSignedIn).toBe(false)
  })
})
