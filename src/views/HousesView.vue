<script setup lang="ts">
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useWizardingWorldStore } from '../stores/wizardingWorld'

interface House {
  id: string
  name: string
  founder: string
  house_points: number
  mascot?: string
  houseColors?: string[]
}

const wizardingStore = useWizardingWorldStore()

const houses = ref<House[]>([
  {
    id: '1',
    name: 'Gryffindor',
    founder: 'Godric Gryffindor',
    house_points: 482,
    mascot: 'Lion',
    houseColors: ['Scarlet', 'Gold'],
  },
  {
    id: '2',
    name: 'Hufflepuff',
    founder: 'Helga Hufflepuff',
    house_points: 352,
    mascot: 'Badger',
    houseColors: ['Yellow', 'Black'],
  },
  {
    id: '3',
    name: 'Ravenclaw',
    founder: 'Rowena Ravenclaw',
    house_points: 426,
    mascot: 'Eagle',
    houseColors: ['Blue', 'Bronze'],
  },
  {
    id: '4',
    name: 'Slytherin',
    founder: 'Salazar Slytherin',
    house_points: 472,
    mascot: 'Serpent',
    houseColors: ['Green', 'Silver'],
  },
])

const fetchHouses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return houses.value
}

const { data, isLoading, error } = useQuery({
  queryKey: ['houses'],
  queryFn: fetchHouses,
})

const tableData = reactive({
  houses: [],
  selectedHouse: null,
})

const lastSelectedHouse = ref<string | null>(null)

function updateHousePoints(houseId: string, points: number) {
  const house = houses.value.find((h) => h.id === houseId)
  if (house) {
    house.house_points = points
  }
}

function selectHouse(house: House) {
  tableData.selectedHouse = house
  wizardingStore.selectHouse(house.id)
  lastSelectedHouse.value = house.name
}

watch(
  () => wizardingStore.selectedHouse,
  (newHouse) => {
    if (newHouse) {
      tableData.selectedHouse = houses.value.find((h) => h.id === newHouse.id) || null
    }
  },
)

onMounted(() => {
  document.title = 'Hogwarts Houses'
  if (wizardingStore.data) {
    houses.value = [...wizardingStore.data]
  }
})

onUnmounted(() => {
  // No need to clear the timer as it's not used
})
</script>

<template>
  <div>
    <Card class="mb-4">
      <template #title>Houses</template>
      <template #content>
        <p class="mb-4">Explore the different houses of the wizarding world.</p>

        <div v-if="isLoading" class="flex justify-center py-4">Loading houses...</div>
        <div v-else-if="error" class="text-red-500">An error occurred while loading houses.</div>
        <div v-else>
          <DataTable
            :value="data"
            stripedRows
            paginator
            :rows="10"
            tableStyle="min-width: 50rem"
            v-model:selection="tableData.selectedHouse"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="founder" header="Founder" sortable></Column>
            <Column field="house_points" header="House Points" sortable></Column>
            <Column>
              <template #body="slotProps">
                <div :class="'house-row ' + slotProps.data.name.toLowerCase()">
                  <Button
                    icon="fas fa-eye"
                    label="View Details"
                    @click="selectHouse(slotProps.data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>

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
                @click="
                  updateHousePoints(
                    tableData.selectedHouse.id,
                    tableData.selectedHouse.house_points + 10,
                  )
                "
              />
            </div>
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
