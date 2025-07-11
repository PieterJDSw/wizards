<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import DataView from 'primevue/dataview'
import Tag from 'primevue/tag'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import { fetchElixirs } from '@/api/elixirs'
import type { Elixir } from '@/types/elixir'

const { data, isLoading, error } = useQuery<Elixir[]>({
  queryKey: ['elixirs'],
  queryFn: fetchElixirs,
  staleTime: 1000 * 60 * 10, // 10 minutes
})
const selectedElixir = ref<Elixir | null>(null)

const globalFilters = reactive({
  nameFilter: '',
  difficultyFilter: '',
})

onMounted(() => {})

const filteredElixirs = computed(() => {
  const difficulty = globalFilters.difficultyFilter ?? ''
  const nameFilter = globalFilters.nameFilter ?? ''
  return (data.value ?? []).filter((e: Elixir) => {
    return (
      e.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (difficulty === '' || e.difficulty === difficulty)
    )
  })
})

const difficultiesOptions = [
  { label: 'All', value: '' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Challenging', value: 'Challenging' },
  { label: 'Advanced', value: 'Advanced' },
  { label: 'Master', value: 'Master' },
]

function selectElixir(elixir: Elixir) {
  selectedElixir.value = elixir
}
</script>

<template>
  <div>
    <Card class="mb-4">
      <template #title>Elixirs</template>
      <template #subtitle>
        <div>
          <Tag
            v-if="globalFilters.nameFilter || globalFilters.difficultyFilter"
            severity="info"
            value="Active filters"
          />
        </div>
      </template>
      <template #content>
        <div class="sm:columns-1 gap-0 mb-4 lg:columns-4">
          <div>
            <label for="name-filter " class="mr-2">Filter by name</label>
            <InputText id="name-filter" v-model="globalFilters.nameFilter" />
          </div>
          <div>
            <label for="difficulty-filter" class="mr-2">Filter by difficulty</label>
            <Dropdown
              id="difficulty-filter"
              v-model="globalFilters.difficultyFilter"
              :options="difficultiesOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Difficulty"
              showClear
            />
          </div>
        </div>

        <p class="mb-4">Explore magical elixirs and potions from the wizarding world.</p>

        <div v-if="isLoading" class="p-text-center p-py-4">Loading elixirs...</div>
        <div v-if="error" class="p-text-center p-text-danger">
          An error occurred while loading elixirs.
        </div>

        <DataView :value="filteredElixirs" layout="list">
          <template #list="slotProps">
            <div class="flex flex-col gap-4">
              <div v-for="elixir in slotProps.items" :key="elixir.id">
                <Card>
                  <template #title>
                    <span>{{ elixir.name }}</span>
                    <Tag
                      :value="elixir.difficulty"
                      class="ml-2"
                      :severity="
                        elixir.difficulty === 'Advanced'
                          ? 'warning'
                          : elixir.difficulty === 'Master'
                            ? 'danger'
                            : elixir.difficulty === 'Challenging'
                              ? 'info'
                              : 'success'
                      "
                    />
                  </template>
                  <template #content>
                    <div>
                      <p class="mb-2"><b>Effect:</b> {{ elixir.effect }}</p>
                      <div class="p-mt-2">
                        <Button
                          icon="pi pi-pencil"
                          severity="info"
                          class="p-mr-2"
                          @click="selectElixir(elixir)"
                        />
                        <Button
                          icon="pi pi-trash"
                          severity="danger"
                          @click="deleteElixir(elixir.id)"
                        />
                      </div>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </template>
        </DataView>

        <Divider v-if="selectedElixir" />

        <Panel
          v-if="selectedElixir && selectedElixir.name"
          header="Selected Elixir"
          toggleable
          class="p-mt-4"
        >
          <div>
            <h3>{{ selectedElixir.name }}</h3>
            <p>{{ selectedElixir.effect }}</p>
            <Tag
              :value="selectedElixir.difficulty"
              class="mb-2"
              :severity="
                selectedElixir.difficulty === 'Advanced'
                  ? 'warning'
                  : selectedElixir.difficulty === 'Master'
                    ? 'danger'
                    : selectedElixir.difficulty === 'Challenging'
                      ? 'info'
                      : 'success'
              "
            />
            <div
              v-if="selectedElixir.ingredients && selectedElixir.ingredients.length"
              class="p-mt-2"
            >
              <strong>Ingredients:</strong>
              <span v-for="(ingredient, index) in selectedElixir.ingredients" :key="index">
                {{ ingredient }}<span v-if="index < selectedElixir.ingredients.length - 1">, </span>
              </span>
            </div>
          </div>
        </Panel>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
