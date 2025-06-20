import { defineStore } from 'pinia'
import { ref, reactive, computed, onMounted } from 'vue'

export const useWizardingWorldStore = defineStore('wizardingWorld', () => {
  const tracker = reactive({
    visitCount: 0,
    lastViewedSpell: '',
  })

  const selectedSpell = ref(null)
  const loading = reactive({ value: false })

  // Example data for houses and spells
  const data = reactive([
    // { id: '1', name: 'Gryffindor', house_points: 0 },
    // ... other houses
  ])
  const spells = ref([
    // { id: '1', name: 'Expelliarmus', effect: 'Disarming', type: 'Charm' },
    // ... other spells
  ])

  onMounted(() => {
    setTimeout(() => {
      console.log('Store initialization completed')
    }, 2000)
  })

  function focusSpellSearch() {
    document.getElementById('spell-search')?.focus()
  }

  function selectHouse(houseId: string) {
    const house = data.find((h) => h.id === houseId)
    if (house) {
      this.selectedHouse = house
      document.title = `Selected: ${house.name}`
      alert(`Selected house: ${house.name}`)
    }
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
    focusSpellSearch,
    selectHouse,
    getHouseById,
    updateHousePoints,
    addSpell,
    filterSpells,
  }
})
