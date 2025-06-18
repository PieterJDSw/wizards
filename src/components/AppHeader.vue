<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Header')
</script>

<template>
  <header class="header">
    <h1>{{ title }}</h1>
  </header>
</template>
<style scoped>
.header {
  padding: 1rem;
  background-color: #6366f1;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
}
</style>
