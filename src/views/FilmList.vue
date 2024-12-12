<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Film } from '@/model/Film';

const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/films';

// Reactive properties
const films = ref<Film[]>([]);
const inputTitle = ref<string>('');
const inputYear = ref<number | null>(null);

// Fetch films from API on mount
onMounted(() => {
  axios
    .get<Film[]>(apiEndpoint)
    .then((response) => (films.value = response.data))
    .catch((error) => console.log(error));
});

// Add a new film
function saveFilm(): void {
  if (inputTitle.value.trim() && inputYear.value && isValidYear(inputYear.value)) {
    films.value.push({
      title: inputTitle.value,
      year: inputYear.value,
    });
    inputTitle.value = '';
    inputYear.value = null;
  } else {
    console.log('Bitte geben Sie einen gültigen Titel und ein gültiges Jahr ein.');
  }
}

// Delete a film by index
function deleteFilm(index: number): void {
  films.value.splice(index, 1);
}

// Validate year
function isValidYear(year: number): boolean {
  return year >= 1888 && year <= 2030;
}
</script>

<template>
  <div class="container">
    <h2 class="title">🎬 Meine Film-Liste</h2>
    <div class="input-container">
      <!-- Input for film title -->
      <input
        v-model="inputTitle"
        placeholder="Film hinzufügen"
        class="film-input"
      />
      <!-- Input for film year -->
      <input
        v-model.number="inputYear"
        type="number"
        placeholder="Jahr"
        class="film-input"
      />
      <!-- Add film button -->
      <button @click="saveFilm" class="add-button">
        Film hinzufügen
      </button>
    </div>

    <!-- Message if no films available -->
    <p v-if="films.length < 1" class="warning">
      Keine Filme vorhanden
    </p>

    <!-- List of films -->
    <ul class="film-list">
      <li v-for="(film, index) in films" :key="index" class="film-item">
        <span class="film-title">
          {{ film.title }} ({{ film.year }})
        </span>
        <button
          @click="deleteFilm(index)"
          class="delete-button"
        >
          Löschen
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1em;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  color: #ff6347;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
  margin-bottom: 1em;
}

.input-container {
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
}

.film-input {
  flex-grow: 1;
  padding: 0.6em;
  border: 2px solid #ff6347;
  border-radius: 4px;
  font-size: 1em;
}

.add-button {
  padding: 0.6em 1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-button:hover {
  background-color: #ff7f50;
}

.warning {
  color: #e74c3c;
  text-align: center;
  font-weight: bold;
  margin: 1em 0;
}

.film-list {
  list-style-type: none;
  padding: 0;
}

.film-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em;
  background-color: #ffefdb;
  margin-bottom: 0.5em;
  border-radius: 4px;
}

.film-title {
  font-size: 1.1em;
  color: #333;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4em 0.8em;
  cursor: pointer;
  font-size: 0.9em;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
