<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Film } from '@/model/Film';
import { v4 as uuidv4 } from 'uuid';


const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/films';

// Reactive properties
const films = ref<Film[]>([]);
const inputTitle = ref<string>('');
const inputYear = ref<number | null>(null);
const errorMessage = ref<string>('');

// Fetch films from API on mount
onMounted(() => {
  axios
    .get<Film[]>(apiEndpoint)
    .then((response) => (films.value = response.data))
    .catch((error) => {
      error.value = 'Fehler beim Laden der Filme.';
    });
});

// Add a new film
function saveFilm(): void {
  if (!inputTitle.value.trim()) {
    errorMessage.value = 'Bitte geben Sie einen Titel ein.';
    return;
  }
  if (!inputYear.value) {
    errorMessage.value = 'Bitte geben Sie ein Jahr ein.';
    return;
  }
  if (!isValidYear(inputYear.value)) {
    errorMessage.value = 'Bitte geben Sie ein gültiges Jahr zwischen 1888 und 2030 ein.';
    return;
  }

  const newFilm: Film = {
    title: inputTitle.value,
    year: inputYear.value,
    id: uuidv4(),
  };

  axios
    .post(apiEndpoint, newFilm)
    .then(() => { return axios.get<Film[]>(apiEndpoint);
    })
    .then((response) => (films.value = response.data))
    .catch((error) => console.log(error));
  inputTitle.value = '';
  inputYear.value = null;
}

// Delete a film by index
function deleteFilm(id: number): void {
  axios
    .delete(`${apiEndpoint}/${id}`)
    .then(() => {
      console.log(`Film mit ID ${id} wurde erfolgreich gelöscht.`);
      return axios.get<Film[]>(apiEndpoint); // Aktualisiere die Liste der Filme
    })
    .then((response) => {
      films.value = response.data; // Aktualisiere die Film-Liste im Frontend
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.error('Film nicht gefunden.');
      } else {
        console.error('Fehler beim Löschen des Films:', error.message);
      }
    });
}


// Validate year
function isValidYear(year: number): boolean {
  return year >= 1888 && year <= 2030;
}
</script>

<template>
  <div class="outer-container">
    <div class="inner-container">
      <h2 class="title">🎬 Meine Film-Liste</h2>

      <div class="content-wrapper">
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
            class="film-input year-input"
          />
          <!-- Add film button -->
          <button @click="saveFilm" class="add-button">
            Film hinzufügen
          </button>
        </div>

        <!-- Error message -->
        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <!-- Message if no films available -->
        <p v-if="films.length < 1" class="warning">
          Keine Filme vorhanden
        </p>

        <!-- List of films -->
        <ul class="film-list">
          <li v-for="film in films" :key="film.id" class="film-item">
            <span class="film-title">
              {{ film.title }} ({{ film.year }})
            </span>
            <button
              @click="deleteFilm(film.id)"
              class="delete-button"
            >
              Löschen
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #f0f0f0;
}

.inner-container {
  width: 100%;
  max-width: 500px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-wrapper {
  padding: 1em;
}

.title {
  color: #ff6347;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
  margin: 0;
  padding: 0.8em;
  background-color: white;
  border-bottom: 2px solid #ff634730;
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

.year-input {
  max-width: 100px;
}

.add-button {
  padding: 0.6em 1em;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
}

.add-button:hover {
  background-color: #ff7f50;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-weight: bold;
  margin: 1em 0;
  padding: 0.5em;
  background-color: #ffebee;
  border-radius: 4px;
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
  margin: 0;
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
