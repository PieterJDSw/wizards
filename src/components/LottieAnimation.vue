<template>
  <Vue3Lottie :animationData="animationData" :height="height" :width="width" />
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'

// Define the prop for the animation data
defineProps({
  animationData: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 200,
  },
  width: {
    type: Number,
    default: 200,
  },
})
</script>
