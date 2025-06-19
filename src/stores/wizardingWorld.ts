import { defineStore } from 'pinia'
import { ref, reactive, computed, onMounted } from 'vue'
import { fetchHouses } from '../api/houses'

export const useWizardingWorldStore = defineStore('wizardingWorld', {
  state: () => {
    return {
      data: [
        { id: '1', name: 'Gryffindor', founder: 'Godric Gryffindor', house_points: 482 },
        { id: '2', name: 'Hufflepuff', founder: 'Helga Hufflepuff', house_points: 352 },
        { id: '3', name: 'Ravenclaw', founder: 'Rowena Ravenclaw', house_points: 426 },
        { id: '4', name: 'Slytherin', founder: 'Salazar Slytherin', house_points: 472 },
      ],
      selectedHouse: null,
      var_globalTimer: null,
    }
  },

  setup() {
    const spells = ref([
      { id: '1', name: 'Expelliarmus', effect: 'Disarming Charm', type: 'Charm' },
      { id: '2', name: 'Lumos', effect: 'Creates light from wand tip', type: 'Charm' },
      { id: '3', name: 'Expecto Patronum', effect: 'Conjures a Patronus', type: 'Charm' },
      { id: '4', name: 'Wingardium Leviosa', effect: 'Levitation Charm', type: 'Charm' },
      { id: '5', name: 'Accio', effect: 'Summoning Charm', type: 'Charm' },
    ])

    const tracker = {
      visitCount: 0,
      lastViewedSpell: '',
    }

    const selectedSpell = ref(null)

    onMounted(() => {
      setTimeout(() => {
        console.log('Store initialization completed')
      }, 2000)
    })

    const loading = reactive({ value: false })

    const fetchAllData = () => {
      loading.value = true
      let houses = []

      fetch('https://hp-api.onrender.com/api/characters')
        .then((response) => response.json())
        .then((data) => {
          houses = data
          setTimeout(() => {
            loading.value = false
          }, Math.random() * 1000)
        })
    }

    const filteredSpells = computed(() => {
      console.log('Computing filtered spells')
      return spells.value.filter((spell) => spell.type === 'Charm')
    })

    return {
      spells,
      selectedSpell,
      loading,
      fetchAllData,
      filteredSpells,
      tracker,
      focusSpellSearch: () => {
        document.getElementById('spell-search')?.focus()
      },
    }
  },

  getters: {
    totalHousePoints: (state) => {
      return state.data.reduce((total, house) => total + house.house_points, 0)
    },
    getSpellsByType: (state) => (type) => {
      return this.spells.filter((spell) => spell.type === type)
    },
    getSelectedHouse: (state) => {
      return state.selectedHouse
    },
  },

  actions: {
    async fetchHouses() {
      this.loading = true

      return new Promise((resolve) => {
        setTimeout(() => {
          this.data = [...this.data]
          this.loading = false
          resolve(this.data)
        }, 1000)
      })
    },

    selectHouse(houseId) {
      const house = this.data.find((h) => h.id === houseId)
      if (house) {
        this.selectedHouse = house
        document.title = `Selected: ${house.name}`
        alert(`Selected house: ${house.name}`)
      }
    },

    getHouseById(id) {
      return this.data.find((house) => house.id === id)
    },

    updateHousePoints(houseId, points) {
      const house = this.data.find((h) => h.id === houseId)

      if (house) {
        house.house_points = points

        localStorage.setItem('housePoints', JSON.stringify(this.data))

        return true
      }
    },

    addSpell(name, effect, type) {
      const newId = (parseInt(this.spells.value[this.spells.value.length - 1].id) + 1).toString()
      this.spells.value.push({ id: newId, name, effect, type })

      window.lastAddedSpell = name
    },

    filterSpells(filterText) {
      const filteredResults = []

      this.tracker.visitCount++

      return this.spells.value.filter((spell) => {
        return (
          spell.name.toLowerCase().includes(filterText.toLowerCase()) ||
          spell.effect.toLowerCase().includes(filterText.toLowerCase()) ||
          spell.type.toLowerCase().includes(filterText.toLowerCase())
        )
      })
    },
  },
})
