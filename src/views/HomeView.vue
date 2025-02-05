<script setup>
import { onMounted, ref, watchEffect } from 'vue'

import axios from 'axios'

import OfferCard from '../components/OfferCard.vue'
import TimeToSell from '../components/TimeToSell.vue'
import SearchBySort from '../components/SearchBySort.vue'
import PaginationPage from '../components/PaginationPage.vue'

const offersList = ref('')
const numberOfPages = ref(1)

const props = defineProps(['page', 'title', 'minprice', 'maxprice', 'sort'])
// console.log('props homeView >>>', props)

onMounted(() => {
  watchEffect(async () => {
    try {
      // console.log('props homeView2 >>>', props)

      let priceFilters = ''

      if (props.minprice) {
        priceFilters += `&filters[price][$gte]=${props.minprice}`
      }

      if (props.maxprice) {
        priceFilters += `&filters[price][$lte]=${props.maxprice}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner.avatar&populate[1]=pictures${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      )

      offersList.value = data.data
      // console.log(data.data)

      if (data.data.length > 0) {
        numberOfPages.value = data.meta.pagination.pageCount
        // console.log(NumberOfPages.value)
      } else {
        alert('There are no offers matching your search !')
      }
    } catch (error) {
      console.log('catch HomeView >>>', error)
    }
  })
})
</script>

<template>
  <main id="main-homeview">
    <p v-if="!offersList" class="container no-offers">Chargement en cours...</p>

    <p v-else-if="offersList.length === 0" class="container no-offers">
      No offers !!! Please search again...
    </p>

    <div v-else class="container">
      <SearchBySort
        :sort="sort"
        :minprice="minprice"
        :maxprice="maxprice"
        :title="title"
        :page="page"
      />

      <h1>Des millions de petites annonces et autant d'occasions de se faire plaisir</h1>

      <TimeToSell />

      <div class="offercards" id="offercards">
        <OfferCard
          class="component-card"
          v-for="offer in offersList"
          :key="offer.id"
          :offerInfos="offer"
        />
      </div>
      <PaginationPage
        :sort="sort"
        :minprice="minprice"
        :maxprice="maxprice"
        :title="title"
        :page="page"
        :numberOfPages="numberOfPages"
      />
    </div>
  </main>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

.offercards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.no-offers {
  padding: 150px 0px;
  font-size: 30px;
  font-weight: bold;
}
</style>
