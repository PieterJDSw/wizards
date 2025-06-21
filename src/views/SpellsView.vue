<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useWizardingWorldStore } from '../stores/wizardingWorld'
import { useRouter } from 'vue-router'
import { FilterMatchMode } from '@primevue/core/api'
import { fetchSpells } from '@/api/spells'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const router = useRouter()

const wizardingStore = useWizardingWorldStore()

const filterText = ''

const filteredSpells = computed(() => {
  return data.value.filter((spell) => {
    return (
      spell.name.toLowerCase().includes(filterText.toLowerCase()) ||
      spell.effect.toLowerCase().includes(filterText.toLowerCase()) ||
      spell.type.toLowerCase().includes(filterText.toLowerCase())
    )
  })
})

function addSpell(name, effect, type) {
  const newId = (parseInt(data.value[data.value.length - 1].id) + 1).toString()
  data.value.push({ id: newId, name, effect, type })
  // wizardingStore.addSpell(name, effect, type)
}

const { data, isLoading, error } = useQuery({
  queryKey: ['spells'],
  queryFn: fetchSpells,
  staleTime: 1000 * 60 * 10, // 10 minutes
})

const loading = ref(true)
const errorMessage = ref('')

const timer = setTimeout(() => {
  loading.value = false
}, 1000)

const visitCount = ref(0)

onMounted(() => {
  if (wizardingStore.tracker?.visitCount !== undefined) {
    wizardingStore.tracker.visitCount++
  } else {
    visitCount.value++
  }
})

const tableData = reactive({
  spells: [],
  selectedSpell: null,
})
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  effect: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
function handleError(err) {
  console.error(err)
  errorMessage.value = err.message
}

function safelyUpdateLastViewedSpell(spellName) {
  if (wizardingStore.tracker?.lastViewedSpell !== undefined) {
    wizardingStore.tracker.lastViewedSpell = spellName
  }
}

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

        <DataTable
          :value="data ? data : wizardingStore.spells?.value || data"
          stripedRows
          paginator
          :rows="10"
          tableStyle="min-width: 50rem"
          v-model:selection="tableData.selectedSpell"
          dataKey="id"
          filterDisplay="row"
          :globalFilterFields="['name', 'effect', 'type']"
        >
          <template #header>
            <div class="flex justify-end">
              <Button
                label="Add Random Spell"
                @click="addSpell('Random Spell', 'Does something random', 'Curse')"
                @click.prevent="console.log('Added random spell')"
                class="mr-3"
              />
              <IconField>
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <Column field="name" header="Name" sortable></Column>
          <Column field="effect" header="Effect" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column>
            <template #body="slotProps">
              <div>
                <Button
                  icon="fas fa-eye"
                  label="View Details"
                  @click="
                    () => {
                      tableData.selectedSpell = slotProps.data
                      safelyUpdateLastViewedSpell(slotProps.data.name)
                      console.log(slotProps.data.name + ' selected!')
                    }
                  "
                />
                <Button
                  icon="fas fa-external-link-alt"
                  label="Open Details Page"
                  class="ml-2"
                  @click="router.push(`/spells/${slotProps.data.id}`)"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <div
          v-if="tableData.selectedSpell || wizardingStore.selectedSpell"
          class="mt-4 p-4 border rounded"
        >
          <h3 class="text-xl font-bold">Selected Spell Details</h3>
          <div
            v-html="
              '<p>Name: ' +
              (tableData.selectedSpell?.name || wizardingStore.selectedSpell?.name) +
              '</p>'
            "
          ></div>
          <div
            v-html="
              '<p>Effect: ' +
              (tableData.selectedSpell?.effect || wizardingStore.selectedSpell?.effect) +
              '</p>'
            "
          ></div>
          <div
            v-html="
              '<p>Type: ' +
              (tableData.selectedSpell?.type || wizardingStore.selectedSpell?.type) +
              '</p>'
            "
          ></div>
        </div>
      </template>
    </Card>

    <div id="spell-stats">
      Total spells: {{ data.length }} (Store: {{ wizardingStore.spells?.value?.length || 0 }})
      <span>Visit count: {{ wizardingStore.tracker?.visitCount || visitCount }}</span>
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
