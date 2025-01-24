<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'

import axios from 'axios'

const props = defineProps({
  id: String,
})
// console.log(props.id) // 18

const selectedOffer = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner.avatar&populate[1]=pictures`,
    )
    // console.log(data.data)
    selectedOffer.value = data.data
    // console.log(selectedOffer.value) // obj {id:18}
  } catch (error) {
    console.log('catch OfferView >>>', error)
  }
})

// ----format date-----
const handleFormatDate = computed(() => {
  return new Date(selectedOffer.value.attributes.publishedAt).toLocaleDateString('fr')
})

// bonus2----------
const adjustedPrice = computed(() => {
  let price = ''
  const numToStr = selectedOffer.value.attributes.price.toString()
  const str1 = numToStr.slice(numToStr.length - 3)
  const str2 = numToStr.slice(0, numToStr.length - 3)
  if (
    selectedOffer.value.attributes.price >= 1000 &&
    selectedOffer.value.attributes.price < 1000000
  ) {
    price = str2 + ' ' + str1
    // console.log('reslt1 = ' + price)
  } else {
    price = selectedOffer.value.attributes.price
    // console.log('result2 =' + price)
  }
  return price
})

// bonu3-caroussel-----------
const cycleList = computed(() => {
  if (selectedOffer.value.attributes.pictures.data) {
    const { state, prev, next } = useCycleList(selectedOffer.value.attributes.pictures.data)

    return { state, prev, next }
  } else {
    return {}
  }
})
</script>
<template>
  <main>
    <p v-if="selectedOffer === null" class="container">En cours de chargement ...</p>
    <div v-else class="container">
      <section class="section-infos">
        <div
          v-if="selectedOffer.attributes.pictures.data"
          class="caroussel"
          :class="{
            singlePicture: selectedOffer.attributes.pictures.data.length === 1,
          }"
        >
          <font-awesome-icon
            :icon="['fas', 'angle-left']"
            @click="cycleList.prev()"
            v-if="selectedOffer.attributes.pictures.data?.length > 1"
          />

          <img :src="cycleList.state.value.attributes.url" alt="article" class="img-article" />

          <font-awesome-icon
            :icon="['fas', 'angle-right']"
            @click="cycleList.next()"
            v-if="selectedOffer.attributes.pictures.data?.length > 1"
          />
        </div>

        <div>
          <p class="bold title">{{ selectedOffer.attributes.title }}</p>
          <p class="bold price">{{ adjustedPrice }} €</p>
          <p class="date">{{ handleFormatDate }}</p>
        </div>

        <div class="div-border">
          <p class="bold description">Description</p>
          <p>{{ selectedOffer.attributes.description }}</p>
        </div>

        <div class="div-border">
          <p><font-awesome-icon :icon="['fas', 'map-marker-alt']" /> Agon-Coutainville (50230)</p>
        </div>
      </section>

      <section class="section-user">
        <div>
          <div>
            <div class="identity">
              <img
                :src="selectedOffer.attributes.owner.data.attributes.avatar.data.attributes.url"
                alt="avatar"
                class="img-avatar"
                v-if="selectedOffer.attributes.owner.data.attributes.avatar.data !== null"
              />
              <p class="bold">{{ selectedOffer.attributes.owner.data.attributes.username }}</p>
            </div>

            <p class="verification">
              <font-awesome-icon :icon="['fas', 'check-double']" class="check-double" /> Pièce
              d'identité vérifiée
            </p>

            <p class="response-time">
              <font-awesome-icon :icon="['far', 'clock']" />Répond généralement en 1h
            </p>
          </div>

          <div class="div-button">
            <button>Acheter</button>
            <button>Message</button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<style scoped>
.container {
  display: flex;
  height: 730px;
  padding-top: 20px;
}

section {
  height: 100%;
}

.bold {
  font-weight: 800;
}

/* ---section infos------------- */
.section-infos {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
}
.section-infos > div:nth-of-type(2) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  font-size: 24px;
}
.price,
.description {
  font-size: 18px;
}
.date {
  font-size: 12px;
  color: var(--grey);
}
.img-article {
  height: 350px;
  margin-bottom: 20px;
  align-self: center;
  object-fit: contain;
}
.div-border {
  border-top: 2px solid var(--light-grey);
  padding-top: 10px;
  margin: 40px 0px 20px 0px;
}
.div-border p {
  margin-bottom: 20px;
}

/* ----section user------------- */
.section-user {
  flex: 1;
}
.section-user > div {
  border: 1px solid var(--light-grey);
  box-shadow: 0 0 2px var(--grey);
  border-radius: 5px;
  height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}
.section-user > div > div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0px;
}
.identity {
  display: flex;
  gap: 10px;
  font-size: 18px;
  text-transform: uppercase;
}
.img-avatar {
  height: 65px;
  width: 65px;
  border-radius: 50%;
  object-fit: cover;
}

/* verification&response-time--- */
.verification {
  color: var(--brown);
  font-size: 12px;
  background-color: var(--light-orange);
  padding: 4px 7px;
  border-radius: 10px;
  width: fit-content;
}
.response-time {
  font-size: 14px;
}

/* button---- */
.div-button {
  border-top: 2px solid var(--light-grey);
}
.div-button button {
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
}
.div-button button:first-child {
  background-color: var(--orange);
}
.div-button button:last-child {
  background-color: var(--blue);
}

/* icon----- */
svg {
  margin-right: 10px;
}
.check-double {
  height: 12px;
}

/* bonus3----------------- */
.caroussel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
}
.caroussel svg {
  font-size: 18px;
  color: var(--black);
  cursor: pointer;
}
.singlePicture {
  justify-content: center;
}
</style>
