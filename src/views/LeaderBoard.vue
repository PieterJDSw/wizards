<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useWizardingWorldStore } from '@/stores/wizardingWorld'
import { supabase } from '@/api/supabase'
import Button from 'primevue/button'
import Panel from 'primevue/panel'

const store = useWizardingWorldStore()

const questions = ref([])
const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || null)

const sortedHouses = computed(() =>
  [...(store.houses ?? [])].sort(
    (a, b) => (b.house_points ?? b.points ?? 0) - (a.house_points ?? a.points ?? 0),
  ),
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function awardPoints(house: any) {
  const houseInStore = store.houses?.find((h) => h.name === house.name)
  if (!houseInStore) return
  const newPoints = (houseInStore.house_points ?? houseInStore.points ?? 0) + 10

  const { error } = await supabase
    .from('houses')
    .update({ points: newPoints })
    .eq('name', house.name)
  if (error) {
    console.error(error)
  }

  houseInStore.house_points = newPoints
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    currentQuestionIndex.value = 0
  }
}

onMounted(async () => {
  await store.fetchAndSetHouses()
  const { data: Questions, error } = await supabase.from('questions').select('questions')
  if (error) {
    console.error(error)
    questions.value = []
    return
  }
  if (Questions && Questions.length > 0) {
    const randomRow = Questions[Math.floor(Math.random() * Questions.length)]
    try {
      questions.value =
        typeof randomRow.questions === 'string'
          ? JSON.parse(randomRow.questions)
          : randomRow.questions
    } catch {
      questions.value = []
    }
  }
})
</script>

<template>
  <div class="leaderboard">
    <h2>House Leaderboard</h2>
    <transition-group name="slide" tag="ul" class="leaderboard-list">
      <li v-for="house in sortedHouses" :key="house.id" class="leaderboard-item">
        <span class="house-name">{{ house.name }}</span>
        <span class="house-points">{{ house.house_points ?? house.points ?? 0 }} pts</span>
      </li>
    </transition-group>

    <Panel v-if="currentQuestion" header="Quiz Question" class="question-section">
      <div class="question-text">{{ currentQuestion.text }}</div>
      <div class="answer-buttons">
        <Button
          v-for="house in sortedHouses"
          :key="house.id"
          :label="`Award to ${house.name}`"
          @click="awardPoints(house)"
          class="p-button-rounded"
        />
      </div>
      <Button
        class="next-btn p-button-rounded p-button-success"
        label="Next Question"
        @click="nextQuestion"
      />
    </Panel>
  </div>
</template>

<style scoped>
.leaderboard {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px #0001;
}
.leaderboard-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.leaderboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.2rem;
  box-shadow: 0 1px 4px #0001;
  transition:
    transform 0.5s,
    opacity 0.5s;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.slide-move {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.question-section {
  margin-top: 2rem;
  padding: 1.5rem;

  border-radius: 10px;
  box-shadow: 0 1px 4px #0001;
}
.question-text {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.answer-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.next-btn {
  margin-top: 0.5rem;
}
</style>
