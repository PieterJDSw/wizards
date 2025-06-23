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

            <hr class="mt-2" />

            <h3 class="text-xl font-bold mt-2 mb-2">Selected House Characters</h3>
            <ScrollPanel style="width: 100%; height: 15rem">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <Card
                  v-for="character in wizardingStore.characters"
                  :key="character.id"
                  class="mb-4 max-w-md"
                >
                  <template #title>
                    {{ character.name }}
                  </template>
                  <template #content>
                    <div class="flex flex-col md:flex-row gap-4">
                      <div>
                        <p v-if="character.alternate_names && character.alternate_names.length">
                          <strong>Alternate Names:</strong>
                          {{ character.alternate_names.join(', ') }}
                        </p>
                        <p><strong>Species:</strong> {{ character.species }}</p>
                        <p><strong>Gender:</strong> {{ character.gender }}</p>
                        <p><strong>House:</strong> {{ character.house }}</p>
                        <p v-if="character.dateOfBirth">
                          <strong>Date of Birth:</strong> {{ character.dateOfBirth }}
                        </p>
                        <p v-if="character.yearOfBirth">
                          <strong>Year of Birth:</strong> {{ character.yearOfBirth }}
                        </p>
                        <p><strong>Wizard:</strong> {{ character.wizard ? 'Yes' : 'No' }}</p>
                        <p v-if="character.ancestry">
                          <strong>Ancestry:</strong> {{ character.ancestry }}
                        </p>
                        <p v-if="character.eyeColour">
                          <strong>Eye Colour:</strong> {{ character.eyeColour }}
                        </p>
                        <p v-if="character.hairColour">
                          <strong>Hair Colour:</strong> {{ character.hairColour }}
                        </p>
                        <div v-if="character.wand">
                          <strong>Wand:</strong>
                          <ul class="ml-4">
                            <li v-if="character.wand.wood">
                              <strong>Wood:</strong> {{ character.wand.wood }}
                            </li>
                            <li v-if="character.wand.core">
                              <strong>Core:</strong> {{ character.wand.core }}
                            </li>
                            <li v-if="character.wand.length">
                              <strong>Length:</strong> {{ character.wand.length }}"
                            </li>
                          </ul>
                        </div>
                        <p v-if="character.patronus">
                          <strong>Patronus:</strong> {{ character.patronus }}
                        </p>
                        <p>
                          <strong>Hogwarts Student:</strong>
                          {{ character.hogwartsStudent ? 'Yes' : 'No' }}
                        </p>
                        <p>
                          <strong>Hogwarts Staff:</strong>
                          {{ character.hogwartsStaff ? 'Yes' : 'No' }}
                        </p>
                        <p v-if="character.actor"><strong>Actor:</strong> {{ character.actor }}</p>
                        <p v-if="character.alternate_actors && character.alternate_actors.length">
                          <strong>Alternate Actors:</strong>
                          {{ character.alternate_actors.join(', ') }}
                        </p>
                        <p><strong>Alive:</strong> {{ character.alive ? 'Yes' : 'No' }}</p>
                      </div>
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
