import { fetchHousePeople, fetchHouses } from '@/api/houses'
import type { House } from '@/types/houses'
import { defineStore } from 'pinia'
import { ref, reactive, onMounted } from 'vue'

export const useWizardingWorldStore = defineStore('wizardingWorld', () => {
  const tracker = reactive({
    visitCount: 0,
    lastViewedSpell: '',
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedSpell = ref(null)
  const loading = reactive({ value: false })
  const selectedHouse = ref<House | null>(null)
  const characters = ref(Array<House>)
  const houses = ref<Array<House> | null>([])
  const loadingCharacters = ref(false)
  const data = reactive([])
  const spells = ref([])

  async function fetchAndSetHouses() {
    isLoading.value = true
    error.value = null
    try {
      houses.value = await fetchHouses()
      console.log('Houses fetched:', houses.value)
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        error.value = (e as { message?: string }).message || 'Failed to fetch houses'
      } else {
        error.value = 'Failed to fetch houses'
      }
      houses.value = []
    } finally {
      isLoading.value = false
    }
  }
  onMounted(async () => {
    console.log('Store initialization completed')

    // setTimeout(() => {
    //   console.log('Store initialization completed')
    // }, 2000)
  })
  async function selectHouse(house: House) {
    selectedHouse.value = house
    loadingCharacters.value = true
    try {
      const chars = await fetchHousePeople(house.name)
      characters.value = chars
    } catch {
      characters.value = []
    }
    loadingCharacters.value = false
    document.title = `Selected: ${house.name}`
  }

  function getHouseById(id: string) {
    return data.find((house) => house.id === id)
  }

  function updateHousePoints(houseId: string, points: number) {
    const house = data.find((h) => h.id === houseId)
    if (house) {
      house.house_points = points
      localStorage.setItem('housePoints', JSON.stringify(data))
      return true
    }
  }

  function addSpell(name: string, effect: string, type: string) {
    const newId = (parseInt(spells.value[spells.value.length - 1]?.id || '0') + 1).toString()
    spells.value.push({ id: newId, name, effect, type })
  }

  function filterSpells(filterText: string) {
    tracker.visitCount++
    return spells.value.filter((spell) => {
      return (
        spell.name.toLowerCase().includes(filterText.toLowerCase()) ||
        spell.effect.toLowerCase().includes(filterText.toLowerCase()) ||
        spell.type.toLowerCase().includes(filterText.toLowerCase())
      )
    })
  }

  return {
    tracker,
    selectedSpell,
    loading,
    data,
    spells,
    selectedHouse,
    characters,
    houses,
    isLoading,
    error,
    selectHouse,
    getHouseById,
    updateHousePoints,
    addSpell,
    filterSpells,
    fetchAndSetHouses,
  }
})
