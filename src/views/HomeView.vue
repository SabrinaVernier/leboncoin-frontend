<script setup>
import { onMounted, ref } from 'vue'

import axios from 'axios'

import OfferCard from '../components/OfferCard.vue'
import TimeToSell from '../components/TimeToSell.vue'

const offersList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner.avatar&populate[1]=pictures',
    )
    offersList.value = data.data
  } catch (error) {
    console.log('catch HomeView >>>', error)
  }
})
</script>

<template>
  <main>
    <p v-if="offersList.length === 0" class="container">Chargement en cours...</p>
    <div v-else class="container">
      <h1>Des millions de petites annonces et autant d'occasions de se faire plaisir</h1>

      <TimeToSell />

      <div class="offerCard">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>
    </div>
  </main>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0px;
}

.offerCard {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

.container > p {
  font-size: 20px;
  font-weight: bold;
}
</style>
