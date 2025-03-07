<script setup></script>
<template>
  <footer>
    <div class="container">
      <p>
        Made by <a href="https://github.com/SabrinaVernier" target="_blank">Sabrina Vernier</a> with
        <a href="https://vuejs.org/" target="_blank">Vue.js</a>
      </p>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: var(--light-grey);
  height: var(--footer-height);
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer a {
  text-decoration: none;
  color: var(--black);
  font-weight: 800;
}
</style>
