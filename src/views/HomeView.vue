<script setup lang="ts">
</script>

<template>
  <main>
    <div class = "titel">
    <h1>Wilkommen in deiner träumerischen Film-Oase🌜💭</h1>
      <div class = "msg">
        Führe deine persönliche Watchlist, zu welcher du auch zukünftig erscheinende Filme hinzufügen kannst! Logge und bewerte Filme welche du geschaut hast - dein eigenes Filmtagebuch.. 🖋
      </div>
      <div class="image-container">
        <img src="@/assets/cillian.jpg" width="180" height="180">
        <img src="@/assets/scarjo.jpg" width="180" height="180">
        <img src="@/assets/starwars.jpg" width="180" height="180">
      </div>
    </div>

  </main>
</template>

<style>
.titel {
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: 1em;
  margin: 0;
  padding: 0.8em;
}

.msg{
  color: #6e3397;
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: 1em;
  padding: 0.8em;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  margin-top: 2em;
}

.image-container {
  display: flex;
  justify-content: center; /* Zentriert die Bilder horizontal */
  align-items: center; /* Zentriert die Bilder vertikal */
  gap: 1rem; /* Abstand zwischen den Bildern */
  flex-wrap: wrap; /* Zeilenumbruch, falls der Platz nicht ausreicht */
  margin-top: 2em;
}

.image-container img {
  max-width: 200px; /* Maximale Breite der Bilder */
  height: auto; /* Beibehaltung des Seitenverhältnisses */
  border-radius: 8px; /* Optionale Rundung der Ecken */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optionale Schattierung */
}


</style>
