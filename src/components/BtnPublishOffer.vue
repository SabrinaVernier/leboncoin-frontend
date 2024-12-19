<script setup></script>
<template>
  <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
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
