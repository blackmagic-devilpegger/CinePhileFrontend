<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{ title: string }>()
let inputData = ref('das ist ein Input')

function saveFilm(value: string): void {
  films.value.push(inputData.value)
}

// hook
onMounted(() => {
  films.value.push('Film 1')
})

</script>

<template>
  <h2>{{ title }}</h2>
  <button @click="saveFilm()">Change title</button>
  <input v-model="inputData"/>

  <p v-if="films.length < 1" class="warning">No films</p>

  <ul>
    <li v-for="film in films" :key="film.id">{{ film.title }}</li>
  </ul>

</template>

<style scoped>
.warning{
  color: red;

</style>
