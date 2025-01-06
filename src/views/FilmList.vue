<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Film } from '@/model/Film';
import BewertungFilm from '@/views/BewertungFilm.vue'

const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/films';

const films = ref<Film[]>([]);
const inputTitle = ref<string>('');
const inputYear = ref<number | null>(null);
  const errorMessage = ref<string>('');
    let currentID = 0;
const showPopup = ref(false);
const selectedFilm = ref<Film | null>(null);

    // Fetch films from API on mount
    onMounted(() => {
    axios
    .get<Film[]>(apiEndpoint)
    .then((response) => {
    films.value = response.data;
    })
    .catch((error) => {
    console.error('Fehler beim Abrufen der Filme:', error.message);
    errorMessage.value = 'Fehler beim Laden der Filme.';
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
    id: currentID++,
    watched: true,
    rating: 0,// Initialize with 0 stars
    notes: ''
    };

    axios
    .post(apiEndpoint, newFilm)
    .then(() => {
    return axios.get<Film[]>(apiEndpoint);
    })
    .then((response) => {
    films.value = response.data;
    })
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

function openPopup(filmId: number): void {
  const film = films.value.find((f) => f.id === filmId);
  if (film) {
    selectedFilm.value = film;
    showPopup.value = true;
  }
}

// Popup schließen
function closePopup(): void {
  showPopup.value = false;
  selectedFilm.value = null;
}

function handlePopupUpdated(updatedFilm: Film): void {
  const index = films.value.findIndex((f) => f.id === updatedFilm.id);
  if (index !== -1) {
    films.value[index] = updatedFilm;
  }
  closePopup();
}


// Validate year
function isValidYear(year: number): boolean {
  return year >= 1888 && year <= 2030;
}

// Rate a film
function rateFilm(filmId: number, rating: number): void {
  const film = films.value.find((f) => f.id === filmId);
  if (film) {
    film.rating = rating;

    axios
      .put(`${apiEndpoint}/${filmId}`, { ...film, rating })
      .then(() => {
        console.log(`Film ${film.title} wurde mit ${rating} Sternen bewertet.`);
      })
      .catch((error) => {
        console.error('Fehler beim Speichern der Bewertung:', error.message);
      });
  }
}
</script>

<template>
  <div class="outer-container">
    <div class="inner-container">
      <h2 class="title">🎬 Meine Film-Liste</h2>

      <div class="content-wrapper">
        <!-- Input for film title -->
        <div class="input-container">

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
          <li v-for="film in films.filter(f => f.watched)" :key="film.id" class="film-item">
      <span class="film-title">
        {{ film.title }} ({{ film.year }})
      </span>

            <!-- Updated star rating -->
            <div class="rating">
        <span
          v-for="star in [5, 4, 3, 2, 1]"
          :key="star"
          :class="{ active: star <= (film.rating || 0) }"
          @click="rateFilm(film.id, star)"
        >
          ★
        </span>
            </div>
            <button @click="openPopup(film.id)" class="rating-button">Bewerten</button>
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
    <BewertungFilm
      v-if="showPopup"
      :film="selectedFilm"
      @close="closePopup"
      @updated="handlePopupUpdated"
    />
  </div>
</template>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2em;
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
  color: #6e3397;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
  margin: 0;
  padding: 0.8em;
  background-color: #f5f5f5;
}

.input-container {
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
}

.film-input {
  flex-grow: 1;
  padding: 0.6em;
  border: 2px solid #552672;
  border-radius: 4px;
  font-size: 1em;
}

.year-input {
  max-width: 100px;
}

.add-button {
  padding: 0.6em 1em;
  background-color: #6e3397;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
}

.add-button:hover {
  background-color: #372462;
}

.error-message {
  color: #6e3397;
  text-align: center;
  font-weight: bold;
  margin: 1em 0;
  padding: 0.5em;
  background-color: #ffebee;
  border-radius: 4px;
}

.warning {
  color: #6e3397;
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
  background-color: #eee9f3;
  margin-bottom: 0.5em;
  border-radius: 4px;
  gap: 1em; /* Add consistent spacing between elements */
}

.film-title {
  font-size: 1.1em;
  color: #333;
  flex: 1; /* Allow title to take available space */
}

.rating {
  display: flex;
  flex-direction: row-reverse; /* Reverse the order of stars */
  gap: 2px; /* Add consistent spacing between stars */
  min-width: 120px; /* Ensure consistent width for rating container */
  justify-content: flex-end; /* Align stars to the end */
}

.rating span {
  font-size: 1.5rem;
  color: lightgray;
  cursor: pointer;
  transition: color 0.2s;
}

.rating span.active {
  color: gold;
}

/* Update hover styles to work from right to left */
.rating:hover span {
  color: lightgray;
}

.rating span:hover,
.rating span:hover ~ span {
  color: orange !important;
}

.delete-button {
  background-color: #6e3397;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4em 0.8em;
  cursor: pointer;
  font-size: 0.9em;
  min-width: 80px; /* Ensure consistent button width */
}

.delete-button:hover {
  background-color: #372462;
}


.rating-button {
  background-color: #6e3397;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4em 0.8em;
  cursor: pointer;
  font-size: 0.9em;
  min-width: 80px; /* Ensure consistent button width */
}

.rating-button:hover {
  background-color: #372462;
}
</style>
