import { fetchHousePeople, fetchHouses } from '@/api/houses'
import type { House } from '@/types/houses'
import { defineStore } from 'pinia'
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '../api/supabase'
export const useWizardingWorldStore = defineStore('wizardingWorld', () => {
  const tracker = reactive({
    visitCount: 0,
    lastViewedSpell: '',
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedSpell = ref<Spell | null>(null)
  const loading = reactive({ value: false })
  const selectedHouse = ref<House | null>(null)
  const characters = ref(Array<House>)
  const houses = ref<Array<House> | null>([])
  const loadingCharacters = ref(false)
  const data = reactive([])
  const spells = ref<Spell[]>([])

  async function fetchAndSetHouses() {
    isLoading.value = true
    error.value = null
    try {
      const fetchedHouses = await fetchHouses()

      if (!fetchedHouses || !Array.isArray(fetchedHouses)) {
        throw new Error('fetchHouses did not return an array')
      }

      const houseNames = fetchedHouses.map((h: House) => h.name)
      const { data: supaData, error: supaError } = await supabase
        .from('houses')
        .select('name,points')
        .in('name', houseNames)

      supaData?.forEach((house: Record<string, unknown>) => {
        const existingHouse = fetchedHouses.find((h: House) => h.name === house.name)
        console.log(`Processing house: ${house.name}, points: ${house.points}`)
        if (existingHouse) {
          existingHouse.house_points = house.points
          console.log(`Updated house ${house.name} with points: ${house.points}`)
        } else {
          console.warn(`House ${house.name} not found in fetched houses`)
        }
      })
      fetchedHouses.forEach((h) => {
        if (h.house_points === undefined || h.house_points === null) {
          h.house_points = 0 // Assign default points if not found in supabase
          console.log(`Assigned default points to house: ${h.name}`)
        }
      })
      houses.value = fetchedHouses
      if (supaError) {
        throw supaError
      }

      console.log('Supabase data:', supaData)
    } catch (e: unknown) {
      console.error('Error in fetchAndSetHouses:', e)
      error.value = e instanceof Error ? e.message : String(e)
      houses.value = []
    } finally {
      isLoading.value = false
    }
  }
  onMounted(async () => {
    console.log('Store initialization completed')
  })
  async function selectHouse(house: House) {
    selectedHouse.value = house
    loadingCharacters.value = true
    try {
      const cacheKey = `houseChars_${house.name}`
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        console.log(`Using cached characters for house: ${house.name}`)
        characters.value = JSON.parse(cached)
      } else {
        const chars = await fetchHousePeople(house.name)
        characters.value = chars
        localStorage.setItem(cacheKey, JSON.stringify(chars))
      }
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

  function selectSpell(spell: Spell) {
    selectedSpell.value = spell
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
    selectSpell,
  }
})

type Spell = {
  id: string
  name: string
  effect: string
  type: string
  difficulty_level?: string
  inventor?: string
  year_created?: number
  countermeasures?: string[]
  incantation?: string
  canBeVerbal?: boolean
  light?: string
  creator?: string | null
}
