<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import axios from 'axios';
import type { Film } from '@/model/Film';

// Define props with proper typing
const props = defineProps<{
  film: Film | null;
}>();

// Define emits with proper typing
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated', film: Film): void;
}>();

const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/films';
const notes = ref<string>(props.film?.notes || '');

function saveChanges(rating?: number) {
  const updatedFilm = {
    ...props.film,
    rating: rating !== undefined ? rating : props.film?.rating || 0,
    notes: notes.value
  }

  axios
    .put(`${apiEndpoint}/${props.film.id}`, updatedFilm)
    .then((response) => {
      emit('updated', response.data);
    })
    .catch((error) => {
      console.error('Fehler beim Speichern:', error.message);
    });
}


function closePopup(): void {
  emit('close');
}

</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <h3>{{ film.title }} bewerten</h3>
      <div class="rating">
        <span
          v-for="star in [5, 4, 3, 2, 1]"
          :key="star"
          :class="{ active: star <= (film.rating || 0) }"
          @click="saveChanges(star)"
        >
          ★
        </span>
      </div>
      <div class="notes-container">
        <textarea
          v-model="notes"
          placeholder="Teile deine Gedanken..."
          class="notes-input"
        ></textarea>
      <div class="popup-actions">
        <button class="save-button" @click="saveChanges()">
          Speichern
        </button>
        <button class="close-button" @click="closePopup">
          Schließen
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: #fff;
  padding: 2em;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.popup-content h3 {
  color: #333;
  margin-bottom: 1em;
}

.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: 1em 0;
  gap: 0.3em;
}

.rating span {
  font-size: 2rem;
  cursor: pointer;
  color: lightgray;
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

.popup-actions {
  margin-top: 2em;
}

.close-button {
  background-color: #6e3397;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4em 0.9em;
  cursor: pointer;
  font-size: 0.8em;
  transition: background-color 0.2s;
  margin-left: 1em;
}

.close-button:hover {
  background-color: #372462;
}

.save-button {
  background-color: #6e3397;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4em 0.9em;
  cursor: pointer;
  font-size: 0.8em;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: #372462;
}

</style>
