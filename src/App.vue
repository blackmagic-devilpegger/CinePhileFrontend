<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Cinephile Logo" class="logo" src="@/assets/trainspotting.jpg" width="150" height="150" />

    <div class="wrapper">
      <h1>Cinephile🫐🪼🦋💫</h1>
      <p>Verwalte deine Liebe für Filme</p>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/film-option-api-list">Filmliste</RouterLink>
        <RouterLink to="/about">Watchlist</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body, html{
  margin: 0;
  padding: 0;
  height: 100%;
  background: rgb(17,16,45);
  background: linear-gradient(90deg, rgba(17,16,45,0.6783963585434174) 0%, rgba(224,134,159,0.6055672268907564) 47%, rgba(114,182,249,0.6223739495798319) 100%);
  background-attachment: fixed;
  font-family: Garamond, serif;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
