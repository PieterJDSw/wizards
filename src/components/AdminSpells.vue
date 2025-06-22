<script setup lang="ts">
import type { Spell } from '@/types/spells'

import { ref, computed, onMounted, reactive, watch } from 'vue'

import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useWizardingWorldStore } from '../stores/wizardingWorld'

import { FilterMatchMode } from '@primevue/core/api'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
defineProps<{ spells: Array<Spell> }>()

const wizardingStore = useWizardingWorldStore()
const tableData = reactive({
  spells: [],
  selectedSpell: null,
})
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  effect: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

function safelyUpdateLastViewedSpell(spellName) {
  if (wizardingStore.tracker?.lastViewedSpell !== undefined) {
    wizardingStore.tracker.lastViewedSpell = spellName
  }
}
function addSpell(name, effect, type) {
  const newId = (parseInt(data.value[data.value.length - 1].id) + 1).toString()
  data.value.push({ id: newId, name, effect, type })
  // wizardingStore.addSpell(name, effect, type)
}
</script>

<template>
  <div>
    <DataTable
      :value="spells ? spells : wizardingStore.spells?.value || spells"
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
  </div>
</template>
<style scoped></style>
