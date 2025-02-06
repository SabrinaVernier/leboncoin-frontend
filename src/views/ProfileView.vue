<script setup>
import { onMounted, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

import BtnPublishOffer from '@/components/BtnPublishOffer.vue'

const globalStore = inject('GlobalStore')

const router = useRouter()

const userInfos = ref('')
const isDeleting = ref(false)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=avatar&populate[2]=offers.pictures`,
      {
        headers: {
          Authorization: `Bearer ${globalStore.connectedUser.value[0].jwt}`,
        },
      },
    )
    console.log('profile user>>>', data)
    userInfos.value = data
  } catch (error) {
    console.log('profileview catch >>>', error)
  }
})

const deleteOffer = async (offerId) => {
  isDeleting.value = true
  try {
    const { data } = await axios.delete(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${offerId}`,
      {
        headers: {
          Authorization: `Bearer ${globalStore.connectedUser.value[0].jwt}`,
        },
      },
    )
    isDeleting.value = false
    alert('Votre annonce a bien été supprimée !')

    console.log(' profile delete data >>>', data)

    // page refresh ---------
    router.go()
  } catch (error) {
    console.log('profile catch >>>', error)
  }
}
</script>
<template>
  <main id="main-profileview">
    <p v-if="!userInfos" class="container">Chargement en cours ...</p>
    <div class="container">
      <section class="first-part" v-if="userInfos">
        <div class="avatar" v-if="userInfos.avatar">
          <img :src="userInfos.avatar.url" alt="avatar" />
        </div>
        <div class="avatar" v-else>
          <p>{{ userInfos.username.charAt(0) }}</p>
        </div>
        <div class="identity">
          <h1>{{ userInfos.username }}</h1>
          <p>{{ userInfos.email }}</p>
        </div>
      </section>

      <h2 v-if="userInfos && userInfos.offers.length > 0">
        {{ userInfos.offers.length }} annonces
      </h2>

      <section class="second-part-no-offer" v-if="userInfos && userInfos.offers.length === 0">
        <img src="../assets/imgs/empty-image..svg" alt="empty image" />
        <span>C'est désert ici !</span>
        <p>Vous n'avez aucune annonce en ligne</p>
        <BtnPublishOffer />
      </section>

      <section class="second-part" v-else>
        <div v-for="offer in userInfos.offers" :key="offer.id">
          <div>
            <img
              v-if="offer.pictures"
              class="picture"
              :src="offer.pictures[0].url"
              alt="Offer Picture"
            />
            <div v-else class="missing-picture">
              <font-awesome-icon :icon="['far', 'image']" class="svg-image" />
              <p>No image...</p>
            </div>
            <p class="title">{{ offer.title }}</p>
            <p class="price">{{ offer.price }} €</p>
          </div>

          <font-awesome-icon
            :icon="['fas', 'trash']"
            @click="deleteOffer(offer.id)"
            v-if="!isDeleting"
            class="svg-trash"
          />

          <p v-else>Suppression en cours ...</p>
        </div>
      </section>
    </div>
  </main>
</template>
<style scoped>
.container {
  padding-top: 40px;
  padding-bottom: 20px;
  height: 100%;
}

main > p:first-child {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

section {
  margin-bottom: 25px;
  padding: 15px;
}

h2 {
  font-weight: bold;
  margin: 5px 0px;
}

/* -----First-part--------------- */
.first-part {
  border: 1px solid var(--grey);
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: var(--grey);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar p {
  color: white;
  font-size: 40px;
}

/* -----Second-part---------------- */
.second-part {
  border: 1px solid var(--input-grey);
  border-radius: 15px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.second-part > div {
  box-shadow: 0 0 5px 3px var(--input-grey);
  border-radius: 10px;
  height: 150px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.second-part > div > div {
  flex: 1;

  display: flex;
  align-items: center;
  gap: 50px;
}

.title {
  font-size: 22px;
  font-weight: bold;
  flex: 1.5;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: var(--brown);
  flex: 1;
}

.picture {
  height: 120px;
  width: 120px;
  border-radius: 5px;
  object-fit: cover;
}

.missing-picture {
  height: 120px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 14px;
}

.svg-image {
  font-size: 60px;
  color: var(--shadow-grey);
}

.svg-trash {
  color: var(--orange);
}

/* - */

.second-part-no-offer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.second-part-no-offer span {
  font-weight: bold;
}

.second-part-no-offer p {
  color: var(--shadow-grey);
}
</style>
