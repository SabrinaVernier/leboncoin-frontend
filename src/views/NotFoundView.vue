<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main>
    <div class="container">
      <div class="first-col">
        <div>
          <span class="middle-size">404</span>
          <span class="middle-size">Perdu dans les</span>
          <span class="big-size">RAYONS !</span>
        </div>

        <p>Désolé, on a cherché dans tous les coins, on a pas trouvé la bonne page.</p>

        <RouterLink :to="{ name: 'home' }"
          ><font-awesome-icon :icon="['fas', 'arrow-left']" /> Retour à l'accueil
        </RouterLink>
      </div>
      <div class="second-col">
        <img src="../assets/imgs/notfound-Leboncoin.webp" alt="NotFound" />
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  height: calc(100vh - (var(--header-height)) - (var(--footer-height)));
}

.container {
  display: flex;
  height: 100%;
}

.container > div {
  /* border: 1px solid plum; */
  flex: 1;
  height: 100%;
}

/* ---FIRST-COLUMN----------- */
.first-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.first-col div {
  display: flex;
  flex-direction: column;
}

.first-col div span:first-child {
  margin-bottom: 20px;
  color: var(--orange);
}

.middle-size {
  font-size: 48px;
  font-weight: bold;
}

.big-size {
  font-size: 62px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 4px var(--orange);
}

a {
  text-decoration: none;
  color: black;
}

/* ---SECOND-COLUMN-------- */
.second-col {
  display: flex;
  justify-content: flex-end;
}

img {
  height: 100%;
}
</style>
