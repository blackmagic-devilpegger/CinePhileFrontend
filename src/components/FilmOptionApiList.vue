<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { Film } from '@/model/Film'

const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/films'

export default defineComponent({
  name: 'FilmOptionApiList',
  props: ['Title', 'Release year'],
  data(): { inputTitle: string, inputYear: number, films: Film[] } {
    return {
      inputTitle: '',
      inputYear: 1,
      films: [],
    }
  },
  methods: {
    saveFilm() {
      if (this.isValidYear(Number(this.inputYear))) {
        this.films.push({ title: this.inputTitle, year: this.inputYear });
      } else {
        console.log('Ungültiges Jahr eingegeben');
      }
    },

    isValidYear(year: number): boolean {
      return year >= 1888 && year <= 2030;
    }
  },

  mounted() {
    axios
      .get<Film[]>(apiEndpoint)
      .then((response) => (this.films = response.data))
      .catch((error) => console.log(error));
  },
})

</script>

<template>
  <div>
    <h1>FilmOptionApiList</h1>
  </div>
</template>

<style scoped>

</style>
