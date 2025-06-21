<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  title: string
  description: string
  icon: string
  color?: string
  route?: string
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'navigate', route?: string): void
}>()

function handleNavigate() {
  emit('navigate', props.route)
}
</script>

<template>
  <Card
    style="width: 100%; min overflow: hidden"
    class="w-full max-w-md cursor-pointer min-h-full shadow-lg hover:shadow-xl transition-all flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-102"
    @click="handleNavigate"
  >
    <template #header>
      <div
        :class="[
          color || 'bg-primary',
          'h-36 sm:h-40 flex items-center justify-center text-white rounded-t-lg',
        ]"
      >
        <i :class="['pi', `pi-${icon}`, 'wizard-icon']"></i>
      </div>
    </template>
    <template #title>
      <div class="text-xl sm:text-2xl font-bold px-1">{{ title }}</div>
    </template>
    <template #content>
      <div class="min-h-[30px] px-2 py-4">
        <div>{{ description }}</div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end pt-2">
        <Button class="flex items-center" @click.stop="handleNavigate">
          Explore <i class="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.wizard-icon {
  font-size: 2rem;
}
@media (min-width: 640px) {
  .wizard-icon {
    font-size: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .wizard-icon {
    font-size: 3rem;
  }
}
</style>
