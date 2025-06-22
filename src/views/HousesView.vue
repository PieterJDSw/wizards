<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, type Ref } from 'vue'

import Card from 'primevue/card'

import ScrollPanel from 'primevue/scrollpanel'

import Button from 'primevue/button'
import { useWizardingWorldStore } from '../stores/wizardingWorld'
import Image from 'primevue/image'
import Loading from '@/assets/lottie/loading.json'
import LottieAnimation from '@/components/LottieAnimation.vue'

import type { House } from '@/types/houses'

const wizardingStore = useWizardingWorldStore()

type TableData = {
  houses: House[]
  selectedHouse: House | null
}
const houses: Ref<Array<House> | null> = computed(() => wizardingStore.houses || [])
const isLoading = computed(() => wizardingStore.isLoading)
const error = computed(() => wizardingStore.error)
const tableData = reactive<TableData>({
  houses: [],
  selectedHouse: null,
})

const lastSelectedHouse = ref<string | null>(null)

function updateHousePoints(houseId: string, points: number) {
  if (!houses.value) return
  const house = houses.value.find((h) => (h as House).id === houseId) as House | undefined
  if (house) {
    if ('house_points' in house) {
      house.house_points += points
    } else {
      house.house_points = points
    }
  }
  console.log(`Updated house points for ${houseId}: ${house?.house_points}`)
}
function determineImageURL(houseName: string): string {
  switch (houseName) {
    case 'gryffindor':
      return 'https://ucarecdn.com/1660488c-c478-4146-aa44-7cf96dfa6916/vecteezy_harrypottergryffindorlogoindoodlestylehogwarts_58101645removebgpreview.png'
    case 'hufflepuff':
      return 'https://ucarecdn.com/53e5bf7d-5432-4bd0-9401-002de3436b82/vecteezy_harrypotterhufflepufflogoincartoondoodlestylevector_22230272removebgpreview.png'
    case 'ravenclaw':
      return 'https://ucarecdn.com/59cc745c-2df5-44ff-aacd-294dc54716af/vecteezy_harrypotterravenclawlogoincartoondoodlestylevector_22230277removebgpreview.png'
    case 'slytherin':
      return 'https://ucarecdn.com/81ff7cbf-3f12-43d1-bda6-3ff716952f6e/vecteezy_harrypotterslytherinlogoincartoondoodlestylevector_22310275removebgpreview.png'
    default:
      return ''
  }
}
function selectHouse(house: House) {
  tableData.selectedHouse = house
  wizardingStore.selectHouse(house)
  lastSelectedHouse.value = house.name
}

onMounted(async () => {
  wizardingStore.fetchAndSetHouses()
})

onUnmounted(() => {})
</script>

<template>
  <div>
    <Card class="mb-4">
      <template #title>Houses</template>
      <template #content>
        <p class="mb-4">Explore the different houses of the wizarding world.</p>

        <div v-if="isLoading" class="flex justify-center py-4">
          Loading houses...
          <LottieAnimation :animationData="Loading" :height="350" :width="350" />
        </div>

        <div v-else-if="error" class="text-red-500">An error occurred while loading houses.</div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Card
              v-for="item in houses"
              :key="item.id"
              style="width: 100%; overflow: hidden"
              class="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-102"
            >
              <template #header>
                <div :class="'house-row ' + item.name.toLowerCase()">
                  <Image
                    alt="user header"
                    class="w-full h-full object-cover"
                    :src="determineImageURL(item.name.toLowerCase())"
                  />
                </div>
              </template>
              <template #title>{{ item.name }}</template>
              <template #subtitle>{{ item.founder }}</template>
              <template #content>
                <div>
                  <p class="mb-2">{{ item.commonRoom }}</p>
                  <p class="mb-2">{{ item.element }}</p>
                  <p class="mb-2">{{ item.ghost }}</p>
                </div>
              </template>
              <template #footer>
                <div class="flex gap-4 mt-1">
                  <Button icon="fas fa-eye" label="View Details" @click="selectHouse(item)" />
                </div>
              </template>
            </Card>
          </div>

          <!-- House Detail Section -->
          <div v-if="tableData.selectedHouse" class="mt-4 p-4 border rounded">
            <h3 class="text-xl font-bold">Selected House Details</h3>
            <p>Name: {{ tableData.selectedHouse.name }}</p>
            <p>Founder: {{ tableData.selectedHouse.founder }}</p>
            <p>House Points: {{ tableData.selectedHouse.house_points }}</p>

            <h4 class="text-lg font-semibold mt-2">Additional Information</h4>
            <p>Mascot: {{ tableData.selectedHouse.mascot }}</p>

            <div v-if="tableData.selectedHouse.houseColors">
              <p>House Colors:</p>
              <ul>
                <li v-for="(color, index) in tableData.selectedHouse.houseColors" :key="index">
                  {{ color }}
                </li>
              </ul>
            </div>

            <div class="mt-4">
              <Button
                label="Award 10 Points"
                @click="updateHousePoints(tableData.selectedHouse.id, 10)"
              />
            </div>
            <hr class="mt-2" />

            <h3 class="text-xl font-bold mt-2 mb-2">Selected House Characters</h3>
            <ScrollPanel style="width: 100%; height: 15rem">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <Card
                  v-for="item in wizardingStore.characters"
                  :key="item.id"
                  style="width: 100%; overflow: hidden"
                  class="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-102"
                >
                  <template #title>Name:{{ item.name }}</template>
                  <template #subtitle>Species:{{ item.species }}</template>
                  <template #content>
                    <div>
                      <p class="mb-2">Ancestry:{{ item.ancestry || 'Unknown' }}</p>
                      <p class="mb-2">Gender:{{ item.gender }}</p>
                    </div>
                  </template>
                </Card>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.house-row {
  padding: 4px;
  margin: 2px 0;
  border-radius: 4px;
}

.gryffindor {
  background-color: rgba(174, 0, 1, 0.1);
}

.hufflepuff {
  background-color: rgba(240, 199, 94, 0.1);
}

.ravenclaw {
  background-color: rgba(34, 47, 91, 0.1);
}

.slytherin {
  background-color: rgba(26, 71, 42, 0.1);
}
</style>
