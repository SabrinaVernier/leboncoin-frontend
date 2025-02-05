<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <div class="time-to-sell" id="time-to-sell">
    <img src="../assets/imgs/onde-corail.svg" alt="onde corail" class="img-coral" />

    <div class="deposit" id="deposit">
      <p>C'est le moment de vendre</p>
      <BtnPublishOffer />
    </div>

    <img src="../assets/imgs/feuille-bleue.svg" alt="feuille bleue" class="img-blue" />
  </div>
</template>

<style scoped>
.time-to-sell {
  background-color: var(--light-orange);
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  border-radius: 20px;
}

.deposit {
  display: flex;
  align-items: center;
  gap: 20px;
}

.deposit p {
  font-size: 20px;
  font-weight: bold;
}

img {
  object-fit: cover;
  border-radius: 20px;
}
</style>
