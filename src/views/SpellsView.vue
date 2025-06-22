<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import ScrollPanel from 'primevue/scrollpanel'
import Card from 'primevue/card'
import Loading from '@/assets/lottie/loading.json'
import LottieAnimation from '@/components/LottieAnimation.vue'

import { useWizardingWorldStore } from '../stores/wizardingWorld'

import { fetchSpells } from '@/api/spells'

const wizardingStore = useWizardingWorldStore()
const filterText = ref('')
const { data, isLoading, error } = useQuery({
  queryKey: ['spells'],
  queryFn: fetchSpells,
  staleTime: 1000 * 60 * 10, // 10 minutes
})

const visitCount = ref(0)
const filteredSpells = computed(() => {
  if (!data.value) return []
  const spells = [...data.value] // shallow copy
  if (!filterText.value) return spells
  return spells.filter(
    (spell) =>
      spell.name.toLowerCase().includes(filterText.value.toLowerCase()) ||
      spell.effect.toLowerCase().includes(filterText.value.toLowerCase()) ||
      spell.type.toLowerCase().includes(filterText.value.toLowerCase()),
  )
})

onMounted(() => {
  if (wizardingStore.tracker?.visitCount !== undefined) {
    wizardingStore.tracker.visitCount++
  } else {
    visitCount.value++
  }
})

watch(
  () => wizardingStore.spells,
  (newSpells) => {
    if (newSpells && newSpells.value) {
      console.log('Store spells updated:', newSpells.value.length)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <Card class="mb-4">
      <template #title>Spells</template>
      <template #content>
        <p class="mb-4">Discover various spells from the wizarding world.</p>

        <div class="mb-4 flex gap-2"></div>
        <div v-if="isLoading" class="flex justify-center py-4">
          Loading Spells...
          <LottieAnimation :animationData="Loading" :height="350" :width="350" />
        </div>

        <div v-else-if="error" class="text-red-500">An error occurred while loading spells.</div>

        <div v-else>
          <!-- <AdminSpells :spells="data" /> -->

          <div class="mb-4 flex gap-2">
            <input
              v-model="filterText"
              type="text"
              placeholder="Filter spells..."
              class="p-2 border rounded w-full"
            />
          </div>
          <ScrollPanel style="width: 100%; height: 70vh">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <Card
                v-for="spell in filteredSpells"
                :key="spell.id"
                class="max-w-80 min-w-64 mb-4 flex flex-col"
              >
                <template #title>
                  {{ spell.name }}
                </template>
                <template #content>
                  <p><strong>Effect:</strong> {{ spell.effect }}</p>
                  <p><strong>Type:</strong> {{ spell.type }}</p>
                </template>
              </Card>
            </div>
          </ScrollPanel>
        </div>
      </template>
    </Card>

    <div id="spell-stats">
      Total spells: {{ data?.length }} (Store: {{ wizardingStore?.spells?.value?.length || 0 }})
      <span>Visit count: {{ wizardingStore?.tracker?.visitCount || visitCount }}</span>
    </div>
  </div>
</template>

<style scoped>
.spell-row {
  padding: 4px;
  margin: 2px 0;
  border-radius: 4px;
}

.charm {
  background-color: rgba(0, 128, 255, 0.1);
}

.curse {
  background-color: rgba(255, 0, 0, 0.1);
}

.even-row {
  background-color: rgba(240, 240, 240, 0.5) !important;
}
</style>
