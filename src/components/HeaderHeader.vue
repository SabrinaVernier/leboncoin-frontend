<!-- eslint-disable no-undef -->
<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { inject, ref } from 'vue'

import BtnPublishOffer from '../components/BtnPublishOffer.vue'

const globalStore = inject('GlobalStore')
// console.log(globalStore.connectedUser.value)

const route = useRoute()
const router = useRouter()

const disconnect = () => {
  $cookies.remove('userInfos')
  globalStore.connectedUser.value = []
  router.push({ name: 'home' })
}

const text = ref('')

const handleSubmit = () => {
  // console.log('handleSubmit>>>', text.value, route.query)
  const queries = { ...route.query }

  if (text.value) {
    queries.title = text.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({
    name: 'home',
    query: queries,
  })
}
</script>
<template>
  <header>
    <div class="container">
      <section class="functionality">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/imgs/logo.svg" alt="logo leboncoin" />
        </RouterLink>

        <div class="deposit-search">
          <BtnPublishOffer />
          <form action="sort by title" @submit.prevent="handleSubmit">
            <input
              type="text"
              placeholder="Rechercher sur leboncoin"
              name="search"
              id="search"
              v-model="text"
            />
            <button><font-awesome-icon :icon="['fas', 'search']" /></button>
          </form>
        </div>

        <div class="user-log-in">
          <font-awesome-icon :icon="['far', 'user']" />
          <RouterLink :to="{ name: 'login' }" v-if="globalStore.connectedUser.value.length === 0">
            <button>Se connecter</button>
          </RouterLink>

          <div v-else>
            <p>
              {{ globalStore.connectedUser.value[0].username }}
            </p>
            <div class="disconnect-icon">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnect()" />
            </div>
          </div>
        </div>
      </section>

      <section class="category">
        <p>Immobilier</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Véhicules</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Locations de vacances</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Emploi</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Mode</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Maison & Jardin</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Famille</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Electronique</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Loisirs</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Autres</p>
      </section>
    </div>
  </header>
</template>
<style scoped>
header {
  height: var(--header-height);
  padding-top: 10px;
  border-bottom: 1px solid var(--grey);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
}

header > div {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ----section top-------------*/
/* logo leboncoin-- */
.functionality img {
  height: 28px;
}
/* div button-input-- */
.deposit-search {
  display: flex;
  align-items: center;
  gap: 20px;
}
.deposit-search svg {
  font-size: 13px;
}
form {
  background-color: var(--light-grey);
  padding: 5px 10px;
  border-radius: 10px;
}
form input {
  background-color: var(--light-grey);
  border: none;
  font-size: 12px;
  width: 250px;
}
form input::placeholder {
  color: #757575;
  font-size: 16px;
}
form button {
  height: 30px;
  width: 30px;
  border-radius: 7px;
  border: none;
  background-color: var(--orange);
}
/* user-log-in--- */
.user-log-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--black);
  position: relative;
  padding: 0px 20px;
}
.user-log-in p {
  font-size: 12px;
}
.user-log-in button {
  border: none;
  background-color: #fff;
  font-size: 12px;
}
.disconnect-icon {
  position: absolute;
  right: 0px;
  top: 10px;
}
.disconnect-icon svg {
  color: var(--grey);
}

/* ----section bottom--------- */
.category svg {
  font-size: 3px;
}
.category p {
  font-size: 14px;
}
</style>
