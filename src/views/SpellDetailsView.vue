<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useWizardingWorldStore } from '../stores/wizardingWorld'

interface SpellDetail {
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

const route = useRoute()
const router = useRouter()
const wizardingStore = useWizardingWorldStore()
const spellId = route.params.id as string

const spellDetails = ref<SpellDetail | null>(wizardingStore.selectedSpell || null)

const fetchSpellDetails = async () => {
  if (wizardingStore.selectedSpell) {
    return wizardingStore.selectedSpell
  }
  if (wizardingStore.spells && wizardingStore.spells.value) {
    const found = wizardingStore.spells.value.find((s) => s.id === spellId)
    if (found) return found
  }
  return {
    id: spellId,
    name: 'Unknown Spell',
    effect: 'Unknown Effect',
    type: 'Unknown Type',
    difficulty_level: 'Unknown',
    inventor: 'Unknown',
    year_created: 0,
    countermeasures: [],
    incantation: undefined,
    canBeVerbal: undefined,
    light: undefined,
    creator: undefined,
  }
}

const { data, isLoading, error } = useQuery({
  queryKey: ['spell', spellId],
  queryFn: fetchSpellDetails,
  enabled: !!spellId,
})

watch(
  () => data.value,
  (newData) => {
    if (newData) spellDetails.value = newData
  },
  { immediate: true },
)

onMounted(() => {
  if (wizardingStore.selectedSpell) {
    spellDetails.value = wizardingStore.selectedSpell
  }
})

function goBack() {
  router.push('/spells')
}
</script>

<template>
  <div>
    <Card class="mb-4">
      <template #title>Spell Details</template>
      <template #content>
        <Button icon="fas fa-arrow-left" label="Back to Spells" @click="goBack" class="mb-4" />
        <div v-if="isLoading" class="flex justify-center py-4">Loading spell details...</div>
        <div v-else-if="error" class="text-red-500">
          An error occurred while loading spell details.
        </div>
        <div v-else-if="spellDetails">
          <h3 class="text-xl font-bold">{{ spellDetails.name }}</h3>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="text-lg font-semibold">Basic Information</h4>
              <p v-if="spellDetails.incantation">
                <strong>Incantation:</strong> {{ spellDetails.incantation }}
              </p>
              <p><strong>Effect:</strong> {{ spellDetails.effect }}</p>
              <p>
                <strong>Type:</strong> <span id="spell-type">{{ spellDetails.type }}</span>
              </p>
              <p v-if="spellDetails.difficulty_level">
                <strong>Difficulty:</strong> {{ spellDetails.difficulty_level }}
              </p>
              <p v-if="spellDetails.canBeVerbal !== undefined">
                <strong>Can be verbal:</strong> {{ spellDetails.canBeVerbal ? 'Yes' : 'No' }}
              </p>
              <p v-if="spellDetails.light"><strong>Light:</strong> {{ spellDetails.light }}</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold">Historical Information</h4>
              <p v-if="spellDetails.inventor">
                <strong>Inventor:</strong> {{ spellDetails.inventor }}
              </p>
              <p v-if="spellDetails.creator">
                <strong>Creator:</strong> {{ spellDetails.creator }}
              </p>
              <p v-if="spellDetails.year_created">
                <strong>Year Created:</strong> {{ spellDetails.year_created }}
              </p>
              <div v-if="spellDetails.countermeasures && spellDetails.countermeasures.length > 0">
                <h5 class="font-semibold mt-2">Countermeasures:</h5>
                <ul>
                  <li v-for="(measure, index) in spellDetails.countermeasures" :key="index">
                    {{ measure }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-red-500">Spell not found.</div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
#spell-type {
  font-weight: bold;
}
</style>
