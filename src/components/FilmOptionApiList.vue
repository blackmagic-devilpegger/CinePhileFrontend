<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { Film } from '@/model/Film'

export default defineComponent({
  name: 'FilmOptionApiList',
  props: ['Title'],
  data(): { inputData: string, films: Film[] } {
    return {
      inputData: '',
      films: [],
    }
  },
  methods: {
    saveFilm(){
      this.films.push({title: this.inputData, year: 2021})
    }
  },
  mounted() {
    axios
      .get<Film[] >('http://localhost:8080/films')
      .then((response) => (this.films =response.data))
      .catch((error) => console.log(error))
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
