<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <RouterLink :to="{ name: 'publish' }">
    <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
  </RouterLink>
</template>
<style scoped>
button {
  background-color: var(--orange);
  border: none;
  padding: 8px 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
}

button svg {
  margin-right: 5px;
}
</style>
