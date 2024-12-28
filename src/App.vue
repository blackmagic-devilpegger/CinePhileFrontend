<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Cinephile Logo" class="logo" src="@/assets/trainspotting.jpg" width="180" height="180" />

    <div class="wrapper">
      <h1>Cinephile🫐🪼🦋💫</h1>
      <p>Verwalte deine Liebe für Filme 📽️</p>

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
.wrapper {
  color: #6e3397;
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: 1em;
  margin: 0;
  padding: 0.8em;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
    place-items: center;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
