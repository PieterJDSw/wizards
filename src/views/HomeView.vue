<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import {
  useRouter,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'

import HuffPuff from '@/assets/lottie/huffpuf.json'
import LottieAnimation from '@/components/LottieAnimation.vue'
import WizardMenuCard from '@/components/WizardMenuCard.vue'

const router = useRouter()

const menuCards = ref([
  {
    title: 'Houses',
    description: 'Explore the different houses of the wizarding world.',
    icon: 'building',
    route: '/houses',
    color: 'bg-primary',
    visible: false,
  },
  {
    title: 'Spells',
    description: 'Discover various spells from the wizarding world.',
    icon: 'bolt',
    route: '/spells',
    color: 'bg-primary',
    visible: false,
  },
  {
    title: 'Elixirs',
    description: 'Explore magical elixirs and potions from the wizarding world.',
    icon: 'turkish-lira',
    route: '/elixirs',
    color: 'bg-primary',
    visible: false,
  },
])

const navigateTo = (
  route: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric,
) => {
  router.push(route)
}

onMounted(() => {
  menuCards.value.forEach((card, index) => {
    setTimeout(
      () => {
        card.visible = true
      },
      200 * (index + 1),
    )
  })
})

watch(
  menuCards,
  (newVal, oldVal) => {
    console.log('Cards changed', newVal, oldVal)
    for (let i = 0; i < newVal.length; i++) {
      if (newVal[i].visible !== oldVal[i].visible) {
        console.log(`Card ${i} visibility changed to ${newVal[i].visible}`)
      }
    }
  },
  { deep: true },
)
</script>

<template>
  <main class="py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          Welcome to the <span class="text-primary">Wizarding World</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the magical universe through our interactive catalog
        </p>
        <LottieAnimation :animationData="HuffPuff" :height="350" :width="350" />
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center"
      >
        <div
          v-for="(card, index) in menuCards"
          :key="index"
          class="card-container w-full flex justify-center"
          :class="{ 'card-visible': card.visible }"
        >
          <WizardMenuCard
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :color="card.color"
            :route="card.route"
            @navigate="navigateTo"
          />
        </div>
      </div>
    </div>

    <div id="app-status" v-if="false"></div>
  </main>
</template>

<style scoped>
.wizard-icon {
  font-size: 2rem;
}

@media (min-width: 640px) {
  /* sm: */
  .wizard-icon {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  /* lg: */
  .wizard-icon {
    font-size: 3rem;
  }
}
.card-container {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-container:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.card-container:active {
  transform: scale(0.98) !important;
  opacity: 0.9 !important;
}

:global(body) {
  background-color: #fafafa;
}

@media (min-width: 768px) {
  .card-container:hover {
    transform: translateY(-8px) scale(1.02);
  }
}
.card-container {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.card-container:active {
  transform: scale(0.98) !important;
  opacity: 0.9 !important;
}

:global(body) {
  background-color: #fafafa;
}

@media (min-width: 768px) {
  .card-container:hover {
    transform: translateY(-8px) scale(1.02);
  }
}
</style>
