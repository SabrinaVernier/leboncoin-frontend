<script setup></script>
<template>
  <footer>
    <div class="container">
      <p>
        Made by <a href="https://github.com/SabrinaVernier" target="_blank">Sabrina</a> with
        <a href="https://www.lereacteur.io/" target="_blank">Le Reacteur</a>
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
