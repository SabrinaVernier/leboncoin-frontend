<script setup>
import { RouterLink } from 'vue-router'

import { computed } from 'vue'

const props = defineProps({
  offerInfos: Object,
})
// console.log(props.offerInfos) // 25 obj for each offer

// console.log(props.offerInfos.attributes.pictures.data[0].attributes.url)
// console.log(props.offerInfos.attributes.owner.data.attributes.avatar.data)

const owner = props.offerInfos.attributes.owner
const pictures = props.offerInfos.attributes.pictures
let avatar = null

if (props.offerInfos.attributes.owner.data) {
  avatar = props.offerInfos.attributes.owner.data.attributes.avatar
}

// ----format date-----
const handleFormatDate = computed(() => {
  return new Date(props.offerInfos.attributes.publishedAt).toLocaleDateString('fr')
})

// -----bonus-------
const adjustedPrice = computed(() => {
  let price = ''
  const numToStr = props.offerInfos.attributes.price.toString()
  const str1 = numToStr.slice(numToStr.length - 3)
  const str2 = numToStr.slice(0, numToStr.length - 3)
  if (props.offerInfos.attributes.price >= 1000 && props.offerInfos.attributes.price < 1000000) {
    price = str2 + ' ' + str1
    // console.log('reslt1 = ' + price)
  } else if (
    props.offerInfos.attributes.price >= 1000000 &&
    props.offerInfos.attributes.price < 1000000000
  ) {
    const str3 = numToStr.slice(numToStr.length - 6, numToStr.length - 3)
    const str4 = numToStr.slice(0, numToStr.length - 6)
    price = str4 + ' ' + str3 + ' ' + str1
  } else {
    price = props.offerInfos.attributes.price
    // console.log('result2 =' + price)
  }
  return price
})
</script>
<template>
  <RouterLink :to="{ name: 'offerView', params: { id: offerInfos.id } }">
    <section class="card">
      <div class="card-user">
        <div class="user">
          <img
            v-if="avatar.data !== null"
            :src="avatar.data.attributes.url"
            :alt="avatar.data.attributes.name"
            class="avatar"
          />
          <p>{{ owner.data.attributes.username }}</p>
        </div>

        <img
          v-if="pictures.data !== null"
          :src="pictures.data[0].attributes.url"
          :alt="pictures.data[0].attributes.name"
          class="offercard-picture"
        />

        <p>{{ offerInfos.attributes.title }}</p>
        <p>{{ adjustedPrice }} €</p>
      </div>

      <div class="date">
        <p>{{ handleFormatDate }}</p>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </section>
  </RouterLink>
</template>
<style scoped>
section {
  height: 400px;
  width: calc((var(--container-width) - (4 * 15px)) / 5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

section > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 350px;
}

a {
  text-decoration: none;
  color: var(--black);
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
}

/* user-------- */
.user {
  display: flex;
  align-items: center;
  height: 25px;
}
.user p {
  font-size: 14px;
}
.avatar {
  height: 100%;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
}

/* pictures---- */
.offercard-picture {
  height: 70%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* date-------- */
.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--grey);
  padding-bottom: 10px;
}
.date p {
  font-weight: normal;
  color: var(--grey);
  font-size: 12px;
  line-height: 16px;
}
.date svg {
  font-size: 20px;
}
</style>
