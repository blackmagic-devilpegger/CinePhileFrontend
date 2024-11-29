<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Film } from '@/model/Film'

// Reaktives Array für die Filme
const films = ref<Film[]>([]);
const inputTitle = ref<string>(''); // Eingabe für den neuen Film
const inputYear = ref<number | null>(null);

// Funktion zum Speichern eines neuen Films
function saveFilm(): void {
  if (inputTitle.value.trim() && inputYear.value) {
    films.value.push({
      title: inputTitle.value,
      year: inputYear.value
    });
    inputTitle.value = ''; // Eingabefeld leeren
    inputYear.value = null; // Jahr-Feld leeren
  }
}

// Funktion zum Löschen eines Films
function deleteFilm(index: number): void {
  films.value.splice(index, 1); // Entfernt Film nach Index
}

// Beispiel-Film beim Laden der Komponente hinzufügen
onMounted(() => {
  films.value.push({ title: 'Spider-Man: Homecoming', year: 2019 });
});

</script>

<template>
  <div class="container">
    <h2 class="title">🎬 Meine Film-Liste</h2>
    <div class="input-container">
      <!-- Eingabefeld für den Titel -->
      <input
        v-model="inputTitle"
        placeholder="Film hinzufügen"
        class="film-input"
      />
      <!-- Eingabefeld für das Jahr -->
      <input
        v-model.number="inputYear"
        type="number"
        placeholder="Jahr"
        class="film-input"
      />
      <!-- Hinzufügen-Button -->
      <button @click="saveFilm" class="add-button">
        Film hinzufügen
      </button>
    </div>

    <!-- Nachricht anzeigen, wenn keine Filme vorhanden sind -->
    <p v-if="films.length < 1" class="warning">
      Keine Filme vorhanden
    </p>

    <!-- Liste der Filme -->
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
