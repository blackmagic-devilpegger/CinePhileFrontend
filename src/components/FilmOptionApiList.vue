<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilmOptionApiList',
  props: ['Title'],
  data(inputData:string, films: string[]) {
    return {
      inputData: '',
      films: [],
    }
  },
  methods: {
    saveFilm(){
      this.films.push(this.inputData)
})
</script>

<template>
  <div>
    <h1>FilmOptionApiList</h1>
  </div>
</template>

<style scoped>

</style>
